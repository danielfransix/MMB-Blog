import { Suspense } from "react";
import SearchClient from "./SearchClient";
import { fetchAPI, getStrapiMedia } from "../../lib/strapi";

async function getArticles(query?: string) {
  // Fetch all articles (up to a reasonable limit) to perform deep search
  // since Strapi doesn't support filtering on dynamic zones (blocks) easily.
  const data = await fetchAPI("/articles", {
    populate: {
      coverImage: {
        fields: ["url", "alternativeText", "caption", "width", "height"]
      },
      author: {
        populate: "*"
      },
      // category is an enum, so no need to populate it
      blocks: {
        populate: "*"
      }
    },
    sort: ["publishedAt:desc"],
    pagination: {
      limit: 100 // Fetch a large number to ensure we cover most posts
    }
  });

  const allArticles = data?.data || [];
  
  console.log(`[SearchPage] Fetched ${allArticles.length} articles from Strapi`);

  if (!query) {
    return allArticles;
  }

  const searchLower = query.toLowerCase();
  console.log(`[SearchPage] Filtering for query: "${searchLower}"`);

  // Perform filtering in Node.js
  const filtered = allArticles.filter((post: any) => {
    // Check title
    if (post.title?.toLowerCase().includes(searchLower)) return true;
    
    // Check excerpt
    if (post.excerpt?.toLowerCase().includes(searchLower)) return true;
    
    // Check dynamic zone blocks
    if (post.blocks) {
      const bodyText = extractTextFromBlocks(post.blocks);
      if (bodyText.toLowerCase().includes(searchLower)) return true;
    }

    return false;
  });

  console.log(`[SearchPage] Found ${filtered.length} matches`);
  return filtered;
}

function extractTextFromRichText(nodes: any[]): string {
  if (!nodes || !Array.isArray(nodes)) return '';
  
  return nodes.map(node => {
    if (node.text) {
      return node.text;
    }
    if (node.children) {
      return extractTextFromRichText(node.children);
    }
    return '';
  }).join(' ');
}

function extractTextFromBlocks(blocks: any[]): string {
  if (!blocks || !Array.isArray(blocks)) return '';
  
  return blocks.map(block => {
    if (block.__component === 'shared.rich-text' && block.body) {
      return extractTextFromRichText(block.body);
    }
    return '';
  }).join(' ');
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const articles = await getArticles(q);
  
  const formattedPosts = articles.map((post: any) => {
    // Extract text from blocks for search
    let bodyContent = '';
    if (post.blocks) {
      post.blocks.forEach((block: any) => {
        if (block.__component === 'shared.rich-text' && block.body) {
          bodyContent += extractTextFromRichText(block.body) + ' ';
        }
      });
    }
    
    // Also check legacy content field if blocks is empty
    if (!bodyContent && post.content) {
      // Assuming post.content is a string (markdown) or similar
      bodyContent = typeof post.content === 'string' ? post.content : '';
    }

    return {
      id: post.id,
      title: post.title,
      href: `/posts/${post.slug}`,
      imageSrc: getStrapiMedia(post.coverImage?.url) || '/img/logo.jpg',
      category: post.category || 'General',
      publishedDate: new Date(post.publishedAt).toLocaleDateString(),
      dateTime: post.publishedAt,
      excerpt: post.excerpt || '',
      authorName: post.author?.name,
      bodyText: bodyContent
    };
  });

  return (
    <Suspense fallback={<div className="page-main-container"><div className="page-section-container">Loading...</div></div>}>
      <SearchClient initialPosts={formattedPosts} />
    </Suspense>
  );
}