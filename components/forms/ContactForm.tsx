"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { asiaPacificCountries, allCountries } from "@/content/countries";

// Search pool for the country combobox — Asia-Pacific (region of
// operations) ranked first, then the rest of the world, no duplicates.
const asiaPacificCodes = new Set(asiaPacificCountries.map((c) => c.code));
const countrySearchPool = [
  ...asiaPacificCountries,
  ...allCountries.filter((c) => !asiaPacificCodes.has(c.code)),
];

function matchCountries(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return countrySearchPool.slice(0, 8); // empty field → AP shortlist
  const starts = countrySearchPool.filter((c) => c.name.toLowerCase().startsWith(q));
  const contains = countrySearchPool.filter(
    (c) => !c.name.toLowerCase().startsWith(q) && c.name.toLowerCase().includes(q),
  );
  return [...starts, ...contains].slice(0, 8);
}

const schema = z.object({
  name:    z.string().min(2, "Please provide your name"),
  email:   z.string().email("Please provide a valid email"),
  company: z.string().min(2, "Please provide your company"),
  role:    z.string().min(2, "Please provide your role"),
  country: z.string().min(2, "Please select your country"),
  scope:   z.enum(["mining", "exploration", "civil", "groundwater", "geothermal", "other"]),
  message: z.string().min(20, "Please share a few details (20+ chars)"),
  // Honeypot — hidden from humans, filled by bots. Real users leave it empty.
  website: z.string().optional(),
});
type FormValues = z.infer<typeof schema>;
type Status = "idle" | "submitting" | "success" | "error";

// Server-side endpoint that relays the enquiry via the Resend API.
// Defaults to the PHP endpoint shipped at the site root (/contact.php).
const CONTACT_ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? "/contact.php";

