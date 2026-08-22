"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Status = "idle" | "sending" | "sent" | "error";

export default function OfertaForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      nume: (form.elements.namedItem("nume") as HTMLInputElement)?.value ?? "",
      telefon: (form.elements.namedItem("telefon") as HTMLInputElement)?.value ?? "",
      email: (form.elements.namedItem("email") as HTMLInputElement)?.value ?? "",
      localitate: (form.elements.namedItem("localitate") as HTMLInputElement)?.value ?? "",
      mesaj: (form.elements.namedItem("mesaj") as HTMLTextAreaElement)?.value ?? "",
    };

    try {
      const res = await fetch("/api/oferta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Eroare la trimitere");
      setStatus("sent");
      form.reset();
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "A apărut o eroare. Încearcă din nou sau sună-ne direct.");
    }
  }

  const inputClass =
    "rounded-md border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-400 outline-none transition-colors focus:border-orange focus:bg-white/[0.15]";

  return (
    <AnimatePresence mode="wait">
      {status === "sent" ? (
        <motion.div
          key="sent"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="rounded-lg bg-white/10 p-6 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 12 }}
            className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-orange"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </motion.div>
          <p className="text-lg font-bold text-white">Cererea a fost trimisă</p>
          <p className="mt-2 text-sm text-gray-300">
            Îți răspundem în maximum 24 de ore, pe telefon sau email.
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onSubmit={handleSubmit}
          className={compact ? "grid gap-3" : "grid gap-4"}
        >
          <div className={compact ? "grid gap-3" : "grid gap-4 sm:grid-cols-2"}>
            <input name="nume" required placeholder="Nume și prenume" className={inputClass} />
            <input name="telefon" required type="tel" placeholder="Telefon" className={inputClass} />
          </div>
          <div className={compact ? "grid gap-3" : "grid gap-4 sm:grid-cols-2"}>
            <input name="email" type="email" placeholder="Email (opțional)" className={inputClass} />
            <input name="localitate" placeholder="Localitate teren" className={inputClass} />
          </div>
          {!compact && (
            <textarea
              name="mesaj"
              rows={4}
              placeholder="Spune-ne pe scurt ce ai nevoie (suprafață, buget estimativ, termen)"
              className={inputClass}
            />
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="flex items-center justify-center gap-2 rounded-md bg-orange px-6 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-orange-dark disabled:translate-y-0 disabled:opacity-60"
          >
            {status === "sending" && (
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
            )}
            {status === "sending" ? "Se trimite..." : "Trimite cererea"}
          </button>

          {status === "error" && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-medium text-red-300"
            >
              {errorMsg}
            </motion.p>
          )}
        </motion.form>
      )}
    </AnimatePresence>
  );
}
