import React from "react";

const UploadFile = () => {
  return (
    <div className="uploadfile">
      <form method="POST" class="post-form" enctype="multipart/form-data">
        {/* csrf_token  */}
        {/* {{ form.as_p }}   */}
        <button type="submit" class="save btn btn-default">
          Save
        </button>
      </form>
    </div>
  );
};

export default UploadFile;
