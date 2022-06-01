import { Button, Paper, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box } from "@mui/system";
import SendIcon from "@mui/icons-material/Send";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import SimpleSnackbar from "../SimpleSnackBar/SimpleSnackBar";

type FormData = {
  title: string;
  bodyText: string;
  email: string;
};

const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export default function ArticleCreateForm() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<FormData>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      title: "",
      bodyText: "",
      email: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [snackBarState, setSnackBarState] = useState({
    open: false,
    error: false,
  });

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    const richText = data.bodyText.replace(/\n\r?/g, "<br />");
    const JSONData = JSON.stringify({ ...data, bodyText: richText });

    const endpoint = "/api/articles";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONData,
    };

    try {
      const response = await fetch(endpoint, options);

      const result = await response.json();

      if (result.success) {
        reset();
        setSnackBarState((state) => ({
          ...state,
          open: true,
        }));
      } else {
        setSnackBarState((state) => ({
          ...state,
          error: true,
          open: true,
        }));
      }

      setLoading(false);
    } catch (e) {
      console.error(e);
      setSnackBarState((state) => ({
        ...state,
        error: true,
        open: true,
      }));
      setLoading(false);
    }
  });

  return (
    <Paper
      sx={{
        padding: "16px",
      }}
      variant="elevation"
    >
      <h2>Add Article</h2>
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        gap="24px"
        noValidate
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              helperText={errors.title ? errors.title.message : null}
              error={!!errors?.title}
              required
              label="Title"
              variant="outlined"
            />
          )}
          rules={{
            required: "Required field",
          }}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              helperText={errors.email ? errors.email.message : null}
              error={!!errors?.email}
              required
              id="email"
              type="email"
              label="Email"
              variant="outlined"
            />
          )}
          rules={{
            required: "Required field",
            pattern: {
              value: regexEmail,
              message: "Please enter a valid email address",
            },
          }}
        />

        <Controller
          name="bodyText"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              required
              variant="filled"
              label="Text Body"
              multiline
              helperText={
                errors.bodyText
                  ? errors.bodyText.message
                  : `Max ${field.value?.length}/5000`
              }
              error={!!errors.bodyText}
              rows={24}
            />
          )}
          rules={{
            required: "Required field",
            maxLength: {
              value: 5000,
              message: "Max is 5000",
            },
          }}
        />

        <Box display="flex" gap="16px">
          <LoadingButton
            disabled={!isValid}
            type="submit"
            variant="outlined"
            color="primary"
            loading={loading}
            startIcon={<SendIcon />}
          >
            Publish
          </LoadingButton>

          <Button
            type="reset"
            variant="text"
            color="warning"
            disabled={!isDirty}
            onClick={() => reset()}
            startIcon={<RestartAltIcon />}
          >
            Reset
          </Button>
        </Box>
      </Box>
      <SimpleSnackbar
        onClose={() => setSnackBarState((state) => ({ ...state, open: false }))}
        open={snackBarState.open}
        type={snackBarState.error ? "error" : "success"}
      ></SimpleSnackbar>
    </Paper>
  );
}
