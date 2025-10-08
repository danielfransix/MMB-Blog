# Complete Guide: Implementing Strapi 5 CMS with Next.js Blog

This comprehensive guide will walk you through integrating Strapi 5 CMS with your existing Next.js blog, transforming it from a static blog to a dynamic, content-managed website.

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Setting Up Strapi Backend](#setting-up-strapi-backend)
4. [Configuring Content Types](#configuring-content-types)
5. [Setting Up API Permissions](#setting-up-api-permissions)
6. [Modifying Next.js Frontend](#modifying-nextjs-frontend)
7. [Creating API Helper Functions](#creating-api-helper-functions)
8. [Updating Components](#updating-components)
9. [Environment Configuration](#environment-configuration)
10. [Testing the Integration](#testing-the-integration)
11. [Deployment](#deployment)
12. [Advanced Features](#advanced-features)

## Overview

Strapi is an open-source headless Content Management System (CMS) that provides a flexible API for managing content. By integrating Strapi with your Next.js blog, you'll be able to:

- Manage blog posts, authors, and categories through a user-friendly admin interface
- Create, edit, and publish content without touching code
- Support multiple content types and rich media
- Enable collaborative content creation
- Implement role-based permissions
- Support internationalization and multilingual content

## Prerequisites

Before starting, ensure you have:

- **Node.js**: Node.js 18.x or higher (Node.js 20.x recommended for Strapi 5)
- **Package Manager**: npm (v6+), yarn, or pnpm
- **Database**: PostgreSQL, MySQL, or better-sqlite3 (SQLite3 is no longer supported in Strapi 5)
- **Git**: For version control
- **GitHub Account**: For deployment to Strapi Cloud
- **Existing Next.js Blog**: Your current blog project with TypeScript support recommended

## Setting Up Strapi Backend

### Step 1: Create Strapi Project

1. Navigate to your project root directory:
   ```bash
   cd c:\Users\SURFACE\OneDrive\Documents\GitHub\MMB-Blog
   ```

2. Create a new Strapi 5 project:
   ```bash
   npx create-strapi-app@latest strapi-backend --typescript --quickstart
   ```

3. This will:
   - Create a new `strapi-backend` folder with TypeScript support
   - Install all dependencies
   - Set up better-sqlite3 database (default)
   - Use Vite bundler for faster builds
   - Start the development server

4. After installation, Strapi will automatically open in your browser at `http://localhost:1337/admin`

### Step 1.5: Database Configuration

Strapi 5 requires specific database configurations:

**Supported Databases:**
- PostgreSQL (recommended for production)
- MySQL with mysql2 driver
- better-sqlite3 (development only)

```javascript
// config/database.js (PostgreSQL example)
module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', '127.0.0.1'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'strapi'),
      user: env('DATABASE_USERNAME', 'strapi'),
      password: env('DATABASE_PASSWORD', 'strapi'),
      ssl: env.bool('DATABASE_SSL', false),
    },
  },
});
```

**For MySQL (using mysql2):**
```javascript
// config/database.js
module.exports = ({ env }) => ({
  connection: {
    client: 'mysql2',
    connection: {
      host: env('DATABASE_HOST', '127.0.0.1'),
      port: env.int('DATABASE_PORT', 3306),
      database: env('DATABASE_NAME', 'strapi'),
      user: env('DATABASE_USERNAME', 'strapi'),
      password: env('DATABASE_PASSWORD', 'strapi'),
    },
  },
});
```

### Step 2: Create Admin User

1. Fill out the admin registration form:
   - First Name
   - Last Name
   - Email
   - Password
   - Confirm Password

2. Click "Let's start" to access the admin panel

## Configuring Content Types

### Step 3: Create Author Content Type

1. In the Strapi admin panel, go to **Content-Type Builder**
2. Click **"Create new collection type"**
3. Name it `author` (singular)
4. Add the following fields:

   **Text Fields:**
   - `name` (Text, Required, Unique)
   - `bio` (Text, Long text)
   - `slug` (Text, Required, Unique)

   **Media Field:**
   - `picture` (Media, Single media, Required)

   **Advanced Settings:**
   - Enable Draft & Publish
   - Set `name` as the display field

5. Click **Save** and wait for server restart

### Step 4: Create Category Content Type

1. Create new collection type named `category`
2. Add fields:
   - `name` (Text, Required, Unique)
   - `slug` (Text, Required, Unique)
   - `description` (Text, Long text)

3. Set `name` as display field
4. Save and restart

### Step 5: Create Post Content Type

1. Create new collection type named `post`
2. Add the following fields:

   **Text Fields:**
   - `title` (Text, Required)
   - `slug` (Text, Required, Unique)
   - `excerpt` (Text, Long text, Required)
   - `content` (Rich text, Required)

   **Date Field:**
   - `publishedDate` (Date, Required)

   **Media Fields:**
   - `featuredImage` (Media, Single media, Required)
   - `carouselImages` (Media, Multiple media)

   **Relation Fields:**
   - `author` (Relation, Post has one Author)
   - `category` (Relation, Post has one Category)

   **Boolean Fields:**
   - `showCarousel` (Boolean, Default: false)
   - `showTextBlockOne` (Boolean, Default: false)
   - `showTextBlockTwo` (Boolean, Default: false)
   - `showTextBlockThree` (Boolean, Default: false)
   - `isFeatured` (Boolean, Default: false)

   **Additional Text Fields:**
   - `textBlockOne` (Text, Long text)
   - `textBlockTwo` (Text, Long text)
   - `textBlockThree` (Text, Long text)

3. Set `title` as display field
4. Enable Draft & Publish
5. Save and restart

### Step 6: Create Comment Content Type

1. Create new collection type named `comment`
2. Add fields:
   - `name` (Text, Required)
   - `email` (Email, Required)
   - `content` (Text, Long text, Required)
   - `post` (Relation, Comment belongs to Post)
   - `isApproved` (Boolean, Default: false)

3. Save and restart

## Setting Up API Permissions

Strapi 5 maintains the same permissions system with both Role-Based Access Control (RBAC) for admin users and Users & Permissions plugin for end-users. <mcreference link="https://docs.strapi.io/cms/features/users-permissions" index="1">1</mcreference> <mcreference link="https://docs.strapi.io/cms/features/rbac" index="3">3</mcreference>

### Step 7: Configure Public Permissions

1. Go to **Settings** → **Users & Permissions Plugin** → **Roles**
2. Click on **Public** role
3. Under **Permissions**, expand each content type and enable:

   **Author:**
   - `find` (allows fetching all authors)
   - `findOne` (allows fetching single author by documentId)

   **Category:**
   - `find` (allows fetching all categories)
   - `findOne` (allows fetching single category by documentId)

   **Post:**
   - `find` (allows fetching all posts)
   - `findOne` (allows fetching single post by documentId)

   **Comment:**
   - `find` (allows fetching comments)
   - `create` (allows submitting new comments)

4. Click **Save**

**Note for Strapi 5:** The permissions system works with both `id` and `documentId` parameters. The `findOne` permission covers both `/api/posts/:id` and `/api/posts/:documentId` endpoints.

### Step 8: Configure Authenticated Permissions (Optional)

If you plan to have user authentication:

1. Click on **Authenticated** role
2. Enable additional permissions as needed:
   - `update` and `delete` for user-generated content
   - Additional content type permissions
3. Save changes

### Advanced Permissions Configuration

For more granular control, you can also configure:

**Admin Panel Access (RBAC):** <mcreference link="https://strapi.io/blog/permissions-in-strapi" index="2">2</mcreference>
- Go to **Settings** → **Administration Panel** → **Roles**
- Create custom admin roles with specific permissions
- Assign roles to admin users

**API Token Permissions:**
- Go to **Settings** → **API Tokens**
- Create tokens with specific permissions for external integrations
- Use tokens for server-to-server communication

## Modifying Next.js Frontend

### Step 9: Install Required Dependencies

In your Next.js project directory:

```bash
cd next-js-version
npm install axios
# or
npm install node-fetch
```

### Step 10: Create Environment Configuration

Create `.env.local` file in your Next.js root:

```env
# Strapi Configuration
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your-api-token-here
```

**To get API Token:**
1. In Strapi admin: **Settings** → **API Tokens**
2. Click **Create new API Token**
3. Name: "Next.js Frontend"
4. Token duration: Unlimited
5. Token type: Read-only
6. Copy the generated token

## Creating API Helper Functions

### Step 11: Create API Helper Files

Create `src/lib/strapi.ts` for Strapi 5 with flattened response format:

```typescript
interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface StrapiSingleResponse<T> {
  data: T;
  meta: {};
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const API_TOKEN = process.env.STRAPI_API_TOKEN;

// Generic fetch function for Strapi 5
async function fetchAPI<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${STRAPI_URL}/api${path}`;
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// Fetch all posts with relations (Strapi 5)
export async function getPosts(params?: {
  page?: number;
  pageSize?: number;
  featured?: boolean;
}): Promise<StrapiResponse<any[]>> {
  const searchParams = new URLSearchParams();
  
  // Populate relations
  searchParams.append('populate[author]', '*');
  searchParams.append('populate[category]', '*');
  searchParams.append('populate[featuredImage]', '*');
  searchParams.append('populate[carouselImages]', '*');
  
  // Pagination
  if (params?.page) searchParams.append('pagination[page]', params.page.toString());
  if (params?.pageSize) searchParams.append('pagination[pageSize]', params.pageSize.toString());
  
  // Filter for featured posts
  if (params?.featured) {
    searchParams.append('filters[isFeatured][$eq]', 'true');
  }
  
  // Sort by published date (newest first)
  searchParams.append('sort[0]', 'publishedDate:desc');
  
  return fetchAPI<StrapiResponse<any[]>>(`/posts?${searchParams.toString()}`);
}

// Fetch single post by documentId (Strapi 5)
export async function getPostByDocumentId(documentId: string): Promise<StrapiSingleResponse<any> | null> {
  const searchParams = new URLSearchParams();
  
  // Populate all relations
  searchParams.append('populate[author]', '*');
  searchParams.append('populate[category]', '*');
  searchParams.append('populate[featuredImage]', '*');
  searchParams.append('populate[carouselImages]', '*');
  
  try {
    const response = await fetchAPI<StrapiSingleResponse<any>>(`/posts/${documentId}?${searchParams.toString()}`);
    return response;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

// Fetch single post by slug (Strapi 5)
export async function getPostBySlug(slug: string): Promise<StrapiSingleResponse<any> | null> {
  const searchParams = new URLSearchParams();
  
  // Populate all relations
  searchParams.append('populate[author]', '*');
  searchParams.append('populate[category]', '*');
  searchParams.append('populate[featuredImage]', '*');
  searchParams.append('populate[carouselImages]', '*');
  
  // Filter by slug
  searchParams.append('filters[slug][$eq]', slug);
  
  try {
    const response = await fetchAPI<StrapiResponse<any[]>>(`/posts?${searchParams.toString()}`);
    
    if (response.data.length === 0) {
      return null;
    }
    
    return {
      data: response.data[0],
      meta: {}
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

// Fetch all authors (Strapi 5)
export async function getAuthors(): Promise<StrapiResponse<any[]>> {
  const searchParams = new URLSearchParams();
  searchParams.append('populate[picture]', '*');
  
  return fetchAPI<StrapiResponse<any[]>>(`/authors?${searchParams.toString()}`);
}

// Fetch author by slug (Strapi 5)
export async function getAuthorBySlug(slug: string): Promise<StrapiSingleResponse<any> | null> {
  const searchParams = new URLSearchParams();
  searchParams.append('populate[picture]', '*');
  searchParams.append('filters[slug][$eq]', slug);
  
  try {
    const response = await fetchAPI<StrapiResponse<any[]>>(`/authors?${searchParams.toString()}`);
    
    if (response.data.length === 0) {
      return null;
    }
    
    return {
      data: response.data[0],
      meta: {}
    };
  } catch (error) {
    console.error('Error fetching author:', error);
    return null;
  }
}

// Fetch all categories (Strapi 5)
export async function getCategories(): Promise<StrapiResponse<any[]>> {
  return fetchAPI<StrapiResponse<any[]>>('/categories');
}

// Submit comment (Strapi 5 - using documentId)
export async function submitComment(commentData: {
  name: string;
  email: string;
  content: string;
  post: string; // documentId instead of numeric id
}): Promise<any> {
  return fetchAPI('/comments', {
    method: 'POST',
    body: JSON.stringify({ data: commentData }),
  });
}

// Helper function to get full URL for Strapi media (Strapi 5 flattened format)
export function getStrapiMediaUrl(url: string): string {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}

// Optional: Add backward compatibility for gradual migration
export async function fetchWithV4Compatibility(endpoint: string) {
  try {
    const response = await fetch(`${STRAPI_URL}${endpoint}`, {
      headers: {
        'Strapi-Response-Format': 'v4', // Use v4 format during migration
      },
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}
```

### Step 12: Create Type Definitions

Create `src/types/strapi.ts`:

```typescript
// Strapi 5 flattened response format interfaces
export interface StrapiMedia {
  id: number;
  documentId: string; // New in Strapi 5
  name: string;
  alternativeText?: string;
  caption?: string;
  width: number;
  height: number;
  formats?: {
    thumbnail?: { url: string; width: number; height: number };
    small?: { url: string; width: number; height: number };
    medium?: { url: string; width: number; height: number };
    large?: { url: string; width: number; height: number };
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string;
  provider: string;
  provider_metadata?: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null; // Can be null for draft content
  locale: string; // New in Strapi 5
}

export interface StrapiAuthor {
  id: number;
  documentId: string; // New unique identifier in Strapi 5
  name: string;
  bio: string;
  slug: string;
  picture: StrapiMedia | null; // Flattened - no more nested data/attributes
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  locale: string;
}

export interface StrapiCategory {
  id: number;
  documentId: string; // New unique identifier in Strapi 5
  name: string;
  slug: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  locale: string;
}

export interface StrapiPost {
  id: number;
  documentId: string; // New unique identifier in Strapi 5
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedDate: string;
  showCarousel: boolean;
  showTextBlockOne: boolean;
  showTextBlockTwo: boolean;
  showTextBlockThree: boolean;
  isFeatured: boolean;
  textBlockOne?: string;
  textBlockTwo?: string;
  textBlockThree?: string;
  featuredImage: StrapiMedia | null; // Flattened - no more nested structure
  carouselImages?: StrapiMedia[]; // Flattened array
  author: StrapiAuthor; // Flattened relation
  category: StrapiCategory; // Flattened relation
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null; // Can be null for draft content
  locale: string; // New in Strapi 5
}

export interface StrapiComment {
  id: number;
  documentId: string; // New unique identifier in Strapi 5
  name: string;
  email: string;
  content: string;
  isApproved: boolean;
  post: {
    documentId: string; // Use documentId for relations
    title: string;
    slug: string;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  locale: string;
}

// Draft & Publish status types (enhanced in Strapi 5)
export type PublicationStatus = 'draft' | 'published';

// Strapi 5 Document Service types
export interface DocumentServiceParams {
  documentId?: string;
  locale?: string;
  status?: PublicationStatus;
  fields?: string[];
  populate?: any;
  filters?: any;
  sort?: string | string[];
  pagination?: {
    page?: number;
    pageSize?: number;
    start?: number;
    limit?: number;
  };
}
```

## Strapi 5 TypeScript Configuration

Strapi 5 includes significant improvements to TypeScript support with a completely rewritten codebase in TypeScript.

### Enhanced TypeScript Features

**Key Improvements in Strapi 5:**
- Complete codebase migration from JavaScript to TypeScript
- Improved type system with clearer type names
- Better namespace organization
- Enhanced type safety for user-facing APIs
- Vite bundler for faster TypeScript compilation

### TypeScript Configuration Files

Strapi 5 TypeScript projects include specific configuration files:

```json
// tsconfig.json (root)
{
  "extends": "@strapi/typescript-utils/tsconfigs/server",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./",
    "allowJs": true, // For incremental migration
    "checkJs": false
  },
  "include": [
    "./",
    "./**/*.ts",
    "./**/*.js"
  ],
  "exclude": [
    "node_modules/",
    "build/",
    "dist/",
    ".cache/",
    ".tmp/",
    "src/admin/",
    "**/*.test.ts",
    "**/*.test.js"
  ]
}
```

```json
// src/admin/tsconfig.json (admin panel)
{
  "extends": "@strapi/typescript-utils/tsconfigs/admin",
  "include": [
    "../plugins/**/admin/src/**/*",
    "./"
  ],
  "exclude": [
    "node_modules/",
    "build/",
    "dist/",
    "**/*.test.ts",
    "**/*.test.js"
  ]
}
```

### TypeScript Configuration for Strapi Features

```typescript
// config/typescript.ts
export default {
  // Enable TypeScript compilation
  compile: true,
  // Auto-generate types
  autogenerate: true,
  // Type generation options
  generateTypes: {
    // Generate types for content-types
    contentTypes: true,
    // Generate types for components
    components: true,
    // Output directory for generated types
    outputDir: './types/generated',
  },
};
```

### Using Generated Types

Strapi 5 can auto-generate TypeScript types for your content-types:

```typescript
// types/generated/contentTypes.ts (auto-generated)
export interface Api {
  'api::post.post': {
    id: number;
    documentId: string;
    title: string;
    slug: string;
    content: string;
    // ... other fields
  };
  'api::author.author': {
    id: number;
    documentId: string;
    name: string;
    bio: string;
    // ... other fields
  };
}

// Using generated types in your code
import type { Api } from './types/generated/contentTypes';

export async function getPost(documentId: string): Promise<Api['api::post.post'] | null> {
  // Type-safe API calls
  const response = await strapi.documents('api::post.post').findOne({
    documentId,
    populate: '*'
  });
  
  return response;
}
```

### Adding TypeScript to Existing Strapi Project

If you have an existing Strapi project, you can add TypeScript support:

```bash
# Install TypeScript dependencies
npm install typescript @strapi/typescript-utils

# Add TypeScript configuration files
# (create tsconfig.json files as shown above)

# Rebuild admin panel with TypeScript support
npm run build
npm run develop
```

## Updating Components

### Step 13: Update Data Interfaces

Update `src/data/posts.ts` to include Strapi transformation functions:

```typescript
import { StrapiPost, StrapiAuthor, StrapiCategory } from '../types/strapi';
import { getStrapiMediaUrl } from '../lib/strapi';

// Keep existing PostData interface for compatibility
export interface PostData {
  id: number;
  title: string;
  category: string;
  publishedDate: string;
  dateTime: string;
  excerpt: string;
  imageSrc: string;
  href: string;
  description?: string;
  content?: string;
  author?: string;
  carouselImages?: string[];
  showCarousel?: boolean;
  textBlockOne?: string;
  textBlockTwo?: string;
  textBlockThree?: string;
  showTextBlockOne?: boolean;
  showTextBlockTwo?: boolean;
  showTextBlockThree?: boolean;
}

// Transform Strapi post to PostData format
export function transformStrapiPost(strapiPost: StrapiPost): PostData {
  const { attributes } = strapiPost;
  
  return {
    id: strapiPost.id,
    title: attributes.title,
    category: attributes.category?.data?.attributes?.name || 'Uncategorized',
    publishedDate: new Date(attributes.publishedDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    dateTime: attributes.publishedDate,
    excerpt: attributes.excerpt,
    imageSrc: getStrapiMediaUrl(attributes.featuredImage?.data?.attributes?.url || ''),
    href: `/posts/${attributes.slug}`,
    description: attributes.excerpt,
    content: attributes.content,
    author: attributes.author?.data?.attributes?.name,
    carouselImages: attributes.carouselImages?.data?.map(
      img => getStrapiMediaUrl(img.attributes.url)
    ) || [],
    showCarousel: attributes.showCarousel,
    textBlockOne: attributes.textBlockOne,
    textBlockTwo: attributes.textBlockTwo,
    textBlockThree: attributes.textBlockThree,
    showTextBlockOne: attributes.showTextBlockOne,
    showTextBlockTwo: attributes.showTextBlockTwo,
    showTextBlockThree: attributes.showTextBlockThree,
  };
}

// Transform Strapi author to Author format
export function transformStrapiAuthor(strapiAuthor: StrapiAuthor) {
  const { attributes } = strapiAuthor;
  
  return {
    id: attributes.slug,
    name: attributes.name,
    bio: attributes.bio,
    picture: getStrapiMediaUrl(attributes.picture?.data?.attributes?.url || ''),
  };
}
```

### Step 14: Update Home Page

Update `src/app/page.tsx`:

```typescript
import { getPosts } from '../lib/strapi';
import { transformStrapiPost } from '../data/posts';
import Home from '../components/home';

export default async function HomePage() {
  try {
    // Fetch featured posts
    const featuredResponse = await getPosts({ featured: true, pageSize: 3 });
    const featuredPosts = featuredResponse.data.map(transformStrapiPost);
    
    // Fetch recent posts
    const recentResponse = await getPosts({ pageSize: 6 });
    const recentPosts = recentResponse.data.map(transformStrapiPost);
    
    return (
      <Home 
        heroPostsData={featuredPosts}
        postsData={recentPosts}
      />
    );
  } catch (error) {
    console.error('Error fetching posts:', error);
    
    // Fallback to empty arrays or show error message
    return (
      <Home 
        heroPostsData={[]}
        postsData={[]}
      />
    );
  }
}
```

### Step 15: Update Post Detail Page

Update `src/app/posts/[slug]/page.tsx`:

```typescript
import { notFound } from 'next/navigation';
import { getPostBySlug, getPosts } from '../../../lib/strapi';
import { transformStrapiPost } from '../../../data/posts';
import { getStrapiMediaUrl } from '../../../lib/strapi';
// Import your existing post components

interface PostPageProps {
  params: {
    slug: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const postResponse = await getPostBySlug(params.slug);
  
  if (!postResponse) {
    notFound();
  }
  
  const post = transformStrapiPost(postResponse.data);
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Your existing post layout */}
      <article>
        <header>
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-gray-600">{post.publishedDate}</span>
            <span className="text-gray-600">by {post.author}</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
              {post.category}
            </span>
          </div>
        </header>
        
        {post.imageSrc && (
          <img 
            src={post.imageSrc} 
            alt={post.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
        )}
        
        <div 
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content || '' }}
        />
        
        {post.showTextBlockOne && post.textBlockOne && (
          <div className="my-8 p-4 bg-gray-50 rounded-lg">
            <p>{post.textBlockOne}</p>
          </div>
        )}
        
        {post.showCarousel && post.carouselImages && post.carouselImages.length > 0 && (
          <div className="my-8">
            {/* Your carousel component */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {post.carouselImages.map((image, index) => (
                <img 
                  key={index}
                  src={image} 
                  alt={`${post.title} - Image ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        )}
        
        {post.showTextBlockTwo && post.textBlockTwo && (
          <div className="my-8 p-4 bg-gray-50 rounded-lg">
            <p>{post.textBlockTwo}</p>
          </div>
        )}
        
        {post.showTextBlockThree && post.textBlockThree && (
          <div className="my-8 p-4 bg-gray-50 rounded-lg">
            <p>{post.textBlockThree}</p>
          </div>
        )}
      </article>
    </div>
  );
}

// Generate static params for all posts
export async function generateStaticParams() {
  try {
    const response = await getPosts({ pageSize: 100 });
    
    return response.data.map((post) => ({
      slug: post.attributes.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}
```

### Step 16: Update Posts List Page

Update `src/app/posts/page.tsx`:

```typescript
import { getPosts } from '../../lib/strapi';
import { transformStrapiPost } from '../../data/posts';
import PostCard from '../../components/PostCard';

interface PostsPageProps {
  searchParams: {
    page?: string;
  };
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const currentPage = parseInt(searchParams.page || '1');
  const pageSize = 12;
  
  try {
    const response = await getPosts({ 
      page: currentPage, 
      pageSize 
    });
    
    const posts = response.data.map(transformStrapiPost);
    const pagination = response.meta.pagination;
    
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">All Posts</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        
        {pagination && pagination.pageCount > 1 && (
          <div className="mt-12 flex justify-center">
            {/* Your pagination component */}
            <div className="flex gap-2">
              {Array.from({ length: pagination.pageCount }, (_, i) => i + 1).map((page) => (
                <a
                  key={page}
                  href={`/posts?page=${page}`}
                  className={`px-4 py-2 rounded ${
                    page === currentPage
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {page}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Error fetching posts:', error);
    
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">All Posts</h1>
        <p className="text-red-600">Error loading posts. Please try again later.</p>
      </div>
    );
  }
}
```

## Testing the Integration

### Step 17: Add Sample Content

1. Start both servers:
   ```bash
   # Terminal 1 - Strapi
   cd strapi-backend
   npm run develop
   
   # Terminal 2 - Next.js
   cd next-js-version
   npm run dev
   ```

2. In Strapi admin (`http://localhost:1337/admin`):
   - Create authors in **Content Manager** → **Authors**
   - Create categories in **Content Manager** → **Categories**
   - Create posts in **Content Manager** → **Posts**
   - Upload images for featured images and carousel

3. Test your Next.js site at `http://localhost:3000`

### Step 18: Verify API Endpoints

Test these URLs in your browser:
- `http://localhost:1337/api/posts?populate=*`
- `http://localhost:1337/api/authors?populate=*`
- `http://localhost:1337/api/categories`

## Deployment

### Step 19: Deploy to Strapi Cloud

1. **Prepare for deployment:**
   ```bash
   cd strapi-backend
   git init
   git add .
   git commit -m "Initial Strapi setup"
   ```

2. **Push to GitHub:**
   - Create new repository on GitHub
   - Push your Strapi code

3. **Deploy to Strapi Cloud:**
   - Visit [Strapi Cloud](https://strapi.io/cloud)
   - Connect your GitHub repository
   - Follow deployment wizard
   - Note your production URL

4. **Update Next.js environment:**
   ```env
   NEXT_PUBLIC_STRAPI_URL=https://your-project.strapiapp.com
   STRAPI_API_TOKEN=your-production-token
   ```

### Step 20: Deploy Next.js

Deploy your Next.js app to Vercel, Netlify, or your preferred platform with the updated environment variables.

## Strapi 5 New Features and Improvements

### Key Enhancements in Strapi 5

**Performance Improvements:** <mcreference link="https://strapi.io/blog/vite-and-typescript-strapi-5" index="1">1</mcreference>
- **Vite Bundler**: Faster development builds and hot module replacement
- **TypeScript Rewrite**: Complete codebase migration for better performance and type safety
- **Improved Admin Panel**: Faster loading times and better user experience

**Document Service API Benefits:**
- **Simplified API Structure**: Flattened response format reduces complexity
- **Better Performance**: Optimized queries and reduced data transfer
- **Enhanced Developer Experience**: More intuitive API design

**Content Management Improvements:**
- **Draft & Publish Workflow**: Enhanced content lifecycle management
- **Better Localization**: Improved internationalization support
- **Advanced Relations**: More flexible content relationships

### Migration from Strapi v4

If you're migrating from Strapi v4, key considerations include:

**Automatic Migrations:**
- Database schema updates are handled automatically
- Most Entity Service calls are migrated via codemods
- Admin panel configurations are preserved

**Manual Updates Required:**
- Custom Entity Service decorators → Document Service middlewares
- Custom `findOne` calls with specific `id` parameters
- Frontend API calls to use new response format
- TypeScript type definitions

**Migration Command:**
```bash
# Run Strapi 5 migration
npx @strapi/upgrade major
```

**Compatibility Mode:**
Use the `Strapi-Response-Format: v4` header during migration to maintain v4 response format temporarily:

```javascript
// Temporary compatibility for gradual migration
const response = await fetch('/api/posts', {
  headers: {
    'Strapi-Response-Format': 'v4'
  }
});
```

## Advanced Features

### Step 21: Implement Search

Add search functionality to your Strapi API:

```typescript
// In src/lib/strapi.ts
export async function searchPosts(query: string): Promise<StrapiResponse<any[]>> {
  const searchParams = new URLSearchParams();
  
  // Populate relations
  searchParams.append('populate[author]', '*');
  searchParams.append('populate[category]', '*');
  searchParams.append('populate[featuredImage]', '*');
  
  // Search in title, excerpt, and content
  searchParams.append('filters[$or][0][title][$containsi]', query);
  searchParams.append('filters[$or][1][excerpt][$containsi]', query);
  searchParams.append('filters[$or][2][content][$containsi]', query);
  
  return fetchAPI<StrapiResponse<any[]>>(`/posts?${searchParams.toString()}`);
}
```

### Step 22: Add Comment System

Implement the comment system using your existing comment content type:

```typescript
// In src/components/CommentForm.tsx
import { submitComment } from '../lib/strapi';

export default function CommentForm({ postId }: { postId: number }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    content: ''
  });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await submitComment({
        ...formData,
        post: postId
      });
      
      // Reset form and show success message
      setFormData({ name: '', email: '', content: '' });
      alert('Comment submitted for review!');
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('Error submitting comment. Please try again.');
    }
  };
  
  // Your form JSX here
}
```

### Step 23: Implement ISR (Incremental Static Regeneration)

Add ISR to your pages for better performance:

```typescript
// In your page components
export const revalidate = 60; // Revalidate every 60 seconds
```

### Step 24: Add Webhooks for Real-time Updates

1. In Strapi admin: **Settings** → **Webhooks**
2. Add webhook URL: `https://your-nextjs-app.com/api/revalidate`
3. Create API route in Next.js:

```typescript
// src/app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Revalidate relevant paths based on the webhook event
    if (body.model === 'post') {
      revalidatePath('/');
      revalidatePath('/posts');
      if (body.entry?.slug) {
        revalidatePath(`/posts/${body.entry.slug}`);
      }
    }
    
    return NextResponse.json({ revalidated: true });
  } catch (error) {
    return NextResponse.json({ error: 'Error revalidating' }, { status: 500 });
  }
}
```

## Troubleshooting

### Common Strapi 5 Issues:

1. **Document Service API Errors**: 
   - **Issue**: `strapi.entityService is not a function`
   - **Solution**: Update to use `strapi.documents()` instead of `strapi.entityService`

2. **Response Format Issues**:
   - **Issue**: Data nested under `attributes` property
   - **Solution**: Update frontend code to use flattened response format or add `Strapi-Response-Format: v4` header temporarily

3. **DocumentId vs ID Confusion**:
   - **Issue**: API calls failing with `documentId` parameter
   - **Solution**: Use `documentId` for content identification, `id` for database records

4. **TypeScript Compilation Errors**:
   - **Issue**: Type errors after Strapi 5 upgrade
   - **Solution**: Update TypeScript configuration and regenerate types

### Common General Issues:

1. **CORS Errors**: Configure CORS in Strapi's `config/middlewares.ts`
2. **Permission Denied**: Check API permissions in Strapi admin panel
3. **Image URLs**: Ensure media URLs are properly constructed with base URL
4. **Environment Variables**: Verify all environment variables are set correctly

### Strapi 5 Migration Issues:

1. **Codemod Failures**:
   - **Issue**: `__TODO__` placeholders in migrated code
   - **Solution**: Manually replace with appropriate `documentId` values

2. **Custom Entity Service Decorators**:
   - **Issue**: Custom decorators not working
   - **Solution**: Migrate to Document Service middlewares

3. **Database Connection Issues**:
   - **Issue**: Database connection errors after upgrade
   - **Solution**: Update database configuration for Strapi 5 requirements

### Performance Optimization:

1. **Image Optimization**: Use Next.js Image component with Strapi images
2. **Caching**: Implement proper caching strategies with new response format
3. **Bundle Size**: Only import necessary Strapi data
4. **Vite Benefits**: Leverage Strapi 5's Vite bundler for faster development

## Conclusion

You now have a fully functional blog powered by **Strapi 5** CMS and Next.js! This guide has been updated to leverage all the latest Strapi 5 features including:

✅ **Document Service API** for improved performance and developer experience  
✅ **Flattened response format** for simpler data handling  
✅ **Enhanced TypeScript support** with auto-generated types  
✅ **Vite bundler** for faster development builds  
✅ **Improved permissions system** with RBAC and Users & Permissions plugin  

Your content creators can manage posts, authors, and categories through the modern Strapi 5 admin interface, while your Next.js frontend provides a fast, SEO-friendly user experience with the latest API improvements.

### Next Steps:

- **Explore Strapi 5 Features**: Take advantage of the new Document Service API and improved TypeScript support
- **Implement Advanced Features**: Add user authentication, search functionality, and comment systems
- **Optimize Performance**: Leverage Vite bundler and new caching strategies
- **Add Internationalization**: Use Strapi 5's enhanced localization features
- **Set up CI/CD**: Implement automated deployments with the new migration tools
- **Monitor and Scale**: Set up proper monitoring for your Strapi 5 application

### Resources:

- **Strapi 5 Documentation**: [docs.strapi.io](https://docs.strapi.io)
- **Migration Guide**: [Strapi v4 to v5 Migration](https://docs.strapi.io/dev-docs/migration/v4-to-v5)
- **Next.js Documentation**: [nextjs.org/docs](https://nextjs.org/docs)
- **TypeScript with Strapi**: [Strapi TypeScript Guide](https://docs.strapi.io/cms/typescript)

This implementation guide ensures your blog is built with the latest Strapi 5 best practices and is ready for production use!