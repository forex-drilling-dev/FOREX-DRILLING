"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

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
      <div className="border border-amber bg-surface p-10">
        <p className="font-mono text-mono-xs uppercase tracking-widest text-amber">Message received</p>
        <h3 className="mt-4 font-display text-display-md uppercase text-fore">Thank you.</h3>
        <p className="mt-4 text-body-lg text-muted">We&rsquo;ll get back to you within one business day.</p>
      </div>
    );
  }

  const inputCls = "w-full border-b border-border bg-transparent px-0 py-4 font-sans text-body text-fore outline-none transition-colors placeholder:text-muted/60 focus:border-amber";
  const labelCls = "font-mono text-mono-xs uppercase tracking-widest text-muted";
  const errCls   = "mt-1 font-mono text-mono-xs text-amber";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8" noValidate>
      <div className="grid gap-8 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className={labelCls}>Name *</span>
          <input {...register("name")} className={inputCls} placeholder="Your full name" />
          {errors.name && <span className={errCls}>{errors.name.message}</span>}
        </label>
        <label className="flex flex-col gap-2">
          <span className={labelCls}>Company *</span>
          <input {...register("company")} className={inputCls} placeholder="Organisation" />
          {errors.company && <span className={errCls}>{errors.company.message}</span>}
        </label>
        <label className="flex flex-col gap-2">
          <span className={labelCls}>Role</span>
          <input {...register("role")} className={inputCls} placeholder="Your position" />
          {errors.role && <span className={errCls}>{errors.role.message}</span>}
        </label>
        <label className="flex flex-col gap-2">
          <span className={labelCls}>Country *</span>
          <input {...register("country")} className={inputCls} placeholder="Project location" />
          {errors.country && <span className={errCls}>{errors.country.message}</span>}
        </label>
      </div>
      <label className="flex flex-col gap-2">
        <span className={labelCls}>Scope of Work</span>
        <select {...register("scope")} className={cn(inputCls, "appearance-none cursor-pointer")}>
          <option value="mining">Mining</option>
          <option value="exploration">Exploration</option>
          <option value="civil">Civil</option>
          <option value="environmental">Environmental</option>
          <option value="other">Other</option>
        </select>
      </label>
      <label className="flex flex-col gap-2">
        <span className={labelCls}>Project Description *</span>
        <textarea {...register("message")} rows={5} className={cn(inputCls, "resize-none")}
          placeholder="Scope, location, timeline, key constraints…" />
        {errors.message && <span className={errCls}>{errors.message.message}</span>}
      </label>
      <div className="flex items-center gap-6">
        <Button type="submit" variant="amber">
          {status === "submitting" ? "Sending…" : "Send Enquiry"}
        </Button>
        {status === "error" && (
          <span className="font-mono text-mono-xs uppercase text-amber">
            Something went wrong. Please try again.
          </span>
        )}
      </div>
    </form>
  );
}
