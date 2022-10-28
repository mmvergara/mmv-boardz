import AcUnitIcon from "@mui/icons-material/AcUnit";
import styled from "@emotion/styled";

const LoadingContainer = styled.span`
  svg {
    animation-name: spin;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-fill-mode: forwards;
    animation-timing-function: linear;
    font-size: 30px;
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

const SnowSpinSM: React.FC = () => {
  return (
    <LoadingContainer style={{ color: "#0495bd" }}>
      <AcUnitIcon />
    </LoadingContainer>
  );
};

export default SnowSpinSM;
