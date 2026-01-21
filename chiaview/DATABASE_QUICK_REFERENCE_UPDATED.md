# 🗄️ Database Quick Reference

Quick lookup for database tables, fields, and API usage.

## Tables at a Glance

| Table | Purpose | Key Fields | API Endpoint |
|-------|---------|-----------|--------------|
| **contacts** | Contact form submissions | name, email, message, status | `/api/contact` |
| **registrations** | User accounts | email, password_hash, status | `/api/registrations` |
| **form_submissions** | Generic form data | form_name, form_type, data | `/api/forms` |
| **donations** | Donation tracking | amount, payment_status | (TBD) |
| **volunteer_signups** | Volunteer applications | skills, status, hours | (TBD) |
| **newsletter_subscriptions** | Newsletter emails | email, status | (TBD) |
| **feedback** | Reviews & feedback | rating, category | (TBD) |
| **form_responses** | Individual fields | field_name, field_value | (TBD) |

---

## Contacts Table

**Purpose:** Store contact form submissions

**Fields:**
```
id (UUID) - Primary key
name (VARCHAR) - Visitor name
email (VARCHAR) - Email address
phone (VARCHAR) - Phone number (optional)
subject (VARCHAR) - Subject line
message (TEXT) - Message content
status (VARCHAR) - new, replied, resolved, archived
priority (VARCHAR) - low, normal, high, urgent
ip_address (VARCHAR) - Visitor IP
user_agent (TEXT) - Browser info
created_at (TIMESTAMP) - When submitted
updated_at (TIMESTAMP) - Last update
replied_at (TIMESTAMP) - When admin replied
```

**Sample INSERT:**
```sql
INSERT INTO contacts (name, email, subject, message)
VALUES ('John Doe', 'john@example.com', 'Question', 'Hello...');
```

**Sample Query:**
```sql
-- Get all new contacts
SELECT * FROM contacts WHERE status = 'new' ORDER BY created_at DESC;

-- Get urgent contacts
SELECT * FROM contacts WHERE priority = 'urgent';

-- Get contacts from last 7 days
SELECT * FROM contacts 
WHERE created_at >= NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;
```

---

## Registrations Table

**Purpose:** Store user account information

**Fields:**
```
id (UUID) - Primary key
name (VARCHAR) - Full name
email (VARCHAR) - Email (unique)
phone (VARCHAR) - Phone number
password_hash (VARCHAR) - Hashed password
registration_type (VARCHAR) - volunteer, donor, member, student
status (VARCHAR) - active, inactive, suspended, verified
email_verified (BOOLEAN) - Email verification status
email_verified_at (TIMESTAMP) - When verified
date_of_birth (DATE) - User DOB
address (TEXT) - Street address
city (VARCHAR) - City name
state (VARCHAR) - State/Province
country (VARCHAR) - Country
postal_code (VARCHAR) - ZIP/Postal code
bio (TEXT) - User biography
profile_picture_url (VARCHAR) - Avatar URL
ip_address (VARCHAR) - Registration IP
last_login (TIMESTAMP) - Last login time
created_at (TIMESTAMP) - Account creation
updated_at (TIMESTAMP) - Last update
```

**Sample INSERT:**
```sql
INSERT INTO registrations 
(name, email, password_hash, registration_type, status)
VALUES 
('Jane Smith', 'jane@example.com', 'hash123', 'volunteer', 'active');
```

**Sample Query:**
```sql
-- Get all active users
SELECT * FROM registrations WHERE status = 'active';

-- Get volunteers
SELECT * FROM registrations 
WHERE registration_type = 'volunteer'
ORDER BY created_at DESC;

-- Get users who haven't logged in recently
SELECT * FROM registrations 
WHERE last_login < NOW() - INTERVAL '30 days';
```

---

## Form Submissions Table

**Purpose:** Generic form data storage (flexible)

**Fields:**
```
id (UUID) - Primary key
form_name (VARCHAR) - e.g., 'donation_form', 'volunteer_form'
form_type (VARCHAR) - donation, volunteer, newsletter, feedback, inquiry
email (VARCHAR) - Submitter email
name (VARCHAR) - Submitter name
phone (VARCHAR) - Phone number
data (JSONB) - Full form data as JSON
status (VARCHAR) - new, processed, archived
ip_address (VARCHAR) - Submitter IP
user_agent (TEXT) - Browser info
created_at (TIMESTAMP) - When submitted
updated_at (TIMESTAMP) - Last update
```

**Sample INSERT:**
```sql
INSERT INTO form_submissions 
(form_name, form_type, email, data)
VALUES 
(
  'donation_form',
  'donation',
  'donor@example.com',
  '{"amount": 50000, "currency": "MWK", "message": "Supporting education"}'
);
```

