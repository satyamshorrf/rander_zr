import React, { useContext, useEffect, useState } from "react";
import myContext from "../../context/data/myContext";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/loader/Loader";
import { collection, query, where, getDocs } from "firebase/firestore";
import { fireDB } from "../../firebase/firebaseConfig";
import { getAuth } from "firebase/auth";

function Order() {
  const context = useContext(myContext);
  const { mode, loading } = context;

  const [userOrders, setUserOrders] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setFetching(true);
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        setFetching(false);
        return;
      }

      try {
        const ordersRef = collection(fireDB, "orders");
        const q = query(ordersRef, where("userid", "==", user.uid));
        const querySnapshot = await getDocs(q);

        let ordersData = [];
        querySnapshot.forEach((doc) => {
          ordersData.push({ id: doc.id, ...doc.data() });
        });

        setUserOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
      setFetching(false);
    };

    fetchOrders();
  }, []);

  return (
    <Layout>
      {loading || fetching ? (
        <Loader />
      ) : userOrders.length > 0 ? (
        <div className="h-full pt-10">
          {userOrders.map((order) => (
            <div
              className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0"
              key={order.id}
            >
              {order.cartItems.map((item) => (
                <div className="rounded-lg md:w-2/3" key={item.id}>
                  <div
                    className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                    style={{
                      backgroundColor: mode === "dark" ? "#282c34" : "",
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
                        <p
                          className="mt-1 text-xs text-gray-700"
                          style={{ color: mode === "dark" ? "white" : "" }}
                        >
                          {item.description}
                        </p>
                        <p
                          className="mt-1 text-xs text-gray-700"
                          style={{ color: mode === "dark" ? "white" : "" }}
                        >
                          ₹{item.price}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <h2 className="text-center text-2xl text-white">No Orders Found</h2>
      )}
    </Layout>
  );
}

export default Order;
