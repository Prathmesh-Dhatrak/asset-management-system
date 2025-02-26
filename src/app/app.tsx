import { UserIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

function App() {
  const [theme, setTheme] = useState("light");
  
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };
  
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-base-200">
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-end mb-4">
          <label className="grid cursor-pointer place-items-center">
            <input
              type="checkbox"
              checked={theme === "dark"}
              onChange={toggleTheme}
              className="toggle theme-controller bg-base-content col-span-2 col-start-1 row-start-1"
            />
            <svg
              className="stroke-base-100 fill-base-100 col-start-1 row-start-1"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>
            <svg
              className="stroke-base-100 fill-base-100 col-start-2 row-start-1"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </label>
        </div>
        
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
            <h2 className="card-title text-2xl justify-center text-base-content">
              Welcome to your Asset Dashboard
            </h2>
            <p className="py-4 text-base-content">
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