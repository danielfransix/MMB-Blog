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
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="w-12 h-12 rounded-sm overflow-hidden">
        {author.picture ? (
          <Image
            src={author.picture}
            alt={author.name}
            width={48}
            height={48}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center">
            <span className="text-gray-600 font-bold">{authorName?.charAt(0).toUpperCase()}</span>
          </div>
        )}
      </div>
      <div>
        <p className="font-medium">{authorName}</p>
        {showDate && publishedDate && (
          <p className="text-gray-600 text-sm">
            Published on {publishedDate}
          </p>
        )}
      </div>
    </div>
  );
}