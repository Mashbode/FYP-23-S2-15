import "./updatefile.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import instance from "../../axios_config";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const UpdateFile = () => {
  const [file_id, setFile_ID] = useState();
  const { currentUser } = useContext(AuthContext);
  // 1. query the params.row
  // 2. get the file_id from it
  // 3. setFile_ID
  // 4. file_id passed to endpoint of django for updating
  const queryClientID = () => {
    // query client_id from django backend with u_id
    instance
      .get(`client/getid/${currentUser.uid}`)
      .then((res) => {
        // this should be queried by the params in datatable mui component
        setFile_ID("bd7b49b5-e682-45af-9be4-0d5537b3680a"); // manually inserted file_id
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    return () => {
      queryClientID();
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    console.log("file_id: ", file_id);

    const formData = new FormData(event.target); // Get form data
    try {
      // update file_id's content with the newest file
      const response = instance.post(`/fileupdate/${file_id}`, formData);
      // Handle response if needed
      console.log("Response:", response.data);
    } catch (error) {
      // Handle error if needed
      console.error("Error:", error.response);
    }
  };

  return (
    <div className="updatefile">
      <Sidebar />
      <div className="updatefileContainer">
        <Navbar />
        <div className="updatefileContent">
          <div className="updatefileTitle">Update File</div>
          <form
            onSubmit={handleSubmit}
            className="post-form"
            enctype="multipart/form-data"
          >
            <p>
              <label for="id_file">File:</label>
              <input type="file" name="file" required id="id_file" />
            </p>
            <button type="submit" class="save btn btn-default">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateFile;
