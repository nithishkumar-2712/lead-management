import { createContext, useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import reactLogo from './assets/Logo.jpg'
import CRM from './Page/CRM'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Profile from './Page/Profile';
// import LeadTable from './Page/LeadTable';
import LeadView from './Page/LeadView';
import LeadForm from './Page/LeadForm';
import LeadEdit from './Page/LeadEdit';
import LeadUpdate from './Page/LeadUpdate';
import Executives from './Page/Executives';
import ExecutivesReport from './Page/ExecutivesReport';
import SingleCustomerid from './SingleCustomerid';
import LeadFormUpdate from './Page/LeadFormUpdate';
import BranchHead from './Page/BranchHead';
import Register from './Page/Register';
import axios from './Config/axios';
import About from './Page/About';
import BranchesStart from './Page/BranchesStart';
import Services from './Page/Services';
import Home from './Page/Home';
import Contact from './Page/Contact';
import NotFound from './components/Notfound';
import AdminPage from './Page/AdminPage';
import ExecutivesPage from './Page/ExecutivesPage';
import UsersManagement from './Page/UsersManagement';
import BranchCreat from './Page/BranchCreat';
import Creatstatus from './Page/Creatstatus';
import UserRole from './Page/UserRole';
import Leadsourse from './Page/Leadsourse';
import BusinessType from './Page/BusinessType';
import LeadManagement from './Page/LeadManagement';
import Login from './Page/Login';
import AdminInsulationpage from './Page/AdminInsulationpage';
import Excutivecell from './Page/Excutivecell';
import ExcutiveHomepage from './Page/ExcutiveHomepage';
import OwnLeads from './Page/OwnLeads';
export const AppContext=createContext()

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // console.log(isLoggedIn);
  const [loading, setLoading] = useState(true);
  const [Role, setRole] = useState("");
  // console.log(Role);
  // const [Admin, setAdmin] = useState();
const tokencheck = async () => {
  try {
    const { data } = await axios.get("/api/tokencheck");

    if (data.success && data.data?.userType?.roleName) {
      setIsLoggedIn(true);
      setRole(data.data.userType.roleName);
    } else {
      setIsLoggedIn(false);
      setRole("");
    }
  } catch (error) {
    setIsLoggedIn(false);
    setRole("");
  } finally {
    setLoading(false);
  }
};
  useEffect(()=>{
    tokencheck();
  },[])
  if (loading) {
  return (
    <div className="app-loading">
      <span className="app-spinner"></span>
    </div>
  );
}
  return (
    <>
    <AppContext.Provider value={{Role,setRole,isLoggedIn,setIsLoggedIn,tokencheck}}>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          {!isLoggedIn ? (
            <>
            
            <Route path="/" element={<Home/>} />
            <Route path="/UsersManagement" element={<UsersManagement/>} />
            <Route path="/About" element={<About/>} />
            <Route path="/BranchesStart" element={<BranchesStart/>} />
            <Route path="/Services" element={<Services/>} />
            <Route path="/Contact" element={<Contact/>} />
            <Route path="/signin" element={<Login />} />
            {/* <Route path="/signup" element={<Navigate to="/" />} /> */}
            </>
          ):(
          <>
          {Role === "Lead" && (
            <>
              <Route path="/" element={<Home/>} />
              <Route path="/Lead" element={<CRM/>} />
              <Route path="/LeadView/:id" element={<LeadView/>} />
              <Route path="/LeadForm/:id" element={<LeadForm/>} />
              <Route path="/LeadFormUpdate/:id" element={<LeadFormUpdate/>} />
              <Route path="/LeadEdit" element={<LeadEdit/>} />
              <Route path="/LeadUpdate/:id" element={<LeadUpdate/>} />
            </>
          )}
          {Role === "Branch Head" && (
            <>
            <Route path="/" element={<Home/>} />
              <Route path="/OwnLeads" element={<OwnLeads/>} />
              <Route path="/BranchHead" element={<BranchHead/>} />
              <Route path="/Executives" element={<Executives/>} />
              <Route path="/LeadView/:id" element={<LeadView/>} />
              <Route path="/ExecutivesReport" element={<ExecutivesReport/>} />
              <Route path="/SingleCustomerid" element={<SingleCustomerid/>} />
            </>
          )}
          {Role === "Executives" && (
            <>
              <Route path="/" element={<Home/>} />
              <Route path="/OwnLeads" element={<OwnLeads/>} />
              <Route path="/ExecutivesPage" element={<ExecutivesPage/>} />
              <Route path="/Executives" element={<Executives/>} />
              <Route path="/LeadView/:id" element={<LeadView/>} />
              <Route path="/ExecutivesReport" element={<ExecutivesReport/>} />
              <Route path="/SingleCustomerid" element={<SingleCustomerid/>} />
              <Route path="/ExcutiveHomepage" element={<ExcutiveHomepage/>} />
            </>  
          )}
          {Role === "Admin" && (
            <>
            <Route path="/" element={<Home/>} />
            <Route path="/LeadManagement" element={<LeadManagement/>} />
            <Route path="/AdminInsulationpage" element={<AdminInsulationpage/>} />
            <Route path="/Excutivecell" element={<Excutivecell/>} />
            <Route path="/UsersManagement" element={<UsersManagement/>} />
            <Route path="/BranchCreat" element={<BranchCreat/>} />
            <Route path="/Creatstatus" element={<Creatstatus/>} />
            <Route path="/UserRole" element={<UserRole/>} />
            <Route path="/AdminPage" element={<AdminPage/>} />
            <Route path="/BusinessType" element={<BusinessType/>} />
            <Route path="/Leadsourse" element={<Leadsourse/>} />
            <Route path="/signup" element={<Register/>} />
            </>  
          )}
          </>
          )}
          {/* {!isLoggedIn ? (
            <>
            <Route path="/signin" element={<Login/>} />
            <Route path="/Register" element={<Register/>} />
          </>
          ):(
            <>
            <Route path="/Profile" element={<Profile/>} />
            </>
          )} */}
          {/* {!isLoggedIn ? (
            <>
              <Route path="/signin" element={<Login />} />
              <Route path="/signup" element={<Navigate to="/" />} />
            </>
            ) : (
              <>
              <Route path="/signup" element={<Register />} />
              <Route path="/signin" element={<Navigate to="/" />} />
            </>
          )} */}
          <Route
            path="/Profile/:id"
            element={isLoggedIn ? <Profile /> : <Navigate to="/signin" />}
          />
          <Route path="*" element={<NotFound/>}/>
        </Routes>
        {/* <Footer/> */}
      </BrowserRouter>
    </AppContext.Provider>

    </>
  )
}

export default App
