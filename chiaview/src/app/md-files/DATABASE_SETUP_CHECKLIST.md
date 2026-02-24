# Database Setup Checklist

Follow these steps to complete your database setup:

## ✅ Step 1: Create All Tables in Supabase

- [ ] Open https://app.supabase.com/
- [ ] Select your project: **wvfuyekzmdamgnfdeuvr**
- [ ] Click **SQL Editor** → **New Query**
- [ ] Open file: `scripts/create_database_tables.sql`
- [ ] Copy entire contents
- [ ] Paste into SQL Editor
- [ ] Click **Run**
- [ ] See green success checkmark

**Result:** You should have 8 tables:
- contacts
- registrations
- form_submissions
- donations
- volunteer_signups
- newsletter_subscriptions
- feedback
- form_responses

---

## ✅ Step 2: Verify Tables in Supabase

- [ ] Click **Table Editor** in left sidebar
- [ ] Verify all tables exist
- [ ] Click each table to see columns are correct

---

## ✅ Step 3: Test Contact Form

1. [ ] Start dev server: `npm run dev`
2. [ ] Navigate to contact form
3. [ ] Fill out form with test data:
   - Name: "Test User"
   - Email: "test@example.com"
   - Subject: "Test"
   - Message: "This is a test message"
4. [ ] Click Submit
5. [ ] See success message
6. [ ] Go to Supabase → Table Editor → contacts
7. [ ] Verify your submission appears

---

## ✅ Step 4: Test Registration Form

1. [ ] Navigate to `/Register`
2. [ ] Create test account:
   - Name: "Test Volunteer"
   - Email: "volunteer@example.com"
   - Password: "TestPass123!"
3. [ ] Confirm Password: "TestPass123!"
4. [ ] Check "Agree to Terms"
5. [ ] Click Submit
6. [ ] See success message
7. [ ] Go to Supabase → Table Editor → registrations
8. [ ] Verify your account appears

---

## ✅ Step 5: Check Data

In Supabase Table Editor:
- [ ] contacts table has your test message
- [ ] registrations table has your test account
- [ ] Timestamps are correct
- [ ] All fields populated correctly

---

## ✅ Step 6: Create Admin Dashboard (Optional)

Create pages to view submissions:

- [ ] `/Admin/Contacts` - View contact submissions
- [ ] `/Admin/Registrations` - View user registrations
- [ ] `/Admin/Forms` - View all form submissions
- [ ] `/Admin/Donations` - View donation tracking

---

## ✅ Step 7: Set Up Email Notifications (Optional)

Configure automated emails when:
- [ ] New contact form submitted
- [ ] New user registered
- [ ] New donation received
- [ ] Newsletter signup

---

## ✅ Step 8: Security Setup (For Production)

- [ ] Update RLS policies (remove "allow all")
- [ ] Add authentication to admin endpoints
- [ ] Use bcrypt for password hashing
- [ ] Add rate limiting
- [ ] Enable HTTPS

---

## 📊 Database Statistics

**Tables Created:** 8
**Total Columns:** 80+
**Indexes:** 30+
**Triggers:** 7 (auto-update timestamps)

---

## 🔗 Important Files

- `scripts/create_database_tables.sql` - SQL schema
- `DATABASE_TABLES_GUIDE.md` - API documentation
- `src/app/api/contact/send/route.js` - Contact API
- `src/app/api/registrations/route.js` - Registration API
- `src/app/api/forms/route.js` - Generic forms API

---

## 📱 API Endpoints Created

### Contact Form
```
POST   /api/contact/send          - Submit contact
GET    /api/contact               - Get all contacts
GET    /api/contact/[id]          - Get one contact
PATCH  /api/contact/[id]          - Update contact
DELETE /api/contact/[id]          - Delete contact
```

### Registrations
```
POST   /api/registrations         - Create account
GET    /api/registrations         - Get all users
GET    /api/registrations/[id]    - Get one user
PATCH  /api/registrations/[id]    - Update user
DELETE /api/registrations/[id]    - Delete user
```

### Form Submissions
```
POST   /api/forms/submit          - Submit form
GET    /api/forms                 - Get all submissions
GET    /api/forms/[id]            - Get one submission
PATCH  /api/forms/[id]            - Update submission
DELETE /api/forms/[id]            - Delete submission
```

---

## 🆘 Need Help?

### Tables not created?
- Check that SQL ran without errors
- Verify project is connected
- Try running smaller queries individually

### Forms not saving?
- Check browser console for errors
- Verify endpoint URLs are correct
- Make sure Supabase credentials in `.env.local` are valid

### Can't see data?
- Refresh Supabase console
- Check RLS policies allow read/write
- Verify row-level security is enabled

---

## ✅ Completion Sign-Off

When all steps complete, your database is ready for:
- ✅ Contact form submissions
- ✅ User registrations
- ✅ Form data collection
- ✅ Donations tracking
- ✅ Volunteer sign-ups
- ✅ Newsletter subscriptions
- ✅ Feedback collection

**You're ready to collect real user data!** 🎉

---

For detailed API documentation, see `DATABASE_TABLES_GUIDE.md`
