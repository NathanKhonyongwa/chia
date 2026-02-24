-- Supabase schema/seed for Chiaview
-- Run in Supabase SQL editor.

-- BLOG POSTS
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null default 'Testimonies',
  excerpt text not null,
  content text not null,
  image_url text,
  featured boolean not null default false,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blog_posts_created_at_idx on public.blog_posts (created_at desc);
create index if not exists blog_posts_category_idx on public.blog_posts (category);
create index if not exists blog_posts_published_idx on public.blog_posts (published);

-- VOLUNTEER OPPORTUNITIES
create table if not exists public.volunteer_opportunities (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  time text not null,
  description text not null,
  category text not null default 'Outreach',
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists volunteer_opportunities_created_at_idx on public.volunteer_opportunities (created_at desc);
create index if not exists volunteer_opportunities_category_idx on public.volunteer_opportunities (category);
create index if not exists volunteer_opportunities_published_idx on public.volunteer_opportunities (published);

-- Existing tables referenced by current API routes (ensure they exist)
-- homepage_content, testimonials, website_settings, form_submissions, form_responses, data_store
-- are assumed to already exist in your project.

