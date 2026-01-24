import { fetchAPI, getStrapiMedia } from "../../lib/strapi";
import PostCard from "../../components/PostCard";

async function getPosts() {
  const data = await fetchAPI("/articles", {
    populate: {
      coverImage: {
        fields: ["url", "alternativeText", "caption", "width", "height"]
      },
      author: {
        populate: "*"
      }
    },
    sort: ["publishedAt:desc"],
  });
  return data?.data || [];
}

export default async function PostsPage() {
  const posts = await getPosts();

  // Fallback if content fetch failed or no posts exist
  if (!posts || posts.length === 0) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Failed to pull content</h2>
        <p className="text-gray-600">
          We couldn't load the latest posts. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post: any) => (
          <PostCard
            key={post.id}
            title={post.title}
            // Fallback to logo if no cover image
            imageSrc={getStrapiMedia(post.coverImage?.url) || '/img/logo.jpg'}
            href={`/posts/${post.slug}`}
            // Map publishedAt to both required date props
            publishedDate={new Date(post.publishedAt).toLocaleDateString()}
            dateTime={post.publishedAt}
            authorName={post.author?.name}
          />
        ))}
      </div>
    </div>
  );
}
