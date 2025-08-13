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
    <a href={href} className="hero-card-link group">
      <div className="hero-card-image-container group-hover:border-[var(--hover-green)]">
        <Image
          src={imageSrc}
          alt="Featured blog post image"
          width={800}
          height={600}
          className="hero-card-image rounded-[2px]"
          priority
        />
      </div>
      <div className="hero-card-content">
        <h2 className="hero-card-title group-hover:text-[var(--hover-green)]">
          {title}
        </h2>
        <div className="hero-card-details">
          <div className="hero-card-meta-container items-start gap-3 md:gap-2">
            <div className="hero-card-meta-info">
              <p className="hero-card-category"><span className="opacity-60">Category:</span> {category}</p>
            </div>
            <div className="hero-card-separator hidden md:block"></div>
            <p className="hero-card-date">
              <span className="opacity-60">Published on</span> <time dateTime={dateTime}>{publishedDate}</time>
            </p>
          </div>
          <p className="hero-card-description">
            {description}
          </p>
        </div>
      </div>
    </a>
  );
}