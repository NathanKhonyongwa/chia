# Database Tables Setup Guide

Your Chia website now has a complete database schema with tables for storing forms, registrations, contacts, and more. This guide explains the tables and how to use them.

## 📋 Table Overview

### 1. **contacts** - Contact Form Submissions
Stores all contact form submissions from visitors.

**Columns:**
- `id` - Unique identifier (UUID)
- `name` - Visitor name
- `email` - Visitor email address
- `phone` - Optional phone number
- `subject` - Message subject
- `message` - Message content
- `status` - new, replied, resolved, archived
- `priority` - low, normal, high, urgent
- `ip_address` - Visitor IP (for security)
- `user_agent` - Browser info
- `created_at` - When submitted
- `updated_at` - Last update time
- `replied_at` - When admin replied

**API Endpoints:**
```bash
# Submit contact form
POST /api/contact/send
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Question about volunteering",
  "message": "I'd like to know more about volunteering opportunities.",
  "phone": "+265 123 456"
}

# Get all contacts (admin)
GET /api/contact?status=new&priority=high

# Get single contact
GET /api/contact/[id]

# Update contact status
PATCH /api/contact/[id]
{
  "status": "replied",
  "priority": "normal"
}

# Delete contact
DELETE /api/contact/[id]
```

---

### 2. **registrations** - User Registrations
Stores user account information when they sign up.

**Columns:**
- `id` - Unique identifier (UUID)
- `name` - User full name
- `email` - Email address (unique)
- `phone` - Phone number
- `password_hash` - Hashed password
- `registration_type` - volunteer, donor, member, student
- `status` - active, inactive, suspended, verified
- `email_verified` - Boolean
- `email_verified_at` - Timestamp of verification
- `date_of_birth` - User DOB
- `address` - Street address
- `city`, `state`, `country`, `postal_code` - Location info
- `bio` - User biography
- `profile_picture_url` - Avatar/profile pic URL
- `ip_address` - Registration IP
- `last_login` - Last login timestamp
- `created_at` - Account creation date
- `updated_at` - Last profile update

**API Endpoints:**
```bash
# Create new registration
POST /api/registrations
Content-Type: application/json

{
  "name": "Jane Banda",
  "email": "jane@example.com",
  "password": "SecurePass123!",
  "confirmPassword": "SecurePass123!",
  "registrationType": "volunteer",
  "phone": "+265 987 654 321"
}

# Get all registrations (admin)
GET /api/registrations?status=active&type=volunteer

# Get single registration
GET /api/registrations/[id]

# Update registration
PATCH /api/registrations/[id]
{
  "phone": "+265 111 222 333",
  "bio": "Passionate about helping others",
  "status": "active"
}

# Delete registration
DELETE /api/registrations/[id]
```

---

### 3. **form_submissions** - Generic Form Data
Stores submissions from any form on your website (not just contact).

**Columns:**
- `id` - Unique identifier
- `form_name` - Name of the form (e.g., "donation_form")
- `form_type` - Type: donation, volunteer, newsletter, feedback, inquiry
- `email` - Submitter email
- `name` - Submitter name
- `phone` - Phone number
- `data` - Full form data as JSON
- `status` - new, processed, archived
- `ip_address` - Submitter IP
- `user_agent` - Browser info
- `created_at`, `updated_at` - Timestamps

**API Endpoints:**
```bash
# Submit any form
POST /api/forms/submit
Content-Type: application/json

{
  "formName": "donation_form",
  "formType": "donation",
  "email": "donor@example.com",
  "name": "Generous Donor",
  "data": {
    "amount": "50000",
    "currency": "MWK",
    "paymentMethod": "credit_card",
    "message": "Supporting education initiatives"
  }
}

# Get all submissions (admin)
GET /api/forms?formType=donation&status=new&limit=50

# Get single submission with field details
GET /api/forms/[id]

# Update submission status
PATCH /api/forms/[id]
{
  "status": "processed"
}

# Delete submission
DELETE /api/forms/[id]
```

---

### 4. **donations** - Donation Tracking
Specifically for tracking financial donations.

**Columns:**
- `id` - Donation ID
- `donor_id` - References registrations.id
- `donor_name`, `donor_email` - Donor info
- `amount` - Donation amount
- `currency` - Currency code (USD, MWK, etc.)
- `donation_type` - one-time, recurring, monthly, annual
- `payment_method` - credit_card, bank_transfer, paypal, stripe
- `payment_status` - pending, completed, failed, refunded
- `transaction_id` - Payment processor transaction ID
- `message` - Optional donation message
- `anonymous` - Whether to hide donor name
- `created_at`, `updated_at` - Timestamps

---

### 5. **volunteer_signups** - Volunteer Registrations
Tracks volunteer applications and hours.

