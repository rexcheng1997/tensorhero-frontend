/* eslint-disable max-len */
import React from 'react';
import { render } from '@testing-library/react';
import InputField, { InputFieldProps } from '../InputField';

describe('<InputField /> test suite', () => {
  const renderInputField = (props: Partial<InputFieldProps> = {}) => {
    const ref = React.createRef<HTMLInputElement>();
    return {
      form: render(
          <form data-testid='test-form'>
            <InputField {...props} ref={ref} />
          </form>,
      ),
      ref,
    };
  };

  it('should not show the label text when no label is specified', async () => {
    const { form } = renderInputField();
    const formElement = await form.findByTestId('test-form');
    expect(formElement.querySelector('label')).not.toBeInTheDocument();
  });

  it('should show the label text when label is specified', async () => {
    const { form } = renderInputField({ htmlLabel: 'Title' });
    const formElement = await form.findByTestId('test-form');
    expect(formElement.querySelector('label')).toBeInTheDocument();
    expect(await form.findByText('Title')).toBeInTheDocument();
  });

  it('should not show asterisk when input is not required', async () => {
    const { form } = renderInputField({ htmlLabel: 'Title' });
    const formElement = await form.findByTestId('test-form');
    expect(formElement.querySelector('.asterisk')).not.toBeInTheDocument();
  });

  it('should show the asterisk when label is specified and input is required', async () => {
    const { form } = renderInputField({ htmlLabel: 'Title', required: true });
    const formElement = await form.findByTestId('test-form');
    expect(formElement.querySelector('.asterisk')).toBeInTheDocument();
  });

  it('should add classes to label when labelClass is specified', async () => {
    const labelClass = 'test-class-1 test-class-2';
    const { form } = renderInputField({ htmlLabel: 'Title', labelClass });
    const formElement = await form.findByTestId('test-form');
    expect(formElement.querySelector('label')).toHaveClass(...labelClass.split(' '));
  });

  it('ref should be the input element', async () => {
    const { form, ref } = renderInputField();
    const formElement = await form.findByTestId('test-form');
    expect(formElement.querySelector('input')).toEqual(ref.current);
  });

  it('should add attributes to the input element', async () => {
    const { ref } = renderInputField({ type: 'text', name: 'title', readOnly: true });
    expect(ref.current).toHaveAttribute('type', 'text');
    expect(ref.current).toHaveAttribute('name', 'title');
    expect(ref.current).toHaveAttribute('readOnly');
    expect(ref.current).toHaveAttribute('id', 'title');
  });

  it('should link the label element to the input element when name is specified', async () => {
    const { form } = renderInputField({ htmlLabel: 'Title', name: 'title' });
    const formElement = await form.findByTestId('test-form');
    expect(formElement.querySelector('label')).toHaveAttribute('for', 'title');
  });
});
