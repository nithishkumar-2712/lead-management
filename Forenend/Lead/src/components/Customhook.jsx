import axios from '../Config/axios';
import React, { useEffect, useState } from 'react'
import socket from '../Config/socket';
 function Customhook(url) {
  const [Data,Setdata]=useState([]);
  const [Loading,Setloading]=useState(true);
  const [Error,Seterror]=useState(null);
    const CustomHook=async()=>{
      try {
        const {data}=await axios.get(url)
        if(data.success){
          Setdata(data.data)
        }else{
          Seterror(data.message)
        }
      } catch (error) {
        Seterror(error.message);
      }finally{
        Setloading(false)
      }
  }
  useEffect(()=>{
    CustomHook();
    socket.on("leadUpdated",()=>{
      CustomHook();
    });
    return () => {
      socket.off("leadUpdated");
    };
  },[]);
  return{Data,Loading,Error,CustomHook}
  
}
export default Customhook