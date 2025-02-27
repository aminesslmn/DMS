import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      {/* Navigation */}
      <nav className="px-6 py-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="text-white text-2xl font-bold">Your Logo</div>
            <div className="space-x-4">
              <a href="/login" className="text-white hover:text-blue-200">
                Login
              </a>
              <a href="/register" className="px-4 py-2 text-blue-600 bg-white rounded-md hover:bg-blue-50">
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-md px-6 py-8">
          {/* Auth Card */}
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            {/* Card Content */}
            <div className="p-6">
              {children}
            </div>
            
            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t">
              <p className="text-center text-sm text-gray-600">
                Protected by reCAPTCHA and subject to the{' '}
                <a href="#" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>{' '}
                and{' '}
                <a href="#" className="text-blue-600 hover:underline">
                  Terms of Service
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full py-4">
        <div className="container mx-auto px-6">
          <div className="flex justify-center space-x-6 text-white text-sm">
            <a href="#" className="hover:text-blue-200">
              About
            </a>
            <a href="#" className="hover:text-blue-200">
              Contact
            </a>
            <a href="#" className="hover:text-blue-200">
              Privacy
            </a>
            <a href="#" className="hover:text-blue-200">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AuthLayout;