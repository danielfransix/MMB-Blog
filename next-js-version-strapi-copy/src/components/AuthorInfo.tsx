import Image from "next/image";

interface AuthorInfoProps {
  authorName?: string;
  authorImage?: string;
  showDate?: boolean;
  publishedDate?: string;
  className?: string;
}

export default function AuthorInfo({ authorName, authorImage, showDate = true, publishedDate, className = "" }: AuthorInfoProps) {
  if (!authorName) {
    return null;
  }

  return (
    <div className={`author-info-container ${className}`}>
      <div className="author-info-avatar">
        {authorImage ? (
          <Image
            src={authorImage}
            alt={authorName}
            width={48}
            height={48}
            className="author-info-image rounded-[2px]"
          />
        ) : (
          <div className="author-info-placeholder">
            <span className="author-info-placeholder-text">{authorName.charAt(0).toUpperCase()}</span>
          </div>
        )}
      </div>
      <div>
        <div className="author-info-name-container">
          <p className="author-info-name">by</p>
          <p className="author-info-name">{authorName}</p>
        </div>
        {showDate && publishedDate && (
          <p className="author-info-date">
            Published on {publishedDate}
          </p>
        )}
      </div>
    </div>
  );
}