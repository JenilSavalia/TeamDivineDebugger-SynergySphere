import React from 'react';
import { Mail, Smartphone, Lock, Users, Folder, ShieldCheck, ArrowRight, PlayCircle, Fingerprint, Cloud, Globe } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
function Home() {
    return (
        <div className="min-h-screen bg-gray-50 font-inter text-gray-800 antialiased">
           
            {/* Navbar */}
            <header className="py-4 px-6 md:px-10 lg:px-20 bg-white shadow-sm rounded-b-xl">
                <nav className="flex items-center justify-between max-w-7xl mx-auto">
                    <div className="flex items-center space-x-2">
                        <ShieldCheck className="text-blue-600" size={32} />
                        <span className="text-2xl font-bold text-gray-900">ShieldRoom</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <a href="#features" className="text-gray-600 hover:text-blue-600 font-medium transition duration-300">Features</a>
                        <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 font-medium transition duration-300">How it Works</a>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-lg shadow-md transition duration-300 transform hover:scale-105">
                            <Link to="/auth/login">LogIn</Link>
                        </button>
                    </div>
                </nav>
            </header>

            {/* Hero Section */}
            <section className="relative py-20 md:py-32 bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden rounded-b-[40px] md:rounded-b-[60px]">
                <div className="absolute inset-0 z-0 opacity-20">
                    <svg className="w-full h-full" fill="none" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0,192L80,186.7C160,181,320,171,480,176C640,181,800,203,960,197.3C1120,192,1280,160,1360,144L1440,128L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z" fill="#e0f2f7"></path>
                        <path d="M0,224L80,208C160,192,320,160,480,154.7C640,149,800,171,960,197.3C1120,224,1280,256,1360,272L1440,288L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z" fill="#cbe6f2"></path>
                    </svg>
                </div>
                <div className="relative max-w-7xl mx-auto px-6 md:px-10 lg:px-20 text-center z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900 mb-6">
                        Your Documents. <span className="text-blue-600">Securely Shared.</span> Simply Managed.
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
                        A modern, full-stack web application for secure document storage, sharing, and family/group collaboration—featuring advanced, flexible, and user-centric authentication for maximum privacy and usability.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300 transform hover:scale-105 flex items-center gap-2">
                            <Link to="/auth">Get Started</Link> <ArrowRight size={20} />
                        </button>
                        <button className="bg-white hover:bg-gray-100 text-blue-600 border border-blue-600 font-bold py-3 px-8 rounded-lg shadow-md transition duration-300 transform hover:scale-105 flex items-center gap-2">
                            <PlayCircle size={20} /> Watch Demo
                        </button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-white px-6 md:px-10 lg:px-20">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
                        Why Choose ShieldRoom?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Feature Card 1: Passwordless Authentication */}
                        <div className="bg-gray-50 p-8 rounded-xl shadow-lg flex flex-col items-center text-center transition duration-300 hover:shadow-xl hover:scale-[1.02]">
                            <Fingerprint className="text-blue-500 mb-4" size={48} />
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Passwordless Authentication</h3>
                            <p className="text-gray-600">
                                Forget complex passwords! Log in seamlessly with Google Sign-In or Mobile OTP. Your security, simplified.
                            </p>
                        </div>

                        {/* Feature Card 2: Secure Rooms & Collaboration */}
                        <div className="bg-gray-50 p-8 rounded-xl shadow-lg flex flex-col items-center text-center transition duration-300 hover:shadow-xl hover:scale-[1.02]">
                            <Users className="text-emerald-500 mb-4" size={48} />
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure Rooms & Collaboration</h3>
                            <p className="text-gray-600">
                                Create and join secure "Rooms" or "Family Groups" with unique codes for private sharing.
                            </p>
                        </div>

                        {/* Feature Card 3: Granular Permissions */}
                        <div className="bg-gray-50 p-8 rounded-xl shadow-lg flex flex-col items-center text-center transition duration-300 hover:shadow-xl hover:scale-[1.02]">
                            <Lock className="text-red-500 mb-4" size={48} />
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Granular Permissions</h3>
                            <p className="text-gray-600">
                                Assign specific permissions (admin, member, guest) to control access to your shared files.
                            </p>
                        </div>

                        {/* Feature Card 4: Document Management */}
                        <div className="bg-gray-50 p-8 rounded-xl shadow-lg flex flex-col items-center text-center transition duration-300 hover:shadow-xl hover:scale-[1.02]">
                            <Folder className="text-purple-500 mb-4" size={48} />
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Comprehensive Document Management</h3>
                            <p className="text-gray-600">
                                Easily upload, view, share, and download personal or shared files. File versioning and activity logs included.
                            </p>
                        </div>

                        {/* Feature Card 5: End-to-End Security */}
                        <div className="bg-gray-50 p-8 rounded-xl shadow-lg flex flex-col items-center text-center transition duration-300 hover:shadow-xl hover:scale-[1.02]">
                            <ShieldCheck className="text-orange-500 mb-4" size={48} />
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Robust Security Measures</h3>
                            <p className="text-gray-600">
                                From JWT-based sessions to brute-force protection, your data's integrity is our top priority.
                            </p>
                        </div>

                        {/* Feature Card 6: Intuitive User Experience */}
                        <div className="bg-gray-50 p-8 rounded-xl shadow-lg flex flex-col items-center text-center transition duration-300 hover:shadow-xl hover:scale-[1.02]">
                            <Globe className="text-cyan-500 mb-4" size={48} />
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Intuitive User Experience</h3>
                            <p className="text-gray-600">
                                Enjoy a clean, intuitive UI/UX with responsive design, ensuring a seamless experience on any device.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="py-20 bg-blue-50 px-6 md:px-10 lg:px-20 rounded-t-[40px] md:rounded-t-[60px]">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
                        How It Works
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        {/* Step 1 */}
                        <div className="flex flex-col items-center text-center bg-white p-8 rounded-xl shadow-lg transition duration-300 hover:shadow-xl">
                            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6 shadow-md">1</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Register & Verify</h3>
                            <p className="text-gray-600">
                                Sign up with Google or your mobile number for a passwordless experience. Email + OTP is an optional alternative.
                            </p>
                            <div className="flex space-x-4 mt-4">
                                <Mail size={24} className="text-blue-500" />
                                <Smartphone size={24} className="text-blue-500" />
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex flex-col items-center text-center bg-white p-8 rounded-xl shadow-lg transition duration-300 hover:shadow-xl">
                            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6 shadow-md">2</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure Login</h3>
                            <p className="text-gray-600">
                                Easily log in via Google or Mobile OTP. Your session starts immediately, directing you to your personalized dashboard.
                            </p>
                            <div className="flex space-x-4 mt-4">
                                <Fingerprint size={24} className="text-blue-500" />
                                <Lock size={24} className="text-blue-500" />
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex flex-col items-center text-center bg-white p-8 rounded-xl shadow-lg transition duration-300 hover:shadow-xl">
                            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6 shadow-md">3</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Collaborate & Share</h3>
                            <p className="text-gray-600">
                                Create or join family rooms with a unique code. Upload, share, and view files securely within each room.
                            </p>
                            <div className="flex space-x-4 mt-4">
                                <Users size={24} className="text-blue-500" />
                                <Cloud size={24} className="text-blue-500" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white px-6 md:px-10 lg:px-20 rounded-b-[40px] md:rounded-b-[60px] shadow-inner">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience True Document Security?</h2>
                    <p className="text-lg md:text-xl mb-10 opacity-90">
                        Join ShieldRoom today and simplify how you manage, share, and protect your important files with confidence.
                    </p>
                    <button className="bg-white hover:bg-blue-100 text-blue-700 font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300 transform hover:scale-105">
                        Start Your Free Trial
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 bg-gray-900 text-white text-center rounded-t-xl">
                <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20">
                    <p className="text-gray-400">&copy; {new Date().getFullYear()} ShieldRoom. All rights reserved.</p>
                    <div className="flex justify-center space-x-6 mt-4">
                        <a href="#" className="text-gray-400 hover:text-white transition duration-300">Privacy Policy</a>
                        <a href="#" className="text-gray-400 hover:text-white transition duration-300">Terms of Service</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Home;