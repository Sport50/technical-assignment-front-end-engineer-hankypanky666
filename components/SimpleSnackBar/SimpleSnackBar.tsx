import Snackbar from "@mui/material/Snackbar";
import { SyntheticEvent, useEffect, useState } from "react";
import { Alert, AlertColor } from "@mui/material";

export default function SimpleSnackbar(props: {
  type: AlertColor;
  open: boolean;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        elevation={4}
        onClose={handleClose}
        severity={props.type}
        variant="outlined"
        sx={{ width: "100%" }}
      >
        {props.type === "error" ? "Something went wrong" : "Success"}
      </Alert>
    </Snackbar>
  );
}
