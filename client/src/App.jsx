import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "@/stores/authStore";

const AuthPage = lazy(() => import("./pages/AuthPage"));
const Home = lazy(() => import("./pages/Home"));
const MyQuizzes = lazy(() => import("./pages/MyQuizzes"));
const Favorite = lazy(() => import("./pages/Favorite"));
const CreateQuizForm = lazy(() => import("./pages/CreateQuizForm"));
const PlayQuiz = lazy(() => import("./pages/PlayQuiz"));
const MainLayout = lazy(() => import("./components/MainLayout"));

function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      <Toaster position="top-center" />
      <Suspense fallback={null}>
        <Routes>
          <Route
            path="/auth"
            element={isAuthenticated ? <Navigate to="/" /> : <AuthPage />}
          />
          <Route path="/" element={isAuthenticated ? <MainLayout /> : <Navigate to="/auth" />}>
            <Route index element={<Home />} />
            <Route path="/MyQuizzes" element={<MyQuizzes />} />
            <Route path="/Favorite" element={<Favorite />} />
          </Route>
          <Route
            path="/CreateQuizForm"
            element={isAuthenticated ? <CreateQuizForm /> : <Navigate to="/auth" />}
          />
          <Route
            path="/CreateQuizForm/:quizId"
            element={isAuthenticated ? <CreateQuizForm /> : <Navigate to="/auth" />}
          />
          <Route path="/quiz/:quizId" element={<PlayQuiz />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;