"use client";
import { useRouter } from "next/navigation";
import { getUser } from "../../firebase/logintUser";

const withAuth = (WrappedComponent) => {
  //   const router = useRouter();

  return () => {
    const user = getUser();

    console.log("User from HOD");
    console.log(user);

    if (!user) {
      //   router.push("/authentication/sign-in");
    }

    return <WrappedComponent />;
  };
};

export default withAuth;
