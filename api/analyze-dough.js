export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Nur POST ist erlaubt." });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({
      error: "Fotoanalyse ist noch nicht konfiguriert: Auf dem Hosting fehlt OPENAI_API_KEY."
    });
  }

  try {
    const body = req.body || {};
    const images = Array.isArray(body.images) ? body.images.slice(0, 3) : [];
    if (!images.length) return res.status(400).json({ error: "Bitte mindestens ein Foto senden." });

    for (const image of images) {
      if (typeof image !== "string" || !/^data:image\/(jpeg|png|webp);base64,/.test(image)) {
        return res.status(400).json({ error: "Ein Bild hat ein nicht unterstütztes Format. Bitte JPG, PNG oder WebP verwenden." });
      }
      if (image.length > 4_000_000) {
        return res.status(413).json({ error: "Ein Foto ist zu groß. Bitte kleinere Bilder verwenden." });
      }
    }

    const c = body.context && typeof body.context === "object" ? body.context : {};
    const context = {
      Mehl: c.flour,
      "Gärzeit laut Rezept (Stunden)": c.fermentationHours,
      Hydration: c.hydration == null ? undefined : c.hydration + "%",
      Gärstrategie: c.method,
      "Raumtemperatur °C": c.roomTemperature,
      "Kühlschranktemperatur °C": c.fridgeTemperature,
      "Teigtemperatur °C": c.doughTemperature,
      "Vergangene Gärzeit Stunden": c.elapsedHours,
      "Gärort": c.location,
      "Geplanter Backzeitpunkt": c.when
    };
    const prompt = `Du bist ein sachlicher Pizza-Teig-Coach. Beurteile die beigefügten Fotos von Pizzateig visuell. Kontext (fehlende Werte nicht erraten): ${JSON.stringify(context)}.

Antworte auf Deutsch in gut lesbaren kurzen Abschnitten:
1. Sichtbare Beobachtungen (Volumen, Blasen, Oberfläche, Ausbreitung; trenne Beobachtung von Vermutung).
2. Reife-Einschätzung: eher unterreif / wahrscheinlich im guten Bereich / mögliche Übergare / nicht eindeutig. Nenne deine Sicherheit als niedrig, mittel oder hoch.
3. Konkrete nächste Schritte für die nächsten 30–120 Minuten bzw. bis zum Backen.
4. Was auf den Fotos nicht sicher erkennbar ist und welche zusätzliche Beobachtung helfen würde.

Wenn mehrere Fotos beigefügt sind, vergleiche sie nur dann zeitlich, wenn aus dem Kontext oder der Bildreihenfolge ein Vergleich plausibel ist; erfinde keine Zeitabstände. Berücksichtige, dass Perspektive, Behälter und Licht die Einschätzung beeinflussen. Behaupte nicht, Teigtemperatur, Glutenentwicklung oder Hefetätigkeit direkt messen zu können. Keine medizinischen oder lebensmittelsicherheitsbezogenen Aussagen. Sei vorsichtig und praktisch; ein Foto allein erlaubt keine sichere Reifebestimmung.`;

    const content = [{ type: "input_text", text: prompt }];
    for (const image of images) content.push({ type: "input_image", image_url: image, detail: "high" });

    const upstream = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: [{ role: "user", content }],
        max_output_tokens: 700
      })
    });

    const data = await upstream.json().catch(() => ({}));
    if (!upstream.ok) {
      console.error("OpenAI Responses API error", upstream.status, data.error?.type || "");
      if (upstream.status === 401 || upstream.status === 403) {
        return res.status(502).json({ error: "Der KI-Dienst hat die Anfrage abgelehnt. Bitte API-Schlüssel und Berechtigungen prüfen." });
      }
      if (upstream.status === 429) {
        return res.status(503).json({ error: "Der KI-Dienst ist gerade ausgelastet oder das API-Kontingent ist erschöpft. Bitte später erneut versuchen." });
      }
      return res.status(502).json({ error: "Die Fotoanalyse konnte gerade nicht durchgeführt werden. Bitte später erneut versuchen." });
    }

    let analysis = typeof data.output_text === "string" ? data.output_text : "";
    if (!analysis && Array.isArray(data.output)) {
      analysis = data.output.flatMap(item => Array.isArray(item.content) ? item.content : [])
        .filter(part => part.type === "output_text" && typeof part.text === "string")
        .map(part => part.text).join("\n");
    }
    if (!analysis) return res.status(502).json({ error: "Der KI-Dienst hat keine auswertbare Antwort geliefert." });
    return res.status(200).json({ analysis });
  } catch (error) {
    console.error("Dough photo analysis failed", error?.message || "unknown");
    return res.status(500).json({ error: "Interner Fehler bei der Fotoanalyse." });
  }
}
