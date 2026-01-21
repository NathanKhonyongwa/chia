/**
 * Supabase Configuration
 * Initialize Supabase client and export instances
 */

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase environment variables not configured");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Database Helper Functions
 */

export async function saveToSupabase(table, data, id = null) {
  try {
    if (id) {
      // Update existing record
      const { data: result, error } = await supabase
        .from(table)
        .update(data)
        .eq("id", id)
        .select();

      if (error) throw error;
      return result;
    } else {
      // Insert new record
      const { data: result, error } = await supabase
        .from(table)
        .insert([data])
        .select();

      if (error) throw error;
      return result;
    }
  } catch (error) {
    console.error("Error saving to Supabase:", error);
    return null;
  }
}

export async function loadFromSupabase(table, filters = null) {
  try {
    let query = supabase.from(table).select("*");

    if (filters) {
      for (const [key, value] of Object.entries(filters)) {
        query = query.eq(key, value);
      }
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error loading from Supabase:", error);
    return null;
  }
}

export async function deleteFromSupabase(table, id) {
  try {
    const { error } = await supabase.from(table).delete().eq("id", id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error deleting from Supabase:", error);
    return false;
  }
}

/**
 * Batch Operations
 */

export async function batchInsertToSupabase(table, records) {
  try {
    const { data, error } = await supabase
      .from(table)
      .insert(records)
      .select();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error batch inserting to Supabase:", error);
    return null;
  }
}

export async function batchDeleteFromSupabase(table, ids) {
  try {
    const { error } = await supabase.from(table).delete().in("id", ids);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error batch deleting from Supabase:", error);
    return false;
  }
}

export default supabase;
