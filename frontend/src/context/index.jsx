import { initialSignInFormData, initialSignUpFormData } from "@/config";
import { loginService, registerService } from "@/services";
import { createContext, useState } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
  const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);

  async function handleRegisterUser(e) {
    e.preventDefault();
    const data = await registerService(signUpFormData);
  }
  async function handleLoginUser(e) {
    e.preventDefault();
    const data = await loginService(signInFormData);
  }

  return (
    <AuthContext.Provider
      value={{
        signInFormData,
        setSignInFormData,
        signUpFormData,
        setSignUpFormData,
        handleRegisterUser,
        handleLoginUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
