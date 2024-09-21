import { useState } from "react";

import { RegisterUser } from "../firebase/registerUser";
// import showAlert from "../utils/alert";
import { AuthErrorMessages } from "../utils/errorMessages";
import { updateProfile } from "firebase/auth";
import useDocument from "./useDocument";

// export type UserType = {
//   email: string;
//   password: string;
//   name: string;
//   role: string;
// };

const useRegister = () => {
  const [isLoading, setIsLoading] = useState < boolean > false;
  const { createDocument } = useDocument();

  const registerUser = async (data) => {
    setIsLoading(true);
    try {
      const user = await RegisterUser(data.email, data.password);
      await updateProfile(user, {
        displayName: data.name,
      });

      await createDocument(
        "users",
        {
          name: data.name,
          role: data.role,
          email: data.email,
        },
        user.uid
      );
      // Show success alert
      //   showAlert(
      //     "Registration Successful",
      //     `Welcome, ${data.name}! Your account has been created.`
      //   );

      return user;
    } catch (error) {
      const message = AuthErrorMessages(error.code);
      //   showAlert("Registration Failed", message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, registerUser };
};

export default useRegister;
