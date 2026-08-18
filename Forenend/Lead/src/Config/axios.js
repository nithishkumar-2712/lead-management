import Axios from "axios";
const axios = Axios.create({
    baseURL: "http://10.227.72.250:3000",
    withCredentials:true
});
export default axios;