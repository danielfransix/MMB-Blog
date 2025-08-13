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
    <article className="overflow-hidden transition-shadow group cursor-pointer">
      <a href={href} className="block">
        <div className="border-2 border-black rounded-[2px] group-hover:border-[var(--hover-green)] transition-colors overflow-hidden relative">
          <Image
            src={imageSrc}
            alt="Blog post image"
            width={400}
            height={200}
            className="w-full h-48 object-cover rounded-[2px]"
          />
        </div>
        <div className="p-4 pt-6">
          <h3 className="text-xl font-semibold mb-2 group-hover:text-[var(--hover-green)] transition-colors">
            {title}
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            <span className="opacity-60">Published on</span> <time dateTime={dateTime}>{publishedDate}</time>
          </p>
          <div className="font-mono text-black group-hover:text-[var(--hover-green)] transition-colors inline-flex items-center gap-2 relative">
            <span className="flex items-center gap-2">
              Read
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M18 8L22 12L18 16"/>
                <path d="M2 12H22"/>
              </svg>
            </span>
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--hover-green)] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          </div>
        </div>
      </a>
    </article>
  );
}