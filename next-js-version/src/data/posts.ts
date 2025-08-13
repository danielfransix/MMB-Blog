export interface PostData {
  id: number;
  title: string;
  category: string;
  publishedDate: string;
  dateTime: string;
  excerpt: string;
  imageSrc: string;
  href: string;
  description?: string; // Optional for hero posts
  content?: string; // Full blog post content
  author?: string; // Author name
  carouselImages?: string[]; // Images for the carousel
  showCarousel?: boolean; // Toggle to show/hide carousel
  textBlockOne?: string; // Text block after the first image
  textBlockTwo?: string; // Text block between second image and carousel
  textBlockThree?: string; // Text block after the carousel
  showTextBlockOne?: boolean; // Toggle to show/hide first text block
  showTextBlockTwo?: boolean; // Toggle to show/hide second text block
  showTextBlockThree?: boolean; // Toggle to show/hide third text block
}

export const heroPostsData: PostData[] = [
  {
    id: 1,
    title: "Featured Hero Post Title",
    category: "Technology",
    publishedDate: "July 15, 2024",
    dateTime: "2024-07-15",
    excerpt: "Lorem ipsum lorem ipsum sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint.",
    imageSrc: "/img/02ccd2a0b0f833a4225a9509b2a9761a083adf88.jpg",
    href: "/posts/featured-hero-post",
    description: 'Lorem ipsum "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',
    author: "Daniel Fransix",
    content: `<p>Welcome to this comprehensive guide on modern technology trends. In this post, we'll explore the latest developments that are shaping our digital future.</p><p>Technology continues to evolve at an unprecedented pace, bringing new opportunities and challenges. From artificial intelligence to quantum computing, the landscape is constantly shifting.</p><p>One of the most significant trends we're seeing is the integration of AI into everyday applications. This isn't just about chatbots or recommendation systems anymore – we're talking about fundamental changes in how we interact with technology.</p><p>Another area of rapid development is cloud computing and edge computing. These technologies are enabling new possibilities for scalability and performance that were unimaginable just a few years ago.</p>`,
    carouselImages: [
      "/img/02ccd2a0b0f833a4225a9509b2a9761a083adf88.jpg",
      "/img/02ccd2a0b0f833a4225a9509b2a9761a083adf88.jpg",
      "/img/02ccd2a0b0f833a4225a9509b2a9761a083adf88.jpg"
    ],
    showCarousel: true,
    textBlockOne: "This is the first text block that appears after the featured image. It provides additional context and insights about the topic being discussed in this comprehensive guide.",
    textBlockTwo: "Here's the second text block that appears between the full-width image and the carousel. This section can contain more detailed information or analysis related to the main topic.",
    textBlockThree: "This is the third and final text block that appears after the image carousel. It serves as a conclusion or summary of the key points discussed throughout the post.",
    showTextBlockOne: true,
    showTextBlockTwo: true,
    showTextBlockThree: true
  },
  {
    id: 2,
    title: "Second Hero Post",
    category: "Design",
    publishedDate: "July 12, 2024",
    dateTime: "2024-07-12",
    excerpt: "Another engaging post excerpt that draws readers in with compelling content and interesting insights.",
    imageSrc: "/img/02ccd2a0b0f833a4225a9509b2a9761a083adf88.jpg",
    href: "/posts/second-hero-post",
    description: "Discover the latest trends in modern web design and how they can transform your digital presence. Learn about color theory, typography, and user experience principles that make websites stand out.",
    author: "Stephanie Ani"
  },
  {
    id: 3,
    title: "Third Hero Post",
    category: "Development",
    publishedDate: "July 10, 2024",
    dateTime: "2024-07-10",
    excerpt: "A third compelling post that showcases different aspects of our content strategy.",
    imageSrc: "/img/02ccd2a0b0f833a4225a9509b2a9761a083adf88.jpg",
    href: "/posts/third-hero-post",
    description: "Explore the fundamentals of modern web development, from responsive design to performance optimization. Get insights into the tools and techniques that professional developers use daily.",
    author: "Daniel Fransix"
  }
];

