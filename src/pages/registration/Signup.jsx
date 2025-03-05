import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import myContext from '../../context/data/myContext';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth, fireDB } from '../../firebase/firebaseConfig';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import Loader from '../../components/loader/Loader';

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const context = useContext(myContext);
    const { loading, setLoading } = context;
    const navigate = useNavigate();

    const signup = async () => {
        setLoading(true);
        if (name === "" || email === "" || password === "") {
            toast.error("All fields are required");
            setLoading(false);
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Create user data object
            const userData = {
                name: name,
                uid: user.uid,
                email: user.email,
                time: Timestamp.now()
            };

            // Save user data to Firestore
            const userRef = collection(fireDB, "users");
            await addDoc(userRef, userData);
            toast.success("Signup Successfully");

            // Send email verification
            await sendEmailVerification(user);
            toast.info("Verification email sent! Please check your inbox.");

            // Clear input fields
            setName("");
            setEmail("");
            setPassword("");
            setLoading(false);
            navigate('/email-verification'); // Redirect to email verification page
        } catch (error) {
            console.log(error);
            toast.error("Signup failed");
            setLoading(false);
        }
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            {loading && <Loader />}
            <div className='bg-gray-800 px-10 py-10 rounded-xl'>
                <h1 className='text-center text-white text-xl mb-4 font-bold'>Signup</h1>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none' />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none' />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none' />
                <button onClick={signup} className='bg-red-500 w-full text-white font-bold px-2 py-2 rounded-lg'>Signup</button>
                <h2 className='text-white'>Have an account? <Link className='text-red-500 font-bold' to={'/login'}>Login</Link></h2>
            </div>
        </div>
    );
}

export default Signup;