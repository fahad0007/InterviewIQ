import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import { getRounds } from "../services/roundService";

const RoundContext = createContext();

export function RoundProvider({ children }) {
  const [rounds, setRounds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadRounds = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getRounds();

      setRounds(data);
    } catch (error) {
      console.error(
        "Error loading rounds:",
        error
      );

      setError(
        "Failed to load interview rounds."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRounds();
  }, []);

  return (
    <RoundContext.Provider
      value={{
        rounds,
        loading,
        error,
        loadRounds
      }}
    >
      {children}
    </RoundContext.Provider>
  );
}

export function useRounds() {
  return useContext(RoundContext);
}