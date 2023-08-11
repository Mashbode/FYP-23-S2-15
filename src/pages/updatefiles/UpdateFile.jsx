import "./updatefile.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const UpdateFile = () => {
  return (
    <div className="updatefile">
      <Sidebar />
      <div className="updatefileContainer">
        <Navbar />
        <div className="updatefileContent">
          <div className="updatefileTitle">Update File</div>
          <form method="POST" class="post-form" enctype="multipart/form-data">
            <p>
              <label for="id_file">File:</label>
              <input type="file" name="file" required id="id_file" />
            </p>
            <button type="submit" class="save btn btn-default">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateFile;
