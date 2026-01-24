import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-main-container">
      <section className="page-section-container">
        <div className="page-content-wrapper">
          <div className="page-content-inner">
            <div className="content-container-wide">
              <div className="flex flex-col items-center justify-center text-center py-12">
                {/* 404 Illustration */}
                <div className="mb-8">
                  <Image
                    src="/svgs/error_404.svg"
                    alt="404 Error Illustration"
                    width={400}
                    height={300}
                    className="max-w-full h-auto"
                    priority
                  />
                </div>
                
                {/* Error Message */}
                <div className="mb-8">
                  <h1 className="page-title-large mb-4 text-gray-800">
                    Page Not Found
                  </h1>
                  <p className="text-gray-600 leading-relaxed max-w-md mx-auto">
                    Sorry, we couldn&apos;t find the page you&apos;re looking for. 
                    The page might have been moved, deleted, or the URL might be incorrect.
                  </p>
                </div>
                
                {/* Call-to-Action Button */}
                <Link 
                  href="/"
                  className="px-8 py-3 bg-black text-white hover:bg-green-500 hover:text-black transition-colors rounded-[2px] font-medium inline-flex items-center gap-2"
                >
                  <svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
                    />
                  </svg>
                  Back to Homepage
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}