import { useState } from "react";

// import showAlert from "../utils/alert";
// import { AuthErrorMessages } from "../utils/errorMessages";
import { LoginUser } from "../../firebase/logintUser";
import { useRouter } from "next/navigation";

// export type UserType = {
//   email: string;
//   password: string;
// };

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const loginUser = async (data) => {
    setIsLoading(true);
    try {
      console.log(data);
      const user = await LoginUser(data.email, data.password);
      router.push("/");
      return user;
    } catch (error) {
      console.log(error);
      // const message = AuthErrorMessages(error.code);
      //   showAlert("Login Failed", message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, loginUser };
};

export default useLogin;
