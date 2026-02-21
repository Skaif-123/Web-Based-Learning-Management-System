import express from "express";
import {
  addNewCourse,
  getAllCourses,
  getCourseDetailsById,
  updateCourseById,
} from "../../controllers/instructor-controller/course-controller.js";

const router = express.Router();
router.post("/add", addNewCourse);
router.get("/get", getAllCourses);
router.get("/get/details/:id", getCourseDetailsById);
router.put("/update/:id", updateCourseById);

export default router;
