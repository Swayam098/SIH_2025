// translate.js
import supabase from "./db.js";
import fetch from "node-fetch";

export async function translateText(text, targetLang, source = "en") {
  if (!targetLang || targetLang === source) return text;

  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      text
    )}&langpair=${source}|${targetLang}`;

    const resp = await fetch(url);
    const json = await resp.json();

    return json?.responseData?.translatedText || text;
  } catch (err) {
    console.error("translateText error:", err);
    return text; // fallback
  }
}

export async function ensureStopTranslation(stopId, originalText, targetLang) {
  if (!targetLang || targetLang === "en") return originalText;

  // 1. Get existing translations
  const { data: stop, error: fetchErr } = await supabase
    .from("stops")
    .select("translations")
    .eq("id", stopId)
    .single();

  if (fetchErr) {
    console.error("ensureStopTranslation fetch error:", fetchErr);
    return originalText;
  }

  const translations = (stop && stop.translations) || {};

  // 2. Already cached?
  if (translations[targetLang]) return translations[targetLang];

  // 3. Translate via API
  const translated = await translateText(originalText, targetLang);
  translations[targetLang] = translated;

  // 4. Save back into DB
  const { error: upErr } = await supabase
    .from("stops")
    .update({ translations })
    .eq("id", stopId);

  if (upErr) console.error("ensureStopTranslation update error:", upErr);

  return translated;
}
