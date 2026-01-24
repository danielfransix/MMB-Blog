# Strapi Integration Implementation Guide

This guide details the specific steps to integrate Strapi CMS with the project located at `c:\Github Repos\MMB-Blog\next-js-version-strapi-copy`.

## 1. Project Structure Setup

We will create a new Strapi project as a sibling to your Next.js app.

-   **Root Directory**: `c:\Github Repos\MMB-Blog`
-   **Frontend**: `c:\Github Repos\MMB-Blog\next-js-version-strapi-copy`
-   **Backend (New)**: `c:\Github Repos\MMB-Blog\cms`

## Phase 1: Install Strapi CMS

Open your terminal (PowerShell) and run the following commands:

1.  Navigate to the repository root:
    ```powershell
    cd "c:\Github Repos\MMB-Blog"
    ```

2.  Create the Strapi project (we'll call it `cms`):
    ```powershell
    npx create-strapi-app@latest cms --quickstart --no-run --skip-cloud
    ```
    *   *Note: `--quickstart` uses SQLite (easiest for local dev). `--no-run` prevents immediate start. `--skip-cloud` bypasses Strapi Cloud login for a strictly local setup.*

3.  Start Strapi in development mode:
    ```powershell
    cd cms
    npm run develop
    ```
    *   This will open `http://localhost:1337/admin`.
    *   Create your first Admin user when prompted.

## Phase 2: Configure Strapi Content (Admin Panel)

Go to `http://localhost:1337/admin`. We need to create two Content Types.

### 1. Create "About Page" (Single Type)
1.  Go to **Content-Type Builder**.
2.  Click **Create new single type**.
3.  Display name: `About Page`.
4.  Click **Continue**.
5.  Add the following fields:
    *   **Text** (Short Text): Name it `title`.
    *   **Blocks** (Rich Text): Name it `content`.
6.  Click **Save**.

### 2. Create "Author" (Collection Type)
1.  Go to **Content-Type Builder**.
2.  Click **Create new collection type**.
3.  Display name: `Author`.
4.  Click **Continue**.
5.  Add the following fields:
    *   **Text** (Short Text): Name it `name`.
    *   **Text** (Long Text): Name it `bio`.
    *   **Media** (Single Media): Name it `picture`.
6.  Click **Save**.

### 3. Create Components (For Dynamic Content)
We need to create "components" first so we can use them in the Article's Dynamic Zone. This allows you to mix text, images, and other blocks freely.

1.  Go to **Content-Type Builder**.
2.  Click **Create new component** (in the left sidebar).
3.  **Component 1: Rich Text**
    *   Display name: `RichText`.
    *   Category: `Shared`.
    *   Add field: **Blocks** (Rich Text). Name it `body`.
    *   Click **Finish**.
4.  **Component 2: Media**
    *   Click **Create new component** again.
    *   Display name: `Media`.
    *   Category: `Shared`.
    *   Add field: **Media** (Single media). Name it `file`.
    *   Add field: **Text** (Short text). Name it `caption` (optional).
    *   Click **Finish**.

### 4. Create "Article" (Collection Type)
1.  Go to **Content-Type Builder**.
2.  Click **Create new collection type**.
3.  Display name: `Article`.
4.  Click **Continue**.
5.  Add the following fields:
    *   **Text** (Short Text): Name it `title`.
    *   **UID**: Name it `slug`. Attached field: `title`.
    *   **Text** (Long Text): Name it `excerpt`.
    *   **Media** (Single media): Name it `coverImage`.
    *   **Dynamic Zone**: 
        *   Name it `blocks`.
        *   Click **Add components to the zone**.
        *   Select **Use existing components**.
        *   Select `Shared.RichText` and `Shared.Media`.
        *   Click **Finish**.
    *   **Relation**: 
        *   Click the **Relation** field.
        *   Select **Author** from the right-hand list.
        *   Choose the relationship: **Authors has many Articles** (one author can write many articles).
        *   Name the field in Article: `author`.
    *   **Enumeration**: Name it `category`. Values: `Technology`, `Design`, `Development`.
    *   **Date** (Date only): Name it `publishedDate` (or just use the system `publishedAt` if preferred).
6.  Click **Save**.

### 5. Set Permissions (Crucial!)
1.  Go to **Settings** > **Users & Permissions Plugin** > **Roles**.
2.  Click **Public**.
3.  Under **About-page**, check `find`.
4.  Under **Author**, check `find` and `findOne`.
5.  Under **Article**, check `find` and `findOne`.
6.  Click **Save**.

### 6. Add Dummy Data
1.  Go to **Content Manager**.
2.  **Author**: Create a few authors (e.g., "Daniel Fransix", "Stephanie Ani"). Upload their pictures.
3.  **About Page**: Add a title (e.g., "About MakeMeBeautiful") and some text in the blocks field. **Save** and **Publish**.
4.  **Article**: Create a new entry.
    *   Upload a cover image.
    *   In the **Blocks** (Dynamic Zone) area, click **+** to add components.
    *   Add a **RichText** component and write some text.
    *   Add a **Media** component and upload an image.
    *   Rearrange them as needed.
    *   Select an **Author** from the dropdown.
    *   **Save** and **Publish**.

## Phase 3: Setup Next.js Frontend

Open a **new** terminal (keep Strapi running in the first one).

1.  Navigate to the frontend copy:
    ```powershell
    cd "c:\Github Repos\MMB-Blog\next-js-version-strapi-copy"
    ```

2.  Install required packages:
    ```powershell
    npm install qs @strapi/blocks-react-renderer
    ```

3.  Create Environment Variable file:
    Create a file named `.env.local` in the frontend root:
    ```env
    NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
    NEXT_PUBLIC_STRAPI_API_TOKEN=
    ```

4.  Update `next.config.ts` to allow local images:
    ```typescript
    import type { NextConfig } from "next";

    const nextConfig: NextConfig = {
      images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'localhost',
            port: '1337',
            pathname: '/uploads/**',
          },
        ],
      },
    };

    export default nextConfig;
    ```

## Phase 4: Frontend Code Implementation

### 1. Create API Utility
Create `src/lib/strapi.ts`:

```typescript
import qs from "qs";

export function getStrapiURL(path = "") {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
  }${path}`;
}

