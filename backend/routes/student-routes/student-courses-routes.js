
import getCoursesByStudentId from "../../controllers/student-controller/student-courses-controller.js";
import { Router } from "express";
const router =Router();
router.get("/get/:studentId", getCoursesByStudentId);

export default router;
