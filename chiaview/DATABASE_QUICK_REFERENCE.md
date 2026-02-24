# Database Implementation Quick Reference

## 🚀 Quick Start

### Install Dependencies (Choose One)

**Firebase (Recommended for MVP):**
```bash
npm install firebase
```

**Supabase (PostgreSQL Alternative):**
```bash
npm install @supabase/supabase-js
```

**MongoDB (Production-Grade):**
```bash
npm install mongodb
```

---

## 💾 Current Data Structure

All data is currently stored in localStorage with these keys:

```javascript
{
  "chiaview_blog_posts": [
    {
      id: "1234567890",
      title: "Blog Title",
      category: "Testimonies",
      excerpt: "Short excerpt",
      content: "Full content",
      createdAt: "2026-01-21T10:00:00Z",
      updatedAt: "2026-01-21T10:00:00Z"
    }
  ],
  
  "chiaview_testimonials": [
    {
      id: "string",
      name: "Name",
      role: "Role",
      quote: "Testimonial text",
      category: "Donor|Volunteer|Community",
      rating: 1-5,
      createdAt: "date"
    }
  ],
  
  "chiaview_opportunities": [
    {
      id: "string",
      title: "Opportunity",
      time: "Time commitment",
      description: "Description",
      category: "Category",
      createdAt: "date"
    }
  ],
  
  "chiaview_homepage_content": {
    hero: { ... },
    coreValues: [ ... ],
    whatWeDo: [ ... ],
    testimonials: [ ... ]
  },
  
  "chiaview_website_settings": {
    general: { ... },
    social: { ... },
    maintenance: { ... }
  },
  
  "admin_user": {
    email: "admin@example.com",
    name: "Admin Name"
  }
}
```

---

## 🔄 Usage Examples

### Example 1: Loading Data in a Component

**Before (localStorage):**
```javascript
const posts = JSON.parse(localStorage.getItem('chiaview_blog_posts') || '[]');
```

**After (with hook):**
```javascript
import { useDatabase } from '@/hooks/useDatabase';

export default function BlogList() {
  const { data: posts, loading, error } = useDatabase('chiaview_blog_posts', []);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  
  return posts.map(post => <div key={post.id}>{post.title}</div>);
}
```

### Example 2: Saving Data

**Before (localStorage):**
```javascript
const newPosts = [...posts, newPost];
localStorage.setItem('chiaview_blog_posts', JSON.stringify(newPosts));
```

**After (with hook):**
```javascript
const { data: posts, saveData } = useDatabase('chiaview_blog_posts', []);

const handleAddPost = async (newPost) => {
  const updated = [...posts, newPost];
  await saveData(updated);
};
```

### Example 3: Creating Backups

```javascript
import { useBackup } from '@/hooks/useDatabase';

export default function Settings() {
  const { createBackup, restoreBackup, isBackingUp } = useBackup();
  
  return (
    <>
      <button onClick={createBackup} disabled={isBackingUp}>
        {isBackingUp ? 'Backing up...' : 'Create Backup'}
      </button>
      
      <input
        type="file"
        accept=".json"
        onChange={(e) => restoreBackup(e.target.files[0])}
      />
    </>
  );
}
```

---

## 📊 Migration Checklist

- [ ] **Step 1:** Choose database provider (Firebase recommended)
- [ ] **Step 2:** Set up database account and get credentials
- [ ] **Step 3:** Add credentials to `.env.local`
- [ ] **Step 4:** Install required dependencies
- [ ] **Step 5:** Update `/api/data/[key]/route.js` to use new database
- [ ] **Step 6:** Update environment variable: `NEXT_PUBLIC_DB_PROVIDER=firebase`
- [ ] **Step 7:** Export current data from localStorage
- [ ] **Step 8:** Test import into new database
- [ ] **Step 9:** Deploy to staging and verify
- [ ] **Step 10:** Deploy to production

---

## 🎯 Database Provider Setup

### Firebase Setup

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Create new project
3. Enable Realtime Database
4. Get credentials from project settings
5. Add to `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=xxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxx
NEXT_PUBLIC_FIREBASE_DB_URL=https://xxx.firebaseio.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxx
NEXT_PUBLIC_DB_PROVIDER=firebase
```

6. Update API routes to use Firebase SDK

### MongoDB Setup

1. Create account at [mongodb.com](https://mongodb.com)
2. Create cluster and database
3. Get connection string
4. Add to `.env.local`:

```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/database
NEXT_PUBLIC_DB_PROVIDER=mongodb
```

5. Update API routes to use MongoDB driver

### Supabase Setup

1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Get API credentials
4. Add to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
NEXT_PUBLIC_DB_PROVIDER=supabase
```

5. Update API routes to use Supabase client

---

## 🔒 Encryption Example

```javascript
import CryptoJS from 'crypto-js';

// Encrypt sensitive data
function encryptData(data) {
  const key = process.env.ENCRYPTION_KEY;
  return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
}

// Decrypt data
function decryptData(encrypted) {
  const key = process.env.ENCRYPTION_KEY;
  const bytes = CryptoJS.AES.decrypt(encrypted, key);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}
```

---

## 🧪 Testing Data Migration

```javascript
// Export current data
async function exportCurrentData() {
  const data = await db.exportData();
  const blob = await db.backupToFile();
  // Download blob
}

// Test import
async function testImport(file) {
  const success = await db.restoreFromFile(file);
  const stats = await db.getStatistics();
  console.log('Import successful:', success);
  console.log('Database stats:', stats);
}
```

---

## 📈 Performance Metrics

After migration to database, you should see:

- **Page Load Time:** 5ms → 50-100ms (acceptable for remote)
- **Data Query:** 5ms → 1-30ms (with caching)
- **Bulk Operations:** Slow → Fast
- **Scalability:** Limited → Unlimited

---

## 🚨 Troubleshooting

| Issue | Solution |
|-------|----------|
| Data not loading | Check NEXT_PUBLIC_DB_PROVIDER env var |
| Backup fails | Check file permissions and storage quota |
| Slow queries | Add database indexes on frequently queried fields |
| Import fails | Validate JSON format matches schema |
| Credentials error | Verify .env.local has all required variables |

---

## 📞 Common Questions

**Q: Should I migrate right away?**
A: No, test in staging first. Current localStorage works fine for MVP.

**Q: Which database should I choose?**
A: Firebase for quick MVP, MongoDB for enterprise needs.

**Q: Can I switch databases later?**
A: Yes! Database service layer makes this easy. Export, import, done.

**Q: What about data security?**
A: All providers offer encryption. Enable at provider level.

**Q: Do I need to update components?**
A: No! Just update API routes and change env variable.

---

## 📚 Resources

- [Firebase Docs](https://firebase.google.com/docs)
- [MongoDB Docs](https://docs.mongodb.com)
- [Supabase Docs](https://supabase.com/docs)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)

---

**Status:** Ready for implementation
**Priority:** Medium (after MVP launch)
**Estimated Timeline:** 2-3 weeks
