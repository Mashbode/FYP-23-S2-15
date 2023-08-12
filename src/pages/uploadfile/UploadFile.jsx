import "./uploadfile.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const UploadFile = () => {
  return (
    <div className="uploadfile">
      <Sidebar />
      <div className="uploadfileContainer">
        <Navbar />
        <div className="uploadfileContent">
          <div className="uploadfileTitle">Upload File</div>
          {/* <form method="POST" class="post-form" enctype="multipart/form-data"> */}
          <form method="POST">
            <p>
              <label for="id_file">File:</label>
              <input type="file" name="file" required id="id_file" />
            </p>
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadFile;
