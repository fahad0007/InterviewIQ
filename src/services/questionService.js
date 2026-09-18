import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy
} from "firebase/firestore";

import db from "../firebase/firestore";

const questionsRef = collection(db, "questions");

export const getQuestions = async () => {
  const snapshot = await getDocs(
    query(questionsRef, orderBy("createdAt", "desc"))
  );

  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data()
  }));
};

export const getQuestionsByType = async (type) => {
  const q = query(
    questionsRef,
    where("type", "==", type)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data()
  }));
};

export const getQuestionById = async (questionId) => {
  const questionRef = doc(db, "questions", questionId);

  const snapshot = await getDoc(questionRef);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data()
  };
};

export const addQuestion = async (questionData) => {
  const docRef = await addDoc(questionsRef, {
    ...questionData,
    createdAt: new Date()
  });

  return docRef.id;
};

export const updateQuestion = async (
  questionId,
  questionData
) => {
  const questionRef = doc(
    db,
    "questions",
    questionId
  );

  await updateDoc(questionRef, {
    ...questionData,
    updatedAt: new Date()
  });
};

export const deleteQuestion = async (questionId) => {
  const questionRef = doc(
    db,
    "questions",
    questionId
  );

  await deleteDoc(questionRef);
};