export const postsData: PostData[] = [
  {
    id: 4,
    title: "Blog Post Title One",
    category: "Technology",
    publishedDate: "July 8, 2024",
    dateTime: "2024-07-08",
    excerpt: "This is a brief excerpt of the blog post that gives readers a preview of what to expect.",
    imageSrc: "/img/02ccd2a0b0f833a4225a9509b2a9761a083adf88.jpg",
    href: "/posts/blog-post-one",
    author: "Stephanie Ani"
  },
  {
    id: 5,
    title: "Blog Post Title Two",
    category: "Design",
    publishedDate: "July 5, 2024",
    dateTime: "2024-07-05",
    excerpt: "Another engaging post excerpt that draws readers in with compelling content.",
    imageSrc: "/img/02ccd2a0b0f833a4225a9509b2a9761a083adf88.jpg",
    href: "/posts/blog-post-two",
    author: "Daniel Fransix"
  },
  {
    id: 6,
    title: "Blog Post Title Three",
    category: "Development",
    publishedDate: "July 3, 2024",
    dateTime: "2024-07-03",
    excerpt: "A third compelling post that showcases different aspects of our content.",
    imageSrc: "/img/02ccd2a0b0f833a4225a9509b2a9761a083adf88.jpg",
    href: "/posts/blog-post-three",
    author: "Stephanie Ani"
  },
  {
    id: 7,
    title: "Blog Post Title Four",
    category: "Technology",
    publishedDate: "June 30, 2024",
    dateTime: "2024-06-30",
    excerpt: "Fourth post with interesting insights and valuable information for our readers.",
    imageSrc: "/img/02ccd2a0b0f833a4225a9509b2a9761a083adf88.jpg",
    href: "/posts/blog-post-four",
    author: "Daniel Fransix"
  },
  {
    id: 8,
    title: "Blog Post Title Five",
    category: "Design",
    publishedDate: "June 28, 2024",
    dateTime: "2024-06-28",
    excerpt: "Fifth post exploring creative design concepts and innovative approaches.",
    imageSrc: "/img/02ccd2a0b0f833a4225a9509b2a9761a083adf88.jpg",
    href: "/posts/blog-post-five",
    author: "Stephanie Ani"
  },
  {
    id: 9,
    title: "Blog Post Title Six",
    category: "Development",
    publishedDate: "June 25, 2024",
    dateTime: "2024-06-25",
    excerpt: "Sixth post diving deep into development best practices and methodologies.",
    imageSrc: "/img/02ccd2a0b0f833a4225a9509b2a9761a083adf88.jpg",
    href: "/posts/blog-post-six",
    author: "Daniel Fransix"
  },
  {
    id: 10,
    title: "Blog Post Title Seven",
    category: "Technology",
    publishedDate: "June 22, 2024",
    dateTime: "2024-06-22",
    excerpt: "Seventh post covering the latest trends in technology and innovation.",
    imageSrc: "/img/02ccd2a0b0f833a4225a9509b2a9761a083adf88.jpg",
    href: "/posts/blog-post-seven",
    author: "Stephanie Ani"
  },
  {
    id: 11,
    title: "Blog Post Title Eight",
    category: "Design",
    publishedDate: "June 20, 2024",
    dateTime: "2024-06-20",
    excerpt: "Eighth post featuring beautiful design inspirations and creative solutions.",
    imageSrc: "/img/02ccd2a0b0f833a4225a9509b2a9761a083adf88.jpg",
    href: "/posts/blog-post-eight",
    author: "Daniel Fransix"
  },
  {
    id: 12,
    title: "Blog Post Title Nine",
    category: "Development",
    publishedDate: "June 18, 2024",
    dateTime: "2024-06-18",
    excerpt: "Ninth post exploring advanced development techniques and frameworks.",
    imageSrc: "/img/02ccd2a0b0f833a4225a9509b2a9761a083adf88.jpg",
    href: "/posts/blog-post-nine",
    author: "Stephanie Ani"
  },
  {
    id: 13,
    title: "Blog Post Title Ten",
    category: "Technology",
    publishedDate: "June 15, 2024",
    dateTime: "2024-06-15",
    excerpt: "Tenth post discussing emerging technologies and their impact on society.",
    imageSrc: "/img/02ccd2a0b0f833a4225a9509b2a9761a083adf88.jpg",
    href: "/posts/blog-post-ten",
    author: "Daniel Fransix"
  },
  {
    id: 14,
    title: "Blog Post Title Eleven",
    category: "Design",
    publishedDate: "June 12, 2024",
    dateTime: "2024-06-12",
    excerpt: "Eleventh post showcasing innovative design patterns and user interfaces.",
    imageSrc: "/img/02ccd2a0b0f833a4225a9509b2a9761a083adf88.jpg",
    href: "/posts/blog-post-eleven",
    author: "Stephanie Ani"
  },
  {
    id: 15,
    title: "Blog Post Title Twelve",
    category: "Development",
    publishedDate: "June 10, 2024",
    dateTime: "2024-06-10",
    excerpt: "Twelfth post covering modern development workflows and automation.",
    imageSrc: "/img/02ccd2a0b0f833a4225a9509b2a9761a083adf88.jpg",
    href: "/posts/blog-post-twelve",
    author: "Daniel Fransix"
  },
  {
    id: 16,
    title: "Blog Post Title Thirteen",
    category: "Technology",
    publishedDate: "June 8, 2024",
    dateTime: "2024-06-08",
    excerpt: "Thirteenth post exploring artificial intelligence and machine learning trends.",
    imageSrc: "/img/02ccd2a0b0f833a4225a9509b2a9761a083adf88.jpg",
    href: "/posts/blog-post-thirteen",
    author: "Stephanie Ani"
  },
  {
    id: 17,
    title: "Blog Post Title Fourteen",
    category: "Design",
    publishedDate: "June 5, 2024",
    dateTime: "2024-06-05",
    excerpt: "Fourteenth post featuring minimalist design principles and clean aesthetics.",
    imageSrc: "/img/02ccd2a0b0f833a4225a9509b2a9761a083adf88.jpg",
    href: "/posts/blog-post-fourteen",
    author: "Daniel Fransix"
  },
  {
    id: 18,
    title: "Blog Post Title Fifteen",
    category: "Development",
    publishedDate: "June 3, 2024",
    dateTime: "2024-06-03",
    excerpt: "Fifteenth post diving into cloud computing and serverless architectures.",
    imageSrc: "/img/02ccd2a0b0f833a4225a9509b2a9761a083adf88.jpg",
    href: "/posts/blog-post-fifteen",
    author: "Stephanie Ani"
  },
  {
    id: 19,
    title: "Blog Post Title Sixteen",
    category: "Technology",
    publishedDate: "May 30, 2024",
    dateTime: "2024-05-30",
    excerpt: "Sixteenth post analyzing cybersecurity trends and best practices.",
    imageSrc: "/img/02ccd2a0b0f833a4225a9509b2a9761a083adf88.jpg",
    href: "/posts/blog-post-sixteen",
    author: "Daniel Fransix"
  },
  {
    id: 20,
    title: "Blog Post Title Seventeen",
    category: "Design",
    publishedDate: "May 28, 2024",
    dateTime: "2024-05-28",
    excerpt: "Seventeenth post exploring color psychology in digital design.",
    imageSrc: "/img/02ccd2a0b0f833a4225a9509b2a9761a083adf88.jpg",
    href: "/posts/blog-post-seventeen",
    author: "Stephanie Ani"
  },
  {
    id: 21,
    title: "Blog Post Title Eighteen",
    category: "Development",
    publishedDate: "May 25, 2024",
    dateTime: "2024-05-25",
    excerpt: "Eighteenth post covering progressive web applications and mobile development.",
    imageSrc: "/img/02ccd2a0b0f833a4225a9509b2a9761a083adf88.jpg",
    href: "/posts/blog-post-eighteen",
    author: "Daniel Fransix"
  },
  {
    id: 22,
    title: "Blog Post Title Nineteen",
    category: "Technology",
    publishedDate: "May 22, 2024",
    dateTime: "2024-05-22",
    excerpt: "Nineteenth post discussing blockchain technology and cryptocurrency.",
    imageSrc: "/img/02ccd2a0b0f833a4225a9509b2a9761a083adf88.jpg",
    href: "/posts/blog-post-nineteen",
    author: "Stephanie Ani"
  },
  {
    id: 23,
    title: "Blog Post Title Twenty",
    category: "Design",
    publishedDate: "May 20, 2024",
    dateTime: "2024-05-20",
    excerpt: "Twentieth post featuring accessibility in web design and inclusive practices.",
    imageSrc: "/img/02ccd2a0b0f833a4225a9509b2a9761a083adf88.jpg",
    href: "/posts/blog-post-twenty",
    author: "Daniel Fransix"
  },
  {
    id: 24,
    title: "Blog Post Title Twenty-One",
    category: "Development",
    publishedDate: "May 18, 2024",
    dateTime: "2024-05-18",
    excerpt: "Twenty-first post exploring microservices architecture and scalability.",
    imageSrc: "/img/02ccd2a0b0f833a4225a9509b2a9761a083adf88.jpg",
    href: "/posts/blog-post-twenty-one",
    author: "Stephanie Ani"
  },
  {
    id: 25,
    title: "Blog Post Title Twenty-Two",
    category: "Technology",
    publishedDate: "May 15, 2024",
    dateTime: "2024-05-15",
    excerpt: "Twenty-second post analyzing the future of quantum computing.",
    imageSrc: "/img/02ccd2a0b0f833a4225a9509b2a9761a083adf88.jpg",
    href: "/posts/blog-post-twenty-two",
    author: "Daniel Fransix"
  }
];