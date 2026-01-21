# Firebase & Supabase Integration Testing Guide

Complete testing procedures to verify Firebase and Supabase integrations are working correctly.

## Pre-Testing Checklist

- [ ] Firebase project created and credentials added to `.env.local`
- [ ] Supabase project created and credentials added to `.env.local`
- [ ] Dependencies installed: `npm install`
- [ ] Development server running: `npm run dev`
- [ ] Both providers' security rules configured

## Testing Procedures

### 1. Firebase Testing

#### 1.1 Basic Connectivity Test

**Test:** Verify Firebase configuration loads without errors

```bash
# Check console for Firebase initialization messages
# Look for: "Firebase initialized successfully"
```

**Expected Result:**
- No console errors
- Firebase connection established

#### 1.2 Create Operation (POST)

**Test:** Create a new data record

```bash
curl -X POST http://localhost:3000/api/firebase/data/test-blog-1 \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "title": "Test Blog Post",
      "content": "This is a test post",
      "author": "Test Author",
      "timestamp": "2024-01-01T00:00:00Z"
    }
  }'
```

**Expected Result:**
```json
{
  "success": true,
  "message": "Data saved successfully"
}
```

#### 1.3 Read Operation (GET)

**Test:** Retrieve the created data

```bash
curl http://localhost:3000/api/firebase/data/test-blog-1
```

**Expected Result:**
```json
{
  "success": true,
  "data": {
    "title": "Test Blog Post",
    "content": "This is a test post",
    "author": "Test Author",
    "timestamp": "2024-01-01T00:00:00Z"
  }
}
```

#### 1.4 Update Operation (POST with merge)

**Test:** Update existing data

```bash
curl -X POST http://localhost:3000/api/firebase/data/test-blog-1 \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "title": "Updated Test Blog Post"
    },
    "merge": true
  }'
```

**Expected Result:**
```json
{
  "success": true,
  "message": "Data saved successfully"
}
```

#### 1.5 Export Operation

**Test:** Export all data

```bash
curl http://localhost:3000/api/firebase/export
```

**Expected Result:**
```json
{
  "success": true,
  "backup": {
    "timestamp": "2024-01-01T00:00:00.000Z",
    "version": "1.0",
    "data": {
      "test-blog-1": {
        "title": "Updated Test Blog Post",
        ...
      }
    }
  },
  "fileName": "backup-1704067200000.json"
}
```

#### 1.6 Delete Operation (DELETE)

**Test:** Delete data

```bash
curl -X DELETE http://localhost:3000/api/firebase/data/test-blog-1
```

**Expected Result:**
```json
{
  "success": true,
  "message": "Data deleted successfully"
}
```

#### 1.7 Verify Deletion

**Test:** Confirm data is deleted

```bash
curl http://localhost:3000/api/firebase/data/test-blog-1
```

**Expected Result:**
```json
{
  "success": true,
  "data": null
}
```

### 2. Supabase Testing

#### 2.1 Database Table Verification

**Test:** Verify data_store table exists

In Supabase SQL Editor:

```sql
SELECT * FROM data_store LIMIT 1;
```

**Expected Result:** Table query succeeds (may return 0 rows if empty)

#### 2.2 Create Operation (POST)

**Test:** Create a new data record

```bash
curl -X POST http://localhost:3000/api/supabase/data/test-blog-1 \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "title": "Test Supabase Blog",
      "content": "Testing Supabase integration",
      "author": "Test Author",
      "timestamp": "2024-01-01T00:00:00Z"
    }
  }'
```

