import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const DESTINATION_EMAIL = process.env.OFERTA_DESTINATION_EMAIL || "office@savhaus.com";
const FROM_EMAIL = process.env.OFERTA_FROM_EMAIL || "Sav Haus <onboarding@resend.dev>";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nume, telefon, email, localitate, mesaj } = body as Record<string, string>;

    if (!nume || !telefon) {
      return NextResponse.json(
        { ok: false, error: "Numele și telefonul sunt obligatorii." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY nu este setat în variabilele de mediu.");
      return NextResponse.json(
        {
          ok: false,
          error:
            "Formularul nu este încă activat pe server (lipsește RESEND_API_KEY). Sună-ne direct la 0756 943 626.",
        },
        { status: 500 }
      );
    }

    const html = `
      <h2>Cerere de ofertă nouă — sav-haus.ro</h2>
      <p><strong>Nume:</strong> ${escapeHtml(nume)}</p>
      <p><strong>Telefon:</strong> ${escapeHtml(telefon)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email || "-")}</p>
      <p><strong>Localitate teren:</strong> ${escapeHtml(localitate || "-")}</p>
      <p><strong>Mesaj:</strong><br/>${escapeHtml(mesaj || "-").replace(/\n/g, "<br/>")}</p>
    `;

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [DESTINATION_EMAIL],
        reply_to: email || undefined,
        subject: `Cerere de ofertă — ${nume}`,
        html,
      }),
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text();
      console.error("Resend error:", errText);
      return NextResponse.json(
        { ok: false, error: "Nu am putut trimite emailul. Încearcă din nou în câteva minute." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, error: "A apărut o eroare neașteptată." },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
