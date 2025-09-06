import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    ChevronDown,
    Lightbulb,
    List,
    Settings,
    HelpCircle,
    LogOut,
    UploadCloud,
} from 'lucide-react';

const Navbar = () => {

    const mapArr = [1,2,3,4,5,6]

    const handleNavClick = () => {
        console.log("first")
    };

    const location = useLocation();

    const [showDropdown, setShowDropdown] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);

    const handleLogout = () => {
        console.log("first")
    };

    const isActive = (path) => location.pathname === path;

    const linkClasses = (path) =>
        `h-[60px] flex items-center px-6 text-[14px] font-bold transition-all duration-200 text-white hover:bg-[#000033] relative ${isActive(path) ? 'bg-[#000033] text-[#7c9ef5]' : ''
        } ${isActive(path)
            ? 'after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-[#5888f8]'
            : ''
        }`;


    return (
        <>
            <div className="h-[60px] bg-[#1d1d43] fixed w-full z-[2000] flex items-center justify-between shadow-lg border-b border-[#2a2a55]">
                <div className="flex text-white items-center">
                    <div className="px-8">
                        {/* <TermScoutLogo color="white" className="w-[90px] mt-1" /> */}
                    </div>

                    <nav className="flex items-center space-x-0">
                        <Link to="/certify" onClick={handleNavClick} className={linkClasses('/certify')}>
                            Certify™
                        </Link>

                        <Link
                            to="/contract-review"
                            onClick={handleNavClick}
                            className={linkClasses('/contract-review')}
                        >
                            Predict™
                        </Link>

                        {/* Contract Dropdown Menu */}
                        <div
                            className="relative"
                            onMouseEnter={() => setShowDropdown(true)}
                            onMouseLeave={() => setShowDropdown(false)}
                        >
                            <div className={linkClasses('/contract-data')}>
                                <div className="flex items-center">
                                    Contract Market Data™
                                    <ChevronDown
                                        width={'18px'}
                                        className={`ml-1 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''
                                            }`}
                                    />
                                </div>
                            </div>

                            {showDropdown && (
                                <div className="absolute top-[60px] left-0 bg-[#1d1d43] shadow-xl border border-[#2a2a55] min-w-[340px] z-50 rounded-b-lg overflow-hidden">
                                    <div className="flex flex-col divide-y divide-[#2a2a55]">
                                        <Link
                                            to="/insights"
                                            onClick={handleNavClick}
                                            className="block hover:bg-[#000033] transition-all duration-200 group px-5 py-4"
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="p-2 rounded-lg transition-colors">
                                                    <Lightbulb width={26} className="text-white" />
                                                </div>
                                                <div>
                                                    <p className="text-white text-[15px] font-semibold mb-1">
                                                        Insights
                                                    </p>
                                                    <p className="text-[#a5a5d6] text-[13px] leading-relaxed">
                                                        Explore market data of thousands of contract clauses
                                                        and provisions
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                        <Link
                                            to="/compare"
                                            onClick={handleNavClick}
                                            className="block hover:bg-[#000033] transition-all duration-200 group px-5 py-4"
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="p-2 transition-colors">
                                                    <List width={18} className="text-white" />
                                                </div>
                                                <div>
                                                    <p className="text-white text-[15px] font-semibold mb-1">
                                                        Compare
                                                    </p>
                                                    <p className="text-[#a5a5d6] text-[13px] leading-relaxed">
                                                        Conduct side-by-side analysis of hundreds of
                                                        contracts and data points
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>

                        <Link to="/dashboard" onClick={handleNavClick} className={linkClasses('/dashboard')}>
                            Dashboard
                        </Link>
                    </nav>
                </div>

                <div className="flex items-center gap-4 pr-8">
                    <button
                        className="bg-[#0073FF] text-white px-5 py-2.5 font-bold rounded-sm transition-all duration-200 cursor-pointer flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                        onClick={() => setShowUploadModal(true)}
                    >
                        <UploadCloud size={22} />
                        <span className="text-md">Upload Contract</span>
                    </button>

                    {/* Profile Dropdown Menu */}
                    <div
                        className="relative"
                        onMouseEnter={() => setShowProfileMenu(true)}
                        onMouseLeave={() => setShowProfileMenu(false)}
                    >
                        {/* Profile Icon */}
                        <div className="h-[60px] px-4 flex items-center justify-center cursor-pointer hover:bg-[#000033] transition-colors duration-200 rounded-lg">
                            <div className="flex items-center">
                                <div className="w-[36px] h-[36px] rounded-full bg-gradient-to-br from-[#5888f8] to-[#4a7ae8] flex items-center justify-center text-white text-[15px] font-semibold shadow-lg ring-2 ring-[#2a2a55] hover:ring-[#5888f8] transition-all duration-200">
                                    J
                                </div>
                                <ChevronDown
                                    width={'16px'}
                                    className={`ml-2 text-[#a5a5d6] transition-all duration-200 ${showProfileMenu ? 'rotate-180 text-[#7c9ef5]' : ''
                                        }`}
                                />
                            </div>
                        </div>

                        {showProfileMenu && (
                            <div className="absolute top-[60px] right-0 bg-[#1d1d43] shadow-xl border border-[#2a2a55] min-w-[220px] z-50 rounded-lg overflow-hidden">
                                <div className="flex flex-col divide-y divide-[#2a2a55] py-2">
                                    <Link
                                        to="/settings"
                                        onClick={handleNavClick}
                                        className="block hover:bg-[#000033] transition-all duration-200 px-5 py-3 text-white text-sm flex items-center gap-3 group"
                                    >
                                        <div className="p-1.5 bg-[#2a2a55] rounded-md group-hover:bg-[#5888f8] transition-colors">
                                            <Settings
                                                size={14}
                                                className="text-[#7c9ef5] group-hover:text-white"
                                            />
                                        </div>
                                        <span className="font-medium">Settings</span>
                                    </Link>
                                    <Link
                                        to="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            window.open(
                                                '#',
                                                '_blank',
                                                'noopener,noreferrer'
                                            );
                                            handleNavClick();
                                        }}
                                        className="block hover:bg-[#000033] transition-all duration-200 px-5 py-3 text-white text-sm flex items-center gap-3 group"
                                    >
                                        <div className="p-1.5 bg-[#2a2a55] rounded-md group-hover:bg-[#5888f8] transition-colors">
                                            <HelpCircle
                                                size={14}
                                                className="text-[#7c9ef5] group-hover:text-white"
                                            />
                                        </div>
                                        <span className="font-medium">Help Center</span>
                                    </Link>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            handleNavClick();
                                        }}
                                        className="w-full text-left hover:bg-[#000033] transition-all duration-200 px-5 py-3 text-white text-sm flex items-center gap-3 group"
                                    >
                                        <div className="p-1.5 bg-[#2a2a55] rounded-md group-hover:bg-red-500 transition-colors">
                                            <LogOut
                                                size={14}
                                                className="text-[#7c9ef5] group-hover:text-white"
                                            />
                                        </div>
                                        <span className="font-medium">Sign Out</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>)
}

export default Navbar