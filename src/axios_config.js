import axios from "axios";

/** base url to make request to django api*/
const instance = axios.create({
    // let url = `${process.env.REACT_APP_API}/api/`
    baseURL: "http://127.0.0.1:8000/api/", // change url when domain hosted
    
});

export default instance;