import { createContext, useState } from "react";
import { motion } from "framer-motion";
import Header from "./com/Header";
import ResultList from "./com/ResultList";

export const InputContext = createContext();

function App() {
  const [inputValue, setInputValue] = useState("");

  const value = {
    inputValue,
    setInputValue,
  };

  return (
    <InputContext.Provider value={value}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100"
      >
        <div className="container px-4 mx-auto">
          <Header />
          <ResultList />
        </div>
      </motion.div>
    </InputContext.Provider>
  );
}

export default App;
