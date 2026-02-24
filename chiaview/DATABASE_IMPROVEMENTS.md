# Database Improvements & Migration Guide

## Current State
The application currently uses **browser localStorage** for data persistence:
- ✓ Blog posts (`chiaview_blog_posts`)
- ✓ Testimonials (`chiaview_testimonials`)
- ✓ Opportunities (`chiaview_opportunities`)
- ✓ Homepage content (`chiaview_homepage_content`)
- ✓ Website settings (`chiaview_website_settings`)
- ✓ Admin users (`admin_user`)

## Recommended Improvements

### 1. **Implement Database Service Layer** ✅ DONE
- Location: `src/lib/db.js`
- Provides abstraction for database operations
- Easily switch between localStorage, Firebase, or backend API
- Methods: save(), load(), delete(), clear(), export(), import()

### 2. **Add Backend API Routes** ✅ DONE
- Location: `src/app/api/data/`
- Routes:
  - `GET/POST/DELETE /api/data/[key]` - Manage data collections
  - `GET /api/data/export` - Export all data
  - `POST /api/data/import` - Import data from backup

### 3. **Database Options & Implementation**

#### **Option A: Firebase Realtime Database** (Recommended for MVP)
**Pros:**
- Real-time synchronization
- Built-in authentication
- Scalable
- Free tier available
- Easy integration

**Setup:**
```bash
npm install firebase
```

**Implementation:**
```javascript
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
```

#### **Option B: MongoDB + Node.js Backend** (Production-ready)
**Pros:**
- Full control over data
- Enterprise features
- Better for complex queries
- More secure

**Setup:**
```bash
npm install mongodb
```

**Database Schema Example:**
```javascript
// Collections to create:
db.createCollection("blog_posts", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "category"],
      properties: {
        _id: { bsonType: "objectId" },
        title: { bsonType: "string" },
        category: { bsonType: "string" },
        excerpt: { bsonType: "string" },
        content: { bsonType: "string" },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
})
```

#### **Option C: Supabase** (PostgreSQL Alternative)
**Pros:**
- PostgreSQL-based (proven, reliable)
- Real-time subscriptions
- Row-level security
- Open source
- Generous free tier

**Setup:**
```bash
npm install @supabase/supabase-js
```

### 4. **Data Backup & Recovery System**

**Features to Implement:**
- Automated daily backups
- Manual backup triggers
- Backup versioning
- Recovery from point-in-time
- Export to CSV/JSON

**Implementation:**
```javascript
// Backup utility
export async function createBackup() {
  const data = await db.exportData();
  const timestamp = new Date().toISOString();
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json'
  });
  
  // Upload to backup storage
  const formData = new FormData();
  formData.append('file', blob, `backup-${timestamp}.json`);
  
  return fetch('/api/backups/create', {
    method: 'POST',
    body: formData
  });
}
```

### 5. **Data Validation & Schema Enforcement**

**Add Schema Validation:**
```javascript
// src/lib/schemas.js
import { z } from 'zod';

export const BlogPostSchema = z.object({
  title: z.string().min(3).max(100),
  category: z.enum(['Testimonies', 'Youth', 'Mission', 'Spiritual', 'Outreach']),
  excerpt: z.string().min(10).max(200),
  content: z.string().min(50),
  createdAt: z.date(),
});

export const TestimonialSchema = z.object({
  name: z.string().min(2),
  role: z.string(),
  quote: z.string().min(10),
  rating: z.number().min(1).max(5),
});
```

### 6. **Caching Strategy**

**Implement Redis/Cache Layer:**
- Cache frequently accessed data
- Reduce database queries
- Faster response times

```javascript
// Caching example
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

async function getCachedData(key) {
  if (cache.has(key)) {
    const { data, expiresAt } = cache.get(key);
    if (Date.now() < expiresAt) {
      return data;
    }
    cache.delete(key);
  }
  
  const data = await db.load(key);
  cache.set(key, {
    data,
    expiresAt: Date.now() + CACHE_TTL
  });
  
  return data;
}
```

### 7. **Database Indexing**

**Add Indexes for Performance:**
```javascript
// MongoDB indexes
db.collection('blog_posts').createIndex({ category: 1 });
db.collection('blog_posts').createIndex({ createdAt: -1 });
db.collection('testimonials').createIndex({ rating: -1 });
db.collection('opportunities').createIndex({ createdAt: -1 });
```

### 8. **Data Encryption**

**Encrypt Sensitive Data:**
```bash
npm install crypto-js
```

```javascript
import CryptoJS from 'crypto-js';

function encryptData(data, key) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
}

function decryptData(encryptedData, key) {
  const bytes = CryptoJS.AES.decrypt(encryptedData, key);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}
```

### 9. **Analytics & Monitoring**

**Track Database Operations:**
```javascript
// src/lib/dbLogger.js
export function logDbOperation(operation, collection, status, duration) {
  const log = {
    timestamp: new Date(),
    operation,
    collection,
    status,
    durationMs: duration,
  };
  
  // Send to analytics service
  fetch('/api/analytics', { method: 'POST', body: JSON.stringify(log) });
}
```

### 10. **Migration Path**

**Step 1:** Implement Database Service Layer ✅
**Step 2:** Choose database provider (Firebase recommended for MVP)
**Step 3:** Create API routes for data operations
**Step 4:** Add schema validation
**Step 5:** Implement backup system
**Step 6:** Add data encryption
**Step 7:** Set up monitoring & analytics
**Step 8:** Test migration with sample data
**Step 9:** Plan cutover from localStorage
**Step 10:** Monitor post-migration

## Environment Variables

Add to `.env.local`:

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_DB_URL=your_db_url
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id

# Or Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Or MongoDB
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/database

# Database Provider
NEXT_PUBLIC_DB_PROVIDER=localStorage|firebase|supabase|mongodb
```

## Performance Benchmarks

**Current (localStorage):**
- Write: ~1ms
- Read: ~1ms
- Scalability: ✗ Limited to browser storage quota

**With Firebase:**
- Write: ~50-200ms
- Read: ~50-200ms
- Scalability: ✓ Unlimited

**With MongoDB:**
- Write: ~10-50ms (with optimization)
- Read: ~5-30ms (with indexing)
- Scalability: ✓ Enterprise-grade

## Recommended Stack for Production

```
Frontend: Next.js 16+
API Layer: Next.js API Routes
Database: MongoDB or Firebase
Cache: Redis
Authentication: NextAuth.js
Monitoring: Sentry
Analytics: Mixpanel or Segment
```

## Next Steps

1. Review database options with team
2. Set up chosen database service
3. Migrate API routes to use new database
4. Implement backup system
5. Add monitoring & alerting
6. Plan data migration from localStorage
7. Test thoroughly before production deployment