**Expected Result:**
```json
{
  "success": true,
  "message": "Data saved successfully",
  "data": [
    {
      "id": "uuid-here",
      "key": "test-blog-1",
      "value": { ... },
      "created_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### 2.3 Read Operation (GET)

**Test:** Retrieve the created data

```bash
curl http://localhost:3000/api/supabase/data/test-blog-1
```

**Expected Result:**
```json
{
  "success": true,
  "data": {
    "title": "Test Supabase Blog",
    "content": "Testing Supabase integration",
    ...
  }
}
```

#### 2.4 Update Operation (POST)

**Test:** Update existing data

```bash
curl -X POST http://localhost:3000/api/supabase/data/test-blog-1 \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "title": "Updated Supabase Blog",
      "content": "Testing Supabase integration",
      "author": "Test Author",
      "timestamp": "2024-01-01T00:00:00Z"
    }
  }'
```

**Expected Result:**
```json
{
  "success": true,
  "message": "Data saved successfully"
}
```

#### 2.5 Export Operation

**Test:** Export all data

```bash
curl http://localhost:3000/api/supabase/export
```

**Expected Result:**
```json
{
  "success": true,
  "backup": {
    "timestamp": "2024-01-01T00:00:00.000Z",
    "version": "1.0",
    "provider": "supabase",
    "data": {
      "test-blog-1": { ... }
    }
  },
  "fileName": "backup-supabase-1704067200000.json"
}
```

#### 2.6 Delete Operation (DELETE)

**Test:** Delete data

```bash
curl -X DELETE http://localhost:3000/api/supabase/data/test-blog-1
```

**Expected Result:**
```json
{
  "success": true,
  "message": "Data deleted successfully"
}
```

#### 2.7 Verify Deletion

**Test:** Confirm data is deleted

```bash
curl http://localhost:3000/api/supabase/data/test-blog-1
```

**Expected Result:**
```json
{
  "success": true,
  "data": null
}
```

### 3. UI Component Testing

#### 3.1 DataBackupManager Component

**Test:** Navigate to Admin Settings and verify DataBackupManager appears

1. Go to `http://localhost:3000/Admin/Settings`
2. Scroll to "Backup & Recovery" section
3. Should see:
   - "Create Backup" button
   - "Restore from File" button
   - Auto-backup toggle
   - Backup history section

#### 3.2 Create Backup via UI

**Test:** Create a backup using the UI component

1. Click "Create Backup" button
2. Wait for loading indicator
3. Should see:
   - Success toast notification
   - New backup entry in history
   - Downloaded .json file

#### 3.3 Restore Backup via UI

**Test:** Restore backup using the UI component

1. Click "Restore from File"
2. Select a previously created backup file
3. Confirm restoration
4. Should see:
   - Success notification
   - Data restored to database

#### 3.4 Auto-Backup Feature

**Test:** Enable auto-backup scheduling

1. Toggle "Auto-backup" switch
2. Select frequency (hourly, daily, weekly)
3. Should see:
   - Switch enabled state
   - Frequency dropdown shown
   - Auto-backup scheduled

### 4. React Hook Testing

#### 4.1 useDatabase Hook

**Test:** Verify useDatabase hook works in component

In Admin Blog page console, should see:
- Data loading indicator during fetch
- Correct data displayed from database
- No errors in console

#### 4.2 useBackup Hook

**Test:** Verify backup functionality

In Admin Settings console, should see:
- Backup creation without errors
- Successful backup file generation
- Correct backup data structure

### 5. Error Handling Tests

#### 5.1 Missing Required Fields

**Test:** Send POST without data field

```bash
curl -X POST http://localhost:3000/api/firebase/data/test \
  -H "Content-Type: application/json" \
  -d '{}'
```

**Expected Result:**
```json
{
  "error": "Missing key or data",
  "status": 400
}
```

#### 5.2 Invalid Key

**Test:** GET with special characters in key

```bash
curl http://localhost:3000/api/firebase/data/"../../etc/passwd"
```

**Expected Result:** Either null data or proper escaping, no file system access

#### 5.3 Network Error Simulation

**Test:** Disable internet and try API call

**Expected Result:** Proper error message in response

#### 5.4 Large Data Upload

**Test:** POST with large JSON payload (>10MB)

