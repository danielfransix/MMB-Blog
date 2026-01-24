import { fetchAPI } from "../../lib/strapi";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import ContactForm from "../../components/ContactForm";

async function getAboutPageData() {
  try {
    const data = await fetchAPI("/about-page", {
      populate: "*",
    });
    return data?.data;
  } catch (error) {
    console.error("Error fetching about page:", error);
    return null;
  }
}

export default async function About() {
  const strapiData = await getAboutPageData();

  // Fallback if Strapi is down or empty
  if (!strapiData) {
    return (
      <div className="page-main-container">
        <div className="content-container-wide py-20 text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Failed to pull content</h2>
          <p className="text-gray-600">
            We are unable to load the About page content at this moment. 
            Please check your connection or try again later.
          </p>
        </div>
      </div>
    );
  }

  const { title, content } = strapiData;

  return (
    <div className="page-main-container">
      <section className="page-section-container">
        <div className="page-content-wrapper">
          <div className="page-content-inner">
            <div className="content-container-wide">
              <div className="about-page-header">
                <h1 className="page-title-large">{title}</h1>
              </div>
              <div className="flex flex-col items-start gap-2">
                <div className="w-full prose lg:prose-xl text-gray-600 leading-relaxed mb-4">
                  {/* Render Strapi Blocks */}
                  {content ? (
                    <BlocksRenderer content={content} />
                  ) : (
                    <p>No content available.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section-bg-gray">
        <div className="page-content-wrapper">
          <div className="page-content-inner">
            <div className="content-container-wide">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
