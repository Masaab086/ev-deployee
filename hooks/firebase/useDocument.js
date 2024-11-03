import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  setDoc,
  addDoc,
  collection,
  DocumentData,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase.config";

const useDocument = () => {
  const [docLoading, setDocLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch a document
  const fetchDocument = async (collectionName, docId) => {
    setDocLoading(true);
    try {
      const docRef = doc(db, collectionName, docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { result: true, id: docSnap.id, ...docSnap.data() };
      } else {
        return { result: false };
      }
    } catch (err) {
      setError(err);
    } finally {
      setDocLoading(false);
    }
  };

  // Create a document
  const createDocument = async (collectionName, data, docId) => {
    console.log("Creating");
    console.log(data);
    setDocLoading(true);
    try {
      if (docId) {
        // If docId is provided, use setDoc to create or overwrite the document
        const docRef = doc(db, collectionName, docId);
        await setDoc(docRef, data);
      } else {
        // If no docId is provided, use addDoc to add the document to the collection with an auto-generated ID
        const collectionRef = collection(db, collectionName);
        await addDoc(collectionRef, data);
      }

      return { success: true };
    } catch (err) {
      setError(err);

      return { success: false };
    } finally {
      setDocLoading(false);
    }
  };

  const deleteDocument = async (collectionName, docId) => {
    setDocLoading(true);
    try {
      const docRef = doc(db, collectionName, docId);
      await deleteDoc(docRef);

      return { success: true };
    } catch (err) {
      setError(err);
      return { success: false };
    } finally {
      setDocLoading(false);
    }
  };
  return { docLoading, error, fetchDocument, createDocument, deleteDocument };
};

export default useDocument;
