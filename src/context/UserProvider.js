import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "./AuthProvider";
import PageSpinner from "../components/PageSpinner";
import { Box } from "@material-ui/core";

const UserProvider = ({ children }) => {
  const { authUser, loading } = useAuth();
  const router = useRouter();

  // Listen for changes on loading and authUser, redirect if needed
  useEffect(() => {
    if (!loading && !authUser) {
      router.push("/login");
    }
  }, [authUser, loading]);

  return (
    <>
      {!loading && authUser ? (
        // <PageSpinner />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            minHeight: "100vh",
            border: "solid 5px red",
          }}
        >
          {children}
        </Box>
      ) : (
        <PageSpinner />
      )}
    </>
  );
};

export default UserProvider;
