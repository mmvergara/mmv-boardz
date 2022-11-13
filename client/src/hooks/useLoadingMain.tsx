import AcUnitIcon from "@mui/icons-material/AcUnit";
import { useState } from "react";
import styled from "@emotion/styled";

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
    font-size: 10px;
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
const useLoadingMain = (
  color: string = "white",
  marginLeft: string = "0.5em",
  fontSize: string = "30px",
  rotateSpeedSec: number = 3,
  intialState: boolean = false
) => {
  const [isLoading, setIsLoading] = useState<boolean>(intialState);

  const toggleLoading = () => {
    setIsLoading((prev) => !prev);
  };
  const loadingIcon = isLoading ? (
    <LoadingContainer style={{ animationDuration: `${rotateSpeedSec}s`, color: color }}>
      <AcUnitIcon style={{ fontSize, marginLeft }} />
    </LoadingContainer>
  ) : (
    ""
  );

  return { loadingIcon, toggleLoading };
};

export default useLoadingMain;
