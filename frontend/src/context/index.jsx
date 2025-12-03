import { initialSignInFormData, initialSignUpFormData } from "@/config";
import { createContext, useState } from "react";

export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
  const [signInFormData,setSignInFormData]=useState(initialSignInFormData);
  const [signUpFormData,setSignUpFormData]=useState(initialSignUpFormData);
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
