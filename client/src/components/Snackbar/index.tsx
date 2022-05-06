import './style.scss';

import React, { useEffect, useRef } from 'react';

export type SnackbarProps = {
  position: 'top center' | 'bottom right',
  onClose?: () => void,
  timeout?: number,
}

/**
 * <Snackbar /> React component
 * @param {SnackbarProps} props
 * @return {JSX.Element}
 */
export default function Snackbar({
  position,
  onClose: closeSnackbar,
  timeout=3e3,
  children,
}: React.PropsWithChildren<SnackbarProps>): JSX.Element {
  const timeoutEventID = useRef<number>();

  useEffect(() => {
    timeoutEventID.current = closeSnackbar ?
      window.setTimeout(closeSnackbar, timeout) : -1;

    return () => {
      clearTimeout(timeoutEventID.current);
    };
  }, []);

  return (
    <div className={`snackbar ${position}`}>
      {children}
    </div>
  );
};
