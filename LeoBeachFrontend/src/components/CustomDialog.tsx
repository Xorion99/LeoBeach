import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

interface Props {
  open: boolean;
  title: string;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  children: React.ReactNode;
}

export const CustomDialog: React.FC<Props> = ({
  open,
  title,
  onClose,
  onConfirm,
  confirmText = "Conferma",
  cancelText = "Annulla",
  children
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{cancelText}</Button>
        {onConfirm && <Button variant="contained" onClick={onConfirm}>{confirmText}</Button>}
      </DialogActions>
    </Dialog>
  );
};
