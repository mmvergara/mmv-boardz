import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import BoardzDetail from "./components/Feed/BoardzDetail";
import ErrorModal from "./components/Modal/ErrorModal";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./state/StoreIndex";
import { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AuthSliceActions } from "./state/AuthSlice";
import { useNavigate } from "react-router-dom";

import { lazy } from "react";
import LoadingSnowSpin from "./assets/LoadingSnowSpin";

const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const GlobalChatPage = lazy(() => import("./pages/GlobalChatPage"));
const CreateBoardzPage = lazy(() => import("./pages/CreateBoardzPage"));

const App: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tokenExpirationDate, isAuthenticated } = useSelector((state: RootState) => {
    return state.AuthSlice;
  });

  let time = new Date().getTime();
  useEffect(() => {
    if (time > tokenExpirationDate && tokenExpirationDate !== 0) {
      dispatch(AuthSliceActions.authLogout());
      navigate("/");
    }
  }, [navigate, dispatch, tokenExpirationDate, time]);

  return (
    <>
      <Navbar />
      <ErrorModal />
      <main>
        <Suspense fallback={<LoadingSnowSpin />}>
          <Routes>
            <Route path='/' element={<HomePage />} />
            {isAuthenticated && (
              <Route path='/boardz/createnewboardz' element={<CreateBoardzPage />} />
            )}
            {isAuthenticated && <Route path='/boardz/:boardId' element={<BoardzDetail />} />}
            {isAuthenticated && <Route path='/settings' element={<SettingsPage />} />}
            {isAuthenticated && <Route path='/chat' element={<GlobalChatPage />} />}

            {!isAuthenticated && <Route path='/auth/login' element={<LoginPage />} />}
            {!isAuthenticated && <Route path='/auth/register' element={<RegisterPage />} />}
            <Route path='*' element={<h1>404 Not Found</h1>} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
};

export default App;
