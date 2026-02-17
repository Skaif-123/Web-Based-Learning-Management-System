import CourseLanding from "@/components/instructor-view/coursesPage/course-landing-page/CourseLanding";
import CourseCurriculum from "@/components/instructor-view/coursesPage/curriculum/CourseCurriculum";
import CourseSetting from "@/components/instructor-view/coursesPage/settings-page/CourseSetting";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AddNewCourse = () => {
  return (
    <div className="container mx-auto pt-4">
      <div className="flex justify-between">
        <h1 className="text-3xl font-extrabold mb-5">Create New Course</h1>
        <Button className="text-sm tracking-wider">SUBMIT</Button>
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
