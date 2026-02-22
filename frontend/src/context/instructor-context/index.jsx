import {
  courseCurriculumInitialFormData,
  courseLandingInitialFormData,
} from "@/config";
import { createContext, useState } from "react";

export const InstructorContext = createContext(null);

export default function InstructorProvider({ children }) {
  const [courseLandingFormData, setCourseLandingFormData] = useState(
    courseLandingInitialFormData,
  );
  const [courseCurriculumFormData, setCourseCurriculumFormData] = useState(
    courseCurriculumInitialFormData,
  );

  const [mediaUploadProgress, setMediaUploadProgress] = useState(false);
  const [mediaUpLoadProgressPercentage, setMediaLoadProgressPercentage] =
    useState(0);
  const [instructorCourseList,setInstructorCourseList]=useState([]);
  const [currentEditedCourseId,setCurrentEditedCourseId]=useState(null);



  return (
    <InstructorContext.Provider
      value={{
        courseLandingFormData,
        setCourseLandingFormData,
        courseCurriculumFormData,
        setCourseCurriculumFormData,
        mediaUploadProgress,
        setMediaUploadProgress,
        mediaUpLoadProgressPercentage,
        setMediaLoadProgressPercentage,
        instructorCourseList,setInstructorCourseList,
        currentEditedCourseId,setCurrentEditedCourseId
      }}
    >
      {children}
    </InstructorContext.Provider>
  );
}
