import Axios from "axios";
const axios = Axios.create({
    baseURL: "http://10.116.91.250:3000",
    withCredentials:true
});
export default axios;