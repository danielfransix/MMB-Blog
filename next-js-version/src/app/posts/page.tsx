"use client";
import { useState } from "react";
import PostCard from "../../components/PostCard";
import { postsData } from "../../data/posts";

const POSTS_PER_PAGE = 12;

export default function AllPosts() {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(postsData.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = postsData.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  return (
    <div className="page-main-container">
      {/* All Posts Section */}
      <section className="page-section-container">
        <div className="page-content-wrapper">
          <div className="page-content-inner">
            <div className="page-header-container">
              <h1 className="page-title-large">All Posts</h1>
              <span className="page-pagination-info">
                Page {currentPage} of {totalPages}
              </span>
            </div>
            
            <div className="page-posts-grid-extended">
              {currentPosts.map((post) => (
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination-container">
                <button
                  onClick={goToPrevious}
                  disabled={currentPage === 1}
                  className="pagination-nav-button"
                >
                  Previous
                </button>
                
                <div className="pagination-numbers-container">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`pagination-number-button ${
                        currentPage === page
                          ? 'pagination-number-active'
                          : 'pagination-number-inactive'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={goToNext}
                  disabled={currentPage === totalPages}
                  className="pagination-nav-button"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}