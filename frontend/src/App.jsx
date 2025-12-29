import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import RouteGuard from "./components/route-guard/RouteGuard";
import StudentViewCommonLayout from "./components/student-view/common-layout";
import { AuthContext } from "./context";
import { AuthPage } from "./pages/auth";
import InstructorDashBoardPage from "./pages/instructor";
import NotFoundPage from "./pages/not-found";
import StudentHomePage from "./pages/student/home";
import AddNewCourse from "./pages/instructor/add-new-course";

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
          path="/instructor/Create-New-Course"
          element={
            <RouteGuard
              element={<AddNewCourse/>}
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
          <Route path="home" element={<StudentHomePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
