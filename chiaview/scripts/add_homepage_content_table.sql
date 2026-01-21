-- HOMEPAGE CONTENT TABLE
CREATE TABLE IF NOT EXISTS homepage_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section VARCHAR(100) NOT NULL,
  content JSONB NOT NULL,
  order_index INTEGER DEFAULT 0,
  visible BOOLEAN DEFAULT true,
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_homepage_content_section ON homepage_content(section);
CREATE INDEX IF NOT EXISTS idx_homepage_content_order ON homepage_content(order_index);

DROP TRIGGER IF EXISTS update_homepage_content_updated_at ON homepage_content;
CREATE TRIGGER update_homepage_content_updated_at BEFORE UPDATE ON homepage_content
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE homepage_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable all access for development" ON homepage_content FOR ALL USING (true) WITH CHECK (true);
