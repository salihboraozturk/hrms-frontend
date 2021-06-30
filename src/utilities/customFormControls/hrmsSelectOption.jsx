import React from "react";
import { useField } from 'formik'
import { FormField, Label } from 'semantic-ui-react';

export default function HrmsSelectOption({...props}) {
  const [field, meta] = useField(props);

  return (
    <div>
      <FormField error={meta.touched && !!meta.error}>
        <select {...field} {...props}  style={{color:"#red"}}>
          <option defaultValue value="">
            {props.placeholder}
          </option>
          {props.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
        {meta.touched && !!meta.error ? (
          <Label pointing basic content={meta.error}></Label>
        ) : null}
      </FormField>
    </div>
  );
}