export function ContactForm() {
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { scope: "mining" },
  });
  const [status, setStatus] = useState<Status>("idle");

  // Country combobox state — type-ahead suggestions under the field.
  const [countryOpen, setCountryOpen] = useState(false);
  const [countryHi, setCountryHi] = useState(0);
  const countrySuggestions = matchCountries(watch("country") ?? "");
  const pickCountry = (name: string) => {
    setValue("country", name, { shouldValidate: true, shouldDirty: true });
    setCountryOpen(false);
  };
  const countryReg = register("country");

  const onSubmit = handleSubmit(async (data) => {
    setStatus("submitting");
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => null)) as { ok?: boolean } | null;
      if (!res.ok || !json?.ok) throw new Error("send_failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  });

  if (status === "success") {
    return (
      <div className="bg-deep-navy p-10 text-on-navy" style={{ borderLeft: "4px solid var(--color-amber)" }}>
        <p
          className="font-display font-bold uppercase text-amber"
          style={{ fontSize: "11px", letterSpacing: "0.18em" }}
        >
          Message received
        </p>
        <h3
          className="mt-4 font-display font-black uppercase"
          style={{ fontSize: "36px", letterSpacing: "0.5px" }}
        >
          Thank you.
        </h3>
        <p
          className="mt-4 font-display text-on-navy-muted"
          style={{ fontSize: "15px", lineHeight: "1.7" }}
        >
          We&rsquo;ll get back to you within one business day.
        </p>
      </div>
    );
  }

  // 16px on mobile is mandatory — iOS Safari auto-zooms on inputs < 16px,
  // which breaks the layout when the user taps a field. Editorial 15px
  // size kept on md+ where the auto-zoom doesn't apply.
  const inputCls =
    "w-full border-b border-deep-navy/20 bg-transparent px-0 py-3.5 font-display text-base text-deep-navy outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-subtle focus:border-[var(--color-amber-dim)] focus:[box-shadow:0_10px_18px_-12px_color-mix(in_srgb,var(--color-amber)_50%,transparent)] md:text-[15px]";
  // amber-dim (#B58800) — passes WCAG AA on the white form bg.
  const labelCls =
    "font-display font-bold uppercase text-[var(--color-amber-dim)]";
  const errCls = "mt-1 font-sans font-medium text-[var(--color-amber-dim)]";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8" noValidate>
      {/* Honeypot — visually hidden, off-tab, ignored by humans. Bots that
          fill it are silently dropped server-side. */}
      <input
        {...register("website")}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
      />
      <div className="grid gap-8 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className={labelCls} style={{ fontSize: "11px", letterSpacing: "0.18em" }}>
            Name *
          </span>
          <input
            {...register("name")}
            type="text"
            autoComplete="name"
            className={inputCls}
            placeholder="Your full name"
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <span id="name-error" role="alert" className={errCls} style={{ fontSize: "12px" }}>
              {errors.name.message}
            </span>
          )}
        </label>

        <label className="flex flex-col gap-2">
          <span className={labelCls} style={{ fontSize: "11px", letterSpacing: "0.18em" }}>
            Email *
          </span>
          <input
            {...register("email")}
            type="email"
            autoComplete="email"
            className={inputCls}
           
            placeholder="you@company.com"
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <span id="email-error" role="alert" className={errCls} style={{ fontSize: "12px" }}>
              {errors.email.message}
            </span>
          )}
        </label>

        <label className="flex flex-col gap-2">
          <span className={labelCls} style={{ fontSize: "11px", letterSpacing: "0.18em" }}>
            Company *
          </span>
          <input
            {...register("company")}
            type="text"
            autoComplete="organization"
            className={inputCls}
            placeholder="Organisation"
            aria-invalid={errors.company ? "true" : "false"}
            aria-describedby={errors.company ? "company-error" : undefined}
          />
          {errors.company && (
            <span id="company-error" role="alert" className={errCls} style={{ fontSize: "12px" }}>
              {errors.company.message}
            </span>
          )}
        </label>

        <label className="flex flex-col gap-2">
          <span className={labelCls} style={{ fontSize: "11px", letterSpacing: "0.18em" }}>
            Role
          </span>
          <input
            {...register("role")}
            type="text"
            autoComplete="organization-title"
            className={inputCls}
            placeholder="Your position"
            aria-invalid={errors.role ? "true" : "false"}
            aria-describedby={errors.role ? "role-error" : undefined}
          />
          {errors.role && (
            <span id="role-error" role="alert" className={errCls} style={{ fontSize: "12px" }}>
              {errors.role.message}
            </span>
          )}
        </label>

        <label className="flex flex-col gap-2 md:col-span-2">
          <span className={labelCls} style={{ fontSize: "11px", letterSpacing: "0.18em" }}>
            Country *
          </span>
          {/* Country combobox — type to filter, flag suggestions below.
              Flags are regional-indicator emoji (zero assets; Windows shows
              "PG"-style letters, still readable). Submitted value is the
              plain English country name so contact.php needs no change. */}
          <div className="relative">
            <input
              {...countryReg}
              type="text"
              role="combobox"
              autoComplete="off"
              placeholder="Type your project location…"
              aria-expanded={countryOpen}
              aria-controls="country-listbox"
              aria-autocomplete="list"
              aria-activedescendant={countryOpen ? `country-opt-${countryHi}` : undefined}
              aria-invalid={errors.country ? "true" : "false"}
              aria-describedby={errors.country ? "country-error" : undefined}
              className={inputCls}
              onChange={(e) => {
                void countryReg.onChange(e);
                setCountryOpen(true);
                setCountryHi(0);
              }}
              onFocus={() => setCountryOpen(true)}
              onBlur={(e) => {
                void countryReg.onBlur(e);
                setCountryOpen(false);
              }}
              onKeyDown={(e) => {
                if (!countryOpen && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
                  setCountryOpen(true);
                  return;
                }
                if (!countryOpen) return;
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setCountryHi((i) => Math.min(i + 1, countrySuggestions.length - 1));
                } else if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setCountryHi((i) => Math.max(i - 1, 0));
                } else if (e.key === "Enter") {
                  const c = countrySuggestions[countryHi];
                  if (c) {
                    e.preventDefault();
                    pickCountry(c.name);
                  }
                } else if (e.key === "Escape") {
                  setCountryOpen(false);
                }
              }}
            />
            {countryOpen && countrySuggestions.length > 0 && (
              <ul
                id="country-listbox"
                role="listbox"
                aria-label="Country suggestions"
                className="absolute inset-x-0 top-full z-20 mt-1 max-h-72 overflow-y-auto rounded-lg border border-border bg-white py-1 shadow-deep"
              >
                {countrySuggestions.map((c, i) => (
                  <li key={c.code} id={`country-opt-${i}`} role="option" aria-selected={i === countryHi}>
                    <button
                      type="button"
                      tabIndex={-1}
                      // pointerdown fires before the input's blur — selecting
                      // a suggestion must win over the close-on-blur.
                      onPointerDown={(e) => {
                        e.preventDefault();
                        pickCountry(c.name);
                      }}
                      onMouseEnter={() => setCountryHi(i)}
                      className={cn(
                        "flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-left font-sans text-deep-navy",
                        i === countryHi && "bg-deep",
                      )}
                      style={{ fontSize: "15px" }}
                    >
                      <span aria-hidden style={{ fontSize: "17px" }}>{c.flag}</span>
                      {c.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {errors.country && (
            <span id="country-error" role="alert" className={errCls} style={{ fontSize: "12px" }}>
              {errors.country.message}
            </span>
          )}
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className={labelCls} style={{ fontSize: "11px", letterSpacing: "0.18em" }}>
          Scope of Work
        </span>
        <select
          {...register("scope")}
          className={cn(inputCls, "cursor-pointer appearance-none")}
         
        >
          <option value="mining">Mining</option>
          <option value="exploration">Exploration</option>
          <option value="civil">Civil</option>
          <option value="groundwater">Groundwater</option>
          <option value="geothermal">Geothermal</option>
          <option value="other">Other</option>
        </select>
      </label>

      <label className="flex flex-col gap-2">
        <span className={labelCls} style={{ fontSize: "11px", letterSpacing: "0.18em" }}>
          Project Description *
        </span>
        <textarea
          {...register("message")}
          rows={5}
          className={cn(inputCls, "resize-none")}
          style={{ lineHeight: "1.55" }}
          placeholder="Scope, location, timeline, key constraints…"
          aria-invalid={errors.message ? "true" : "false"}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <span id="message-error" role="alert" className={errCls} style={{ fontSize: "12px" }}>
            {errors.message.message}
          </span>
        )}
      </label>

      <div className="flex flex-wrap items-center gap-6">
        <button
          type="submit"
          disabled={status === "submitting"}
          className={cn(
            "inline-flex items-center gap-2 bg-amber px-7 py-3.5 font-display font-bold uppercase text-deep-navy",
            "transition-all duration-200 hover:bg-[var(--color-amber-dim)]",
            "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-amber",
            "disabled:cursor-not-allowed disabled:opacity-50",
          )}
          style={{ fontSize: "12px", letterSpacing: "0.12em" }}
        >
          {status === "submitting" ? "Sending…" : "Send Enquiry"}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
        {status === "error" && (
          <span
            role="alert"
            className="font-display font-bold uppercase"
            style={{ fontSize: "11px", letterSpacing: "0.18em", color: "var(--color-amber-dim)" }}
          >
            Something went wrong. Please try again.
          </span>
        )}
      </div>
    </form>
  );
}
