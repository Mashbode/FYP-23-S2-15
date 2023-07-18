import "./fileitem.scss";
import DescriptionIcon from "@mui/icons-material/Description";
import DeleteIcon from "@mui/icons-material/Delete";

import { storage, db } from "../../firebase";
import { ref, deleteObject } from "firebase/storage";
import {
  doc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

import CircularProgress from "@mui/material/CircularProgress";

const FileItem = ({ file, isFileUploading }) => {
  const { currentUser } = useContext(AuthContext);
  const [isFileRemoved, setIsFileRemoved] = useState(false);

  const handleDB = async () => {
    try {
      const q = query(
        collection(db, "files"),
        where("filename", "==", file.name)
      );

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((document) => {
        // doc.ref.delete();
        // console.log(doc.ref.id);
        deleteDoc(doc(db, "files", document.ref.id));
      });
      // await deleteDoc(doc(db, "files", file.name));
    } catch (error) {
      console.log(error);
    }
  };

  const removeFile = () => {
    // setFiles(files.filter((file) => file.name !== filename));
    const name = `${currentUser.uid}_files/${file.name}`;
    const storageRef = ref(storage, name);

    // Delete the file
    deleteObject(storageRef)
      .then(() => {
        handleDB();
        console.log("File deleted successfully");
        setIsFileRemoved(!isFileRemoved);
        // setIsFileUploaded(!isFileUploaded);
        // setFile("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={isFileRemoved ? "fileItemRemoved" : "fileItem"}>
      {isFileUploading ? (
        <CircularProgress color="inherit" size={15} />
      ) : (
        <>
          <div className="filename">
            <DescriptionIcon className="icon" />
            {file.name}
          </div>
          <div className="delete">
            {/* {file.isUploading && (
            <FontAwesomeIcon
            icon={faSpinner}
            className="fa-spin"
            onClick={() => deleteFile(file.name)}
            />
          )} */}
            {
              // !file.isUploading && (
              <DeleteIcon
                className="icon"
                onClick={() => removeFile(file.name)}
              />
              // )
            }
          </div>
        </>
      )}
    </div>
  );
};

export default FileItem;
