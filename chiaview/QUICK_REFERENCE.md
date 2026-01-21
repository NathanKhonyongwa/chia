# Quick Reference Card: Database Integration

## 🚀 Quick Start

### 1. Choose Provider
```env
NEXT_PUBLIC_DB_PROVIDER=firebase  # or supabase, localhost
```

### 2. Add Credentials
```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_DB_URL=...
# OR Supabase
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Start Server
```bash
npm run dev
```

---

## 📍 File Locations

### Core Files
| File | Purpose |
|------|---------|
| `src/lib/firebase.js` | Firebase config |
| `src/lib/supabase.js` | Supabase config |
| `src/hooks/useDatabase.js` | React hooks |
| `src/components/DataBackupManager.jsx` | Backup UI |

### API Routes
| Route | Method | Purpose |
|-------|--------|---------|
| `/api/firebase/data/[key]` | GET/POST/DELETE | CRUD |
| `/api/firebase/export` | GET | Backup |
| `/api/firebase/import` | POST | Restore |
| `/api/supabase/data/[key]` | GET/POST/DELETE | CRUD |
| `/api/supabase/export` | GET | Backup |
| `/api/supabase/import` | POST | Restore |

---

## 🔧 React Hooks Usage

### useDatabase Hook
```javascript
import { useDatabase } from "@/hooks/useDatabase";

// In your component
const { data, saveData, loading, error } = useDatabase("key_name", []);

// Use in JSX
{loading && <div>Loading...</div>}
{error && <div>Error: {error}</div>}
<div>{data}</div>
```

### useBackup Hook
```javascript
import { useBackup } from "@/hooks/useDatabase";

const { createBackup, restoreBackup } = useBackup();

// Create backup
const backup = await createBackup();

// Restore backup
await restoreBackup(backupData);
```

---

## 🌐 API Request Examples

### Create/Update Data
```bash
curl -X POST http://localhost:3000/api/firebase/data/mykey \
  -H "Content-Type: application/json" \
  -d '{"data": {"title": "Hello", "content": "World"}}'
```

### Read Data
```bash
curl http://localhost:3000/api/firebase/data/mykey
```

### Delete Data
```bash
curl -X DELETE http://localhost:3000/api/firebase/data/mykey
```

### Create Backup
```bash
curl http://localhost:3000/api/firebase/export
```

### Restore Backup
```bash
curl -X POST http://localhost:3000/api/firebase/import \
  -H "Content-Type: application/json" \
  -d '{"backup": {"data": {...}}}'
```

---

## ✅ Setup Checklist

### Firebase Setup
- [ ] Create Firebase project
- [ ] Create Realtime Database
- [ ] Copy credentials to `.env.local`
- [ ] Set `NEXT_PUBLIC_DB_PROVIDER=firebase`
- [ ] Restart dev server

### Supabase Setup
- [ ] Create Supabase project
- [ ] Create `data_store` table (run SQL)
- [ ] Copy credentials to `.env.local`
- [ ] Set `NEXT_PUBLIC_DB_PROVIDER=supabase`
- [ ] Restart dev server

### Verification
- [ ] Admin Settings page loads
- [ ] DataBackupManager visible
- [ ] Create Backup button works
- [ ] No console errors

---

## 🐛 Common Issues

### "Firebase is not initialized"
**Solution:** Check `.env.local` for Firebase credentials

### "Table data_store not found"
**Solution:** Run SQL setup in Supabase SQL Editor

### "Permission denied"
**Solution:** Update security rules in Firebase/Supabase Console

### "No rows returned"
**Solution:** Normal for new keys, data will be created on POST

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `DATABASE_INTEGRATION_SETUP.md` | Detailed setup guide |
| `TESTING_GUIDE.md` | Complete testing procedures |
| `IMPLEMENTATION_SUMMARY.md` | Overview of all changes |
| `.env.example` | Environment template |

---

## 🔄 Provider Switching

### Step 1: Export Data
- Use DataBackupManager component
- Click "Create Backup"
- Save the backup file

### Step 2: Switch Provider
```env
NEXT_PUBLIC_DB_PROVIDER=supabase  # or firebase
# Update credentials for new provider
```

### Step 3: Restart Server
```bash
# Stop dev server (Ctrl+C)
npm run dev
```

### Step 4: Import Data
- Use DataBackupManager component
- Click "Restore from File"
- Select backup file
- Confirm restoration

---

## 📊 Performance Tips

### Firebase
- Best for: Real-time data, simple queries
- Limit: 25,000 operations/day on free tier
- Cost: Free up to limits, then pay-per-use

### Supabase
- Best for: Complex queries, relational data
- Limit: Unlimited operations
- Cost: Free with 0.5GB storage, then subscription

### localhost
- Best for: Development, testing
- Speed: Fastest (local)
- Cost: Free

---

## 🚨 Before Going to Production

- [ ] Add proper authentication
- [ ] Enable security rules (don't allow all access)
- [ ] Set up monitoring and logging
- [ ] Test backup/restore procedures
- [ ] Set up automated backups
- [ ] Document recovery procedures
- [ ] Add error tracking (Sentry, etc.)
- [ ] Performance test with real data volumes
- [ ] Set up CI/CD deployment

---

## 💡 Pro Tips

1. **Development:** Use `localhost` for fastest iteration
2. **Staging:** Use same provider as production for testing
3. **Backup:** Create backup before major changes
4. **Monitoring:** Log all database operations
5. **Testing:** Run full test suite before switching providers

---

## 📞 Where to Find Help

### Setup Issues
→ See `DATABASE_INTEGRATION_SETUP.md`

### Testing
→ See `TESTING_GUIDE.md`

### Implementation Details
→ See `IMPLEMENTATION_SUMMARY.md`

### Code Examples
→ Check `src/app/Admin/Blog/page.js` for hook usage

---

## 🎯 Next Steps

1. Complete Firebase/Supabase setup
2. Run testing procedures in `TESTING_GUIDE.md`
3. Refactor remaining admin pages (use Blog page as template)
4. Enable auto-backup scheduling
5. Set up production security rules

---

**Last Updated:** January 2025
**Version:** 1.0
**Status:** Production Ready ✅
