import { fetchAPI, getStrapiMedia } from "../../../lib/strapi";
import RichText from "../../../components/RichText";
import Image from "next/image";
import AuthorInfo from "../../../components/AuthorInfo";
import { notFound } from "next/navigation";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const data = await fetchAPI("/articles", {
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: {
      coverImage: {
        fields: ["url", "alternativeText", "caption", "width", "height"]
      },
      author: {
        populate: "*"
      },
      blocks: {
        populate: "*"
      }
    },
  });

  const post = data?.data?.[0];

  // Fallback for missing post or API error
  if (!post) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Failed to pull content</h2>
        <p className="text-gray-600">
          This post could not be loaded or does not exist.
        </p>
      </div>
    );
  }

  return (
    <div className="blog-post-container">
      <article className="blog-post-article">
        <header className="blog-post-header">
          <h1 className="blog-post-title">{post.title}</h1>
        </header>

        <div className="blog-post-text-block prose max-w-none">
          {/* Render Dynamic Zone Blocks */}
          {post.blocks?.map((block: any, index: number) => {
            switch (block.__component) {
              case 'shared.rich-text':
                return (
                  <div key={index} className="mb-8">
                    <RichText content={block.body} />
                  </div>
                );
              case 'shared.media':
                const imageUrl = getStrapiMedia(block.file?.url);
                return imageUrl ? (
                  <div key={index} className="mb-8">
                    <Image
                      src={imageUrl}
                      alt={block.caption || "Blog image"}
                      width={800}
                      height={500}
                      className="rounded-[2px] w-full h-auto"
                    />
                    {block.caption && <p className="text-center text-gray-500 text-sm mt-2">{block.caption}</p>}
                  </div>
                ) : null;
              default:
                return null;
            }
          })}

          {!post.blocks && post.content && (
            // Fallback for legacy simple rich text content
            <RichText content={post.content} />
          )}
          <AuthorInfo
            authorName={post.author?.name}
            authorImage={getStrapiMedia(post.author?.picture?.url) || undefined}
            publishedDate={new Date(post.publishedAt).toLocaleDateString()}
            className="blog-post-author-info"
          />
        </div>
      </article>
    </div>
  );
}
