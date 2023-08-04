import "./filemanagercontainer.scss";

import FileManager, {
  Permissions,
  Toolbar,
  Item,
  FileSelectionItem,
  ContextMenu,
} from "devextreme-react/file-manager";
// import { fileItems } from "./data.js";

import { toast, Toaster } from "react-hot-toast";

import { useEffect, useState, useContext } from "react";

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

import { AuthContext } from "../../context/AuthContext";

const FileManagerContainer = ({ title, axiosFileItems }) => {
  const [fileItems, setFileItems] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    // ********* Enable setFileItems(axiosFileItems) after the Connect with Django *********
    // setFileItems(axiosFileItems);
    // ********* Delete below setFileItems([...]) after the Connect with Django *********
    setFileItems([
      {
        name: "Documents",
        isDirectory: true,
        items: [
          {
            name: "Projects",
            isDirectory: true,
            items: [
              {
                name: "About.rtf",
                isDirectory: false,
                size: 1024,
              },
              {
                name: "Passwords.rtf",
                isDirectory: false,
                size: 2048,
              },
            ],
          },
          {
            name: "About.xml",
            isDirectory: false,
            size: 1024,
          },
          {
            name: "Managers.rtf",
            isDirectory: false,
            size: 2048,
          },
          {
            name: "ToDo.txt",
            isDirectory: false,
            size: 3072,
          },
        ],
      },
      {
        name: "Images",
        isDirectory: true,
        items: [
          {
            name: "logo.png",
            isDirectory: false,
            size: 20480,
          },
          {
            name: "banner.gif",
            isDirectory: false,
            size: 10240,
          },
        ],
      },
      {
        name: "System",
        isDirectory: true,
        items: [
          {
            name: "Employees.txt",
            isDirectory: false,
            size: 3072,
          },
          {
            name: "PasswordList.txt",
            isDirectory: false,
            size: 5120,
          },
        ],
      },
      {
        name: "Description.rtf",
        isDirectory: false,
        size: 1024,
      },
      {
        name: "Description.txt",
        isDirectory: false,
        size: 2048,
      },
    ]);
  }, []);

  // const addNewItem = (items, parentName, newItem) => {
  //   return items.map((item) => {
  //     if (item.name === parentName) {
  //       return {
  //         ...item,
  //         items: [...item.items, newItem],
  //       };
  //     } else if (item.items && item.items.length > 0) {
  //       return {
  //         ...item,
  //         items: addNewItem(item.items, parentName, newItem),
  //       };
  //     }
  //     return item;
  //   });
  // };

  // ********************************************** Connect with Django **********************************************
  const updateAxiosFileItems = (fileItems) => {
    // Reflect updated fileItems backend
    // Things to send to file system
    // 1. fileID = console.log(fileItems.__KEY__)
    // 2. userID = console.log(currentUser.uid)
    console.log(fileItems);
  };
  // *****************************************************************************************************************

  // https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxFileManager/Configuration/#onDirectoryCreating
  const onDirectoryCreating = (e) => {
    // setFileItems(
    //   addNewItem(fileItems, e.parentDirectory.name, {
    //     name: e.name,
    //     isDirectory: true,
    //     items: [],
    //   })
    // );
    // ********************************************** Connect with Django **********************************************
    updateAxiosFileItems(fileItems);
    // *****************************************************************************************************************
  };

  // https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxFileManager/Configuration/#onErrorOccurred
  const onError = (e) => {
    switch (e.errorCode) {
      case 0:
        toast.error("NoAccess");
        break;
      case 1:
        toast.error("FileExists");
        break;
      case 2:
        toast.error("FileNotFound");
        break;
      case 3:
        toast.error("DirectoryExists");
        break;
      case 4:
        toast.error("DirectoryNotFound");
        break;
      case 5:
        toast.error("WrongFileExtension");
        break;
      case 6:
        toast.error("MaxFileSizeExceeded");
        break;
      default:
        toast.error("Contact admin");
        break;
    }
  };

  // https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxFileManager/Configuration/#onFileUploading
  const onFileUploading = (e) => {
    // setFileItems(
    //   addNewItem(fileItems, e.destinationDirectory.name, {
    //     name: e.fileData.name,
    //     isDirectory: false,
    //     size: e.fileData.size,
    //     lastModifiedDate: e.fileData.lastModifiedDate,
    //     // file: e.fileData // Not sure if its going to be necessary to backend
    //   })
    // );
    // ********************************************** Connect with Django **********************************************
    updateAxiosFileItems(fileItems);
    // *****************************************************************************************************************
  };

  // https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxFileManager/Configuration/#onItemCopied
  const onItemCopied = (e) => {
    // ********************************************** Connect with Django **********************************************
    updateAxiosFileItems(fileItems);
    // *****************************************************************************************************************
  };

  // https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxFileManager/Configuration/#onItemDeleted
  const onItemDeleted = (e) => {
    // ********************************************** Connect with Django **********************************************
    updateAxiosFileItems(fileItems);
    // *****************************************************************************************************************
  };

  // https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxFileManager/Configuration/#onItemMoved
  const onItemMoved = (e) => {
    // ********************************************** Connect with Django **********************************************
    updateAxiosFileItems(fileItems);
    // *****************************************************************************************************************
  };

  // https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxFileManager/Configuration/#onItemRenamed
  const onItemRenamed = (e) => {
    // ********************************************** Connect with Django **********************************************
    updateAxiosFileItems(fileItems);
    // *****************************************************************************************************************
  };

  // ****************************************************** Connect with Django ******************************************************
  // Change this fucntion to fetch the user's id from postgresql database where it matches with the email input and return email value
  // Delete the firebase part after fetching the user's id
  // try-catch block: 1. catch block's case should match with the axios error type
  //                  2. customize the toast.error message into whatever string value you want to show to user
  // Do not have to be async
  const getUserIDWithEmail = async (email) => {
    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    try {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        return doc.id;
      });
    } catch (error) {
      switch (error) {
        case "case1":
          toast.error("case1 error");
          break;
        case "case2":
          toast.error("case2 error");
          break;
        default:
          toast.error(`Contact admin: ${error}`);
          break;
      }
    }
  };
  // *********************************************************************************************************************************

  // https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxFileManager/Configuration/contextMenu/
  const onItemClick = (e) => {
    if (e.itemData.name === "share") {
      var email = prompt("Please enter a user's email to share");
      var userToShareID = getUserIDWithEmail(email);
      // ********************************************** Connect with Django **********************************************
      // Use e.fileSystemItem to share FileSystemItem
      // The FileSystemItem should be pasted to currentUser.uid/shared/userToShareID
      // console.log(e.fileSystemItem);
      // console.log(userToShareID);
      // *****************************************************************************************************************
      // Things to send to file system
      // 1. fileID = console.log(e.fileSystemItem.__KEY__)
      // 2. userID = console.log(currentUser.uid)
    }
  };

  return (
    <div className="fileManagerContainer">
      {/* https://react-hot-toast.com/ */}
      <Toaster toastOptions={{ duration: 2000 }} />
      <div className="fileManagerTitle">{title}</div>
      <FileManager
        fileSystemProvider={fileItems}
        onDirectoryCreating={onDirectoryCreating}
        onErrorOccurred={onError}
        onFileUploading={onFileUploading}
        onItemCopied={onItemCopied}
        onItemDeleted={onItemDeleted}
        onItemMoved={onItemMoved}
        onItemRenamed={onItemRenamed}
        rootFolderName="Custom Root Folder" // https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxFileManager/Configuration/#rootFolderName
        onContextMenuItemClick={onItemClick} // This is used to enable when the "Share to" menu item is clicked https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxFileManager/Configuration/#onContextMenuItemClick
        // onToolbarItemClick={onItemClick} // https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxFileManager/Configuration/#onToolbarItemClick
      >
        {/* https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxFileManager/Configuration/contextMenu/ */}
        <ContextMenu>
          <Item name="rename" />
          <Item name="move" text="Move to" />
          <Item name="copy" text="Copy to" />
          <Item name="delete" />
          <Item name="share" text="Share to" icon="share" />
          <Item name="refresh" beginGroup="true" />
          <Item name="download" text="Download a File" />
        </ContextMenu>
        {/* https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxFileManager/Configuration/toolbar/ */}
        <Toolbar>
          {/* Specifies a predefined item's name and optional settings */}
          <Item name="create" text="Create a directory" />
          <Item name="upload" text="Upload a file" />
          {/* Specifies a predefined item's name only */}
          <Item name="switchView" />
          <Item name="separator" />
          {/* Specifies items that are visible when users select files */}
          <FileSelectionItem name="rename" />
          <FileSelectionItem name="move" />
          <FileSelectionItem name="copy" />
          <FileSelectionItem name="delete" />
          {/* https://js.devexpress.com/Documentation/ApiReference/Common_Types/#ToolbarItemComponent */}
          {/* <FileSelectionItem
            widget="dxButton"
            options={{ name: "share", text: "Share to", icon: "share" }}
          /> */}
          <FileSelectionItem name="separator" />
          <FileSelectionItem name="clearSelection" />
        </Toolbar>
        {/* https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxFileManager/Configuration/permissions/ */}
        <Permissions
          create={true}
          copy={true}
          move={true}
          delete={true}
          rename={true}
          upload={true}
          download={true}
        />
      </FileManager>
    </div>
  );
};

export default FileManagerContainer;
