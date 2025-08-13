import Image from "next/image";

interface PostCardProps {
  title: string;
  href: string;
  imageSrc: string;
  publishedDate: string;
  dateTime: string;
}

export default function PostCard({ title, href, imageSrc, publishedDate, dateTime }: PostCardProps) {
  return (
    <article className="post-card-article group">
      <a href={href} className="post-card-link">
        <div className="post-card-image-container group-hover:border-[var(--hover-green)]">
          <Image
            src={imageSrc}
            alt="Blog post image"
            width={400}
            height={200}
            className="post-card-image"
          />
        </div>
        <div className="post-card-content">
          <h3 className="post-card-title group-hover:text-[var(--hover-green)]">
            {title}
          </h3>
          <p className="post-card-date">
            <span className="opacity-60">Published on</span> <time dateTime={dateTime}>{publishedDate}</time>
          </p>
          <div className="post-card-read-link group-hover:text-[var(--hover-green)]">
            <span className="post-card-read-text">
              Read
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="post-card-read-icon">
                <path d="M18 8L22 12L18 16"/>
                <path d="M2 12H22"/>
              </svg>
            </span>
            <div className="post-card-underline group-hover:scale-x-100"></div>
          </div>
        </div>
      </a>
    </article>
  );
}