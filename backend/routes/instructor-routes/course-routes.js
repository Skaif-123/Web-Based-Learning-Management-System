import express from "express";
import {
  addNewCourse,
  getAllCourses,
  getCourseDetails,
  updateCourseById,
} from "../../controllers/instructor-controller/course-controller.js";

const router=express.Router();
router.post('/add',addNewCourse);
router.get('/get',getAllCourses);
router.get('/get/details/:id',updateCourseById);
router.put('/update/:id',updateCourseById);

module.exports=router;