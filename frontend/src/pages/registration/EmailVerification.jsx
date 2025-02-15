import { useEffect } from 'react';
import { auth } from '../../firebase/firebaseConfig';
import { sendEmailVerification } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function EmailVerification() {
    const user = auth.currentUser;
    const navigate = useNavigate();

    useEffect(() => {
        const sendVerificationEmail = async () => {
            if (user && !user.emailVerified) {
                await sendEmailVerification(user);
                toast.success("Verification email sent!");
            }
        };
        sendVerificationEmail();
    }, [user]);

    const handleResendVerification = async () => {
        if (user && !user.emailVerified) {
            await sendEmailVerification(user);
            toast.success("Verification email resent!");
        }
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='bg-gray-800 px-10 py-10 rounded-xl'>
                <h1 className='text-center text-white text-xl mb-4 font-bold'>Email Verification</h1>
                <p className='text-white'>Please check your email to verify your account.</p>
                <button onClick={handleResendVerification} className='bg-red-500 text-white font-bold px-4 py-2 rounded-lg mt-4'>
                    Resend Verification Email
                </button>
            </div>
        </div>
    );
}

export default EmailVerification;
