import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import { useAuth } from "src/context/AuthProvider";

const MainHeader = () => {
  const { signOut } = useAuth();

  return (
    <AppBar
      position="static"
      style={{
        display: "flex",
        padding: "10px",
        flexDirection: "row",
        justifyContent: "flex-end",
      }}
    >
      <Button onClick={signOut} color="inherit" style={{ marginRight: "10px" }}>
        Logout
      </Button>
    </AppBar>
  );
};

export default MainHeader;
