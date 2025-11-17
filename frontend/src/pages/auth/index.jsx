import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { GraduationCap } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const AuthPage = () => {
  const [activeTab, setActiveTab] = useState("signin");

  const handleTabChange = (value) => {
    setActiveTab(value);
  };
  return (
    <>
      <div className="major-container min-h-screen flex flex-col">
        <header className="px-4 lg:px-6 h-14 flex items-center border-b">
          <Link
            to={"/"}
            className="flex items-center justify-center bg-amber-500"
          >
            <GraduationCap className="h-8 w-8 mr-4" />
            <span className="font-extrabold text-xl">ASCEND LEARN</span>
          </Link>
        </header>
        <div className="main-section min-h-screen flex items-center justify-center">
          <Tabs
            value={activeTab}
            defaultValue="signin"
            onValueChange={handleTabChange}
            className="w-full max-w-md"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="signin">This is sign in page</TabsContent>
            <TabsContent value="signup">This is sign up page</TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};
