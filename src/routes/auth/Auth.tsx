import {Outlet} from "react-router-dom";

const Auth = () => {
  return (
      <div className="w-full flex justify-center items-center m-auto h-screen bg-gradient-to-br from-blue-50 to-blue-100 ">
        <Outlet/>
      </div>
  )
}
export default Auth
