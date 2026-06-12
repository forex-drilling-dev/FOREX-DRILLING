"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { asiaPacificCountries, allCountries } from "@/content/countries";

// "Other countries" excludes the Asia-Pacific group so no country is
// listed twice in the dropdown.
const asiaPacificCodes = new Set(asiaPacificCountries.map((c) => c.code));
const otherCountries = allCountries.filter((c) => !asiaPacificCodes.has(c.code));

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
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { scope: "mining" },
  });
  const [status, setStatus] = useState<Status>("idle");

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
          {/* Country picker — Asia-Pacific (region of operations) listed
              first, then every country. Flags are regional-indicator emoji:
              zero assets, rendered natively (Windows falls back to "SG"-style
              letters, which still reads fine). The submitted value stays the
              plain English country name so contact.php needs no change. */}
          <select
            {...register("country")}
            autoComplete="country-name"
            defaultValue=""
            className={cn(inputCls, "cursor-pointer appearance-none")}
            aria-invalid={errors.country ? "true" : "false"}
            aria-describedby={errors.country ? "country-error" : undefined}
          >
            <option value="" disabled>
              Select project location…
            </option>
            <optgroup label="Asia-Pacific">
              {asiaPacificCountries.map((c) => (
                <option key={c.code} value={c.name}>
                  {c.flag} {c.name}
                </option>
              ))}
            </optgroup>
            <optgroup label="Other countries">
              {otherCountries.map((c) => (
                <option key={c.code} value={c.name}>
                  {c.flag} {c.name}
                </option>
              ))}
            </optgroup>
          </select>
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
