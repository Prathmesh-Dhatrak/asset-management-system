import { UserIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

function App() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-screen-lg xl:max-w-screen-xl mx-auto px-4 py-16">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-600 mb-4">
            Asset Management System
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A secure platform to manage your assets with easy tracking and organization
          </p>
        </header>

        <section className="bg-white shadow-md rounded-lg p-8 mb-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Welcome to your Asset Dashboard
            </h2>
            <p className="text-gray-600 mb-6">
              This application allows you to securely track and manage all your assets in one place.
              Sign in to get started or create a new account.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <div className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 transition">
                <UserIcon className="h-5 w-5" />
                <span>Sign Up</span>
              </div>
              <div className="flex items-center justify-center gap-2 bg-gray-100 text-gray-800 px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition">
                <ArrowRightIcon className="h-5 w-5" />
                <span>Log In</span>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      <footer className="bg-gray-100 py-6 mt-auto">
        <div className="max-w-screen-lg xl:max-w-screen-xl mx-auto px-4 text-center">
          <p className="text-gray-600">
            Asset Management System &copy; {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </main>
  );
}

export default App;