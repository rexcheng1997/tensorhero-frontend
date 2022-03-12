/* eslint-disable react/prop-types */
// see https://github.com/yannickcr/eslint-plugin-react/issues/3140
import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export type AspectRatioContainerProps = {
  ratio: number;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onPointerUp?: React.PointerEventHandler<HTMLDivElement>;
  onPointerMove?: React.PointerEventHandler<HTMLDivElement>;
  onPointerLeave?: React.PointerEventHandler<HTMLDivElement>;
};

const AspectRatioContainer = React.forwardRef<
  HTMLDivElement, React.PropsWithChildren<AspectRatioContainerProps>
>((props, ref) => {
  const idRef = useRef('th-react-' + uuidv4());
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    const autoResize = () => {
      // hacky way to get around the forwardRef issue
      const self = document.getElementById(idRef.current);
      // ratio = width / height
      setHeight(self!.clientWidth / props.ratio);
    };

    autoResize();
    window.addEventListener('resize', autoResize);

    return () => {
      window.removeEventListener('resize', autoResize);
    };
  }, []);

  return (
    <div data-testid='aspect-ratio-container'
      id={idRef.current} ref={ref} className={props.className}
      onClick={props.onClick}
      onPointerUp={props.onPointerUp}
      onPointerMove={props.onPointerMove}
      onPointerLeave={props.onPointerLeave}
      style={{ height }}>
      {props.children}
    </div>
  );
});

AspectRatioContainer.displayName = 'AspectRatioContainer';

export default AspectRatioContainer;
