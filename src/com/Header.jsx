import React, { useContext, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { InputContext } from "../App";

function Header() {
  const [value, setValue] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { inputValue, setInputValue } = useContext(InputContext);

  const handleInputChange = (e) => setValue(e.target.value);

  const handleInputSubmit = async () => {
    setInputValue(value);
    setValue("");
    fetchImage(value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      setInputValue(value);
      setValue("");
      fetchImage(value);
    }
  };

  const fetchImage = async (query) => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/photos/random`,
        {
          params: {
            query,
            client_id: "PU-FsJsMzWnY4EaETcKomRTvKhH-nDvhhzwjEed7AfA",
          },
        }
      );
      if (response.data && response.data.urls) {
        setImageUrl(response.data.urls.small);
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-12 text-center"
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="inline-block mb-8"
      >
        <img
          src="https://raw.githubusercontent.com/ruchiralkm/Small-Testing/refs/heads/main/Assets/book.gif"
          alt=""
          className="w-32 h-32"
        />
      </motion.div>
      <h1 className="mb-4 text-5xl font-bold text-blue-800">Word-Wiz</h1>
      <p className="mb-1 text-xl text-blue-600">
        Uncover the depth of language
      </p>
      <p className="mb-8 text-xl text-blue-600">
        ©2024 Desigend by Ruchira Kaluarachchi
      </p>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex justify-center mb-8"
      >
        <input
          className="w-full max-w-md px-6 py-3 text-lg text-blue-800 placeholder-blue-300 bg-white border-2 border-blue-200 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-300"
          type="text"
          placeholder="Enter a word..."
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 text-white bg-blue-400 rounded-r-full hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
          onClick={handleInputSubmit}
        >
          Search
        </motion.button>
      </motion.div>

      {inputValue && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="mb-4 text-2xl text-blue-600">
            Exploring:{" "}
            <span className="font-semibold text-blue-800">"{inputValue}"</span>
          </h3>
          {imageUrl && (
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              src={imageUrl}
              alt={inputValue}
              className="object-cover w-64 h-64 mx-auto rounded-lg shadow-lg"
            />
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

export default Header;
