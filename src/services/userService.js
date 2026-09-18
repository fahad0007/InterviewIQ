import {
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  deleteDoc
} from "firebase/firestore";

import db from "../firebase/firestore";

// Get user Role
export const getUserRole = async (userId) => {
  const userRef = doc(db, "users", userId);

  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data().role || "user";
};



// Get user's document
export const getUserData = async (userId) => {
  try {
    const userRef = doc(db, "users", userId);

    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
      return null;
    }

    return {
      id: snapshot.id,
      ...snapshot.data()
    };
  } catch (error) {
    console.error("Error getting user:", error);
    throw error;
  }
};


// Create user document
export const createUserData = async (
  userId,
  userData
) => {
  try {
    const userRef = doc(db, "users", userId);

    await setDoc(userRef, {
      ...userData,
      createdAt: new Date()
    });
  } catch (error) {
    console.error(
      "Error creating user:",
      error
    );

    throw error;
  }
};


// Get user's progress
export const getUserProgress = async (userId) => {
  try {
    const progressRef = collection(
      db,
      "users",
      userId,
      "progress"
    );

    const snapshot = await getDocs(progressRef);

    const progress = {};

    snapshot.docs.forEach((item) => {
      progress[item.id] = item.data();
    });

    return progress;
  } catch (error) {
    console.error(
      "Error getting progress:",
      error
    );

    throw error;
  }
};


// Update question progress
export const updateQuestionProgress = async (
  userId,
  questionId,
  progressData
) => {
  try {
    const progressRef = doc(
      db,
      "users",
      userId,
      "progress",
      questionId
    );

    await setDoc(
      progressRef,
      progressData,
      {
        merge: true
      }
    );
  } catch (error) {
    console.error(
      "Error updating progress:",
      error
    );

    throw error;
  }
};


// Delete question progress
export const deleteQuestionProgress = async (
  userId,
  questionId
) => {
  try {
    const progressRef = doc(
      db,
      "users",
      userId,
      "progress",
      questionId
    );

    await deleteDoc(progressRef);
  } catch (error) {
    console.error(
      "Error deleting progress:",
      error
    );

    throw error;
  }
};