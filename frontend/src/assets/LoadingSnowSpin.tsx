import AcUnitIcon from "@mui/icons-material/AcUnit";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";

const LoadingContainer = styled.span`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  margin-left: 2px;
  svg {
    animation-name: spin;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-fill-mode: forwards;
    animation-timing-function: linear;
    font-size: 70px;
  }
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingSnowSpin: React.FC = () => {
  return (
    <LoadingContainer style={{ animationDuration: `3s`, color: "#0495bd" }}>
      <Typography variant='h4' sx={{ color: "#272727" }}>
        Loading
      </Typography>{" "}
      <AcUnitIcon />
    </LoadingContainer>
  );
};

export default LoadingSnowSpin;
