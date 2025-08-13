# Simple Blog Website

A clean, responsive blog website built with HTML, CSS, and JavaScript.

## Features

- Responsive design that works on desktop, tablet, and mobile devices
- Home page with featured posts
- Blog listing page with pagination
- Individual blog post pages with comments section
- About page
- Contact page with form validation
- Image lightbox functionality
- Back to top button
- Smooth scrolling for anchor links

## Project Structure

```
├── index.html               # Home page
├── blog.html                # Blog listing page
├── about.html               # About page
├── contact.html             # Contact page
├── posts/                   # Individual blog post pages
│   └── post1.html           # Sample blog post
├── css/                     # Stylesheets
│   ├── styles.css           # Main styles
│   └── responsive.css       # Responsive styles
├── js/                      # JavaScript files
│   ├── main.js              # Main JavaScript file
│   └── contact-form.js      # Contact form functionality
└── img/                     # Images folder (you'll need to add your own images)
    ├── placeholder.jpg      # Placeholder for post thumbnails
    ├── profile.jpg          # Profile picture for about page
    ├── avatar1.jpg          # Comment avatar
    ├── avatar2.jpg          # Comment avatar
    └── avatar3.jpg          # Comment avatar
```

## Getting Started

1. Clone or download this repository
2. Replace the placeholder images in the `img` directory with your own images
3. Edit the content in the HTML files to personalize your blog
4. Customize the styles in `css/styles.css` to match your brand
5. Deploy to your web hosting service

## Customization

### Changing Colors

The color scheme can be easily modified by changing the CSS variables in the `:root` selector in `css/styles.css`:

```css
:root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    --light-color: #f8f9fa;
    --dark-color: #343a40;
    --success-color: #28a745;
    --danger-color: #dc3545;
    --font-primary: 'Inter', sans-serif;
    --font-secondary: 'Georgia', serif;
    --transition: all 0.3s ease;
}
```

### Adding New Pages

To add a new page:

1. Copy one of the existing HTML files (e.g., `about.html`)
2. Rename it to your new page name (e.g., `services.html`)
3. Update the content and title
4. Add a link to the new page in the navigation menu in all HTML files

### Adding Blog Posts

To add a new blog post:

1. Copy the `posts/post1.html` file
2. Rename it to a new post name (e.g., `posts/post2.html`)
3. Update the content, title, and metadata
4. Add a link to the new post in the blog listing page (`blog.html`)

## Browser Support

This website works in all modern browsers including:

- Chrome
- Firefox
- Safari
- Edge

## License

Feel free to use this template for your personal or commercial projects.

## Credits

- Fonts: [Google Fonts](https://fonts.google.com/)
- Icons: [Font Awesome](https://fontawesome.com/) (not included, you need to add the link)
- Images: Replace with your own images 
