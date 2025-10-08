import Link from "next/link";
import PostCard from "../components/PostCard";
import HeroCarousel from "../components/HeroCarousel";
import { heroPostsData, postsData } from "../data/posts";

// Hero posts data is now imported from ../data/posts

// Posts data is now imported from ../data/posts

export default function Home() {
  return (
    <div className="page-main-container">
      {/* Hero Carousel Section */}
      <section className="page-section-container">
        <HeroCarousel posts={heroPostsData.map(post => ({
          ...post,
          description: post.description || post.excerpt
        }))} />
      </section>

      {/* Featured Posts Section */}
      <section className="page-section-container">
        <div className="page-content-wrapper">
          <div className="page-content-inner">
            <div className="page-header-container">
              <h3 className="page-title-main">All Posts</h3>
              <Link href="/posts">
                <button className="page-view-all-button">
                  View All Posts
                </button>
              </Link>
            </div>
            <div className="page-posts-grid">
              {postsData.slice(0, 6).map((post) => (
                <PostCard
                  key={post.id}
                  title={post.title}
                  href={post.href}
                  imageSrc={post.imageSrc}
                  publishedDate={post.publishedDate}
                  dateTime={post.dateTime}
                />
              ))}
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
