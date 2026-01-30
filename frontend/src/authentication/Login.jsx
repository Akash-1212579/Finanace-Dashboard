import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/auth/authThunks";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.auth,
  );
  console.log("from login", error, loading, isAuthenticated);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(isAuthenticated);
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return alert("Enter all credentials before Login!");
    }
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="w-full max-w-md rounded-xl bg-slate-900 border border-slate-800 shadow-xl p-8">
        <h1 className="text-2xl font-semibold text-emerald-400 text-center">
          Secure Login
        </h1>
        <p className="text-sm text-slate-400 text-center mt-1">
          Access your finance dashboard
        </p>

        <div className="mt-6">
          <label className="block text-sm text-slate-300 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-slate-200
                       focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="admin@test.com"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm text-slate-300 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-2 text-slate-200
                       focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          onClick={handleLogin}
          disabled={loading}
          className={`mt-8 w-full rounded-lg px-4 py-2 text-sm font-medium transition
            ${
              loading
                ? "bg-emerald-900 text-emerald-300 cursor-not-allowed"
                : "bg-emerald-500 hover:bg-emerald-600 text-slate-900"
            }`}
        >
          {loading ? "Authenticating..." : "Login"}
        </button>
        <div className="flex">
            <Link
          to="/register"
          className="
    relative ml-auto
    text-center px-3 py-2 text-sm font-medium text-slate-200
    transition-all duration-300 ease-out
    hover:text-emerald-400
    after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0
    after:bg-emerald-400 after:transition-all after:duration-300
    hover:after:w-full
    focus-visible:outline-none focus-visible:ring-2
    focus-visible:ring-emerald-400/60
    rounded-md
  "
        >
          Don't have account? Register...
        </Link>
        </div>
        

        {error && (
          <p className="mt-4 text-sm text-red-400 text-center">{error}</p>
        )}

        {isAuthenticated && (
          <p className="mt-4 text-sm text-emerald-400 text-center">
            Logged in successfully
          </p>
        )}
        
      </div>
      
    </div>
  );
}
