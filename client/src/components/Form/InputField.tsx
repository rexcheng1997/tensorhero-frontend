import React from 'react';

export type InputFieldProps = React.ClassAttributes<HTMLInputElement> &
React.InputHTMLAttributes<HTMLInputElement> & {
  htmlLabel?: string,
  labelClass?: string,
};

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(({
  htmlLabel, labelClass, ...htmlInputProps
}: InputFieldProps, ref) => {
  return (
    <div className='input-field flex-col align-start'>
      {htmlLabel && (<div className='flex-row align-start'>
        <label className={labelClass}
          htmlFor={htmlInputProps.name}>
          {htmlLabel}
        </label>
        {htmlInputProps.required && <span className='asterisk'>*</span>}
      </div>)}
      <input ref={ref} {...htmlInputProps} id={htmlInputProps.name}/>
    </div>
  );
});

InputField.displayName = 'TextField';

export default InputField;
