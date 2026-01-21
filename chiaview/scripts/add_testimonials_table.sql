-- testimonials table for storing donor, volunteer, and community testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255),
  quote TEXT NOT NULL,
  category VARCHAR(50) DEFAULT 'Donor', -- Donor, Volunteer, Community
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_testimonials_category ON testimonials(category);
CREATE INDEX IF NOT EXISTS idx_testimonials_created_at ON testimonials(created_at DESC);

-- RLS (Row Level Security) for testimonials
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable all access for development" ON testimonials
  FOR ALL USING (true) WITH CHECK (true);
