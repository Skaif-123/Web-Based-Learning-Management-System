import { AuthContext } from "@/context";
import { useContext } from "react";

const StudentHomePage = () => {
  const {resetCredentials} = useContext(AuthContext);

  const handleLogOut = () => {
    resetCredentials();
    sessionStorage.clear();
  };

  return (
    <div >
      <h1>Student Home Page</h1>
      <button
        className="bg-black text-white p-3 rounded-2xl font-bold"
        onClick={handleLogOut}
      >
        logout
      </button>
    </div>
  );
};

export default StudentHomePage;
