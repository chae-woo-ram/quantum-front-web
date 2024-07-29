import { ReactNode } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

interface ActionButton {
  label: string;
  disabled?: boolean;
  onClick: () => void;
}

interface DialogProps {
  open: boolean;
  title?: string;
  buttons?: ActionButton[];
  children?: ReactNode;
  onClose: () => void;
}

const DialogComponent = ({ open, title, buttons, children, onClose }: DialogProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      {title && <DialogTitle id="alert-dialog-title">{title}</DialogTitle>}
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {buttons?.map((action, index) => (
          <Button key={index} onClick={action.onClick} disabled={action.disabled}>
            {action.label}
          </Button>
        ))}
      </DialogActions>
    </Dialog>
  );
};

export default DialogComponent;