**Sample Query:**
```sql
-- Get all donations from this month
SELECT * FROM form_submissions 
WHERE form_type = 'donation' 
AND created_at >= date_trunc('month', CURRENT_DATE)
ORDER BY created_at DESC;

-- Get all newsletter signups
SELECT * FROM form_submissions 
WHERE form_type = 'newsletter'
ORDER BY created_at DESC;

-- Get unprocessed forms
SELECT * FROM form_submissions 
WHERE status = 'new'
ORDER BY created_at ASC;
```

---

## API Usage Examples

### Contact API

**Submit contact:**
```bash
curl -X POST http://localhost:3000/api/contact/send \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Hello",
    "message": "I have a question...",
    "phone": "+265 123 456 789"
  }'
```

**Get all contacts:**
```bash
curl http://localhost:3000/api/contact
```

**Filter by status:**
```bash
curl "http://localhost:3000/api/contact?status=new"
```

**Update contact status:**
```bash
curl -X PATCH http://localhost:3000/api/contact/[id] \
  -H "Content-Type: application/json" \
  -d '{"status": "replied", "priority": "high"}'
```

---

### Registration API

**Create account:**
```bash
curl -X POST http://localhost:3000/api/registrations \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "password": "SecurePass123!",
    "confirmPassword": "SecurePass123!",
    "registrationType": "volunteer"
  }'
```

**Get all registrations:**
```bash
curl http://localhost:3000/api/registrations
```

**Filter by status:**
```bash
curl "http://localhost:3000/api/registrations?status=active&type=volunteer"
```

**Update user:**
```bash
curl -X PATCH http://localhost:3000/api/registrations/[id] \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+265 987 654 321",
    "bio": "Passionate about helping others"
  }'
```

---

### Form Submission API

**Submit form:**
```bash
curl -X POST http://localhost:3000/api/forms/submit \
  -H "Content-Type: application/json" \
  -d '{
    "formName": "donation_form",
    "formType": "donation",
    "email": "donor@example.com",
    "name": "Generous Donor",
    "data": {
      "amount": "50000",
      "currency": "MWK",
      "paymentMethod": "credit_card"
    }
  }'
```

**Get submissions:**
```bash
curl "http://localhost:3000/api/forms?formType=donation&limit=50"
```

**Update submission status:**
```bash
curl -X PATCH http://localhost:3000/api/forms/[id] \
  -H "Content-Type: application/json" \
  -d '{"status": "processed"}'
```

---

## Useful SQL Queries

### Get submission counts by type
```sql
SELECT form_type, COUNT(*) as count 
FROM form_submissions 
GROUP BY form_type;
```

### Get daily contact submissions
```sql
SELECT DATE(created_at) as date, COUNT(*) as count
FROM contacts
GROUP BY DATE(created_at)
ORDER BY date DESC;
```

### Get user registration trend
```sql
SELECT DATE(created_at) as date, COUNT(*) as new_users
FROM registrations
GROUP BY DATE(created_at)
ORDER BY date DESC
LIMIT 30;
```

### Find high-priority contacts
```sql
SELECT id, name, email, priority, status, created_at
FROM contacts
WHERE priority = 'urgent' AND status = 'new'
ORDER BY created_at ASC;
```

### Export data to CSV format
```sql
-- Copy from Supabase Table Editor, then paste to Excel/Sheets
SELECT * FROM contacts ORDER BY created_at DESC;
```

---

## Indexes (For Performance)

All important fields have indexes:
- `idx_contacts_email` - Fast email lookup
- `idx_contacts_status` - Filter by status
- `idx_registrations_email` - Fast email lookup
- `idx_form_submissions_form_type` - Filter by type
- And 26 more...

---

## Status Values

### Contacts
- `new` - Just received
- `replied` - Admin responded
- `resolved` - Issue resolved
- `archived` - Archived

### Contacts Priority
- `low` - Low priority
- `normal` - Normal priority
- `high` - High priority
- `urgent` - Urgent attention needed

### Registrations Status
- `active` - Active user
- `inactive` - Inactive
- `suspended` - Account suspended
- `verified` - Email verified

### Form Submissions Status
- `new` - New submission
- `processed` - Already processed
- `archived` - Archived

### Registration Types
- `volunteer` - Volunteer account
- `donor` - Donor account
- `member` - Regular member
- `student` - Student account

---

## Database Limits & Rules

✅ Email fields are **UNIQUE** in registrations table
✅ Passwords are **HASHED** (SHA-256, upgrade to bcrypt for production)
✅ All timestamps are in **UTC**
✅ JSON data can store unlimited nested data
✅ File sizes: up to 1GB per database instance

---

## Tips & Best Practices

1. **Always filter by status** when listing for admin views
2. **Use LIMIT clauses** to avoid loading too much data
3. **Order by created_at DESC** to show newest first
4. **Store JSON data** for flexible form fields
5. **Update timestamps** are automatic (don't set manually)
6. **Export regularly** to backup important data

---

For complete documentation, see **DATABASE_TABLES_GUIDE.md**
