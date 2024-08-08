import { forwardRef } from 'react';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface ToastProps {
  open: boolean;
  severity: 'success' | 'error' | 'warning' | 'info';
  message: string;
  closeToast: () => void;
}

const Toast = ({ open, severity, message, closeToast }: ToastProps) => (
  <Snackbar
    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    open={open}
    autoHideDuration={2500}
    onClose={closeToast}
  >
    <Alert severity={severity} sx={{ width: '100%', fontSize: 15, fontWeight: 600 }}>
      {message}
    </Alert>
  </Snackbar>
);

export default Toast;
