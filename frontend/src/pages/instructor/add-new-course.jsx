import CourseLanding from "@/components/instructor-view/coursesPage/course-landing-page/CourseLanding";
import CourseCurriculum from "@/components/instructor-view/coursesPage/curriculum/CourseCurriculum";
import CourseSetting from "@/components/instructor-view/coursesPage/settings-page/CourseSetting";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  courseCurriculumInitialFormData,
  courseLandingInitialFormData,
} from "@/config";
import { AuthContext } from "@/context";
import { InstructorContext } from "@/context/instructor-context";
import { addNewCourseService } from "@/services";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const AddNewCourse = () => {
  const {
    courseLandingFormData,
    setCourseLandingFormData,
    courseCurriculumFormData,
    setCourseCurriculumFormData,
  } = useContext(InstructorContext);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  function isEmpty(value) {
    if (Array.isArray(value)) {
      return value.length == 0;
    }
    return value === "" || value === null || value === undefined;
  }

  function validateFormData() {
    for (const key in courseLandingFormData) {
      if (isEmpty(courseLandingFormData[key])) {
        return false;
      }
    }
    let hasFreePreview = false;
    for (const item of courseCurriculumFormData) {
      if (
        isEmpty(item.title) ||
        isEmpty(item.videoUrl) ||
        isEmpty(item.public_id)
      ) {
        return false;
      }

      if (item.freePreview) {
        hasFreePreview = true; //found at least one free preview
      }
    }

    return hasFreePreview;
  }

  const handleCreateCourse = async () => {
    const courseFinalFormData = {
      instructorId: auth?.user?._id,
      instructorName: auth?.user?.userName,
      date: new Date(),
      ...courseLandingFormData,
      students: [],
      curriculum: courseCurriculumFormData,
      isPublished: true,
    };
    const response = await addNewCourseService(courseFinalFormData);

    if (response.success) {
      setCourseLandingFormData(courseLandingInitialFormData);
      setCourseCurriculumFormData(courseCurriculumInitialFormData);
      navigate(-1);
    }

    console.log(courseFinalFormData);
  };
  return (
    <div className="container mx-auto pt-4">
      <div className="flex justify-between">
        <h1 className="text-3xl font-extrabold mb-5">Create New Course</h1>
        <Button
          disabled={!validateFormData()}
          onClick={handleCreateCourse}
          className="text-sm tracking-wider font-bold px-8"
        >
          SUBMIT
        </Button>
      </div>

      <Card>
        <CardContent>
          <Tabs defaultValue="curriculum" className="w-full">
            <TabsList>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="course-landing-page">
                Course Landing Page
              </TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="curriculum">
              <CourseCurriculum />
            </TabsContent>
            <TabsContent value="course-landing-page">
              <CourseLanding />
            </TabsContent>
            <TabsContent value="settings">
              <CourseSetting />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddNewCourse;
