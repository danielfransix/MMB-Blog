export default function ArrowTest() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">
          Arrow Components Test
        </h1>
        
        {/* Arrow Buttons */}
        <div className="space-y-6 mb-12">
          <div className="flex justify-center space-x-4">
            <button className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors">
              <span className="mr-2">Previous</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button className="flex items-center bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors">
              <span className="mr-2">Next</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          <div className="flex justify-center space-x-4">
            <button className="flex items-center bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg transition-colors">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              <span>Back</span>
            </button>
            
            <button className="flex items-center bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-colors">
              <span className="mr-2">Forward</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Arrow Navigation */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Navigation Arrows</h2>
          <div className="flex justify-between items-center">
            <button aria-label="Previous page" className="p-3 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-800">Page 1 of 5</h3>
              <p className="text-gray-600">Navigate through content</p>
            </div>
            
            <button aria-label="Next page" className="p-3 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Directional Indicators */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Directional Indicators</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <svg className="w-8 h-8 mx-auto mb-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              <span className="text-sm text-gray-600">Up</span>
            </div>
            
            <div className="text-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <svg className="w-8 h-8 mx-auto mb-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              <span className="text-sm text-gray-600">Down</span>
            </div>
            
            <div className="text-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <svg className="w-8 h-8 mx-auto mb-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="text-sm text-gray-600">Left</span>
            </div>
            
            <div className="text-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <svg className="w-8 h-8 mx-auto mb-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              <span className="text-sm text-gray-600">Right</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}