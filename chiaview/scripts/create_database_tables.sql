-- ============================================================
-- CHIA Database Schema
-- Complete database tables for forms, registrations, and contacts
-- ============================================================

-- ============================================================
-- 1. CONTACTS TABLE (for contact form submissions)
-- ============================================================
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  subject VARCHAR(255),
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new', -- new, replied, resolved, archived
  priority VARCHAR(50) DEFAULT 'normal', -- low, normal, high, urgent
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  replied_at TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_priority ON contacts(priority);

-- ============================================================
-- 2. REGISTRATIONS TABLE (for user registrations)
-- ============================================================
CREATE TABLE IF NOT EXISTS registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20),
  password_hash VARCHAR(255) NOT NULL,
  registration_type VARCHAR(50), -- volunteer, donor, member, student
  status VARCHAR(50) DEFAULT 'active', -- active, inactive, suspended, verified
  email_verified BOOLEAN DEFAULT false,
  email_verified_at TIMESTAMP,
  date_of_birth DATE,
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  country VARCHAR(100),
  postal_code VARCHAR(20),
  bio TEXT,
  profile_picture_url VARCHAR(500),
  ip_address VARCHAR(45),
  user_agent TEXT,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(email);
CREATE INDEX IF NOT EXISTS idx_registrations_status ON registrations(status);
CREATE INDEX IF NOT EXISTS idx_registrations_registration_type ON registrations(registration_type);
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON registrations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_registrations_email_verified ON registrations(email_verified);

-- ============================================================
-- 3. FORM_SUBMISSIONS TABLE (for generic forms)
-- ============================================================
CREATE TABLE IF NOT EXISTS form_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  form_name VARCHAR(255) NOT NULL, -- e.g., 'donation_form', 'volunteer_form', 'newsletter_signup'
  form_type VARCHAR(100) NOT NULL, -- donation, volunteer, newsletter, feedback, inquiry
  email VARCHAR(255),
  name VARCHAR(255),
  phone VARCHAR(20),
  data JSONB NOT NULL, -- Stores all form fields as JSON
  status VARCHAR(50) DEFAULT 'new', -- new, processed, archived
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_form_submissions_form_name ON form_submissions(form_name);
CREATE INDEX IF NOT EXISTS idx_form_submissions_form_type ON form_submissions(form_type);
CREATE INDEX IF NOT EXISTS idx_form_submissions_email ON form_submissions(email);
CREATE INDEX IF NOT EXISTS idx_form_submissions_status ON form_submissions(status);
CREATE INDEX IF NOT EXISTS idx_form_submissions_created_at ON form_submissions(created_at DESC);

-- ============================================================
-- 4. DONATIONS TABLE (for tracking donations)
-- ============================================================
CREATE TABLE IF NOT EXISTS donations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  donor_id UUID REFERENCES registrations(id) ON DELETE SET NULL,
  donor_name VARCHAR(255),
  donor_email VARCHAR(255),
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  donation_type VARCHAR(50), -- one-time, recurring, monthly, annual
  payment_method VARCHAR(50), -- credit_card, bank_transfer, paypal, stripe
  payment_status VARCHAR(50) DEFAULT 'pending', -- pending, completed, failed, refunded
  transaction_id VARCHAR(255),
  message TEXT,
  anonymous BOOLEAN DEFAULT false,
  ip_address VARCHAR(45),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_donations_donor_id ON donations(donor_id);
CREATE INDEX IF NOT EXISTS idx_donations_email ON donations(donor_email);
CREATE INDEX IF NOT EXISTS idx_donations_payment_status ON donations(payment_status);
CREATE INDEX IF NOT EXISTS idx_donations_created_at ON donations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_donations_donation_type ON donations(donation_type);

-- ============================================================
-- 5. VOLUNTEER_SIGNUPS TABLE (for volunteer registrations)
-- ============================================================
CREATE TABLE IF NOT EXISTS volunteer_signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES registrations(id) ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  opportunity_id VARCHAR(255), -- links to opportunities table
  skills TEXT, -- comma separated or JSON array
  availability TEXT, -- JSON with availability slots
  experience_level VARCHAR(50), -- beginner, intermediate, advanced
  motivation TEXT,
  hours_available_per_week INTEGER,
  status VARCHAR(50) DEFAULT 'pending', -- pending, approved, rejected, completed
  approved_by UUID,
  approved_at TIMESTAMP,
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  feedback TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  ip_address VARCHAR(45),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_volunteer_signups_user_id ON volunteer_signups(user_id);
CREATE INDEX IF NOT EXISTS idx_volunteer_signups_email ON volunteer_signups(email);
CREATE INDEX IF NOT EXISTS idx_volunteer_signups_status ON volunteer_signups(status);
CREATE INDEX IF NOT EXISTS idx_volunteer_signups_created_at ON volunteer_signups(created_at DESC);

