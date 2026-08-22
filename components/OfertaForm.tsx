"use client";

import { useState } from "react";

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

  if (status === "sent") {
    return (
      <div className="rounded-lg bg-white/10 p-6 text-center">
        <p className="text-lg font-bold text-white">Cererea a fost trimisă ✓</p>
        <p className="mt-2 text-sm text-gray-300">
          Îți răspundem în maximum 24 de ore, pe telefon sau email.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? "grid gap-3" : "grid gap-4"}>
      <div className={compact ? "grid gap-3" : "grid gap-4 sm:grid-cols-2"}>
        <input
          name="nume"
          required
          placeholder="Nume și prenume"
          className="rounded-md border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-400 outline-none focus:border-orange"
        />
        <input
          name="telefon"
          required
          type="tel"
          placeholder="Telefon"
          className="rounded-md border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-400 outline-none focus:border-orange"
        />
      </div>
      <div className={compact ? "grid gap-3" : "grid gap-4 sm:grid-cols-2"}>
        <input
          name="email"
          type="email"
          placeholder="Email (opțional)"
          className="rounded-md border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-400 outline-none focus:border-orange"
        />
        <input
          name="localitate"
          placeholder="Localitate teren"
          className="rounded-md border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-400 outline-none focus:border-orange"
        />
      </div>
      {!compact && (
        <textarea
          name="mesaj"
          rows={4}
          placeholder="Spune-ne pe scurt ce ai nevoie (suprafață, buget estimativ, termen)"
          className="rounded-md border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-400 outline-none focus:border-orange"
        />
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-md bg-orange px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-orange-dark disabled:opacity-60"
      >
        {status === "sending" ? "Se trimite..." : "Trimite cererea"}
      </button>

      {status === "error" && (
        <p className="text-sm font-medium text-red-300">{errorMsg}</p>
      )}
    </form>
  );
}
