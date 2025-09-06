import { useState } from 'react';
import { Mail, Shield } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { SIGNUP_OTP_VERIFY, LOGIN_OTP_VERIFY, RESEND_OTP } from '../../utils/constants';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function VerifyOTP() {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const { username, email, password, authType } = location.state || {};

    const handleVerify = async () => {
        setError('');
        setLoading(true);

        try {
            let apiUrl = '';
            let payload = { email, otp };

            if (authType === 'signup') {
                apiUrl = SIGNUP_OTP_VERIFY;
                payload = { email, username, otp, password };
            }
            else if (authType === 'login') {
                apiUrl = LOGIN_OTP_VERIFY;
                payload = { email,password, otp };
            } else {
                setError('Invalid authentication type');
                setLoading(false);
                return;
            }

            const response = await axios.post(apiUrl, payload, { withCredentials: true });

            console.log(response)

            // Your original navigation logic
            if (authType === 'signup') {
                navigate('/auth/login');
                toast.success(response.message || 'Signup successful. Please log in.');
            } else if (authType === 'login') {
                navigate('/dashboard');
                toast.success(response.message || 'Login successful');
            }

        } catch (e) {
            console.log('OTP error response:', e);
            setError(e.response?.data?.message || 'OTP verification failed');
        }

        setLoading(false);
    };

    const resendOtp = async () => {
        setOtp("");
        await axios.post(RESEND_OTP, { email })
            .then(() => {
                toast.success('OTP resent successfully, please check your email.' );
            }).catch(err => {
                console.log('Resend OTP error:', err);
                setError(err.response?.data?.message || 'Failed to resend OTP');
            });

    }

    if (!email) {
        return <p>Error: Missing user data</p>;
    }

    return (
        <div className="min-h-screen w-[50%] bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="p-8">

                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                            <Shield className="w-8 h-8 text-blue-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Verify Your Email</h2>
                        <p className="text-gray-600 mb-2">We've sent a 6-digit code to</p>
                        <div className="flex items-center justify-center text-blue-600 font-medium">
                            <Mail className="w-4 h-4 mr-2" />
                            {email}
                        </div>
                    </div>

                    {/* Simple OTP Input */}
                    <div className="mb-6">
                        <input
                            type="text"
                            value={otp}
                            onChange={e => setOtp(e.target.value)}
                            placeholder="Enter 6-digit OTP"
                            maxLength={6}
                            className="w-full text-center text-2xl font-bold py-4 px-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all bg-gray-50 focus:bg-white"
                        />
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-4 text-center">
                            <p className="text-red-600 text-sm bg-red-50 py-2 px-4 rounded-lg">
                                {error}
                            </p>
                        </div>
                    )}

                    {/* Verify Button */}
                    <button
                        onClick={handleVerify}
                        disabled={otp.length !== 6 || loading}
                        className={`w-full py-4 px-6 rounded-xl font-semibold transition-all shadow-lg ${otp.length === 6 && !loading
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:shadow-xl'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            }`}
                    >
                        {loading ? 'Verifying...' : 'Verify OTP'}
                    </button>

                    {/* Resend Button */}
                    <div className="text-center mt-6">
                        <p className="text-gray-600 mb-3">Didn't receive the code?</p>
                        <button className="text-blue-600 hover:text-blue-700 font-semibold" onClick={resendOtp}>
                            Resend OTP
                        </button>
                    </div>

                </div>

                {/* Footer */}
                <div className="text-center mt-6">
                    <p className="text-gray-500 text-sm">
                        This helps keep your account secure
                    </p>
                </div>
            </div>
        </div>
    );
}