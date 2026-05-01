"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { cn } from "@/lib/utils";

const schema = z.object({
  name:    z.string().min(2, "Please provide your name"),
  company: z.string().min(2, "Please provide your company"),
  role:    z.string().min(2, "Please provide your role"),
  country: z.string().min(2, "Please provide your country"),
  scope:   z.enum(["mining", "exploration", "civil", "environmental", "other"]),
  message: z.string().min(20, "Please share a few details (20+ chars)"),
});
type FormValues = z.infer<typeof schema>;
type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { scope: "mining" },
  });
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = handleSubmit(async (data) => {
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
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

  const inputCls =
    "w-full border-b border-deep-navy/20 bg-transparent px-0 py-3.5 font-display text-deep-navy outline-none transition-colors placeholder:text-subtle focus:border-amber";
  const labelCls =
    "font-display font-bold uppercase text-amber";
  const errCls = "mt-1 font-sans font-medium text-amber";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8" noValidate>
      <div className="grid gap-8 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className={labelCls} style={{ fontSize: "11px", letterSpacing: "0.18em" }}>
            Name *
          </span>
          <input {...register("name")} className={inputCls} style={{ fontSize: "15px" }} placeholder="Your full name" />
          {errors.name && <span className={errCls} style={{ fontSize: "12px" }}>{errors.name.message}</span>}
        </label>

        <label className="flex flex-col gap-2">
          <span className={labelCls} style={{ fontSize: "11px", letterSpacing: "0.18em" }}>
            Company *
          </span>
          <input {...register("company")} className={inputCls} style={{ fontSize: "15px" }} placeholder="Organisation" />
          {errors.company && <span className={errCls} style={{ fontSize: "12px" }}>{errors.company.message}</span>}
        </label>

        <label className="flex flex-col gap-2">
          <span className={labelCls} style={{ fontSize: "11px", letterSpacing: "0.18em" }}>
            Role
          </span>
          <input {...register("role")} className={inputCls} style={{ fontSize: "15px" }} placeholder="Your position" />
          {errors.role && <span className={errCls} style={{ fontSize: "12px" }}>{errors.role.message}</span>}
        </label>

        <label className="flex flex-col gap-2">
          <span className={labelCls} style={{ fontSize: "11px", letterSpacing: "0.18em" }}>
            Country *
          </span>
          <input {...register("country")} className={inputCls} style={{ fontSize: "15px" }} placeholder="Project location" />
          {errors.country && <span className={errCls} style={{ fontSize: "12px" }}>{errors.country.message}</span>}
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className={labelCls} style={{ fontSize: "11px", letterSpacing: "0.18em" }}>
          Scope of Work
        </span>
        <select
          {...register("scope")}
          className={cn(inputCls, "cursor-pointer appearance-none")}
          style={{ fontSize: "15px" }}
        >
          <option value="mining">Mining</option>
          <option value="exploration">Exploration</option>
          <option value="civil">Civil</option>
          <option value="environmental">Environmental</option>
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
          style={{ fontSize: "15px", lineHeight: "1.55" }}
          placeholder="Scope, location, timeline, key constraints…"
        />
        {errors.message && <span className={errCls} style={{ fontSize: "12px" }}>{errors.message.message}</span>}
      </label>

      <div className="flex flex-wrap items-center gap-6">
        <button
          type="submit"
          disabled={status === "submitting"}
          className={cn(
            "inline-flex items-center gap-2 bg-amber px-7 py-3.5 font-display font-bold uppercase text-white",
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
            className="font-display font-bold uppercase text-amber"
            style={{ fontSize: "11px", letterSpacing: "0.18em" }}
          >
            Something went wrong. Please try again.
          </span>
        )}
      </div>
    </form>
  );
}
