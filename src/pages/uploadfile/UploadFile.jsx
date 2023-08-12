import "./uploadfile.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import instance from "../../axios_config";
import {useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const UploadFile = () => {

  const [client_id, setClient_ID] = useState([]);
  const { currentUser } = useContext(AuthContext);


  useEffect (()=> {
    // query client_id from django backend with u_id
    instance.get(`client/getid/${currentUser.uid}`)
    .then((res) => {
      setClient_ID(res.data.client_id);
    })
    .catch((err) => {
      console.log(err);
    })
  }, [currentUser.uid])

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    console.log("client_id: ", client_id);

    const formData = new FormData(event.target); // Get form data
    try {
      // upload file to django backend and file split
      const response = instance.post(`fileinsert/${client_id}`, formData);
      // Handle response if needed
      console.log('Response:', response.data);
    } catch (error) {
      // Handle error if needed
      console.error('Error:', error.response);
    }
  };

  return (
    <div className="uploadfile">
      <Sidebar />
      <div className="uploadfileContainer">
        <Navbar />
        <div className="uploadfileContent">
          <div className="uploadfileTitle">Upload File</div>
          <form onSubmit={handleSubmit} className="post-form" enctype="multipart/form-data">
            <p>
              <label for="id_file">File:</label>
              <input type="file" name="file" required id="id_file" />
            </p>
            <button type="submit" className="save btn btn-default">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadFile;
