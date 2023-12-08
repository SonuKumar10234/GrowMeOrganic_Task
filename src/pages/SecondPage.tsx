import { useEffect } from "react";
import Component1 from "../components/Component1";
import Component2 from "../components/Component2";
import { useNavigate } from "react-router-dom";

function SecondPage() {
  const user = localStorage.getItem("user");
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
        alert("Please Enter your Credentials to Access the Data")
        return navigate("/")
     }  
  },[]);
  
    return (
      <>
        {user && <div>
          <Component1 />
          <Component2 />
        </div>}
      </>
    )
  }
  
  export default SecondPage;
  