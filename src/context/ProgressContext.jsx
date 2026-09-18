import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import { useAuth } from "./AuthContext";

import { useToast } from "./ToastContext";

import {
  getUserProgress,
  updateQuestionProgress
} from "../services/userService";

const ProgressContext = createContext();

export function ProgressProvider({ children }) {

  const { showToast } = useToast();
  
  const { user } = useAuth();

  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProgress = async () => {
      if (!user) {
        setProgress({});
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const data = await getUserProgress(
          user.uid
        );

        setProgress(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProgress();
  }, [user]);

  const toggleFavorite = async (questionId) => {
    if (!user) return;

    const current =
      progress[questionId] || {};

    const newFavorite =
      !current.favorite;

    const updatedData = {
      favorite: newFavorite
    };

    setProgress((prev) => ({
      ...prev,

      [questionId]: {
        ...prev[questionId],
        ...updatedData
      }
    }));

    try {
      await updateQuestionProgress(
        user.uid,
        questionId,
        updatedData
      );
       showToast(
      newFavorite
        ? "Added to favorites"
        : "Removed from favorites"
    );
    } catch (error) {
      console.error(error);
       showToast(
      "Failed to update favorite",
      "error"
    );
    }
  };

  const toggleCompleted = async (
    questionId
  ) => {
    if (!user) return;

    const current =
      progress[questionId] || {};

    const newCompleted =
      !current.completed;

    const updatedData = {
      completed: newCompleted,
      completedAt: newCompleted
        ? new Date()
        : null
    };

    setProgress((prev) => ({
      ...prev,

      [questionId]: {
        ...prev[questionId],
        ...updatedData
      }
    }));

    try {
      await updateQuestionProgress(
        user.uid,
        questionId,
        updatedData
      );
       showToast(
      newCompleted
        ? "Question marked as completed"
        : "Question marked as incomplete"
    );
    } catch (error) {
      console.error(error);
       showToast(
      "Failed to update progress",
      "error"
    );
    }
  };

  const isFavorite = (questionId) => {
    return Boolean(
      progress[questionId]?.favorite
    );
  };

  const isCompleted = (questionId) => {
    return Boolean(
      progress[questionId]?.completed
    );
  };

  return (
    <ProgressContext.Provider
      value={{
        progress,
        loading,
        toggleFavorite,
        toggleCompleted,
        isFavorite,
        isCompleted
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  return useContext(ProgressContext);
}