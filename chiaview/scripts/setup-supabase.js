/**
 * Supabase Database Setup Script
 * Run this to initialize your Supabase database with required tables
 */

const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://jgjbcpetsoialbnlvwyf.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpnaWJjcGV0c29pYWxibmx2ZXlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwODc2NDIsImV4cCI6MjA4NDY2MzY0Mn0.mfQeiBsoPDjgPMOwr_2ujX1GlAjtHV5OYV3G89JVjTE";

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupDatabase() {
  try {
    console.log("🔍 Checking if data_store table exists...");

    // Try to query the table
    const { data, error } = await supabase.from("data_store").select("*").limit(1);

    if (error && error.code === "PGRST116") {
      console.log("⚠️  Table does not exist. You need to create it manually in Supabase.");
      console.log("\n📋 Run this SQL in Supabase SQL Editor:");
      console.log(`
-- Create data_store table
CREATE TABLE data_store (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key VARCHAR(255) NOT NULL UNIQUE,
  value JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Create index on key for faster lookups
CREATE INDEX idx_data_store_key ON data_store(key);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_data_store_updated_at BEFORE UPDATE ON data_store
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE data_store ENABLE ROW LEVEL SECURITY;

-- Allow public access for development (update for production)
CREATE POLICY "Enable all access for now" ON data_store
FOR ALL USING (true) WITH CHECK (true);
      `);
      return;
    }

    if (error) {
      console.error("❌ Error checking table:", error.message);
      return;
    }

    console.log("✅ data_store table exists!");
    console.log("📊 Current record count:", data?.length || 0);

    // Test write operation
    console.log("\n🧪 Testing write operation...");
    const testRecord = {
      key: `test_${Date.now()}`,
      value: {
        test: "Connection successful!",
        timestamp: new Date().toISOString(),
      },
    };

    const { data: insertData, error: insertError } = await supabase
      .from("data_store")
      .insert([testRecord])
      .select();

    if (insertError) {
      console.error("❌ Write test failed:", insertError.message);
      return;
    }

    console.log("✅ Write operation successful!");
    console.log("📝 Test record created:", insertData[0].key);

    // Test read operation
    console.log("\n🧪 Testing read operation...");
    const { data: readData, error: readError } = await supabase
      .from("data_store")
      .select("*")
      .eq("key", testRecord.key)
      .single();

    if (readError) {
      console.error("❌ Read test failed:", readError.message);
      return;
    }

    console.log("✅ Read operation successful!");
    console.log("📖 Retrieved value:", readData.value);

    // Cleanup test record
    console.log("\n🧹 Cleaning up test record...");
    const { error: deleteError } = await supabase
      .from("data_store")
      .delete()
      .eq("key", testRecord.key);

    if (deleteError) {
      console.error("⚠️  Cleanup warning:", deleteError.message);
    } else {
      console.log("✅ Test record deleted");
    }

    console.log("\n🎉 Database connection verified successfully!");
    console.log("✨ Ready to use Supabase!");
  } catch (error) {
    console.error("❌ Setup failed:", error);
  }
}

setupDatabase();
