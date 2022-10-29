import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Link } from "react-router-dom";
const LandingPage: React.FC = () => {
  return (
    <article style={{ marginTop: "90px" }}>
      <Container maxWidth='sm'>
        <Box sx={{ backgroundColor: "#d5d5d5", boxShadow: 3, padding: "1em" }}>
          <Typography variant='h3' sx={{ textAlign: "center" }}>
            Welcome to Boardz <BorderColorIcon sx={{ fontSize: "0.8em" }} />
          </Typography>
          <Typography variant='h6' sx={{ textAlign: "center", marginTop: "1em" }}>
            Boardz is a lightweight mini social app that supports features like Board Posting and
            Global realtime chat!
          </Typography>
          <Link to='auth/register'>
            <Button
              variant='contained'
              color='secondary'
              sx={{
                color: "white",
                display: "block",
                fontWeight: "bold",
                filter: "none",
                textAlign: "center",
                margin: "auto",
                my: 2,
              }}
              disableElevation
            >
              Get Started
            </Button>
          </Link>
          <Link to='about'>
            <Button
              variant='text'
              color='secondary'
              sx={{
                display: "block",
                fontWeight: "bold",
                filter: "none",
                textAlign: "center",
                margin: "auto",
                my: 2,
              }}
              disableElevation
            >
              About
            </Button>
          </Link>
        </Box>
      </Container>
    </article>
  );
};

export default LandingPage;
