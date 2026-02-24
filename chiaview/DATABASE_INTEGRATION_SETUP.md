# Database Integration Setup Guide

Complete setup instructions for Firebase and Supabase integration with the Chia application.

## Table of Contents

1. [Firebase Setup](#firebase-setup)
2. [Supabase Setup](#supabase-setup)
3. [Environment Configuration](#environment-configuration)
4. [Testing the Integration](#testing-the-integration)
5. [Migration Guide](#migration-guide)

---

## Firebase Setup

### Prerequisites

- Firebase project created at [firebase.google.com](https://firebase.google.com)
- Node.js and npm installed

### Step 1: Install Firebase Packages

```bash
npm install firebase
```

### Step 2: Create Firestore Database

1. Go to Firebase Console
2. Select your project
3. Navigate to "Firestore Database"
4. Click "Create Database"
5. Choose "Start in production mode"
6. Select a region (preferably closest to your users)

### Step 3: Get Firebase Credentials

1. In Firebase Console, go to Settings → Project Settings
2. Copy the following values:
   - `API Key` → `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `Auth Domain` → `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `Project ID` → `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `Storage Bucket` → `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `Messaging Sender ID` → `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `App ID` → `NEXT_PUBLIC_FIREBASE_APP_ID`

### Step 4: Enable Realtime Database (Alternative)

If using Realtime Database instead of Firestore:

1. Go to "Realtime Database" section
2. Click "Create Database"
3. Start in test mode (for development)
4. Copy the database URL → `NEXT_PUBLIC_FIREBASE_DB_URL`

### Step 5: Set Firebase Security Rules

**For Development (Firestore):**

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

**For Production (Firestore):**

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /admin/{uid} {
      allow read, write: if request.auth.uid == uid;
    }
    match /public/{document=**} {
      allow read: if true;
      allow write: if false;
    }
  }
}
```

### Step 6: Add to .env.local

```env
NEXT_PUBLIC_DB_PROVIDER=firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DB_URL=https://your_project.firebaseio.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

---

## Supabase Setup

### Prerequisites

- Supabase account at [supabase.com](https://supabase.com)
- Node.js and npm installed

### Step 1: Install Supabase Packages

```bash
npm install @supabase/supabase-js
```

### Step 2: Create Supabase Project

1. Go to Supabase Dashboard
2. Click "New Project"
3. Enter project name and password
4. Select region
5. Wait for project to initialize

### Step 3: Create Data Store Table

In Supabase SQL Editor, create the required table:

```sql
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
```

### Step 4: Get Supabase Credentials

1. In Supabase Dashboard, go to Settings → API
2. Copy the following values:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Step 5: Set Supabase Row Level Security (RLS)

1. Go to Authentication → Policies
2. For development, enable all access:

```sql
-- Allow public access for development
ALTER TABLE data_store ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all access for now" ON data_store
FOR ALL USING (true) WITH CHECK (true);
```

**Note:** For production, restrict access based on user authentication.

### Step 6: Add to .env.local

```env
NEXT_PUBLIC_DB_PROVIDER=supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

---

## Environment Configuration

### .env.local Template

Create `.env.local` in the project root:

```env
# Database Provider (localhost, firebase, supabase, mongodb)
NEXT_PUBLIC_DB_PROVIDER=localhost

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_DB_URL=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000

# Environment
NODE_ENV=development
```

### Switching Between Providers

To switch database providers, update `NEXT_PUBLIC_DB_PROVIDER` in `.env.local`:

```env
# For Firebase
NEXT_PUBLIC_DB_PROVIDER=firebase

# For Supabase
NEXT_PUBLIC_DB_PROVIDER=supabase

# For local development
NEXT_PUBLIC_DB_PROVIDER=localhost
```

---

## Testing the Integration

### Test Firebase Integration

```bash
# 1. Set NEXT_PUBLIC_DB_PROVIDER=firebase in .env.local
# 2. Start the development server
npm run dev

# 3. Test the API route
curl http://localhost:3000/api/firebase/data/test \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"data": {"test": "value"}}'

# 4. Retrieve the data
curl http://localhost:3000/api/firebase/data/test

# 5. Export backup
curl http://localhost:3000/api/firebase/export

# 6. Delete data
curl -X DELETE http://localhost:3000/api/firebase/data/test
```

### Test Supabase Integration

```bash
# 1. Set NEXT_PUBLIC_DB_PROVIDER=supabase in .env.local
# 2. Start the development server
npm run dev

# 3. Test the API route
curl http://localhost:3000/api/supabase/data/test \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"data": {"test": "value"}}'

# 4. Retrieve the data
curl http://localhost:3000/api/supabase/data/test

# 5. Export backup
curl http://localhost:3000/api/supabase/export

# 6. Delete data
curl -X DELETE http://localhost:3000/api/supabase/data/test
```

---

## Migration Guide

### Migrating from localStorage to Firebase

1. **Export existing data:**
   - Use DataBackupManager component in Admin Settings
   - Click "Create Backup" to save local data

2. **Set up Firebase:**
   - Follow Firebase Setup steps above
   - Add Firebase credentials to `.env.local`

3. **Switch provider:**
   - Update `NEXT_PUBLIC_DB_PROVIDER=firebase` in `.env.local`

4. **Import data:**
   - Use DataBackupManager to import the backup
   - Or manually sync data via API

### Migrating from Firebase to Supabase

1. **Export Firebase data:**
   - Use DataBackupManager → "Create Backup"

2. **Set up Supabase:**
   - Follow Supabase Setup steps above
   - Create data_store table

3. **Update provider:**
   - Update `NEXT_PUBLIC_DB_PROVIDER=supabase` in `.env.local`

4. **Import data:**
   - Use DataBackupManager → "Restore from File"

---

## Troubleshooting

### Firebase Issues

**Error: "Firebase configuration is invalid"**
- Verify all Firebase credentials in `.env.local`
- Check project ID matches Firebase Console

**Error: "Permission denied"**
- Update Firebase Security Rules to allow read/write
- Check RLS policies in Firebase

### Supabase Issues

**Error: "Failed to retrieve data"**
- Verify Supabase URL and anon key
- Check data_store table exists
- Enable RLS policies

**Error: "PGRST116 - No rows returned"**
- This is normal for first query
- Data will be created on POST

### General Issues

**Database not persisting data:**
- Check `NEXT_PUBLIC_DB_PROVIDER` value
- Verify API routes are accessible
- Check network tab in browser DevTools

**Backup/Restore not working:**
- Ensure DataBackupManager is properly imported
- Check browser console for errors
- Verify API endpoints exist

---

## Architecture Overview

### File Structure

```
src/
├── lib/
│   ├── firebase.js          # Firebase config and helpers
│   ├── supabase.js          # Supabase config and helpers
│   └── db.js                # Database abstraction layer
├── hooks/
│   └── useDatabase.js       # React hooks for database operations
├── components/
│   └── DataBackupManager.jsx  # Backup UI component
└── app/api/
    ├── firebase/
    │   ├── data/[key]/route.js
    │   ├── export/route.js
    │   └── import/route.js
    └── supabase/
        ├── data/[key]/route.js
        ├── export/route.js
        └── import/route.js
```

### Data Flow

1. **Component** → Uses `useDatabase()` hook
2. **Hook** → Calls `/api/data/[key]` route
3. **API Route** → Routes to Firebase or Supabase
4. **Database** → Stores/retrieves data
5. **Component** → Receives data via hook state

### Provider Switching

The `NEXT_PUBLIC_DB_PROVIDER` environment variable controls which database is used:

- `localhost`: Uses localStorage (development)
- `firebase`: Uses Firebase Realtime Database
- `supabase`: Uses Supabase PostgreSQL
- `mongodb`: Uses MongoDB Atlas (future)

---

## Performance Considerations

### Firebase

- Read/Write limits: 25,000 reads/writes per day on free tier
- Good for real-time data
- Scales automatically

### Supabase

- PostgreSQL-based with unlimited reads/writes
- Better for relational data
- Requires SQL table setup

### Recommendations

- **Firebase**: Good for real-time features, fast MVP
- **Supabase**: Better for production, complex data relationships
- **Both**: Can use simultaneously with different `NEXT_PUBLIC_API_URL`

---

## Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [React Hooks Documentation](https://react.dev/reference/react/hooks)
