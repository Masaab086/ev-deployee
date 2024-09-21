import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";

export const RegisterUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return user;
  } catch (error) {
    throw error; // Rethrow the error to be caught by the caller
  }
};
