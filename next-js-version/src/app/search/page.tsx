"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { heroPostsData, postsData } from "../../data/posts";
import PostCard from "../../components/PostCard";
import Link from "next/link";

interface SearchResult {
  id: number;
  title: string;
  category: string;
  publishedDate: string;
  dateTime: string;
  excerpt: string;
  imageSrc: string;
  href: string;
  author?: string;
  matchType: 'title' | 'excerpt' | 'category' | 'author';
}

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(query);

  const performSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    
    // Combine all posts for searching
    const allPosts = [...heroPostsData, ...postsData];
    const results: SearchResult[] = [];
    const searchLower = searchTerm.toLowerCase();

    allPosts.forEach(post => {
      const matches: SearchResult[] = [];
      
      // Search in title (highest priority)
      if (post.title.toLowerCase().includes(searchLower)) {
        matches.push({ ...post, matchType: 'title' });
      }
      
      // Search in category
      if (post.category.toLowerCase().includes(searchLower)) {
        matches.push({ ...post, matchType: 'category' });
      }
      
      // Search in excerpt
      if (post.excerpt.toLowerCase().includes(searchLower)) {
        matches.push({ ...post, matchType: 'excerpt' });
      }
      
      // Search in author
      if (post.author && post.author.toLowerCase().includes(searchLower)) {
        matches.push({ ...post, matchType: 'author' });
      }
      
      // Add unique matches (avoid duplicates)
      if (matches.length > 0) {
        // Prioritize title matches
        const titleMatch = matches.find(m => m.matchType === 'title');
        results.push(titleMatch || matches[0]);
      }
    });

    // Sort results by relevance (title matches first)
    results.sort((a, b) => {
      const priority = { title: 4, category: 3, author: 2, excerpt: 1 };
      return priority[b.matchType] - priority[a.matchType];
    });

    setSearchResults(results);
    setIsLoading(false);
  };

  useEffect(() => {
    if (query) {
      setSearchQuery(query);
      performSearch(query);
    }
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Update URL with search query
      const url = new URL(window.location.href);
      url.searchParams.set('q', searchQuery);
      window.history.pushState({}, '', url.toString());
      performSearch(searchQuery);
    }
  };

  const getMatchTypeLabel = (matchType: string) => {
    switch (matchType) {
      case 'title': return 'Title match';
      case 'category': return 'Category match';
      case 'author': return 'Author match';
      case 'excerpt': return 'Content match';
      default: return '';
    }
  };

  return (
    <div className="search-page-container">
      <div className="search-page-content">
        <div className="search-page-header">
          <nav className="font-mono text-sm mb-4">
            <Link href="/" className="text-gray-600 hover:text-[var(--hover-green)] transition-colors">
              Home
            </Link>
            <span className="text-gray-400 mx-2">/</span>
            <span className="text-gray-900">Search</span>
          </nav>
          
          <h1 className="search-page-title font-sans">Search Blog Posts</h1>
          
          <form onSubmit={handleSearch} className="search-page-input-container">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for posts, categories, authors..."
              className="search-page-input font-mono"
              autoFocus
            />
            <button type="submit" className="search-page-input-icon" aria-label="Search">
              <svg width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400 hover:text-[var(--hover-green)] transition-colors">
                <g id="Frame">
                  <path id="Vector" d="M27.1944 25.7582L22.8977 21.5573L22.797 21.4041C22.6097 21.2177 22.3537 21.1127 22.0865 21.1127C21.8192 21.1127 21.5632 21.2177 21.3759 21.4041C17.7244 24.7542 12.0977 24.9363 8.22751 21.8296C4.35733 18.723 3.44459 13.2917 6.09461 9.13771C8.74463 4.98371 14.1351 3.39606 18.6911 5.42767C23.247 7.45928 25.5548 12.4797 24.0838 17.1595C23.9778 17.4976 24.0644 17.8652 24.3109 18.124C24.5574 18.3827 24.9264 18.4932 25.2788 18.4139C25.6312 18.3345 25.9136 18.0774 26.0195 17.7393C27.778 12.1858 25.1222 6.20944 19.7701 3.67632C14.4181 1.1432 7.97605 2.81353 4.61132 7.60677C1.24659 12.4 1.96897 18.8777 6.31116 22.8494C10.6534 26.8211 17.3122 27.0949 21.9802 23.4936L25.7846 27.2131C26.1775 27.5956 26.8127 27.5956 27.2056 27.2131C27.5981 26.8253 27.5981 26.2007 27.2056 25.8129L27.1944 25.7582Z" fill="currentColor"/>
                </g>
              </svg>
            </button>
          </form>
        </div>

        {isLoading && (
          <div className="search-page-loading">
            <p className="search-page-loading-text font-mono">Searching...</p>
          </div>
        )}

        {!isLoading && searchQuery && (
          <div className="search-page-results-header">
            <h2 className="search-page-results-count font-mono">
              {searchResults.length > 0 
                ? `Found ${searchResults.length} result${searchResults.length === 1 ? '' : 's'} for "${searchQuery}"`
                : `No results found for "${searchQuery}"`
              }
            </h2>
            {searchResults.length === 0 && (
              <div className="search-page-no-results">
                <h3 className="search-page-no-results-title font-sans">No results found</h3>
                <p className="search-page-no-results-text font-mono">Try searching with different keywords or check your spelling.</p>
                <div className="mt-6">
                  <h4 className="font-mono text-sm text-gray-700 mb-3">Popular categories:</h4>
                  <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={() => { setSearchQuery('Technology'); performSearch('Technology'); }} 
                      className="px-3 py-1 bg-gray-100 hover:bg-[var(--hover-green)] hover:text-white rounded-[2px] text-sm font-mono transition-colors"
                    >
                      Technology
                    </button>
                    <button 
                      onClick={() => { setSearchQuery('Design'); performSearch('Design'); }} 
                      className="px-3 py-1 bg-gray-100 hover:bg-[var(--hover-green)] hover:text-white rounded-[2px] text-sm font-mono transition-colors"
                    >
                      Design
                    </button>
                    <button 
                      onClick={() => { setSearchQuery('Development'); performSearch('Development'); }} 
                      className="px-3 py-1 bg-gray-100 hover:bg-[var(--hover-green)] hover:text-white rounded-[2px] text-sm font-mono transition-colors"
                    >
                      Development
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {!searchQuery && !isLoading && (
          <div className="text-center py-16">
            <div className="mb-6">
              <svg width="64" height="64" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto text-gray-300">
                <g id="Frame">
                  <path id="Vector" d="M27.1944 25.7582L22.8977 21.5573L22.797 21.4041C22.6097 21.2177 22.3537 21.1127 22.0865 21.1127C21.8192 21.1127 21.5632 21.2177 21.3759 21.4041C17.7244 24.7542 12.0977 24.9363 8.22751 21.8296C4.35733 18.723 3.44459 13.2917 6.09461 9.13771C8.74463 4.98371 14.1351 3.39606 18.6911 5.42767C23.247 7.45928 25.5548 12.4797 24.0838 17.1595C23.9778 17.4976 24.0644 17.8652 24.3109 18.124C24.5574 18.3827 24.9264 18.4932 25.2788 18.4139C25.6312 18.3345 25.9136 18.0774 26.0195 17.7393C27.778 12.1858 25.1222 6.20944 19.7701 3.67632C14.4181 1.1432 7.97605 2.81353 4.61132 7.60677C1.24659 12.4 1.96897 18.8777 6.31116 22.8494C10.6534 26.8211 17.3122 27.0949 21.9802 23.4936L25.7846 27.2131C26.1775 27.5956 26.8127 27.5956 27.2056 27.2131C27.5981 26.8253 27.5981 26.2007 27.2056 25.8129L27.1944 25.7582Z" fill="currentColor"/>
                </g>
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 font-sans">Start your search</h2>
            <p className="text-gray-500 font-mono">Enter keywords to find blog posts, categories, or authors.</p>
          </div>
        )}

        {searchResults.length > 0 && (
          <div className="search-page-results-grid">
            {searchResults.map((result) => (
              <div key={result.id} className="relative">
                <div className="absolute top-2 left-2 z-10">
                  <span className="px-2 py-1 bg-black text-white text-xs font-mono rounded-[2px]">
                    {getMatchTypeLabel(result.matchType)}
                  </span>
                </div>
                <PostCard
                  title={result.title}
                  href={result.href}
                  imageSrc={result.imageSrc}
                  publishedDate={result.publishedDate}
                  dateTime={result.dateTime}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="page-main-container"><div className="page-section-container">Loading...</div></div>}>
      <SearchContent />
    </Suspense>
  );
}