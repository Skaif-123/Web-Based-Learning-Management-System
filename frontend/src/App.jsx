import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import RouteGuard from "./components/route-guard/RouteGuard";
import StudentViewCommonLayout from "./components/student-view/common-layout";
import { AuthContext } from "./context";
import { AuthPage } from "./pages/auth";
import InstructorDashBoardPage from "./pages/instructor";
import StudentHomePage from "./pages/instructor/home";

function App() {
  const { auth } = useContext(AuthContext);
  return (
    <>
      <Routes>
        <Route
          path="/auth"
          element={
            <RouteGuard
              element={<AuthPage />}
              authenticate={auth.authenticate}
              user={auth?.user}
            />
          }
        />
        <Route
          path="/instructor"
          element={
            <RouteGuard
              element={<InstructorDashBoardPage />}
              authenticate={auth.authenticate}
              user={auth?.user}
            />
          }
        />
        <Route
          path="/"
          element={
            <RouteGuard
              element={<StudentViewCommonLayout />}
              authenticate={auth.authenticate}
              user={auth?.user}
            />
          }
        >
          <Route path="" element={<StudentHomePage />} />
          <Route path="Home" element={<StudentHomePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