**Expected Result:** Either successful upload or proper error with size limit

### 6. Performance Tests

#### 6.1 Read Performance

**Test:** Measure response time for GET requests

```bash
time curl http://localhost:3000/api/firebase/data/test-blog-1
```

**Expected Result:** Response time < 500ms for typical data

#### 6.2 Write Performance

**Test:** Measure response time for POST requests

```bash
time curl -X POST http://localhost:3000/api/firebase/data/test-blog-1 \
  -H "Content-Type: application/json" \
  -d '{"data": {"test": "value"}}'
```

**Expected Result:** Response time < 1s for typical data

#### 6.3 Bulk Operations

**Test:** Import large backup file (>1MB)

```bash
curl -X POST http://localhost:3000/api/firebase/import \
  -H "Content-Type: application/json" \
  -d @large-backup.json
```

**Expected Result:**
- Operation completes without timeout
- All records imported successfully
- No memory leaks

### 7. Provider Switching Test

#### 7.1 Switch from Firebase to Supabase

**Steps:**
1. Create data with Firebase provider
2. Export backup
3. Change `NEXT_PUBLIC_DB_PROVIDER=supabase` in `.env.local`
4. Restart development server
5. Import backup to Supabase
6. Verify data is accessible

**Expected Result:** Data successfully migrated between providers

#### 7.2 Switch from Supabase to Firebase

**Steps:**
1. Create data with Supabase provider
2. Export backup
3. Change `NEXT_PUBLIC_DB_PROVIDER=firebase` in `.env.local`
4. Restart development server
5. Import backup to Firebase
6. Verify data is accessible

**Expected Result:** Data successfully migrated between providers

## Troubleshooting Failed Tests

### Firebase Issues

**Issue:** "Firebase is not initialized"
- Check `.env.local` for Firebase credentials
- Verify project ID is correct

**Issue:** "Permission denied"
- Update Firebase Security Rules
- Check rule configuration in Console

**Issue:** "API key not recognized"
- Regenerate API key in Firebase Console
- Update `.env.local` with new key

### Supabase Issues

**Issue:** "Failed to retrieve data"
- Verify `data_store` table exists
- Check RLS policies are enabled

**Issue:** "Relation data_store does not exist"
- Run SQL table creation script in Supabase
- Verify schema is created

**Issue:** "PGRST116 - No rows returned"
- This is expected for non-existent keys
- Data will be created on POST

## Success Criteria

All of the following should be true:

✅ Firebase CRUD operations work (Create, Read, Update, Delete)
✅ Supabase CRUD operations work
✅ Export/Import (backup/restore) works for both
✅ Error handling returns proper responses
✅ DataBackupManager UI renders correctly
✅ React hooks integrate properly with components
✅ Provider switching preserves data
✅ Performance metrics are acceptable
✅ No console errors or warnings
✅ Auto-backup scheduling works correctly

## Test Report Template

```
Date: ____/__/____
Tester: _________________

Firebase Tests:
- POST (Create): PASS / FAIL
- GET (Read): PASS / FAIL
- POST (Update): PASS / FAIL
- Export: PASS / FAIL
- DELETE: PASS / FAIL

Supabase Tests:
- POST (Create): PASS / FAIL
- GET (Read): PASS / FAIL
- POST (Update): PASS / FAIL
- Export: PASS / FAIL
- DELETE: PASS / FAIL

UI Tests:
- DataBackupManager renders: PASS / FAIL
- Create backup button works: PASS / FAIL
- Restore button works: PASS / FAIL
- Auto-backup toggle works: PASS / FAIL

Performance:
- Average GET response time: ___ms
- Average POST response time: ___ms
- Bulk import success: PASS / FAIL

Provider Switching:
- Firebase → Supabase: PASS / FAIL
- Supabase → Firebase: PASS / FAIL

Notes:
_________________________________
_________________________________
```
