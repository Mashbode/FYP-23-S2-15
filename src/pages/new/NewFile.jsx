import "./newfile.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CircularProgress from "@mui/material/CircularProgress";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  doc,
  // setDoc,
  getDoc,
  addDoc,
  serverTimestamp,
  collection,
} from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
import FileList from "../../components/file/FileList";

const NewFile = ({ inputs, title }) => {
  const [files, setFiles] = useState([]);
  // const [file, setFile] = useState("");
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [isFileUploading, setIsFileUploading] = useState(false);
  // const [isFileRemoved, setIsFileRemoved] = useState(false);
  // const [data, setData] = useState({});
  // const [fileDownloadURL, setfileDownloadURL] = useState();
  const [perc, setPerc] = useState(); // Used to disable Send button during img upload
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  // useEffect(() => {
  // const uploadFile = () => {
  //   setIsFileUploaded(false); // To prevent FileItem showing
  //   // e.preventDefault();
  //   // const name = `${new Date().getTime()}_${file.name}`; // To get unique file names
  //   const name = `${currentUser.uid}_files/${file.name}`;
  //   const storageRef = ref(storage, name);

  //   const uploadTask = uploadBytesResumable(storageRef, file);

  //   // Listening to the upload progress
  //   uploadTask.on(
  //     "state_changed",
  //     (snapshot) => {
  //       const progress =
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //       console.log("Upload is " + progress + "% done");
  //       setPerc(progress);
  //       switch (snapshot.state) {
  //         case "paused":
  //           console.log("Upload is paused");
  //           break;
  //         case "running":
  //           console.log("Upload is running");
  //           break;
  //         default:
  //           break;
  //       }
  //     },
  //     (error) => {
  //       console.log(error);
  //     },
  //     () => {
  //       // Handle successful uploads on complete
  //       // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //         console.log("File available at", downloadURL);
  //         // setData({ ...data, file: downloadURL }); // useEffect have a dependency only for file, below is the exact same one
  //         // setData((prev) => ({ ...prev, file: downloadURL })); // Adding img to data
  //         setfileDownloadURL({ file: downloadURL }); // Adding img to data
  //         setIsFileUploaded(true);
  //       });
  //     }
  //   );
  // };
  // file && uploadFile();
  // }, [file, currentUser.uid]);
  // https://firebase.google.com/docs/storage/web/upload-files#monitor_upload_progress
  // console.log(fileDownloadURL);

  const handleDB = async ({ file, fileDownloadURL }) => {
    // event.preventDefault(); // Its to prevent refreshing
    // await은 async 함수 안에서만 쓰여야 함
    try {
      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());

        // const storageRef = doc(db, "files", file.name);
        // await setDoc(
        // addDoc does not require a id
        await addDoc(
          collection(db, "files"),
          {
            filename: file.name,
            file: fileDownloadURL,
            username: docSnap.data().username,
            timeStamp: serverTimestamp(),
          },
          { merge: true }
        );
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }

      // await setDoc(collection(db, "user_files", currentUser.uid), {
      //   ...data,
      //   timeStamp: serverTimestamp(),
      // });

      // navigate(-1); // gg back to previous pg after adding
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   console.log("useEffect()");
  //   uploadFiles();
  // }, [files]);

  // const uploadFiles = async (e) => {
  //   e.preventDefault();
  //   console.log("uploadFiles()");
  //   // files.map((file) => {
  //   for (let i = 0; i < files.length; i++) {
  //     console.log(i + "th iteration");
  //     const name = `${currentUser.uid}_files/${files[i].name}`; // To get unique file names
  //     const storageRef = ref(storage, name);

  //     await uploadBytes(storageRef, files[i])
  //       .then(() => {
  //         console.log("success");
  //         console.log("getDownloadUrl()");
  //         // Handle successful uploads on complete
  //         // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  //         getDownloadURL(storageRef).then((downloadURL) => {
  //           console.log("!*!*!*!*!*!*!");
  //           console.log("File available at", downloadURL);
  //           setData((prev) => ({
  //             ...prev,
  //             file: [...prev.file, downloadURL],
  //           })); // Adding img to data

  //           // setData({ ...data, img: downloadURL }); // useEffect have a dependency only for file, below is the exact same one
  //           // setData((prev) => ({ ...prev, img: downloadURL })); // Adding img to data
  //         });
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });

  //     // const uploadTask = uploadBytesResumable(storageRef, file);

  //     // // Listening to the upload progress
  //     // uploadTask.on(
  //     //   "state_changed",
  //     //   (snapshot) => {
  //     //     const progress =
  //     //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //     //     // console.log("Upload is " + progress + "% done");
  //     //     setPerc(progress);
  //     //     switch (snapshot.state) {
  //     //       case "paused":
  //     //         console.log("Upload is paused");
  //     //         break;
  //     //       case "running":
  //     //         console.log("Upload is running");
  //     //         break;
  //     //       default:
  //     //         break;
  //     //     }
  //     //   },
  //     //   (error) => {
  //     //     console.log(error);
  //     //   },
  //     //   () => {
  //     //     console.log("getDownloadUrl()");
  //     //     // Handle successful uploads on complete
  //     //     // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  //     //     getDownloadURL(uploadTask.snapshot.ref)
  //     //       .then((downloadURL) => {
  //     //         console.log("!*!*!*!*!*!*!");
  //     //         console.log("File available at", downloadURL);
  //     //         setData((prev) => ({
  //     //           ...prev,
  //     //           file: [...prev.file, downloadURL],
  //     //         })); // Adding img to data

  //     //         // setData({ ...data, img: downloadURL }); // useEffect have a dependency only for file, below is the exact same one
  //     //         // setData((prev) => ({ ...prev, img: downloadURL })); // Adding img to data
  //     //       })
  //     //       .catch((error) => {
  //     //         console.log(error);
  //     //       });

  //     //     // setDoc(doc(db, "user_files", currentUser.uid), {
  //     //     //   ...data,
  //     //     //   timeStamp: serverTimestamp(),
  //     //     // });
  //     //   }
  //     // );

  //     // const result = await uploadBytes(storageRef, files[i])
  //     //   .then(() => {
  //     //     console.log("success");
  //     //     getDownloadURL(storageRef).then((downloadURL) => {
  //     //       console.log("File available at", downloadURL);
  //     //       filesDownloadUrl.push(downloadURL);
  //     //       console.log(filesDownloadUrl);
  //     //       setData({ ...data, files: filesDownloadUrl }); // useEffect have a dependency only for file, below is the exact same one
  //     //       console.log(data);
  //     //       setDoc(doc(db, "user_files", currentUser.uid), {
  //     //         ...data,
  //     //         timeStamp: serverTimestamp(),
  //     //       });
  //     //     });
  //     //   })
  //     //   .catch((error) => {
  //     //     console.log("error");
  //     //   });
  //     // }
  //   }

  //   // console.log("setDoc()");
  //   // setDoc(doc(db, "user_files", currentUser.uid), {
  //   //   ...data,
  //   //   timeStamp: serverTimestamp(),
  //   // });
  // };
  // console.log(uploadFiles);

  // Adding input data one by one
  // const handleInput = (e) => {
  //   const id = e.target.id;
  //   const value = e.target.value;

  //   setData({ ...data, [id]: value });
  // };

  // // Adding input data one by one
  // const handleFilesInput = (e) => {
  //   // let fileInput = [];
  //   // for (let i = 0; i < e.target.files.length; i++) {
  //   //   // console.log(e.target.files[i]);
  //   //   fileInput.push(e.target.files[i]);
  //   //   console.log(fileInput);
  //   // }
  //   const filesInput = Object.values(e.target.files);
  //   // console.log(filesInput);
  //   setFiles({ ...filesInput });
  //   console.log(files);
  //   // const value = e.target.value;

  //   // setData({ ...data, [id]: value });
  // };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFiles([...files, file]);
    setIsFileUploading(true);

    const name = `${currentUser.uid}_files/${file.name}`;
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
        //Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref)
          .then((fileDownloadURL) => {
            console.log("File available at " + fileDownloadURL);
            handleDB({ file, fileDownloadURL });
          })
          .catch((error) => {
            console.log(error);
          });

        setIsFileUploading(false);
      }
    );
  };

  return (
    <div className="newfile">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          {/* <div className="right"> */}
          {/* <form onSubmit={handleSubmit(onSubmit)}> */}
          {/* <form onSubmit={handleAdd}> */}
          {/* <form> */}
          {/* Only shown when file is not uploading and file is removed */}
          <div className={isFileUploaded ? "fileInputMax" : "fileInput"}>
            <label htmlFor="file">
              <AddCircleOutlineIcon className="icon" />
              Upload File
            </label>
            {/* <input type="file" /> 
                Refer below */}
            <input
              type="file"
              // multiple
              id="file" // label htmlFor="file" and this input is connected
              // onChange={handleFilesInput}
              onChange={
                handleUpload
                // setFiles([...files, e.target.files[0]]);
                // setFile(e.target.files[0]);
                // setFileName(e.target.files[0].name);
                // console.log(file);
                // console.log(fileName);
                // file && setIsFileRemoved(!isFileRemoved);
              }
              style={{ display: "none" }}
            />
          </div>
          {files && (
            <FileList
              className="fileList"
              files={files}
              isFileUploading={isFileUploading}
            />
          )}
          {/* {inputs.map((input) => (
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
            ))} */}
          {/* Disabled to add img url to user collection */}
          {/* <button onClick={files && uploadFiles}>Send</button> */}
          {/* {file && (
              <FileItem
                file={file}
                setFile={setFile}
                isFileRemoved={isFileRemoved}
                setIsFileRemoved={setIsFileRemoved}
                isFileUploaded={isFileUploaded}
                setIsFileUploaded={setIsFileUploaded}
              />
            )} */}
          {/* </form> */}
          {/* <button
            // disabled={perc !== null && perc < 100}
            disabled={!isFileUploaded}
            type="submit"
            // onClick={files && uploadFiles}
          >
            Send
            {file && perc !== null && perc < 100 ? (
                <CircularProgress color="inherit" size={15} />
              ) : (
                "Send"
              )}
          </button> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default NewFile;
