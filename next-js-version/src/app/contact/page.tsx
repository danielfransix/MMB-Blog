import ContactForm from "../../components/ContactForm";
import { LINKS } from "../../config/links";
import Image from "next/image";

export default function Contact() {
  return (
    <div className="page-main-container">
      {/* Contact Section */}
      <section className="page-section-container">
        <div className="page-content-wrapper">
          <div className="page-content-inner">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left Column - Contact Form and Social Icons */}
              <div className="space-y-8">
                <ContactForm 
                  title="Get In Touch" 
                  description="Have a question, suggestion, or just want to say hello? We'd love to hear from you!"
                />
                
                {/* Social Icons */}
                <div className="flex justify-center">
                  <div className="layout-footer-social-links">
                    <a href={LINKS.SOCIAL_TWITTER} aria-label="Twitter" className="layout-footer-social-link">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="layout-footer-social-icon">
                        <rect width="256" height="256" fill="none"/>
                        <path d="M88,176S32.85,144,40.78,56c0,0,39.66,40,87.22,48V88c0-22,18-40.27,40-40a40.74,40.74,0,0,1,36.67,24H240l-32,32c-4.26,66.84-60.08,120-128,120-32,0-40-12-40-12S72,200,88,176Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
                      </svg>
                    </a>
                    <a href={LINKS.SOCIAL_FACEBOOK} aria-label="Facebook" className="layout-footer-social-link">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="layout-footer-social-icon">
                        <rect width="256" height="256" fill="none"/>
                        <circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
                        <path d="M168,88H152a24,24,0,0,0-24,24V224" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
                        <line x1="96" y1="144" x2="160" y2="144" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
                      </svg>
                    </a>
                    <a href={LINKS.SOCIAL_INSTAGRAM} aria-label="Instagram" className="layout-footer-social-link">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="layout-footer-social-icon">
                        <rect width="256" height="256" fill="none"/>
                        <circle cx="128" cy="128" r="40" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="16"/>
                        <rect x="32" y="32" width="192" height="192" rx="48" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
                        <circle cx="180" cy="76" r="12"/>
                      </svg>
                    </a>
                    <a href={LINKS.SOCIAL_LINKEDIN} aria-label="LinkedIn" className="layout-footer-social-link">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="layout-footer-social-icon">
                        <rect width="256" height="256" fill="none"/>
                        <rect x="32" y="32" width="192" height="192" rx="8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
                        <line x1="120" y1="112" x2="120" y2="176" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
                        <line x1="88" y1="112" x2="88" y2="176" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
                        <path d="M120,140a28,28,0,0,1,56,0v36" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
                        <circle cx="88" cy="84" r="12"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Right Column - Illustration */}
              <div className="flex justify-center items-center">
                <Image
                  src="/Illustration - No Messages - Empty Inbox.svg"
                  alt="Contact us illustration"
                  width={400}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}