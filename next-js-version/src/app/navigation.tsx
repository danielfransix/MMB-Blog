"use client";
import { useState } from "react";
import { LINKS } from "../config/links";
import SearchOverlay from "../components/SearchOverlay";

const MenuItems = ({ isMobile = false, onClose }: { isMobile?: boolean; onClose?: () => void }) => {
  const menuItems = [
    { name: "Home", href: LINKS.NAV_HOME },
    { name: "Blog", href: LINKS.NAV_BLOG },
    { name: "About", href: LINKS.NAV_ABOUT },
    { name: "Contact", href: LINKS.NAV_CONTACT }
  ];

  const handleClick = () => {
    if (onClose) onClose();
  };

  if (isMobile) {
    return (
      <div className="nav-mobile-menu-container">
        {menuItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            onClick={handleClick}
            className="nav-mobile-menu-link"
          >
            {item.name}
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className="nav-desktop-menu-container">
      {menuItems.map((item) => (
        <a
          key={item.name}
          href={item.href}
          className="nav-desktop-menu-link"
        >
          <span className="nav-desktop-menu-text">{item.name}</span>
        </a>
      ))}
    </div>
  );
};

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="nav-main-container">
        {/* Logo */}
        <div className="nav-logo-container">
          <a href={LINKS.LOGO} className="nav-logo-link">MakeMeBeautiful</a>
        </div>

        {/* Desktop Menu Items */}
        <MenuItems />

        {/* Mobile Menu Button and Search */}
        <div className="nav-actions-container">
          {/* Search Icon */}
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 30 30" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className="nav-search-icon"
            onClick={() => setIsSearchOpen(true)}
          >
            <g id="Frame">
              <path id="Vector" d="M27.1944 25.7582L22.8977 21.5573L22.797 21.4041C22.6097 21.2177 22.3537 21.1127 22.0865 21.1127C21.8192 21.1127 21.5632 21.2177 21.3759 21.4041C17.7244 24.7542 12.0977 24.9363 8.22751 21.8296C4.35733 18.723 3.44459 13.2917 6.09461 9.13771C8.74463 4.98371 14.1351 3.39606 18.6911 5.42767C23.247 7.45928 25.5548 12.4797 24.0838 17.1595C23.9778 17.4976 24.0644 17.8652 24.3109 18.124C24.5574 18.3827 24.9264 18.4932 25.2788 18.4139C25.6312 18.3345 25.9136 18.0774 26.0195 17.7393C27.778 12.1858 25.1222 6.20944 19.7701 3.67632C14.4181 1.1432 7.97605 2.81353 4.61132 7.60677C1.24659 12.4 1.96897 18.8777 6.31116 22.8494C10.6534 26.8211 17.3122 27.0949 21.9802 23.4936L25.7846 27.2131C26.1775 27.5956 26.8127 27.5956 27.2056 27.2131C27.5981 26.8253 27.5981 26.2007 27.2056 25.8129L27.1944 25.7582Z" fill="currentColor"/>
            </g>
          </svg>
          
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="nav-mobile-menu-button"
            aria-label="Toggle mobile menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="nav-mobile-menu-icon">
              <rect width="256" height="256" fill="none"/>
              <line x1="40" y1="128" x2="216" y2="128" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
              <line x1="40" y1="64" x2="216" y2="64" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
              <line x1="40" y1="192" x2="216" y2="192" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
            </svg>
          </button>
        </div>
      </nav>

      {/* Search Overlay */}
      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="nav-mobile-overlay" onClick={closeMobileMenu}>
          <div className="nav-mobile-panel" onClick={(e) => e.stopPropagation()}>
            <div className="nav-mobile-header">
              <span className="nav-mobile-title">Menu</span>
              <button
                onClick={closeMobileMenu}
                className="nav-mobile-close-button"
                aria-label="Close menu"
              >
                <svg className="nav-mobile-close-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <MenuItems isMobile={true} onClose={closeMobileMenu} />
          </div>
        </div>
      )}
    </>
  );
}