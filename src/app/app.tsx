import { UserIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-base-200">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-primary mb-4">
            Asset Management System
          </h1>
          <p className="text-xl text-base-content opacity-70 max-w-2xl mx-auto">
            A secure platform to manage your assets with easy tracking and organization
          </p>
        </header>

        <section className="card bg-base-100 shadow-xl max-w-3xl mx-auto">
          <div className="card-body text-center">
            <h2 className="card-title text-2xl justify-center">
              Welcome to your Asset Dashboard
            </h2>
            <p className="py-4">
              This application allows you to securely track and manage all your assets in one place.
              Sign in to get started or create a new account.
            </p>
            
            <div className="card-actions justify-center mt-6 flex-col sm:flex-row gap-4">
              <button className="btn btn-primary flex items-center gap-2">
                <UserIcon className="h-5 w-5" />
                <span>Sign Up</span>
              </button>
              <button className="btn btn-outline flex items-center gap-2">
                <ArrowRightIcon className="h-5 w-5" />
                <span>Log In</span>
              </button>
            </div>
          </div>
        </section>
      </div>
      
      <footer className="footer footer-center p-4 bg-base-300 text-base-content mt-auto">
        <div>
          <p>Asset Management System &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;