import "./filelist.scss";
import FileItem from "./FileItem";

const FileList = ({ files, isFileUploading }) => {
  return (
    <div className="fileList">
      {files &&
        files.map((file) => (
          <FileItem
            key={file.name}
            file={file}
            isFileUploading={isFileUploading}
          />
        ))}
    </div>
  );
};

export default FileList;
