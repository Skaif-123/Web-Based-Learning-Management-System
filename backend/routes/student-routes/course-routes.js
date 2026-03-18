import { Router } from "express";
import { getStudentViewCourseDetails, getAllStudentViewCourses } from "../../controllers/student-controller/course-controller.js";
const router = Router();

router.get("/get", getAllStudentViewCourses);
router.get("/get/details/:id", getStudentViewCourseDetails);
export default router;