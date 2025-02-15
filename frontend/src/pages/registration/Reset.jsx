import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth } from '../../firebase/firebaseConfig';
import { confirmPasswordReset } from 'firebase/auth';
import Loader from '../../components/loader/Loader';

function Reset() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        const urlParams = new URLSearchParams(window.location.search);
        const oobCode = urlParams.get('oobCode');

        try {
            await confirmPasswordReset(auth, oobCode, password);
            toast.success("Password has been reset!");
            navigate('/login');
        } catch (error) {
            console.log(error);
            toast.error("Failed to reset password");
        }
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            <Loader />
            <div className='bg-gray-800 px-10 py-10 rounded-xl'>
                <h1 className='text-center text-white text-xl mb-4 font-bold'>Reset Password</h1>
                <form onSubmit={handleResetPassword}>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='New Password'
                        className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                    />
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder='Confirm Password'
                        className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                    />
                    <button
                        type="submit"
                        className='bg-red-500 w-full text-white font-bold px-2 py-2 rounded-lg'>
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Reset;