export async function fetchAPI(
  path: string,
  urlParamsObject = {},
  options = {}
) {
  try {
    const mergedOptions = {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    };

    const queryString = qs.stringify(urlParamsObject);
    const requestUrl = `${getStrapiURL(
      `/api${path}${queryString ? `?${queryString}` : ""}`
    )}`;

    const response = await fetch(requestUrl, mergedOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    // Return null to allow fallback UI to handle the error gracefully
    return null;
  }
}

export function getStrapiMedia(url: string | null) {
  if (url == null) {
    return null;
  }
  if (url.startsWith("data:")) {
    return url;
  }
  if (url.startsWith("http") || url.startsWith("//")) {
    return url;
  }
  return `${getStrapiURL()}${url}`;
}
```

### 2. Update About Page
Edit `src/app/about/page.tsx`:

```typescript
import { fetchAPI } from "../../lib/strapi";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import ContactForm from "../../components/ContactForm";

async function getAboutPageData() {
  try {
    const data = await fetchAPI("/about-page", {
      populate: "*",
    });
    return data?.data;
  } catch (error) {
    console.error("Error fetching about page:", error);
    return null;
  }
}

export default async function About() {
  const strapiData = await getAboutPageData();

  // Fallback if Strapi is down or empty
  if (!strapiData) {
    return (
      <div className="page-main-container">
        <div className="content-container-wide py-20 text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Failed to pull content</h2>
          <p className="text-gray-600">
            We are unable to load the About page content at this moment. 
            Please check your connection or try again later.
          </p>
        </div>
      </div>
    );
  }

  const { title, content } = strapiData;

  return (
    <div className="page-main-container">
      <section className="page-section-container">
        <div className="page-content-wrapper">
          <div className="page-content-inner">
            <div className="content-container-wide">
              <div className="about-page-header">
                <h1 className="page-title-large">{title}</h1>
              </div>
              <div className="flex flex-col items-start gap-2">
                <div className="w-full prose lg:prose-xl text-gray-600 leading-relaxed mb-4">
                  {/* Render Strapi Blocks */}
                  <BlocksRenderer content={content} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section-bg-gray">
        <div className="page-content-wrapper">
          <div className="page-content-inner">
            <div className="content-container-wide">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
```

### 3. Update Blog Listing Page
Edit `src/app/posts/page.tsx`.

```typescript
import { fetchAPI, getStrapiMedia } from "../../lib/strapi";
import PostCard from "../../components/PostCard";

async function getPosts() {
  const data = await fetchAPI("/articles", {
    populate: "*",
    sort: ["publishedAt:desc"],
  });
  return data?.data || [];
}

export default async function PostsPage() {
  const posts = await getPosts();

  // Fallback if content fetch failed or no posts exist
  if (!posts || posts.length === 0) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Failed to pull content</h2>
        <p className="text-gray-600">
          We couldn't load the latest posts. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post: any) => (
          <PostCard
            key={post.id}
            title={post.title}
            excerpt={post.excerpt}
            imageSrc={getStrapiMedia(post.coverImage?.url)}
            href={`/posts/${post.slug}`}
            category={post.category}
            date={new Date(post.publishedAt).toLocaleDateString()}
            author={post.author}
          />
        ))}
      </div>
    </div>
  );
}
```

### 4. Update Individual Blog Post
Edit `src/app/posts/[slug]/page.tsx` to handle Dynamic Zones:

```typescript
import { fetchAPI, getStrapiMedia } from "../../../lib/strapi";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Image from "next/image";
import AuthorInfo from "../../../components/AuthorInfo";
import { notFound } from "next/navigation";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const data = await fetchAPI("/articles", {
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: {
      coverImage: "*",
      author: {
        populate: "*"
      },
      blocks: {
        populate: "*"
      }
    },
  });

  const post = data?.data?.[0];

  // Fallback for missing post or API error
  if (!post) {
    return (
      <div className="container mx-auto py-20 text-center">
         <h2 className="text-2xl font-bold text-red-500 mb-4">Failed to pull content</h2>
         <p className="text-gray-600">
           This post could not be loaded or does not exist.
         </p>
      </div>
    );
  }

  return (
    <div className="blog-post-container">
      <article className="blog-post-article">
        <header className="blog-post-header">
          <h1 className="blog-post-title">{post.title}</h1>
          <AuthorInfo
            authorName={post.author?.name}
            publishedDate={new Date(post.publishedAt).toLocaleDateString()}
            className="blog-post-author-info"
          />
        </header>

        <div className="blog-post-image-container">
           {post.coverImage?.url && (
            <Image
              src={getStrapiMedia(post.coverImage.url)!}
              alt={post.title}
              width={800}
              height={400}
              className="blog-post-featured-image rounded-[2px]"
            />
           )}
        </div>

        <div className="blog-post-text-block prose max-w-none">
          {/* Render Dynamic Zone Blocks */}
          {post.blocks?.map((block: any, index: number) => {
            switch (block.__component) {
              case 'shared.rich-text':
                return (
                  <div key={index} className="mb-8">
                    <BlocksRenderer content={block.body} />
                  </div>
                );
              case 'shared.media':
                const imageUrl = getStrapiMedia(block.file?.url);
                return imageUrl ? (
                  <div key={index} className="mb-8">
                    <Image 
                      src={imageUrl} 
                      alt={block.caption || "Blog image"} 
                      width={800} 
                      height={500}
                      className="rounded-[2px] w-full h-auto"
                    />
                    {block.caption && <p className="text-center text-gray-500 text-sm mt-2">{block.caption}</p>}
                  </div>
                ) : null;
              default:
                return null;
            }
          })}
          
          {!post.blocks && post.content && (
             // Fallback for legacy simple rich text content
             <BlocksRenderer content={post.content} />
          )}
        </div>
      </article>
    </div>
  );
}
```

## Phase 5: Verification

1.  Ensure Strapi is running (`http://localhost:1337/admin`).
2.  Start Next.js:
    ```powershell
    cd "c:\Github Repos\MMB-Blog\next-js-version-strapi-copy"
    npm run dev
    ```
3.  Visit `http://localhost:3000/about`. Verify the text matches what you entered in Strapi.
4.  **Test Fallback**: Stop the Strapi server (Ctrl+C). Refresh `http://localhost:3000/about`. You should see the "Failed to pull content" message.
5.  Restart Strapi. Visit `http://localhost:3000/posts`. Verify the list of articles appears.

## Phase 6: Future Deployment (Self-Hosted)

This guide focuses on local development. When you are ready to go live, you can self-host this Strapi instance on any provider (VPS like DigitalOcean/Hetzner, or PaaS like Render/Railway) without using Strapi Cloud.

*   **Database**: For production, you will likely switch from SQLite to PostgreSQL.
*   **Media**: You may want to configure an S3 provider (AWS S3, Cloudinary, etc.) for image hosting if your host doesn't have persistent storage.
*   **Next.js**: Can be deployed to Vercel, Netlify, or the same VPS as Strapi.
