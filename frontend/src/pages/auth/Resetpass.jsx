import React, { useState } from 'react';
import { Lock, Eye, EyeOff, Shield, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PASSWORD_RESET } from '../../utils/constants';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

function Resetpass() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    const { token } = useParams();

    const route = `${PASSWORD_RESET}/${token}`;

    // console.log(route);

    const handleSubmit = async () => {
        try {
            setError('');

            if (password.length < 8) {
                setError('Password must be at least 8 characters');
                toast.error('Password must be at least 8 characters');
                return;
            }
            if (password !== confirmPassword) {
                setError('Passwords do not match');
                toast.error('Passwords do not match');
                return;
            }

            setLoading(true);

            const data = {
                newPassword: password,
                reNewPassword: confirmPassword
            }

            await axios.post(route, data)
                .then(() => {
                    setSuccess(true);
                    toast.success('Password reset successfully!');
                }).catch((error) => {
                    console.log('Password reset failed :-', error);
                    setError('Failed to reset password. Please try again.');
                    toast.error(error);
                });

            setTimeout(() => {
                navigate('/auth/login');
            }, 3000);

        } catch (e) {
            console.log('Password reset failed :-', e);
            setError('Failed to reset password. Please try again.');
        }

        setLoading(false);
    };

    if (!token) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="p-8 text-center">
                    <p className="text-red-600 font-semibold">Invalid reset link</p>
                    <button className="mt-4 text-blue-600 hover:text-blue-700 font-medium">
                        Go back to login
                    </button>
                </div>
            </div>
        );
    }

    if (success) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="p-8 text-center">
                        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Password Reset Successfully!</h2>
                        <p className="text-gray-600 mb-6">
                            Your password has been updated. You will be redirected to login shortly.
                        </p>
                        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8">

                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                            <Shield className="w-8 h-8 text-blue-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h2>
                        <p className="text-gray-600">Enter your new password below</p>
                    </div>

                    {/* Form */}
                    <div className="space-y-6">

                        {/* New Password */}
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="New Password"
                                className="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>

                        {/* Confirm Password */}
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                placeholder="Confirm New Password"
                                className="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>

                        {/* Password Requirements */}
                        <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                            <p className="font-medium mb-1">Password must contain:</p>
                            <ul className="space-y-1">
                                <li className={`flex items-center ${password.length >= 8 ? 'text-green-600' : 'text-gray-500'}`}>
                                    <span className="w-2 h-2 rounded-full bg-current mr-2"></span>
                                    At least 8 characters
                                </li>
                            </ul>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="text-center">
                                <p className="text-red-600 text-sm bg-red-50 py-2 px-4 rounded-lg">
                                    {error}
                                </p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            onClick={handleSubmit}
                            disabled={!password || !confirmPassword || loading}
                            className={`w-full py-4 px-6 rounded-xl font-semibold transition-all shadow-lg ${password && confirmPassword && !loading
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:shadow-xl'
                                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            {loading ? 'Updating Password...' : 'Update Password'}
                        </button>

                    </div>

                    {/* Back to Login */}
                    <div className="text-center mt-8">
                        <button className="text-blue-600 hover:text-blue-700 font-medium" onClick={() => navigate('/auth/login')}>
                            ← Back to Login
                        </button>
                    </div>

                </div>

                {/* Footer */}
                <div className="text-center mt-6">
                    <p className="text-gray-500 text-sm">
                        Make sure to choose a strong password
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Resetpass;