import ContactForm from "../../components/ContactForm";

export default function About() {

  return (
    <div className="page-main-container">
      {/* Hero Section */}
      <section className="page-section-container">
        <div className="page-content-wrapper">
          <div className="page-content-inner">
            <div className="about-page-header">
              <h1 className="page-title-large text-center">About MakeMeBeautiful</h1>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col items-start gap-2">
                <div className="w-full">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Welcome to MakeMeBeautiful, where beauty meets authenticity. We believe that true beauty
                    comes from embracing who you are while exploring new ways to express yourself. Our blog
                    is a space dedicated to sharing insights, tips, and inspiration for anyone on their
                    beauty journey.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Founded with a passion for inclusive beauty, we cover everything from skincare routines
                    and makeup tutorials to wellness tips and self-care practices. Our goal is to create a
                    community where everyone feels empowered to discover their unique beauty.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="page-section-container bg-gray-50">
        <div className="page-content-wrapper">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}