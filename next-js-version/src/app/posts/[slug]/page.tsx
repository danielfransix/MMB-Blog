"use client";
import { notFound } from "next/navigation";
import Image from "next/image";
import { heroPostsData, postsData } from "../../../data/posts";
import { commentsData } from "../../../data/comments";
import AuthorInfo from "../../../components/AuthorInfo";
import { useState, use } from "react";
import PostCard from "../../../components/PostCard";
import Comment from "../../../components/Comment";
import CommentForm from "../../../components/CommentForm";
import NewsletterSubscription from "../../../components/NewsletterSubscription";
import BlogImageCarousel from "../../../components/BlogImageCarousel";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  // Unwrap the params Promise
  const { slug } = use(params);

  // Find the post by slug
  const allPosts = [...heroPostsData, ...postsData];
  const post = allPosts.find(p => {
    const postSlug = p.href.split('/').pop();
    return postSlug === slug;
  });

  if (!post) {
    notFound();
  }

  const handleComment = (data: { name: string; email: string; comment: string }) => {
    // Handle comment submission
    console.log('Comment submitted:', data);
    // Add your comment submission logic here
  };

  return (
    <div className="blog-post-container">
      {/* Main Content */}
      <article className="blog-post-article">
        {/* Header */}
        <header className="blog-post-header">
          <h1 className="blog-post-title">
            {post.title}
          </h1>
          
          {/* Author Info */}
          <AuthorInfo 
            authorName={post.author}
            publishedDate={post.publishedDate}
            className="blog-post-author-info"
          />
        </header>

        {/* Featured Image */}
        <div className="blog-post-image-container">
          <Image
            src={post.imageSrc}
            alt={post.title}
            width={800}
            height={400}
            className="blog-post-featured-image rounded-[2px]"
          />
        </div>

        {/* Text Block One */}
        {post.showTextBlockOne && post.textBlockOne && (
          <div className="blog-post-text-block">
            <p className="blog-post-paragraph">{post.textBlockOne}</p>
          </div>
        )}

        {/* Content */}
        <div>
          <p>
            {post.excerpt}
          </p>
          
          {post.description && (
            <p>
              {post.description}
            </p>
          )}

          {post.content ? (
            <div className="text-gray-700 space-y-6" dangerouslySetInnerHTML={{ __html: post.content }} />
          ) : (
            <>
              {/* Default content sections */}
              <p className="blog-post-paragraph">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>

              <p className="blog-post-paragraph">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
              </p>

              <p className="blog-post-paragraph">
                Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
              </p>
            </>
          )}

          {/* Full-width image */}
          <div className="blog-post-full-width-image">
            <Image
              src={post.imageSrc}
              alt="Full width content image"
              width={1200}
              height={600}
              className="w-full h-auto object-cover rounded-[2px]"
            />
          </div>

          {/* Text Block Two */}
          {post.showTextBlockTwo && post.textBlockTwo && (
            <div className="blog-post-text-block">
              <p className="blog-post-paragraph">{post.textBlockTwo}</p>
            </div>
          )}

          {/* Image Carousel */}
          {post.showCarousel && (
            <div className="blog-post-image-carousel">
              <BlogImageCarousel images={post.carouselImages} />
            </div>
          )}

          {/* Text Block Three */}
          {post.showTextBlockThree && post.textBlockThree && (
            <div className="blog-post-text-block">
              <p className="blog-post-paragraph">{post.textBlockThree}</p>
            </div>
          )}
        </div>

        {/* Newsletter Subscription */}
        <NewsletterSubscription />

        {/* Comments Section */}
        <div className="comments-section">
          <h3 className="comments-title">Leave a Reply</h3>
          
          <CommentForm onSubmit={handleComment} />

          {/* Comments */}
          <div className="comments-list">
            {commentsData.map((commentData, index) => (
              <Comment 
                key={commentData.id} 
                comment={commentData} 
                isLast={index === commentsData.length - 1}
              />
            ))}
          </div>
        </div>
      </article>

      {/* Next Read Section */}
      <section className="next-read-section">
        <div className="next-read-container">
          <h2 className="next-read-title">Next Read</h2>
          <div className="next-read-grid">
            {/* Get next 2 posts from the data */}
            {postsData.slice(0, 2).map((nextPost) => (
              <PostCard
                key={nextPost.id}
                title={nextPost.title}
                href={nextPost.href}
                imageSrc={nextPost.imageSrc}
                publishedDate={nextPost.publishedDate}
                dateTime={nextPost.dateTime}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}