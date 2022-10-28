import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { useDispatch } from "react-redux";
import { AuthSliceActions } from "../../../state/AuthSlice";
import { Link } from "react-router-dom";

const MenuLinks: React.FC<{ handleClose: Function }> = ({ handleClose }) => {
  const dispatch = useDispatch();
  const handleClosed = () => handleClose();
  return (
    <>
      <Link to='/' style={{ color: "white" }}>
        <MenuItem onClick={handleClosed}>Home</MenuItem>
      </Link>
      <Link to='/chat' style={{ color: "white" }}>
        <MenuItem onClick={handleClosed}>Global Chat</MenuItem>
      </Link>
      <Link to='/boardz/createnewboardz' style={{ color: "white" }}>
        <MenuItem onClick={handleClosed}>Create new Board</MenuItem>
      </Link>
      <Link to='/settings' style={{ color: "white" }}>
        <MenuItem onClick={handleClosed}>Settings</MenuItem>
      </Link>
      <Divider sx={{backgroundColor:'gray'}}/>
      <Link
        to='/'
        style={{ color: "white" }}
        onClick={() => {
          dispatch(AuthSliceActions.authLogout());
        }}
      >
        <MenuItem onClick={handleClosed} sx={{ minWidth: "250px" }}>
          Logout
        </MenuItem>
      </Link>
    </>
  );
};

export default MenuLinks;