**Columns:**
- `id` - Signup ID
- `user_id` - References registrations.id
- `name`, `email`, `phone` - Volunteer contact
- `opportunity_id` - Which opportunity they signed for
- `skills` - Comma-separated or JSON list
- `availability` - Availability JSON
- `experience_level` - beginner, intermediate, advanced
- `motivation` - Why they want to volunteer
- `hours_available_per_week` - Weekly hours
- `status` - pending, approved, rejected, completed
- `approved_by`, `approved_at` - Admin approval info
- `feedback`, `rating` - Post-service feedback
- `created_at`, `updated_at` - Timestamps

---

### 6. **newsletter_subscriptions** - Newsletter Signups
Manages newsletter subscribers.

**Columns:**
- `id` - Subscription ID
- `email` - Subscriber email (unique)
- `name` - Subscriber name
- `status` - subscribed, unsubscribed, bounced
- `email_confirmed` - Verified email
- `email_confirmed_at` - Verification timestamp
- `confirmation_token` - For email verification
- `subscription_date` - When subscribed
- `unsubscription_date` - When unsubscribed

---

### 7. **feedback** - Feedback & Reviews
General feedback, bug reports, and feature requests.

**Columns:**
- `id` - Feedback ID
- `name`, `email` - Submitter
- `rating` - 1-5 stars
- `category` - bug, feature_request, general, compliment, complaint
- `subject` - Feedback title
- `message` - Full feedback
- `attachments` - File URLs as JSON
- `status` - new, reviewed, resolved, archived
- `response`, `responded_by`, `responded_at` - Admin response
- `created_at`, `updated_at` - Timestamps

---

### 8. **form_responses** - Detailed Field Responses
Stores individual form field responses for granular tracking.

**Columns:**
- `id` - Response ID
- `form_submission_id` - References form_submissions.id
- `field_name` - Name of the form field
- `field_value` - Value entered
- `field_type` - text, email, phone, textarea, select, checkbox, etc.
- `created_at` - Timestamp

---

## 🚀 Getting Started

### Step 1: Create Tables in Supabase

1. Go to https://app.supabase.com/
2. Select your project
3. Click **SQL Editor** → **New Query**
4. Copy all SQL from `scripts/create_database_tables.sql`
5. Paste and click **Run**

### Step 2: Test the Forms

The following forms now save to database:

**✅ Contact Form** (`/Donations`)
- Saves to `contacts` table
- Endpoint: `POST /api/contact/send`

**✅ Registration Form** (`/Register`)
- Saves to `registrations` table
- Endpoint: `POST /api/registrations`

### Step 3: Check Data in Supabase

1. Go to Supabase Console
2. Click **Table Editor**
3. Select each table to view submissions
4. Download as CSV if needed

---

## 📊 Admin Access to Data

### View All Contacts
```bash
curl https://yoursite.com/api/contact
```

### View All Registrations
```bash
curl https://yoursite.com/api/registrations?status=active
```

### View All Form Submissions
```bash
curl https://yoursite.com/api/forms?formType=donation
```

---

## 🔐 Security Notes

**Current Development Setup:**
- Row Level Security (RLS) policies allow all access
- Good for testing and development

**For Production:**
1. Update RLS policies in Supabase
2. Add authentication to admin endpoints
3. Use strong password hashing (bcrypt instead of SHA-256)
4. Validate and sanitize all inputs
5. Add rate limiting
6. Enable HTTPS everywhere

---

## 🛠️ Using the Helper Functions

The `src/lib/supabase.js` file includes useful functions:

```javascript
import {
  saveToSupabase,
  loadFromSupabase,
  deleteFromSupabase,
  batchInsertToSupabase,
  batchDeleteFromSupabase
} from "@/lib/supabase";

// Save data
const result = await saveToSupabase("contacts", {
  name: "John",
  email: "john@example.com",
  message: "Hello"
});

// Load data
const contacts = await loadFromSupabase("contacts", { status: "new" });

// Delete data
await deleteFromSupabase("contacts", contactId);
```

---

## 📝 Next Steps

1. ✅ Create all tables in Supabase
2. ✅ Test contact form - fill it out and check database
3. ✅ Test registration form - create account and verify database
4. ✅ Set up admin dashboard to view submissions
5. ⬜ Add email notifications when forms are submitted
6. ⬜ Create admin pages to manage submissions
7. ⬜ Set up automated reports/exports

---

## 🆘 Troubleshooting

**Tables not appearing?**
- Make sure SQL ran successfully (check for green checkmark)
- Refresh the browser
- Check Supabase project is selected

**API returns 500 error?**
- Check browser console for errors
- Verify `.env.local` has correct Supabase credentials
- Make sure tables exist in database

**Submissions not saving?**
- Check that form data is being sent to correct endpoint
- Verify RLS policies allow INSERT operations
- Check Supabase SQL logs for errors

---

For more help, see:
- `SUPABASE_SETUP_READY.md` - Initial setup
- `DATABASE_INTEGRATION_SETUP.md` - Full database guide
- [Supabase Documentation](https://supabase.com/docs)
