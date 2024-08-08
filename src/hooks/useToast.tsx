import { useCallback, useState } from 'react';

const useToast = () => {
  const [openToast, setOpenToast] = useState(false);
  const [severity, setSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('success');
  const [messageToast, setMessageToast] = useState('');

  const showToast = useCallback((newSeverity: 'success' | 'error' | 'warning' | 'info', newMessage: string) => {
    setSeverity(newSeverity);
    setMessageToast(newMessage);
    setOpenToast(true);
  }, []);

  const closeToast = useCallback(() => {
    setOpenToast(false);
  }, []);

  return { openToast, severity, messageToast, showToast, closeToast };
};

export default useToast;
