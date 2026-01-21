# ✅ Supabase Connection Setup Complete!

Your Supabase connection string has been configured in `.env.local`:

```env
NEXT_PUBLIC_DB_PROVIDER=supabase
NEXT_PUBLIC_SUPABASE_URL=https://wvfuyekzmdamgnfdeuvr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
DATABASE_URL=postgresql://postgres:Chia@2025_1@db.wvfuyekzmdamgnfdeuvr.supabase.co:5432/postgres
```

## 🔧 Next Steps: Set Up Database Tables

### 1. Go to Supabase SQL Editor

1. Visit: https://app.supabase.com/
2. Sign in and select your project: **wvfuyekzmdamgnfdeuvr**
3. Click **SQL Editor** in the left sidebar
4. Click **New Query**

### 2. Run This SQL to Create Tables

Copy and paste this SQL into the SQL Editor, then click **Run**:

```sql
-- Create data_store table
CREATE TABLE IF NOT EXISTS data_store (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key VARCHAR(255) NOT NULL UNIQUE,
  value JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Create index on key for faster lookups
CREATE INDEX IF NOT EXISTS idx_data_store_key ON data_store(key);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger
DROP TRIGGER IF EXISTS update_data_store_updated_at ON data_store;
CREATE TRIGGER update_data_store_updated_at BEFORE UPDATE ON data_store
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE data_store ENABLE ROW LEVEL SECURITY;

-- Create RLS Policy (allow all access for development)
DROP POLICY IF EXISTS "Enable all access for now" ON data_store;
CREATE POLICY "Enable all access for now" ON data_store
FOR ALL USING (true) WITH CHECK (true);
```

### 3. Create Additional Tables for Forms, Registrations, and Contacts

**IMPORTANT:** Run all the SQL from the file below in Supabase SQL Editor for complete form and registration support:

Copy the entire SQL from `scripts/create_database_tables.sql`

This creates the following production-ready tables:
- ✅ `contacts` - Contact form submissions
- ✅ `registrations` - User registration data  
- ✅ `form_submissions` - Generic form submissions
- ✅ `donations` - Donation tracking
- ✅ `volunteer_signups` - Volunteer registrations
- ✅ `newsletter_subscriptions` - Newsletter signups
- ✅ `feedback` - Feedback/reviews
- ✅ `form_responses` - Detailed form field responses

**Steps to create all tables:**
1. Go to Supabase SQL Editor
2. Click "New Query"
3. Open file: `scripts/create_database_tables.sql`
4. Copy all content
5. Paste into SQL Editor
6. Click **Run**

**Or create them manually - these are used by the admin portal:

```sql
-- Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  excerpt VARCHAR(500),
  slug VARCHAR(255) UNIQUE,
  author_id UUID,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Opportunities Table
CREATE TABLE IF NOT EXISTS opportunities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  type VARCHAR(50), -- volunteer, donation, partnership
  status VARCHAR(50) DEFAULT 'active', -- active, closed, archived
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_opportunities_status ON opportunities(status);
```

### 4. Verify Tables Were Created

1. In Supabase console, go to **Table Editor**
2. You should see:
   - ✅ `data_store`
   - ✅ `blog_posts` (optional)
   - ✅ `testimonials` (optional)
   - ✅ `opportunities` (optional)

## 🚀 Start Your Application

After creating the tables:

```bash
# From your chiaview directory
npm run dev
```

Visit: http://localhost:3000

## ✨ Test Your Connection

### In Admin Settings Page

1. Go to: http://localhost:3000/Admin/Settings
2. Scroll to **Backup & Recovery** section
3. Click **Create Backup**
4. You should see a success message

### Test API Directly

Create a test record:

```bash
curl -X POST http://localhost:3000/api/supabase/data/test \
  -H "Content-Type: application/json" \
  -d '{"data": {"message": "Hello Supabase!"}}'
```

Retrieve it:

```bash
curl http://localhost:3000/api/supabase/data/test
```

Delete it:

```bash
curl -X DELETE http://localhost:3000/api/supabase/data/test
```

## 📊 Your Supabase Credentials

**Project ID:** wvfuyekzmdamgnfdeuvr
**URL:** https://wvfuyekzmdamgnfdeuvr.supabase.co
**Database Host:** db.wvfuyekzmdamgnfdeuvr.supabase.co:5432
**Database User:** postgres
**Region:** (Check your Supabase project settings)

## 🔐 Security Notes

- ✅ Your `.env.local` is in `.gitignore` (credentials won't be committed)
- ✅ RLS policies allow all access in development
- ⚠️ **For production:** Update RLS policies to restrict access
- ⚠️ **Never commit `.env.local`** to version control

## 🐛 Troubleshooting

### "Table data_store does not exist"
→ Run the SQL from Step 2 above in Supabase SQL Editor

### "Permission denied"
→ Make sure RLS policies are created (see Step 2)

### "Connection refused"
→ Check that `NEXT_PUBLIC_SUPABASE_URL` is correct in `.env.local`
→ Verify anon key is complete (no truncation)

### Can't access Supabase console?
→ Go to https://app.supabase.com/
→ Sign in with your account
→ Select project: **wvfuyekzmdamgnfdeuvr**

## 📚 Documentation

See these files for more info:
- `DATABASE_INTEGRATION_SETUP.md` - Full setup guide
- `TESTING_GUIDE.md` - Testing procedures
- `QUICK_REFERENCE.md` - Quick lookup

## ✅ Checklist

- [ ] Copied SQL from Step 2
- [ ] Ran SQL in Supabase SQL Editor
- [ ] Verified tables exist in Supabase
- [ ] Run `npm run dev`
- [ ] Test Admin Settings page
- [ ] Test API endpoints

---

**Your application is ready to use Supabase! 🎉**