-- ============================================================
-- 6. NEWSLETTER_SUBSCRIPTIONS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255),
  status VARCHAR(50) DEFAULT 'subscribed', -- subscribed, unsubscribed, bounced
  subscription_date TIMESTAMP DEFAULT now(),
  unsubscription_date TIMESTAMP,
  confirmation_token VARCHAR(255),
  email_confirmed BOOLEAN DEFAULT false,
  email_confirmed_at TIMESTAMP,
  ip_address VARCHAR(45),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscriptions(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_status ON newsletter_subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_newsletter_created_at ON newsletter_subscriptions(created_at DESC);

-- ============================================================
-- 7. FEEDBACK TABLE (for general feedback/reviews)
-- ============================================================
CREATE TABLE IF NOT EXISTS feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  category VARCHAR(100), -- bug, feature_request, general, compliment, complaint
  subject VARCHAR(255),
  message TEXT NOT NULL,
  attachments JSONB, -- array of file URLs
  status VARCHAR(50) DEFAULT 'new', -- new, reviewed, resolved, archived
  response TEXT,
  responded_by UUID,
  responded_at TIMESTAMP,
  ip_address VARCHAR(45),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_feedback_email ON feedback(email);
CREATE INDEX IF NOT EXISTS idx_feedback_status ON feedback(status);
CREATE INDEX IF NOT EXISTS idx_feedback_category ON feedback(category);
CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON feedback(created_at DESC);

-- ============================================================
-- 8. FORM RESPONSES TABLE (detailed form field responses)
-- ============================================================
CREATE TABLE IF NOT EXISTS form_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  form_submission_id UUID REFERENCES form_submissions(id) ON DELETE CASCADE,
  field_name VARCHAR(255) NOT NULL,
  field_value TEXT,
  field_type VARCHAR(50), -- text, email, phone, textarea, select, checkbox, radio, file
  created_at TIMESTAMP DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_form_responses_submission_id ON form_responses(form_submission_id);
CREATE INDEX IF NOT EXISTS idx_form_responses_field_name ON form_responses(field_name);

-- ============================================================
-- TRIGGER FUNCTIONS
-- ============================================================

-- Update updated_at column function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for all tables
DROP TRIGGER IF EXISTS update_contacts_updated_at ON contacts;
CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON contacts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_registrations_updated_at ON registrations;
CREATE TRIGGER update_registrations_updated_at BEFORE UPDATE ON registrations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_form_submissions_updated_at ON form_submissions;
CREATE TRIGGER update_form_submissions_updated_at BEFORE UPDATE ON form_submissions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_donations_updated_at ON donations;
CREATE TRIGGER update_donations_updated_at BEFORE UPDATE ON donations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_volunteer_signups_updated_at ON volunteer_signups;
CREATE TRIGGER update_volunteer_signups_updated_at BEFORE UPDATE ON volunteer_signups
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_newsletter_subscriptions_updated_at ON newsletter_subscriptions;
CREATE TRIGGER update_newsletter_subscriptions_updated_at BEFORE UPDATE ON newsletter_subscriptions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_feedback_updated_at ON feedback;
CREATE TRIGGER update_feedback_updated_at BEFORE UPDATE ON feedback
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteer_signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE form_responses ENABLE ROW LEVEL SECURITY;

-- Allow all access for development (disable for production and use specific policies)
CREATE POLICY "Enable all access for development" ON contacts
FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Enable all access for development" ON registrations
FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Enable all access for development" ON form_submissions
FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Enable all access for development" ON donations
FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Enable all access for development" ON volunteer_signups
FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Enable all access for development" ON newsletter_subscriptions
FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Enable all access for development" ON feedback
FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Enable all access for development" ON form_responses
FOR ALL USING (true) WITH CHECK (true);

-- ============================================================
-- END OF SCHEMA
-- ============================================================
