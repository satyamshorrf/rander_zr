import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import myContext from '../../context/data/myContext';
import { toast } from 'react-toastify';
import { auth } from '../../firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Loader from '../../components/loader/Loader';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const context = useContext(myContext);
    const { loading, setLoading } = context;
    const navigate = useNavigate();

    const login = async () => {
        setLoading(true);
        if (email === "" || password === "") {
            toast.error("All fields are required");
            setLoading(false);
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Check if email is verified
            if (!user.emailVerified) {
                toast.error("Please verify your email before logging in.");
                setLoading(false);
                return;
            }

            const userData = {
                uid: user.uid,
                email: user.email,
            };
            localStorage.setItem("user", JSON.stringify(userData));
            toast.success("Login Successfully");
            navigate('/');
        } catch (error) {
            console.log(error);
            toast.error("Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            {loading && <Loader />}
            <div className='bg-gray-800 px-10 py-10 rounded-xl'>
                <h1 className='text-center text-white text-xl mb-4 font-bold'>Login</h1>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none' />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none' />
                <button onClick={login} className='bg-red-500 w-full text-white font-bold px-2 py-2 rounded-lg'>Login</button>
                <h2 className='text-white'>Don't have an account? <Link className='text-red-500 font-bold' to={'/signup'}>Signup</Link></h2>
                <h2 className='text-white mt-4'>
                    <Link className='text-red-500 font-bold' to={'/forgot'}>Forgot Password?</Link>
                </h2>
            </div>
        </div>
    );
}

export default Login;