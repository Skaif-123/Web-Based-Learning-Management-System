import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { InstructorContext } from "@/context/instructor-context";
import { mediaUploadService } from "@/services";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useContext } from "react";

const CourseSetting = () => {
  const { courseLandingFormData, setCourseLandingFormData } =
    useContext(InstructorContext);

  const handleImageUploadChange = async (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      const imageFormData = new FormData();
      imageFormData.append("file", selectedImage);
      try {
        const response = await mediaUploadService(imageFormData);
        console.log(response, "response ");
        if (response.data.success) {
          setCourseLandingFormData({
            ...courseLandingFormData,
            image: response.data.data.url,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  console.log(courseLandingFormData)
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Settings</CardTitle>
      </CardHeader>
      <CardContent>
        {courseLandingFormData?.image ? (
          <img src={courseLandingFormData.image} />
        ) : (
          <div className="flex flex-col gap-3">
            <Label>Upload Course Image</Label>
            <Input
              onChange={handleImageUploadChange}
              type="file"
              accept="image/*"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CourseSetting;
