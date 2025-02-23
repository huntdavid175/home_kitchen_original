import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // For Next.js
// import { useLocation, useNavigate } from "react-router-dom"; // Uncomment if using React Router

export default function AuthForm() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState<string | null>();
  const router = useRouter(); // For Next.js
  // const location = useLocation(); // For React Router
  // const navigate = useNavigate(); // For React Router

  useEffect(() => {
    if (typeof window !== "undefined") {
  
      const referrer = document.referrer; // This is the actual previous page
  
      console.log("Referrer:", referrer);
  
        setLocation(referrer); // Save previous page if available
      
    }
  }, []);
   // [navigate] if using React Router

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission here
    if (isSignup) {
      // Handle sign up logic
    } else {
      // Handle login logic
      if(email === "admin" && password === "admin"){
        localStorage.setItem("user", JSON.stringify({ email }));
        console.log(location)
          if(location?.includes("/subscribe")){
            router.push("/subscribe");
          }else{
            router.push("/");
          }
      }
    }
    // Redirect to the desired location
    
  };
  return (
    <div className="min-h-screen">
      <div className="flex flex-col justify-start pt-80 items-center min-h-screen font-lato relative">
        <div className="absolute top-20 flex flex-col items-center justify-center gap-6">
          <div className="flex space-x-10 uppercase font-bold">
            <div>Login</div>
            <div>Sign Up</div>
          </div>
          <div>
            <input
              type="checkbox"
              id="toggle-auth"
              className="hidden"
              checked={isSignup}
              onChange={() => setIsSignup(!isSignup)}
            />
            <label
              htmlFor="toggle-auth"
              className="relative border px-10 bg-gray-100 w-14 h-6 mx-auto rounded-full mt-4 cursor-pointer"
            >
              <span
                className={`absolute w-9 h-9 bg-green-800 rounded-full top-1/2 transform -translate-y-1/2 shadow-md transition ${
                  isSignup ? "translate-x-0" : "-translate-x-9"
                }`}
              ></span>
            </label>
          </div>
        </div>
        <div className="w-96 relative">
          <div
            className="absolute top-0 inset-0 rounded-lg shadow-lg transform transition-transform duration-500"
            style={{ transform: isSignup ? "rotateY(360deg)" : "rotateY(0deg)" }}
          >
            <form className="absolute w-full h-full flex flex-col justify-center items-center p-6 space-y-4">
              <h4 className="text-black text-xl font-semibold">
                {isSignup ? "Sign Up" : "Log In"}
              </h4>
              {isSignup && (
                <div className="w-full relative">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full p-3 pl-10 border border-gray-400 outline-gray-400 text-black rounded-lg placeholder-black/60"
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-crimson">
                    👤
                  </span>
                </div>
              )}
              <div className="w-full relative">
                <input
                  type="email"
                  placeholder="Your Email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 pl-10 border border-gray-400 text-black outline-gray-400 rounded-lg placeholder-black/60"
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-crimson">
                  📧
                </span>
              </div>
              <div className="w-full relative">
                <input
                  type="password"
                  placeholder="Your Password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 pl-10 border border-gray-400 outline-gray-400 text-black rounded-lg placeholder-black/60"
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-crimson">
                  🔒
                </span>
              </div>
              {!isSignup && (
                <div className="flex w-full pb-4 justify-end">
                  <a href="#" className="text-gray-400 hover:text-green-800 text-sm">
                    Forgot your password?
                  </a>
                </div>
              )}
              <button type="submit" onClick={handleSubmit} className="w-full py-2 bg-green-800 text-white rounded-lg shadow-md hover:bg-green-800/80 hover:text-crimson transition">
                Submit
              </button>

              <button className="w-full py-2 mt-4 flex items-center justify-center gap-2 bg-white text-black rounded-lg hover:shadow-md hover:bg-gray-200 transition">
                <img
                  src="https://static-00.iconduck.com/assets.00/google-icon-2048x2048-czn3g8x8.png"
                  alt="Google"
                  className="w-5 h-5"
                />
                Sign in with Google
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
