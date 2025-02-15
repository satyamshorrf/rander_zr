import React, { useEffect, useState, useContext } from "react";
import myContext from "../../context/data/myContext";
import Layout from "../../components/layout/Layout";
import Modal from "../../components/modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";
import { fireDB } from "../../firebase/firebaseConfig.jsx";
import { getAuth } from "firebase/auth";

function Cart() {
  const context = useContext(myContext);
  const { mode } = context;

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const [totalAmount, setTotalAmount] = useState(0);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((cartItem) => {
      temp += parseInt(cartItem.price);
    });
    setTotalAmount(temp);
  }, [cartItems]);

  const shipping = 100; // Fixed shipping charge
  const grandTotal = shipping + totalAmount;

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item.id));
    toast.success("Item removed from cart");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const buyNow = async () => {
    if (!name || !address || !pincode || !phoneNumber) {
      return toast.error("All fields are required");
    }

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      return toast.error("User not logged in!");
    }

    const addressInfo = {
      name,
      address,
      pincode,
      phoneNumber,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };

    const options = {
      key: "rzp_test_kPJlyMHTh9tqYG",
      key_secret: "import.meta.env.VITE_RAZORPAY_KEY_SECRET",
      amount: grandTotal * 100,
      currency: "INR",
      name: "E-Bharat",
      description: "For testing purpose",
      handler: async function (response) {
        toast.success("Payment Successful");

        const paymentId = response.razorpay_payment_id;

        const orderInfo = {
          cartItems,
          addressInfo,
          date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
          email: user.email,
          userid: user.uid,
          paymentId,
        };

        try {
          await addDoc(collection(fireDB, "orders"), orderInfo);
          toast.success("Order placed successfully!");
        } catch (error) {
          console.error("Error adding order to Firestore:", error);
          toast.error("Failed to place order. Please try again.");
        }
      },
      theme: { color: "#3399cc" },
    };

    if (razorpayLoaded) {
      const pay = new window.Razorpay(options);
      pay.open();
    } else {
      toast.error("Razorpay SDK not loaded");
    }
  };

  return (
    <Layout>
      <div
        className="h-screen bg-gray-100 pt-5"
        style={{
          backgroundColor: mode === "dark" ? "#282c34" : "",
          color: mode === "dark" ? "white" : "",
        }}
      >
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="justify-between mb-6 rounded-lg border drop-shadow-xl bg-white p-6 sm:flex sm:justify-start"
                style={{
                  backgroundColor: mode === "dark" ? "rgb(32 33 34)" : "",
                  color: mode === "dark" ? "white" : "",
                }}
              >
                <img
                  src={item.imageUrl}
                  alt="product-image"
                  className="w-full rounded-lg sm:w-40"
                />
                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                  <div className="mt-5 sm:mt-0">
                    <h2
                      className="text-lg font-bold text-gray-900"
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      {item.title}
                    </h2>
                    <h2
                      className="text-sm text-gray-900"
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      {item.description}
                    </h2>
                    <p
                      className="mt-1 text-xs font-semibold text-gray-700"
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      ₹{item.price}
                    </p>
                  </div>
                  <div
                    onClick={() => deleteCart(item)}
                    className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6 cursor-pointer"
                  >
                    🗑️
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3"
            style={{
              backgroundColor: mode === "dark" ? "rgb(32 33 34)" : "",
              color: mode === "dark" ? "white" : "",
            }}
          >
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700" style={{ color: mode === "dark" ? "white" : "" }}>
                Subtotal
              </p>
              <p className="text-gray-700" style={{ color: mode === "dark" ? "white" : "" }}>
                ₹{totalAmount}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700" style={{ color: mode === "dark" ? "white" : "" }}>
                Shipping
              </p>
              <p className="text-gray-700" style={{ color: mode === "dark" ? "white" : "" }}>
                ₹{shipping}
              </p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between mb-3">
              <p className="text-lg font-bold" style={{ color: mode === "dark" ? "white" : "" }}>
                Total
              </p>
              <p className="mb-1 text-lg font-bold" style={{ color: mode === "dark" ? "white" : "" }}>
                ₹{grandTotal}
              </p>
            </div>

            <Modal
              name={name}
              address={address}
              pincode={pincode}
              phoneNumber={phoneNumber}
              setName={setName}
              setAddress={setAddress}
              setPincode={setPincode}
              setPhoneNumber={setPhoneNumber}
              buyNow={buyNow}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Cart;
