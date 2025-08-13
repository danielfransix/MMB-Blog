/**
 * Main JavaScript file for the blog
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality could be added here
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add active class to navigation based on current page
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // Check if the current path matches the link href or if we're in a sub-directory
        if (currentLocation.endsWith(linkPath) || 
            (linkPath !== 'index.html' && currentLocation.includes(linkPath.replace('.html', '')))) {
            link.classList.add('active');
        } else if (currentLocation.endsWith('/') && linkPath === 'index.html') {
            link.classList.add('active');
        }
    });
    
    // Initialize lightbox for images in blog posts
    const blogPostImages = document.querySelectorAll('.post-content img');
    
    blogPostImages.forEach(image => {
        image.addEventListener('click', function() {
            const src = this.getAttribute('src');
            const alt = this.getAttribute('alt') || 'Image';
            
            // Create lightbox elements
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            
            const lightboxContent = document.createElement('div');
            lightboxContent.className = 'lightbox-content';
            
            const lightboxImg = document.createElement('img');
            lightboxImg.src = src;
            lightboxImg.alt = alt;
            
            const caption = document.createElement('p');
            caption.textContent = alt;
            
            const closeBtn = document.createElement('span');
            closeBtn.className = 'lightbox-close';
            closeBtn.innerHTML = '&times;';
            
            // Append elements
            lightboxContent.appendChild(lightboxImg);
            lightboxContent.appendChild(caption);
            lightboxContent.appendChild(closeBtn);
            lightbox.appendChild(lightboxContent);
            document.body.appendChild(lightbox);
            
            // Prevent scrolling when lightbox is open
            document.body.style.overflow = 'hidden';
            
            // Close lightbox functionality
            const closeLightbox = () => {
                document.body.removeChild(lightbox);
                document.body.style.overflow = '';
            };
            
            closeBtn.addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    closeLightbox();
                }
            });
            
            // Close on Escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    closeLightbox();
                }
            });
        });
        
        // Add a visual cue that images are clickable
        image.style.cursor = 'pointer';
    });
    
    // Add CSS for the lightbox
    if (blogPostImages.length > 0) {
        const style = document.createElement('style');
        style.textContent = `
            .lightbox {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.9);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
            }
            
            .lightbox-content {
                position: relative;
                max-width: 90%;
                max-height: 90%;
            }
            
            .lightbox-content img {
                max-width: 100%;
                max-height: 80vh;
                border: 3px solid white;
                box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
            }
            
            .lightbox-content p {
                color: white;
                text-align: center;
                margin-top: 10px;
            }
            
            .lightbox-close {
                position: absolute;
                top: -30px;
                right: 0;
                color: white;
                font-size: 30px;
                cursor: pointer;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Initialize code syntax highlighting if there are code blocks
    const codeBlocks = document.querySelectorAll('pre code');
    if (codeBlocks.length > 0 && window.hljs) {
        codeBlocks.forEach(block => {
            window.hljs.highlightBlock(block);
        });
    }
    
    // Add "Back to Top" button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '&uarr;';
    document.body.appendChild(backToTopBtn);
    
    // Add CSS for the "Back to Top" button
    const style = document.createElement('style');
    style.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: var(--primary-color);
            color: white;
            border: none;
            font-size: 20px;
            cursor: pointer;
            display: none;
            z-index: 99;
            opacity: 0.7;
            transition: opacity 0.3s;
        }
        
        .back-to-top:hover {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
    
    // Show or hide the "Back to Top" button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    // Smooth scroll to top when button is clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}); 