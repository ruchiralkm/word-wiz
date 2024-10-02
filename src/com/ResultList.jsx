import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InputContext } from "../App";

axios.defaults.baseURL = "https://api.dictionaryapi.dev/api/v2/entries/en";

function ResultList() {
  const { inputValue } = useContext(InputContext);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async (word) => {
    try {
      setLoading(true);
      const res = await axios(`/${word}`);
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError("No results found. Please try another word.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (inputValue.length) {
      fetchData(inputValue);
    }
  }, [inputValue]);

  const ResultSection = ({ title, content }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 mb-6 bg-white rounded-lg shadow-md bg-opacity-60"
    >
      <h3 className="mb-4 text-2xl font-bold text-blue-600">{title}</h3>
      {content}
    </motion.div>
  );

  return (
    <AnimatePresence>
      <div className="container max-w-3xl p-4 mx-auto">
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-xl text-center text-blue-800"
          >
            Loading...
          </motion.div>
        )}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-xl text-center text-red-500"
          >
            {error}
          </motion.div>
        )}
        {response && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ResultSection
              title="Meanings & Definitions"
              content={
                <div>
                  {response[0]?.meanings.map((meaning, index) => (
                    <div key={index} className="mb-4">
                      <p className="font-semibold text-blue-700">
                        {meaning.partOfSpeech}
                      </p>
                      <ul className="text-blue-900 list-disc list-inside">
                        {meaning.definitions.map((definition, i) => (
                          <li key={i} className="mb-2">
                            {definition.definition}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              }
            />

            <ResultSection
              title="Examples"
              content={
                <ul className="text-blue-900 list-disc list-inside">
                  {response[0]?.meanings.flatMap((meaning) =>
                    meaning.definitions
                      .filter((definition) => definition.example)
                      .map((definition, i) => (
                        <li key={i} className="mb-2">
                          {definition.example}
                        </li>
                      ))
                  )}
                </ul>
              }
            />

            <ResultSection
              title="Synonyms"
              content={
                <ul className="text-blue-900 list-disc list-inside">
                  {response[0]?.meanings.flatMap((meaning) =>
                    meaning.synonyms.map((synonym, i) => (
                      <li key={i} className="mb-2">
                        {synonym}
                      </li>
                    ))
                  )}
                </ul>
              }
            />

            <ResultSection
              title="Antonyms"
              content={
                <ul className="text-blue-900 list-disc list-inside">
                  {response[0]?.meanings.flatMap((meaning) =>
                    meaning.antonyms.map((antonym, i) => (
                      <li key={i} className="mb-2">
                        {antonym}
                      </li>
                    ))
                  )}
                </ul>
              }
            />
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
}

export default ResultList;
