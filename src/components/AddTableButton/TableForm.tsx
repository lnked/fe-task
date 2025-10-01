import { useMemo } from 'react';
import { Form, Field, type FieldRenderProps, type FormRenderProps } from 'react-final-form';

import { isTextField } from './helpers';
import { MenuItem, AddButton, MenuInput, ErrorMessage } from './tokens';
import type { FieldType } from './types';
import type { ColumnValues } from '../../features/tablesSlice';
import { Select } from '../Select';

type InputFieldOwnProps = {
  label: string;
  list: string[];
  initialValue: ColumnValues;
};

type InputFieldProps = FieldRenderProps<string, HTMLElement> & InputFieldOwnProps;

const InputField = ({ input, meta, label }: InputFieldProps) => (
  <div>
    <MenuInput {...input} placeholder={label} />
    {meta.touched && meta.error && <ErrorMessage>{meta.error}</ErrorMessage>}
  </div>
);

type SelectFieldProps = FieldRenderProps<string, HTMLElement> & InputFieldOwnProps;

const SelectField = ({ input, list, meta }: SelectFieldProps) => (
  <div style={{ marginBottom: '1rem' }}>
    <Select {...input} options={list} />
    {meta.touched && meta.error && <ErrorMessage>{meta.error}</ErrorMessage>}
  </div>
);

type TableFormProps = {
  fields: FieldType[];
  onSubmit: (values: ColumnValues) => void;
};

export const TableForm = ({ fields, onSubmit }: TableFormProps) => {
  const initialValues = useMemo(
    () =>
      fields.reduce((acc, field) => {
        acc[field.id as keyof ColumnValues] = field.value;

        return acc;
      }, {} as ColumnValues),
    [fields],
  );

  const validate = (values: ColumnValues) => {
    const errors: Record<string, string> = {};

    fields.forEach((field: FieldType) => {
      if (field.required && !values[field.id as keyof ColumnValues]) {
        errors[field.id] = 'Обязательное поле';
      }
    });

    return errors;
  };

  const handleSubmit = (values: ColumnValues, form: FormRenderProps<ColumnValues>['form']) => {
    onSubmit(values);

    setTimeout(() => {
      form.reset();
    }, 1000);
  };

  return (
    <Form
      onSubmit={(values, form) => handleSubmit(values, form)}
      validate={validate}
      initialValues={initialValues}
      render={({ handleSubmit, invalid }) => (
        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <MenuItem key={field.id}>
              {isTextField(field) ? (
                <Field name={field.id} label={field.label} component={InputField} />
              ) : (
                <Field name={field.id} list={field.list} component={SelectField} />
              )}
            </MenuItem>
          ))}

          <AddButton type="submit" disabled={invalid}>
            Add
          </AddButton>
        </form>
      )}
    />
  );
};
