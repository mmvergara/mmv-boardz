import { authorBoxStyle, boxStyle, postInfoStyle } from "../../Style/SXStyles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LoadingSnowSpin from "../../../assets/LoadingSnowSpin";

const BoardzFallback: React.FC = () => {
  const fallBack = (
    <Box sx={{...boxStyle,opacity:'0.8'}}>
      <Box sx={{ ...authorBoxStyle, padding: "1em" }}>Loading...</Box>
      <Box sx={postInfoStyle}>
        <Typography
          variant='h4'
          sx={{
            marginLeft: "10px",
            marginTop: "0.5em",
            marginBottom: "0.5em",
            overflow: "hidden",
            wordWrap: "break-word",
          }}
        >
          <LoadingSnowSpin />
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      {fallBack}
      {fallBack}
      {fallBack}
      {fallBack}
      {fallBack}
    </>
  );
};

export default BoardzFallback;
