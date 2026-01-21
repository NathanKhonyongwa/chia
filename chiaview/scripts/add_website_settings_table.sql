-- WEBSITE SETTINGS TABLE (key-value pairs, one row per setting)
CREATE TABLE IF NOT EXISTS website_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key VARCHAR(100) NOT NULL UNIQUE,
  value TEXT NOT NULL,
  description TEXT,
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_website_settings_key ON website_settings(key);

-- Trigger to update updated_at
DROP TRIGGER IF EXISTS update_website_settings_updated_at ON website_settings;
CREATE TRIGGER update_website_settings_updated_at BEFORE UPDATE ON website_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE website_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable all access for development" ON website_settings FOR ALL USING (true) WITH CHECK (true);
