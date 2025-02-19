import React from "react";
import { motion } from "framer-motion";

const NoPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">🚧 Page Under Construction 🚧</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">We're working hard to bring this page to life. Stay tuned!</p>
        <motion.a
          href="/"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="mt-6 inline-block px-6 py-3 text-white bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600"
        >
          Go Home
        </motion.a>
      </motion.div>
    </div>
  );
};

export default NoPage;
