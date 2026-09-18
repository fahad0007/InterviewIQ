import {
  collection,
  addDoc
} from "firebase/firestore";

import db from "../firebase/firestore";

import javascriptData from "../data/javascript.json";
import codingData from "../data/coding.json";
import hrData from "../data/hr.json";

const allQuestions = [
  ...javascriptData.map((item) => ({
    ...item,
    type: "javascript"
  })),

  ...codingData.map((item) => ({
    ...item,
    type: "coding"
  })),

  ...hrData.map((item) => ({
    ...item,
    type: "hr"
  }))
];

export const seedQuestions = async () => {
  try {
    for (const question of allQuestions) {

      const {
        id,
        completed,
        favorite,
        ...questionData
      } = question;

      await addDoc(
        collection(db, "questions"),
        {
          ...questionData,
          createdAt: new Date()
        }
      );
    }

    console.log(
      "Questions successfully uploaded!"
    );

  } catch (error) {
    console.error(
      "Error seeding questions:",
      error
    );
  }
};