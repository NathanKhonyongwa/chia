/**
 * Supabase Configuration
 * Safe initialization + guarded helpers
 */

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured =
  Boolean(supabaseUrl) && Boolean(supabaseAnonKey);

let supabase = null;

if (isSupabaseConfigured) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  if (process.env.NODE_ENV === "development") {
    console.warn("⚠️ Supabase is NOT configured");
  }
}

export { supabase };

/* ------------------------------------------------------------------ */
/* Guards                                                             */
/* ------------------------------------------------------------------ */

function ensureSupabase() {
  if (!supabase) {
    throw new Error(
      "Supabase is not initialized. Check NEXT_PUBLIC_SUPABASE_* env vars."
    );
  }
}

/* ------------------------------------------------------------------ */
/* Database Helpers                                                   */
/* ------------------------------------------------------------------ */

export async function saveToSupabase(table, data, id = null) {
  try {
    ensureSupabase();

    const query = id
      ? supabase.from(table).update(data).eq("id", id)
      : supabase.from(table).insert(data);

    const { data: result, error } = await query.select();

    if (error) throw error;
    return result;
  } catch (error) {
    console.error("❌ saveToSupabase:", error.message);
    return null;
  }
}

export async function loadFromSupabase(table, filters = {}) {
  try {
    ensureSupabase();

    let query = supabase.from(table).select("*");

    for (const [key, value] of Object.entries(filters)) {
      query = query.eq(key, value);
    }

    const { data, error } = await query;
    if (error) throw error;

    return data;
  } catch (error) {
    console.error("❌ loadFromSupabase:", error.message);
    return null;
  }
}

export async function deleteFromSupabase(table, id) {
  try {
    ensureSupabase();

    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) throw error;

    return true;
  } catch (error) {
    console.error("❌ deleteFromSupabase:", error.message);
    return false;
  }
}

/* ------------------------------------------------------------------ */
/* Batch Operations                                                   */
/* ------------------------------------------------------------------ */

export async function batchInsertToSupabase(table, records) {
  try {
    ensureSupabase();

    const { data, error } = await supabase
      .from(table)
      .insert(records)
      .select();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("❌ batchInsert:", error.message);
    return null;
  }
}

export async function batchDeleteFromSupabase(table, ids) {
  try {
    ensureSupabase();

    const { error } = await supabase.from(table).delete().in("id", ids);
    if (error) throw error;

    return true;
  } catch (error) {
    console.error("❌ batchDelete:", error.message);
    return false;
  }
}

export default supabase;