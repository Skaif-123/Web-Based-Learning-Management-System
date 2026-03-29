import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import RouteGuard from "./components/route-guard/RouteGuard";
import StudentViewCommonLayout from "./components/student-view/common-layout";
import { AuthContext } from "./context";
import { AuthPage } from "./pages/auth";
import CodeReview from "./pages/code-review";
import FaqBot from "./pages/faq-bot";
import InstructorDashBoardPage from "./pages/instructor";
import AddNewCourse from "./pages/instructor/add-new-course";
import NotFoundPage from "./pages/not-found";
import StudentViewCourseDetailsPage from "./pages/student/course-details";
import StudentViewCourseProgressPage from "./pages/student/course-progress";
import StudentViewCoursesPage from "./pages/student/courses";
import StudentHomePage from "./pages/student/home";
import PaypalPaymentReturnPage from "./pages/student/payment-return";
import StudentCoursesPage from "./pages/student/student-courses";
import ToolPage from "./pages/tools_page";
import WebAgentPage from "./pages/web-agent";

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
              element={<AddNewCourse />}
              authenticate={auth.authenticate}
              user={auth?.user}
            />
          }
        />
        <Route
          path="/instructor/edit-course/:courseId"
          element={
            <RouteGuard
              element={<AddNewCourse />}
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
          <Route path="courses" element={<StudentViewCoursesPage />} />
          <Route path="tools" element={<ToolPage />} />
          <Route path="web-agent" element={<WebAgentPage/>} />
          <Route path="code-review" element={<CodeReview/>} />
          <Route path="faq-bot" element={<FaqBot/>} />
          <Route
            path="courses/details/:id"
            element={<StudentViewCourseDetailsPage />}
          />
          <Route path="payment-return" element={<PaypalPaymentReturnPage />} />
          <Route path="student-courses" element={<StudentCoursesPage />} />
            <Route
          path="course-progress/:id"
          element={<StudentViewCourseProgressPage />}
        />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
