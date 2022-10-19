import { useRouter } from "next/router";


export const withAuth = (WrappedComponent) => {
  return (props) => {
    if (typeof window !== "undefined") {
      const router = useRouter();

      const accessToken = localStorage.getItem("token");

      if (!accessToken) {
        router.replace("/");
        return null;
      }

      return <WrappedComponent {...props} />;
    }
    return null;
  };
};
