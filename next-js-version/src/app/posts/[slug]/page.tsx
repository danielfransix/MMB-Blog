"use client";
import { notFound } from "next/navigation";
import Image from "next/image";
import { heroPostsData, postsData } from "../../../data/posts";
import { commentsData } from "../../../data/comments";
import AuthorInfo from "../../../components/AuthorInfo";
import { useState, use } from "react";
import PostCard from "../../../components/PostCard";
import Comment from "../../../components/Comment";
import NewsletterSubscription from "../../../components/NewsletterSubscription";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

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

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribed(true);
    setEmail("");
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle comment submission
    setComment("");
    setName("");
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
            className="blog-post-featured-image"
          />
        </div>

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
        </div>

        {/* Newsletter Subscription */}
        <NewsletterSubscription />

        {/* Comments Section */}
        <div className="comments-section">
          <h3 className="comments-title">Leave a Reply</h3>
          
          <form onSubmit={handleComment} className="comment-form flex flex-col gap-1">
            <div className="flex flex-col sm:flex-row gap-1">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
                className="flex-1 px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white hover:border-green-500 transition-colors rounded-sm"
              />
              <input
                type="email"
                placeholder="Email"
                className="flex-1 px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white hover:border-green-500 transition-colors rounded-sm"
              />
            </div>
            
            <div 
              className="flex items-start gap-1 w-full border border-gray-300 focus-within:ring-2 focus-within:ring-green-500 hover:border-green-500 transition-colors rounded-sm"
              onClick={(e) => {
                const textarea = e.currentTarget.querySelector('textarea');
                if (textarea && e.target !== e.currentTarget.querySelector('.image-upload')) {
                  textarea.focus();
                }
              }}
            >
              <div 
                className="image-upload w-12 h-12 border-2 border-black hover:border-green-500 transition-colors cursor-pointer flex items-center justify-center m-2 flex-shrink-0 text-black hover:text-green-500 rounded-sm bg-transparent"
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle image upload
                  console.log('Image upload clicked');
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 5h6"/>
                  <path d="M19 2v6"/>
                  <path d="M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5"/>
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                  <circle cx="9" cy="9" r="2"/>
                </svg>
              </div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your comment here..."
                required
                rows={4}
                className="flex-1 px-4 py-2 focus:outline-none resize-none border-none"
              />
            </div>
            
            <div className="flex flex-row items-center gap-1 mb-4 flex-wrap">
              <input
                type="checkbox"
                id="save-info"
                className="rounded"
              />
              <label htmlFor="save-info" className="text-sm text-gray-600">
                Save my name and email in this browser for the next time I comment.
              </label>
            </div>
            
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white hover:bg-green-500 hover:text-black transition-colors rounded-sm"
            >
              Post Comment
            </button>
          </form>

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