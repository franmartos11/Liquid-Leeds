"use client"
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackbarCustom({ message, status, onClose }: { message: string, status: boolean,onClose: () => void  }) {
  const [open, setOpen] = React.useState(status);

  React.useEffect(() => {
    setOpen(status);
  }, [status]);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert sx={{ width: '100%' }} severity="error" onClose={handleClose}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
