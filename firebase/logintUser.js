import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";

export const LoginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return user;
  } catch (error) {
    throw error;
  }
};

export const getUser = () => {
  return auth.currentUser;
};
