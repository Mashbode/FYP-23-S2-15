import "./edit.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import {
  doc,
  setDoc,
  addDoc,
  serverTimestamp,
  collection,
} from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const Edit = ({ inputs, title }) => {
  // For image uploaded
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [perc, setPerc] = useState(); // Used to disable Send button during img upload

  const navigate = useNavigate();

  // https://firebase.google.com/docs/storage/web/upload-files#monitor_upload_progress
  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name; // To get unique file names
      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, file);

      // Listening to the upload progress
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // console.log("File available at", downloadURL);
            // setData({ ...data, downloadURL }); // useEffect have a dependency only for file, below is the exact same one
            setData((prev) => ({ ...prev, img: downloadURL })); // Adding img to data
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const handleAdd = async (e) => {
    e.preventDefault(); // Its to prevent refreshing
    // await은 async 함수 안에서만 쓰여야 함

    try {
      // // Set document
      // // Create new collection: cities -> properties are name, state, country
      // // LA is document id
      // await setDoc(doc(db, "cities", "LA"), {
      //   name: "Los Angeles",
      //   state: "CA",
      //   country: "USA",
      // });
      // // Add document
      // // Create new collection: cities -> properties are name, state, country
      // await addDoc(collection(db, "cities"), {
      //   name: "Tokyo",
      //   country: "Japan",
      //   timeStamp: serverTimestamp(),
      // });

      const result = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await setDoc(doc(db, "users", result.user.uid), {
        ...data,
        timeStamp: serverTimestamp(),
      });

      navigate(-1); // gg back to previous pg after adding
    } catch (err) {
      console.log(err);
    }
  };

  // Adding input data one by one
  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file // Img file existing boolean
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleAdd}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                {/* <input type="file" /> 
                Refer below */}
                <input
                  type="file"
                  id="file" // label htmlFor="file" and this input is connected
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                // Do not forget to give unique key
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleInput}
                  />
                </div>
              ))}
              {/* Disabled to add img url to user collection */}
              <button disabled={perc !== null && perc < 100} type="submit">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
