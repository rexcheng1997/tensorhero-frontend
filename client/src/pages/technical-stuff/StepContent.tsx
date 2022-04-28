import React, { FC } from 'react';

type StepContentProps = {
  no: number,
  title: string,
};

const StepContent: FC<React.PropsWithChildren<StepContentProps>> = ({
  no, title, children,
}) => {
  return (
    <div id={`step-${no}`} className='step'>
      <div className='flex-col align-start'>
        <h2 className='step-number'>Step {no}</h2>
        <h2 className='step-title'>{title}</h2>
      </div>
      <div className='step-content flex-col align-center'>
        {children}
      </div>
    </div>
  );
};

export default StepContent;
