import CommonForm from "@/components/common-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signInFormControls, signUpFormControls } from "@/config";
import { AuthContext } from "@/context";
import { TabsContent } from "@radix-ui/react-tabs";

import { useContext, useState } from "react";
import { IoBookSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

export const AuthPage = () => {
  const [activeTab, setActiveTab] = useState("signin");
  const { signInFormData, setSignInFormData, signUpFormData, setSignUpFormData } = useContext(AuthContext)

  const handleTabChange = (value) => {
    setActiveTab(value);
  }

  const checkIfSignInFormIsValid = () => {
    return signInFormData && signInFormData.userEmail !== "" && signInFormData.password !== "";
  }
  const checkIfSignUpFormIsValid = () => {
    return signUpFormData && signUpFormData.userName !== "" && signUpFormData.userEmail !== "" && signUpFormData.password !== "";
  }

  return (
    <>
      {/* MAIN CONTAINER OF WEB PAGE */}
      <div className="major-container  min-h-screen flex flex-col">
        {/* HEADER START */}
        <header className="px-4 lg:px-6 h-16 flex items-center border-b  bg-white/10 backdrop-blur-md supports-backdrop-filter:bg-white/5 sticky top-0 z-50">
          <Link to={"/"} className="flex items-center justify-center group">
            <IoBookSharp className="h-8 w-8 mr-3 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
            <span className="font-extrabold text-2xl bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-purple-700 transition-all duration-300">
              ASCEND LEARN
            </span>
          </Link>
        </header>
        {/* HEADER END */}

        {/* MAIN BODY START  */}
        <div className="main-section min-h-screen flex items-center justify-center">
          <Tabs
            value={activeTab}
            defaultValue="signin"
            onValueChange={handleTabChange}
            className="w-full max-w-md"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin" className="cursor-pointer">Sign In</TabsTrigger>
              <TabsTrigger value="signup" className="cursor-pointer">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
              <Card className="p-6 space-y-2">
                <CardHeader>
                  <CardTitle className="text-center text-xl">
                    Sign in to your account
                  </CardTitle>
                  <CardDescription className="text-center">
                    Enter your email and password to access your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <CommonForm
                    formControls={signInFormControls}
                    buttonText={"Sign In"}
                    formData={signInFormData}
                    setFormData={setSignInFormData}
                    isButtonDisabled={!checkIfSignInFormIsValid()}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="signup">
              <Card className="p-6 space-y-2">
                <CardHeader>
                  <CardTitle className="text-center text-xl">
                    Create a new account
                  </CardTitle>
                  <CardDescription className="text-center">
                    Enter your details to get started
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <CommonForm
                    formControls={signUpFormControls}
                    buttonText={"Sign Up"}
                    formData={signUpFormData}
                    setFormData={setSignUpFormData}
                    isButtonDisabled={!checkIfSignUpFormIsValid()}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        {/* MAIN BODY END */}
      </div>
      {/* MAIN CONTAINER OF WEB PAGE */}
    </>
  );
};
