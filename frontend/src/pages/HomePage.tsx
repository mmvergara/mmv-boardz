import { useSelector } from "react-redux";
import BoardzIndex from "../components/Feed/Boardz";
import { RootState } from "../state/StoreIndex";

const HomePage: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.AuthSlice.isAuthenticated);
  return <>{isAuthenticated ? <BoardzIndex/> : <h1>YOU ARE NOT AUTHENTICATED</h1>}</>;
};

export default HomePage;
