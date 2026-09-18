import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import { getQuestions } from "../services/questionService";

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadQuestions = async () => {
    try {
      setLoading(true);

      const data = await getQuestions();

      setQuestions(data);
    } catch (error) {
      console.error("Search questions error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    const term = searchTerm.toLowerCase().trim();

    const results = questions.filter((question) => {
      const questionText =
        question.question?.toLowerCase() || "";

      const category =
        question.category?.toLowerCase() || "";

      const type =
        question.type?.toLowerCase() || "";

      const tags =
        question.tags
          ?.join(" ")
          .toLowerCase() || "";

      return (
        questionText.includes(term) ||
        category.includes(term) ||
        type.includes(term) ||
        tags.includes(term)
      );
    });

    setSearchResults(results.slice(0, 8));
  }, [searchTerm, questions]);

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        searchResults,
        loading
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}