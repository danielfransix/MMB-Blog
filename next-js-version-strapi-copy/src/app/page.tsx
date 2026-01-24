import Link from "next/link";
import PostCard from "../components/PostCard";
import HeroCarousel from "../components/HeroCarousel";
import { fetchAPI, getStrapiMedia } from "../lib/strapi";

async function getArticles() {
  const data = await fetchAPI("/articles", {
    populate: {
      coverImage: {
        fields: ["url", "alternativeText", "caption", "width", "height"]
      },
      author: {
        populate: "*"
      }
    },
    sort: ["publishedAt:desc"],
  });
  return data?.data || [];
}

export default async function Home() {
  const articles = await getArticles();

  const formattedPosts = articles.map((post: any) => ({
    id: post.id,
    title: post.title,
    href: `/posts/${post.slug}`,
    imageSrc: getStrapiMedia(post.coverImage?.url) || '/img/logo.jpg',
    category: post.category || 'General', // Fallback if category is missing
    publishedDate: new Date(post.publishedAt).toLocaleDateString(),
    dateTime: post.publishedAt,
    description: post.excerpt,
    authorName: post.author?.name,
    featured: post.featured || false
  }));

  // Use featured posts for the hero carousel, fallback to latest 3 if none featured
  let heroPosts = formattedPosts.filter((post: any) => post.featured);
  
  if (heroPosts.length === 0) {
    heroPosts = formattedPosts.slice(0, 3);
  }

  // Use the rest (or all if you prefer duplication) for the grid
  // Typically homepage shows recent posts in grid too, maybe skipping the hero ones?
  // The original code used heroPostsData and postsData separately. 
  // Let's just use all posts for the grid, or maybe slice.
  // The original code sliced 0-6 for the grid.
  const gridPosts = formattedPosts;

  return (
    <div className="page-main-container">
      {/* Hero Carousel Section */}
      <section className="page-section-container">
        {heroPosts.length > 0 && (
          <HeroCarousel posts={heroPosts} />
        )}
      </section>

      {/* Featured Posts Section */}
      <section className="page-section-container">
        <div className="page-content-wrapper">
          <div className="page-content-inner">
            <div className="page-header-container">
              <h3 className="page-title-main">Latest Posts</h3>
              <Link href="/posts">
                <button className="page-view-all-button">
                  View All Posts
                </button>
              </Link>
            </div>
            <div className="page-posts-grid">
              {gridPosts.length > 0 ? (
                gridPosts.map((post: any) => (
                  <PostCard
                    key={post.id}
                    title={post.title}
                    href={post.href}
                    imageSrc={post.imageSrc}
                    publishedDate={post.publishedDate}
                    dateTime={post.dateTime}
                    authorName={post.authorName}
                  />
                ))
              ) : (
                 <div className="col-span-full text-center py-10 text-gray-500">
                   No posts available yet.
                 </div>
              )}
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
