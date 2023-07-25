// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const AlertDialog = (props) => {
  // const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleClose = (link) => {
    navigate(link);
  };

  // const handleTryAgain = () => {
  //   window.location.reload(true);
  // };

  return (
    <div>
      <Dialog
        open={true}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleTryAgain}>TRY AGAIN</Button> */}
          <Button
            onClick={() => {
              handleClose(props.link);
            }}
            autoFocus
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialog;
