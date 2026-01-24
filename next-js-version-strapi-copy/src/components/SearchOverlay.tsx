"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="search-overlay"
      onClick={onClose}
    >
      <div 
        className="search-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="search-header">
          <h2 className="search-title">Search</h2>
          <button 
            onClick={onClose}
            className="search-close-button"
            aria-label="Close search overlay"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
        <form onSubmit={(e) => {
          e.preventDefault();
          if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
            onClose();
          }
        }} className="search-input-container group">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search posts..."
            className="search-input"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                if (searchQuery.trim()) {
                  router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
                  onClose();
                }
              }
            }}
          />
          <button type="submit" className="search-submit-button" aria-label="Search">
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="search-icon group-hover:text-[var(--hover-green)] focus-within:text-[var(--hover-green)]">
              <g id="Frame">
                <path id="Vector" d="M27.1944 25.7582L22.8977 21.5573L22.797 21.4041C22.6097 21.2177 22.3537 21.1127 22.0865 21.1127C21.8192 21.1127 21.5632 21.2177 21.3759 21.4041C17.7244 24.7542 12.0977 24.9363 8.22751 21.8296C4.35733 18.723 3.44459 13.2917 6.09461 9.13771C8.74463 4.98371 14.1351 3.39606 18.6911 5.42767C23.247 7.45928 25.5548 12.4797 24.0838 17.1595C23.9778 17.4976 24.0644 17.8652 24.3109 18.124C24.5574 18.3827 24.9264 18.4932 25.2788 18.4139C25.6312 18.3345 25.9136 18.0774 26.0195 17.7393C27.778 12.1858 25.1222 6.20944 19.7701 3.67632C14.4181 1.1432 7.97605 2.81353 4.61132 7.60677C1.24659 12.4 1.96897 18.8777 6.31116 22.8494C10.6534 26.8211 17.3122 27.0949 21.9802 23.4936L25.7846 27.2131C26.1775 27.5956 26.8127 27.5956 27.2056 27.2131C27.5981 26.8253 27.5981 26.2007 27.2056 25.8129L27.1944 25.7582Z" fill="currentColor"/>
              </g>
            </svg>
          </button>
        </form>
        {searchQuery && (
          <div className="search-results">
            <p className="search-results-text">Press Enter or click the search icon to search for &quot;{searchQuery}&quot;</p>
          </div>
        )}
      </div>
    </div>
  );
}