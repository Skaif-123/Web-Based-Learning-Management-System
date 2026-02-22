import InstructorCourses from "@/components/instructor-view/coursesPage";
import CoursePage from "@/components/instructor-view/coursesPage";
import DashBoard from "@/components/instructor-view/dashboard";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context";
import { InstructorContext } from "@/context/instructor-context";
import { fetchInstructorCourseListService } from "@/services";
import { Tabs, TabsContent } from "@radix-ui/react-tabs";
import { BarChart, Book, LogOut } from "lucide-react";
import { useContext, useEffect, useState } from "react";

const InstructorDashBoardPage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { resetCredentials } = useContext(AuthContext);
  const { instructorCourseList, setInstructorCourseList } =
    useContext(InstructorContext);

async function fetchALlCourses(){
  const response =await fetchInstructorCourseListService();
  console.log(response);

  if(response?.success){
    setInstructorCourseList(response?.data);
  }
  
}

  useEffect(() => {
    fetchALlCourses();
  }, []);
  const menuItems = [
    {
      icon: BarChart,
      label: "DashBoard",
      value: "dashboard",
      component: <DashBoard />,
    },
    {
      icon: Book,
      label: "Courses",
      value: "courses",
      component: <CoursePage listOfCourses={instructorCourseList} />,
    },
    {
      icon: LogOut,
      label: "LogOut",
      value: "logout",
      component: null,
    },
  ];
  const handleLogout = () => {
    resetCredentials();
    sessionStorage.clear();
  };
  return (
    <>
      <div className="flex h-full min-h-screen  bg-gray-100">
        <aside className="w-64 bg-white shadow-md hidden md:block">
          <div className=" p-4">
            <div className="text-2xl font-bold mb-4">
              <h2>Instructor View</h2>
              <nav>
                {menuItems.map((menuItem) => (
                  <Button
                    className="w-full mb-2 justify-start"
                    key={menuItem.label}
                    onClick={
                      menuItem.value === "logout"
                        ? handleLogout
                        : () => setActiveTab(menuItem.value)
                    }
                    variant={
                      activeTab == menuItem.value ? "secondary" : "ghost"
                    }
                  >
                    <menuItem.icon className="mr-2 h-4 w-4" />
                    {menuItem.label}
                  </Button>
                ))}
              </nav>
            </div>
          </div>
        </aside>
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">DashBoard</h1>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {menuItems.map((menuItem) => (
              <TabsContent value={menuItem.value}>
                {menuItem.component !== null ? menuItem.component : null}
              </TabsContent>
            ))}
          </Tabs>
        </main>
      </div>
    </>
  );
};

export default InstructorDashBoardPage;
