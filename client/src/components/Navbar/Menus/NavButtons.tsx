import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ChatIcon from "@mui/icons-material/Chat";
const NavButtons: React.FC<{ matches: boolean }> = ({ matches }) => {
  return (
    <>
      <Link className='hoverWhite' to='/?page=1' style={{ display: matches ? undefined : "none" }}>
        <Button
          variant='contained'
          color='secondary'
          sx={{
            marginLeft: "1em",
            color: "white",
            display: "block",
            fontWeight: "bold",
            filter: "none",
          }}
          disableElevation
        >
          <HomeIcon sx={{ transform: "translate(0px,4px)" }} />
        </Button>
      </Link>
      <Link
        className='hoverWhite'
        to='/boardz/createnewboardz'
        style={{ display: matches ? undefined : "none" }}
      >
        <Button
          variant='contained'
          color='secondary'
          sx={{
            color: "white",
            display: "block",
            fontWeight: "bold",
            filter: "none",
          }}
          disableElevation
        >
          <AddBoxIcon sx={{ transform: "translate(0px,4px)" }} />
        </Button>
      </Link>
      <Link className='hoverWhite' to='/chat' style={{ display: matches ? undefined : "none" }}>
        <Button
          variant='contained'
          color='secondary'
          sx={{
            color: "white",
            display: "block",
            fontWeight: "bold",
            filter: "none",
          }}
          disableElevation
        >
          <ChatIcon sx={{ transform: "translate(0px,4px)" }} />
        </Button>
      </Link>
    </>
  );
};

export default NavButtons;
