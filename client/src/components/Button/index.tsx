import React from 'react';
import PropTypes from 'prop-types';

type ButtonProps = React.ClassAttributes<HTMLButtonElement> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * React Button component
 * @param {ButtonProps} props
 * @return {JSX.Element}
 */
export default function Button(props: ButtonProps): JSX.Element {
  return (
    <button {...props} className={
      'th-btn flex-row align-center space-between ' + (props.className ?? '')
    }>
      {props.children}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
};
