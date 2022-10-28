import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ChangeUserPic from "./ChangeUserPic";
import ChangePassword from "./ChangePassword";
import ChangeUsername from "./ChangeUsername";
import ChangeEmail from "./ChangeEmail";
import { authorBoxStyle } from "../Style/SXStyles";
import { RootState } from "../../state/StoreIndex";
import { useSelector } from "react-redux";

const UserSettingsPage: React.FC = () => {
  const username = useSelector((state: RootState) => state.AuthSlice.username);

  return (
    <Container maxWidth='md' sx={{ marginBottom: "300px", marginTop: "80px" }}>
      <Box sx={authorBoxStyle}>
        <Typography sx={{ fontSize: "1.5em", marginLeft: "10px" }}>
          User Settings{" "}
          <SettingsApplicationsIcon sx={{ fontSize: "1.3em", transform: "translate(1px,9px)" }} />
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: "#dcdcdc",
          boxShadow: 4,
          flexGrow: 1,
          padding: "1em",
          borderRadius: "10px",
        }}
      >
        <ChangeUserPic />
        <Divider sx={{ my: 3 }} />
        <ChangePassword username={username} />
        <Divider sx={{ my: 3 }} />
        <ChangeUsername username={username} />
        <Divider sx={{ my: 3 }} />
        <ChangeEmail />
      </Box>
    </Container>
  );
};

export default UserSettingsPage;
