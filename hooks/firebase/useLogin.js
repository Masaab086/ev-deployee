import { useState } from "react";

// import showAlert from "../utils/alert";
import { AuthErrorMessages } from "../utils/errorMessages";
import { LoginUser } from "../firebase/loginUser";

// export type UserType = {
//   email: string;
//   password: string;
// };

const useLogin = () => {
  const [isLoading, setIsLoading] = useState < boolean > false;

  const loginUser = async (data) => {
    setIsLoading(true);
    try {
      const user = await LoginUser(data.email, data.password);
      return user;
    } catch (error) {
      console.log(error);
      const message = AuthErrorMessages(error.code);
      //   showAlert("Login Failed", message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, loginUser };
};

export default useLogin;
