import "./filelist.scss";
import FileItem from "./FileItem";

const FileList = ({ files, isFileUploading }) => {
  return (
    <div className="fileList">
      {files &&
        files.map((file) => (
          <FileItem
            // This is to avoid the error when the user uploads the same file after delete
            key={`${file.name}_${new Date().getTime()}`}
            file={file}
            isFileUploading={isFileUploading}
          />
        ))}
    </div>
  );
};

export default FileList;
