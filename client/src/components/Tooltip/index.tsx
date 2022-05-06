import './style.scss';

import React from 'react';

export type TooltipProps = {
  description: string,
  position: 'top' | 'bottom' | 'left' | 'right',
};

/**
 * Tooltip React component
 * @param {TooltipProps} props
 * @return {JSX.Elment}
 */
export default function Tooltip({
  description, position, children,
}: React.PropsWithChildren<TooltipProps>): JSX.Element {
  return (
    <div className={`tooltip ${position}`}>
      {children}
      <small className='tooltip-description'>
        {description}
      </small>
    </div>
  );
};
