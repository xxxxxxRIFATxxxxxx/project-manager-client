import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./assets/logo.png";
import { useLoginMutation } from "./authApi";

export default function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [login, { data, isLoading, error }] = useLoginMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (data?.accessToken && data?.user) {
            navigate("/teams");
        };
    }, [data, navigate]);

    const handleLogin = (e) => {
        e.preventDefault();
        login({email, password});
    };

    return (
        <div className="grid place-items-center h-screen bg-[#F9FAFB">
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <Link to="/">
                            <img
                                className="mx-auto h-12 w-auto"
                                src={logo}
                                alt="Learn with sumit"
                            />
                        </Link>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Sign in to your account
                        </h2>
                    </div>

                    <form 
                        className="mt-8 space-y-6" 
                        onSubmit={handleLogin}
                    >
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label
                                    htmlFor="email-address"
                                    className="sr-only"
                                >
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white hover:bg-violet-800 bg-violet-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 ${isLoading && "bg-violet-400 hover:bg-violet-400"}`}
                                disabled={isLoading}
                            >
                                { isLoading ? "Logging..." : "Sign in" } 
                            </button>
                        </div>

                        {
                            error && (
                                <div className="bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md" role="alert">
                                    <div className="flex">
                                        <div className="py-1">
                                            <svg 
                                                className="fill-current h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" 
                                                viewBox="0 0 20 20"
                                            >
                                                <path 
                                                    d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" 
                                                />
                                            </svg>
                                        </div>

                                        <div>
                                            <p className="font-bold text-red-500">Authentication Error</p>
                                            <p className="text-sm text-red-500">{error.data}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </form>
                </div>
            </div>
        </div>
    );
}
