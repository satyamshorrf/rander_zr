import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import myContext from '../../context/data/myContext';
import { toast } from 'react-toastify';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import Loader from '../../components/loader/Loader';

function Forgot() {
    const [email, setEmail] = useState("");
    const context = useContext(myContext);
    const { loading, setLoading } = context;
    const navigate = useNavigate();

    const handleForgotPassword = async () => {
        setLoading(true);
        if (email === "") {
            toast.error("Email is required");
            setLoading(false);
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            toast.success("Password reset email sent!");
            navigate('/login');
        } catch (error) {
            console.log(error);
            toast.error("Failed to send password reset email");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            {loading && <Loader />}
            <div className='bg-gray-800 px-10 py-10 rounded-xl'>
                <h1 className='text-center text-white text-xl mb-4 font-bold'>Forgot Password</h1>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Email'
                    className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                />
                <button
                    onClick={handleForgotPassword}
                    className='bg-red-500 w-full text-white font-bold px-2 py-2 rounded-lg'>
                    Send Reset Link
                </button>
                <h2 className='text-white'>Remembered your password? <Link className='text-red-500 font-bold' to={'/login'}>Login</Link></h2>
            </div>
        </div>
    );
}

export default Forgot;
