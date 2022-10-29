import { useSelector } from "react-redux";
import BoardzIndex from "../components/Feed/Boardz";
import LandingPage from "../components/Landing";
import { RootState } from "../state/StoreIndex";

const HomePage: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.AuthSlice.isAuthenticated);
  return <>{isAuthenticated ? <BoardzIndex /> : <LandingPage/>}</>;
};

export default HomePage;
