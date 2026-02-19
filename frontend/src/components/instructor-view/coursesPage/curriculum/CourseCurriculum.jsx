import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { courseCurriculumInitialFormData } from "@/config";
import { InstructorContext } from "@/context/instructor-context";
import { mediaUploadService } from "@/services";
import { useContext } from "react";

const CourseCurriculum = () => {
  const {
    mediaUploadProgress,
    setMediaUploadProgress,
    mediaUpLoadProgressPercentage,
    setMediaLoadProgressPercentage,
    courseCurriculumFormData,
    setCourseCurriculumFormData,
  } = useContext(InstructorContext);

  const handleNewLecture = () => {
    setCourseCurriculumFormData([
      ...courseCurriculumFormData,
      {
        ...courseCurriculumInitialFormData[0],
      },
    ]);
  };

  const handleCourseTitleChange = (event, currentIndex) => {
    let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
    console.log(cpyCourseCurriculumFormData, "cpyCourseCurriculumFormData");
    cpyCourseCurriculumFormData[currentIndex] = {
      ...cpyCourseCurriculumFormData[currentIndex],
      title: event.target.value,
    };
    setCourseCurriculumFormData(cpyCourseCurriculumFormData);
  };

  const handleSingleLectureUpload = async (e, currentIndex) => {
    console.log(e.target.files);
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const videoFormData = new FormData();
      videoFormData.append("file", selectedFile);

      try {
        setMediaUploadProgress(true);
        const response = await mediaUploadService(videoFormData);
        console.log(response.data.success);
        if (response.data.success) {
          let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
          cpyCourseCurriculumFormData[currentIndex] = {
            ...cpyCourseCurriculumFormData[currentIndex],
            videoUrl: response?.data?.data?.url,
            public_id: response?.data?.data?.public_id,
          };

          setCourseCurriculumFormData(cpyCourseCurriculumFormData);
          setMediaUploadProgress(false);
        }

        console.log(response, "response");
      } catch (error) {
        console.log(error);
      }
    }
  };

  function handleFreePreviewChange(currentValue, currentIndex) {
    let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
    cpyCourseCurriculumFormData[currentIndex] = {
      ...cpyCourseCurriculumFormData[currentIndex],
      freePreview: currentValue,
    };

    setCourseCurriculumFormData(cpyCourseCurriculumFormData);
  }

  console.log(courseCurriculumFormData);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Course Curriculum</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={handleNewLecture}>Add lecture</Button>
        <div className="mt-4 space-y-4">
          {courseCurriculumFormData.map((curriculumItem, index) => (
            <div key={index + 1} className="border p-5 rounded-md">
              <div className="flex gap-5">
                <h3 className="font-semibold">Lecture {index + 1}</h3>
                <Input
                  name={`title-${index + 1}`}
                  placeholder="Enter Lecture Title"
                  className="max-w-96"
                  onChange={(event) => handleCourseTitleChange(event, index)}
                  value={courseCurriculumFormData[index]?.title}
                />
                <div className="flex items-center space-x-2">
                  <Switch
                    onCheckedChange={(value) =>
                      handleFreePreviewChange(value, index)
                    }
                    checked={courseCurriculumFormData[index]?.freePreview}
                    id={`freePreview-${index + 1}`}
                  />
                  <Label htmlFor={`freePreview-${index + 1}`}>
                    Free Preview
                  </Label>
                </div>
              </div>

              <div className="mt-6">
                <Input
                  type="file"
                  accept="video/*"
                  onChange={(e) => {
                    handleSingleLectureUpload(e, index);
                  }}
                  className="mb-4"
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCurriculum;
