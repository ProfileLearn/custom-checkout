// components/CreateCustomerForm.js
'use client';

import { useState, useEffect } from 'react';
import { createCustomer } from '@/lib/actions';
import { evaluateCondition } from '@/lib/form-logic';
import SubmitButton from './SubmitButton';

const CreateCustomerForm = ({ fields }) => {
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    const defaultValues = {};
    fields.forEach(field => {
      if (field.defaultValue) {
        defaultValues[field.name] = field.defaultValue;
      }
    });
    setFormValues(defaultValues);
  }, [fields]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <form action={createCustomer} className="w-full max-w-lg bg-background p-8 rounded-lg shadow-md">
      {fields.map((field) => {
        const shouldShow = evaluateCondition(field.showWhen, formValues);

        return (
          shouldShow && (
            <div key={field.name} className="mb-4">
              <label className="block text-foreground text-sm font-semibold mb-2" htmlFor={field.name}>
                {field.label}
              </label>

              {field.component === 'input' && (
                <input
                  className="appearance-none block w-full bg-background text-foreground border border-border-color rounded py-3 px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  required={field.required}
                  value={formValues[field.name] || ''}
                  onChange={handleChange}
                />
              )}

              {field.component === 'textarea' && (
                <textarea
                  className="appearance-none block w-full bg-background text-foreground border border-border-color rounded py-3 px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary h-32 resize-none"
                  id={field.name}
                  name={field.name}
                  placeholder={field.placeholder}
                  required={field.required}
                  value={formValues[field.name] || ''}
                  onChange={handleChange}
                ></textarea>
              )}

              {field.component === 'select' && (
                <select
                  className="appearance-none block w-full bg-background text-foreground border border-border-color rounded py-3 px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  id={field.name}
                  name={field.name}
                  required={field.required}
                  value={formValues[field.name] || ''}
                  onChange={handleChange}
                >
                  <option value="" disabled>Selecciona una opción</option>
                  {field.options.map((option) => {
                    const shouldShowOption = evaluateCondition(option.showWhen, formValues);

                    return shouldShowOption && (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    );
                  })}
                </select>
              )}
            </div>
          )
        );
      })}

      <div className="mt-6">
        <SubmitButton />
      </div>
    </form>
  );
};

export default CreateCustomerForm;