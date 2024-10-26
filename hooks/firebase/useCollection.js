import { useCallback, useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase.config";

const useCollection = (collectionName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getDocuments = useCallback(async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const documents = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return documents;
    } catch (err) {
      setError(err);
      return null;
    }
  }, []);

  const updateDocument = useCallback(async (data) => {
    try {
      const docRef = doc(db, collectionName, data.id);
      const querySnapshot = await updateDoc(docRef, data);
      if (querySnapshot) return true;
    } catch (error) {
      return null;
    }
  }, []);

  const deleteDocument = useCallback(async (data) => {
    try {
      const docRef = doc(db, collectionName, data.id);
      const querySnapshot = await deleteDoc(docRef);

      if (querySnapshot) return true;
    } catch (error) {
      return null;
    }
  });

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const documents = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(documents);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const documents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(documents);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [collectionName]);

  return {
    data,
    loading,
    error,
    getDocuments,
    updateDocument,
    deleteDocument,
    refresh,
  };
};

export default useCollection;
