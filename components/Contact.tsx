"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Send, CheckCircle2, FileText } from "lucide-react";

// Configure your Formspree endpoint here (e.g. "https://formspree.io/f/your_form_id")
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = "9a9341ed-af0a-4ffa-ac4f-f3c7ff6759c3";
export default function Contact() {
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    let errorMsg = "";
    if (name === "name") {
      if (!value.trim()) {
        errorMsg = "Name is required";
      } else if (value.trim().length < 2) {
        errorMsg = "Name must be at least 2 characters";
      }
    } else if (name === "email") {
      if (!value.trim()) {
        errorMsg = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errorMsg = "Please enter a valid email address";
      }
    } else if (name === "message") {
      if (!value.trim()) {
        errorMsg = "Message is required";
      } else if (value.trim().length < 10) {
        errorMsg = "Message must be at least 10 characters";
      }
    }

    if (errorMsg) {
      setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    } else {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = event.target;
    setErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    const formData = new FormData(form);
    const name = (formData.get("name") as string) || "";
    const email = (formData.get("email") as string) || "";
    const message = (formData.get("message") as string) || "";

    const newErrors: Record<string, string> = {};
    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!message.trim()) {
      newErrors.message = "Message is required";
    } else if (message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched({ name: true, email: true, message: true });
      return;
    }

    setFormState("loading");

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ 
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: "New Portfolio Project Inquiry",
          name,
          email,
          message,

        }),
      });

      if (response.ok) {
        setFormState("success");
        form.reset();
        setTouched({});
        setErrors({});
      } else {
        const errText = await response.text();
        console.error("Web3Forms server error:", response.status, errText);
        setFormState("error");
      }
    } catch (err) {
      console.error("Web3Forms network/CORS error:", err);
      setFormState("error");
    }
  };

  return (
    <section id="contact" className="relative rounded-[20px] bg-[#1a1a2e] shadow-neu-raised p-6 md:p-8 lg:p-10 scroll-mt-20 border border-white/5 space-y-10">
      {/* Decorative Glow Spot */}
      <div className="glow-spot-cyan absolute left-0 bottom-1/4 h-80 w-80 rounded-full" />

      <div className="space-y-2 text-center md:text-left">
        <h2 className="text-fluid-h2 font-bold tracking-tight text-white uppercase">
          Let&apos;s Build{" "}
          <span className="bg-gradient-to-r from-primary-accent to-secondary-accent bg-clip-text text-transparent font-black">
            Something Together
          </span>
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-primary-accent to-secondary-accent rounded-full mx-auto md:mx-0" />
        <p className="max-w-xl text-fluid-body text-muted-text pt-2 leading-relaxed mx-auto md:mx-0">
          Tell me about your project, idea, or anything you'd like to discuss.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] items-start">
        {/* Form panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.2 }}
          className="bg-[#1a1a2e] shadow-neu-raised rounded-3xl p-6 border border-white/5 relative overflow-hidden"
        >
          {formState === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center text-center py-10 space-y-4"
            >
              <div className="p-4 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <p className="text-sm text-emerald-400/90 max-w-sm">
                Message sent! I&apos;ll reply within 24 hours.
              </p>
              <button
                onClick={() => setFormState("idle")}
                className="mt-2 text-xs font-semibold text-muted-text hover:text-white underline transition-colors cursor-pointer"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5 text-left">
                  <label htmlFor="name" className="text-xs font-semibold text-text/80 tracking-wide font-mono-custom">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Sudipta De "
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className={`w-full rounded-2xl bg-[#1a1a2e] shadow-neu-inset px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all duration-300 border-2 border-transparent focus:border-b-[#00b4d8] ${
                      touched.name && errors.name
                        ? "border-red-500/50 focus:border-red-500"
                        : ""
                    }`}
                  />
                  {touched.name && errors.name && (
                    <p className="text-red-400 text-[11px] mt-1 text-left font-mono">{errors.name}</p>
                  )}
                </div>
                <div className="space-y-1.5 text-left">
                  <label htmlFor="email" className="text-xs font-semibold text-text/80 tracking-wide font-mono-custom">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="sudiptade506@gmail.com"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className={`w-full rounded-2xl bg-[#1a1a2e] shadow-neu-inset px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all duration-300 border-2 border-transparent focus:border-b-[#00b4d8] ${
                      touched.email && errors.email
                        ? "border-red-500/50 focus:border-red-500"
                        : ""
                    }`}
                  />
                  {touched.email && errors.email && (
                    <p className="text-red-400 text-[11px] mt-1 text-left font-mono">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <label htmlFor="message" className="text-xs font-semibold text-text/80 tracking-wide font-mono-custom">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Describe your project, idea, or anything you'd like to discuss..."
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className={`w-full rounded-2xl bg-[#1a1a2e] shadow-neu-inset px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all duration-300 resize-none border-2 border-transparent focus:border-b-[#00b4d8] ${
                    touched.message && errors.message
                      ? "border-red-500/50 focus:border-red-500"
                      : ""
                  }`}
                />
                {touched.message && errors.message && (
                  <p className="text-red-400 text-[11px] mt-1 text-left font-mono">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={formState === "loading"}
                className="w-full flex items-center justify-center gap-2 rounded-full btn-primary-custom py-3 text-sm font-bold transition-all disabled:opacity-75 cursor-pointer font-mono-custom min-h-[44px]"
              >
                {formState === "loading" ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send message</span>
                    <Send className="h-4 w-4" />
                  </>
                )}
              </button>

              {formState === "error" && (
                <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-xs md:text-sm text-red-400 text-left flex items-start gap-2.5">
                  <span className="font-semibold">Error:</span>
                  <span>Something went wrong. Email me directly at <a href="mailto:sudiptade506@gmail.com" className="underline font-bold">sudiptade506@gmail.com</a></span>
                </div>
              )}
            </form>
          )}
        </motion.div>

        {/* Info panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-6"
        >
          {/* Quick info card */}
          <div className="bg-[#1a1a2e] shadow-neu-raised rounded-3xl p-6 border border-white/5 space-y-4">
            <h3 className="text-sm font-bold text-white tracking-wide uppercase font-mono-custom">Direct Connections</h3>
            <p className="text-xs text-muted-text leading-relaxed">
              Prefer standard communication? Feel free to reach out via these nodes. Checked regularly.
            </p>
            <div className="space-y-3 pt-2">
              <a
                href="mailto:sudiptade506@gmail.com"
                className="flex items-center gap-3 p-3 rounded-2xl bg-[#1a1a2e] shadow-neu-sm border border-white/5 hover:shadow-neu-inset hover:border-[#023e8a]/40 transition-all duration-300 group"
              >
                <div className="p-2 rounded-xl bg-[#023e8a]/10 text-[#00b4d8] group-hover:bg-[#023e8a] group-hover:text-white transition-all">
                  <Mail className="h-4.5 w-4.5" />
                </div>
                <div>
                  <span className="block text-[9px] uppercase font-bold text-muted-text font-mono-custom">Email Address</span>
                  <span className="text-xs font-semibold text-text group-hover:text-[#00b4d8] transition-colors">sudiptade506@gmail.com</span>
                </div>
              </a>
              <a
                href="https://www.linkedin.com/in/sudipta-de"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3 rounded-2xl bg-[#1a1a2e] shadow-neu-sm border border-white/5 hover:shadow-neu-inset hover:border-[#023e8a]/40 transition-all duration-300 group"
              >
                <div className="p-2 rounded-xl bg-[#023e8a]/10 text-[#00b4d8] group-hover:bg-[#023e8a] group-hover:text-white transition-all">
                  <Linkedin className="h-4.5 w-4.5" />
                </div>
                <div>
                  <span className="block text-[9px] uppercase font-bold text-muted-text font-mono-custom">LinkedIn Profile</span>
                  <span className="text-xs font-semibold text-text group-hover:text-[#00b4d8] transition-colors">Sudipta De </span>
                </div>
              </a>
              <a
                href="https://github.com/Sudipta-De"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3 rounded-2xl bg-[#1a1a2e] shadow-neu-sm border border-white/5 hover:shadow-neu-inset hover:border-[#023e8a]/40 transition-all duration-300 group"
              >
                <div className="p-2 rounded-xl bg-[#023e8a]/10 text-[#00b4d8] group-hover:bg-[#023e8a] group-hover:text-white transition-all">
                  <Github className="h-4.5 w-4.5" />
                </div>
                <div>
                  <span className="block text-[9px] uppercase font-bold text-muted-text font-mono-custom">GitHub Repositories</span>
                  <span className="text-xs font-semibold text-text group-hover:text-[#00b4d8] transition-colors">Sudipta-De</span>
                </div>
              </a>
              <a
                href="/Sudipta De Resume.pdf"
                download
                className="flex items-center gap-3 p-3 rounded-2xl bg-[#1a1a2e] shadow-neu-sm border border-white/5 hover:shadow-neu-inset hover:border-[#023e8a]/40 transition-all duration-300 group"
              >
                <div className="p-2 rounded-xl bg-[#023e8a]/10 text-[#00b4d8] group-hover:bg-[#023e8a] group-hover:text-white transition-all">
                  <FileText className="h-4.5 w-4.5" />
                </div>
                <div>
                  <span className="block text-[9px] uppercase font-bold text-muted-text font-mono-custom">Download Resume</span>
                  <span className="text-xs font-semibold text-text group-hover:text-[#00b4d8] transition-colors">Sudipta De Resume.pdf</span>
                </div>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
