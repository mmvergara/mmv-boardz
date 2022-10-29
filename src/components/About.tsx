import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Link } from "react-router-dom";

const About: React.FC = () => {
  return (
    <article style={{ marginTop: "90px" }}>
      <Container maxWidth='sm'>
        <Box sx={{ backgroundColor: "#d5d5d5", boxShadow: 3, padding: "1em" }}>
          <Typography variant='h3' sx={{ textAlign: "center" }}>
            Boardz <BorderColorIcon sx={{ fontSize: "0.8em" }} />
          </Typography>
          <Link to='/'>
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
            >
              Go Back
            </Button>
          </Link>
          <Typography variant='h6' sx={{ textAlign: "center", marginTop: "1em" }}>
            MERN Stack <br />
            REST API <br />
            Express Session Auth <br />
            WebSocket - Socket IO <br />
            Mongoose ODM
            <br />
            Material UI Design <br />
          </Typography>
          <Typography variant='h5' sx={{ textAlign: "center", marginTop: "1em" }}>
            Dummy Account
          </Typography>
          <Typography variant='h6' sx={{ textAlign: "center" }}>
            salt2@gmail.com <br />
            salt1234
            <br />
          </Typography>
        </Box>
      </Container>
    </article>
  );
};

export default About;
