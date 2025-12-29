import { Outlet } from "react-router-dom"

const StudentViewCommonLayout = () => {
  return (
    <div className='bg-red-400'>StudentViewCommonLayout
    
     <Outlet/>
    </div>
  )
}

export default StudentViewCommonLayout