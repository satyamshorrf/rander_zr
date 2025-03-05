import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { sendEmailVerification } from "firebase/auth";

// Initialize Firebase services
const auth = getAuth();
const fireDB = getFirestore();

// Function to send a welcome email
export const sendWelcomeEmail = async (email) => {
    // This function would typically call a backend service or a cloud function
    // to send the email. Firebase does not provide a direct way to send emails.
    // You can use a service like SendGrid or Nodemailer in a Cloud Function.

    // Example of a Cloud Function call (pseudo-code):
    // await fetch('https://your-cloud-function-url/sendWelcomeEmail', {
    //     method: 'POST',
    //     body: JSON.stringify({ email }),
    //     headers: { 'Content-Type': 'application/json' },
    // });
};

// Function to send email verification
export const sendVerificationEmail = async (user) => {
    if (user && !user.emailVerified) {
        await sendEmailVerification(user);
        console.log("Verification email sent!");
    }
};
