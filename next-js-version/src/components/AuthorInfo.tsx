import Image from "next/image";
import { getAuthorByName } from "../data/authors";

interface AuthorInfoProps {
  authorName?: string;
  showDate?: boolean;
  publishedDate?: string;
  className?: string;
}

export default function AuthorInfo({ authorName, showDate = true, publishedDate, className = "" }: AuthorInfoProps) {
  const author = authorName ? getAuthorByName(authorName) : null;

  if (!author) {
    return null;
  }

  return (
    <div className={`author-info-container ${className}`}>
      <div className="author-info-avatar">
        {author.picture ? (
          <Image
            src={author.picture}
            alt={author.name}
            width={48}
            height={48}
            className="author-info-image rounded-[2px]"
          />
        ) : (
          <div className="author-info-placeholder">
            <span className="author-info-placeholder-text">{authorName?.charAt(0).toUpperCase()}</span>
          </div>
        )}
      </div>
      <div>
        <div className="author-info-name-container">
          <p className="author-info-name">by</p>
          <p className="author-info-name">{author.name}</p>
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