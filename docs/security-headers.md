# Security headers — deployment guide

This is a **static site** (`next build` with `output: "export"` → the `out/` folder).
Security headers therefore can't be set in application code — they must be set by
**whatever web server serves `out/`**.

A ready-to-use **`public/.htaccess`** ships in the repo and is copied to **`out/.htaccess`**
at build time. **On Apache it works automatically** (needs `mod_headers`), no server
access required. **On Nginx or Caddy that file is ignored** — give the server admin the
matching snippet below.

> The Content-Security-Policy below was **validated in a real browser** against the live
> MapLibre map (`/contact`) and React hydration (`/`): **0 CSP violations**. Do not drop
> `worker-src blob:` or the `tiles.openfreemap.org` origins — the map breaks without them,
> and `'unsafe-inline'` in `script-src` is required because a static export cannot use a
> per-request nonce for Next.js's inline RSC scripts.

## The headers

| Header | Value | Purpose |
|---|---|---|
| `Content-Security-Policy` | *(see snippets)* | Restricts script/style/img/connect/worker origins — clickjacking + injection defense-in-depth |
| `X-Frame-Options` | `DENY` | Anti-clickjacking (legacy belt-and-braces alongside CSP `frame-ancestors 'none'`) |
| `X-Content-Type-Options` | `nosniff` | Blocks MIME-sniffing |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Limits referrer leakage |
| `Permissions-Policy` | `geolocation=(), camera=(), microphone=(), payment=(), usb=()` | Disables unused powerful APIs |
| `Strict-Transport-Security` | `max-age=31536000` | Forces HTTPS — **only takes effect when the site is served over HTTPS** |

CSP value (single line):

```
default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; frame-src 'none'; form-action 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://tiles.openfreemap.org https://images.unsplash.com; font-src 'self'; connect-src 'self' https://tiles.openfreemap.org; worker-src blob:; manifest-src 'self'
```

## Apache (already handled by `out/.htaccess`)

Requires `mod_headers` (`a2enmod headers` on Debian/Ubuntu). If you prefer the VirtualHost
over `.htaccess`, paste the same `Header always set ...` lines into the `<VirtualHost>` block.

## Nginx

In the `server { }` block that serves the site (`always` = applied to error responses too):

```nginx
add_header Content-Security-Policy "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; frame-src 'none'; form-action 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://tiles.openfreemap.org https://images.unsplash.com; font-src 'self'; connect-src 'self' https://tiles.openfreemap.org; worker-src blob:; manifest-src 'self'" always;
add_header X-Frame-Options "DENY" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "geolocation=(), camera=(), microphone=(), payment=(), usb=()" always;
add_header Strict-Transport-Security "max-age=31536000" always;  # HTTPS only
```

> Nginx gotcha: if a nested `location {}` block has its own `add_header`, it **drops** the
> server-level headers for that location. Keep these at `server` scope and avoid per-location
> `add_header`, or repeat them. Reload with `nginx -t && systemctl reload nginx`.

## Caddy

```caddyfile
your-domain.com {
    root * /path/to/out
    file_server
    header {
        Content-Security-Policy "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; frame-src 'none'; form-action 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://tiles.openfreemap.org https://images.unsplash.com; font-src 'self'; connect-src 'self' https://tiles.openfreemap.org; worker-src blob:; manifest-src 'self'"
        X-Frame-Options "DENY"
        X-Content-Type-Options "nosniff"
        Referrer-Policy "strict-origin-when-cross-origin"
        Permissions-Policy "geolocation=(), camera=(), microphone=(), payment=(), usb=()"
        Strict-Transport-Security "max-age=31536000"
    }
}
```

Caddy serves HTTPS automatically, so HSTS is meaningful out of the box. Reload with `caddy reload`.

## Verify after deploy

```bash
curl -sI https://your-domain.com/ | grep -iE 'content-security|x-frame|x-content|referrer|permissions|strict-transport'
```

All six headers should appear. If they don't on Apache, `mod_headers` is probably disabled
or `.htaccess` overrides are off (`AllowOverride None`) — then use the VirtualHost form.

## Strengthening later (optional)

- Once **every** subdomain is HTTPS: `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`.
- If the site is always HTTPS, you may add `upgrade-insecure-requests` to the CSP. It was
  intentionally left out here because it breaks the site if it is ever served over plain HTTP.
