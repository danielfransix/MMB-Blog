import Image from "next/image";

interface HeroCardProps {
  title: string;
  href: string;
  imageSrc: string;
  category: string;
  publishedDate: string;
  dateTime: string;
  description: string;
}

export default function HeroCard({ title, href, imageSrc, category, publishedDate, dateTime, description }: HeroCardProps) {
  return (
    <a href={href} className="w-full flex flex-col items-start justify-start group cursor-pointer">
      <div className="w-full rounded-[2px] overflow-hidden border-2 border-black group-hover:border-[var(--hover-green)] transition-colors relative">
        <Image
          src={imageSrc}
          alt="Featured blog post image"
          width={800}
          height={600}
          className="w-full h-auto object-cover rounded-[2px]"
          priority
        />
      </div>
      <div className="w-full flex flex-col justify-start items-stretch pt-5 gap-3">
        <h2 className="font-sans text-5xl font-semibold flex text-left group-hover:text-[var(--hover-green)] transition-colors">
          {title}
        </h2>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 justify-start">
            <div className="flex items-center justify-start gap-2 text-gray-600">
              <svg width="16" height="16" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 7H7.51M7.5 3H12.5C13.0304 3.00011 13.539 3.2109 13.914 3.586L20.914 10.586C21.2889 10.9611 21.4996 11.4697 21.4996 12C21.4996 12.5303 21.2889 13.0389 20.914 13.414L13.914 20.414C13.5389 20.7889 13.0303 20.9996 12.5 20.9996C11.9697 20.9996 11.4611 20.7889 11.086 20.414L4.086 13.414C3.7109 13.039 3.50011 12.5304 3.5 12V7C3.5 5.93913 3.92143 4.92172 4.67157 4.17157C5.42172 3.42143 6.43913 3 7.5 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p className="font-mono text-base"><span className="opacity-60">Category:</span> {category}</p>
            </div>
            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
            <p className="font-mono text-base text-gray-600">
              <span className="opacity-60">Published on</span> <time dateTime={dateTime}>{publishedDate}</time>
            </p>
          </div>
          <p className="font-mono text-base text-left line-clamp-3">
            {description}
          </p>
        </div>
      </div>
    </a>
  );
}