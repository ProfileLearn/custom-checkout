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

  // Agrupar campos telefónicos
  const phoneFields = fields.filter(field => 
    ['phone_country_code', 'phone_area_code', 'phone_number'].includes(field.name)
  );
  const otherFields = fields.filter(field => 
    !['phone_country_code', 'phone_area_code', 'phone_number'].includes(field.name)
  );

  const renderField = (field) => {
    let shouldShow = true;
    if (field.requiredWhen) {
      shouldShow = Object.entries(field.requiredWhen).every(([depField, depValue]) =>
        Array.isArray(depValue)
          ? depValue.includes(formValues[depField])
          : formValues[depField] === depValue
      );
    } else if (field.show === false) {
      shouldShow = false;
    }

    let isRequired = false;
    if (field.requiredWhen) {
      isRequired = shouldShow;
    } else {
      isRequired = !!field.required;
    }

    // Determinar el ancho del campo según su tipo
    let widthClass = field.inline ? {
      phone_country_code: 'w-20',
      phone_area_code: 'w-32',
      phone_number: 'w-40',
    }[field.name] || 'w-auto' : 'w-full';

    return shouldShow && (
      <div key={field.name} className={`${field.inline ? 'inline-block mr-4' : 'block w-full mb-6'}`}>
        <label className="block text-foreground text-sm font-semibold mb-2" htmlFor={field.name}>
          {field.label}
        </label>

        {field.component === 'input' && (
          <input
            className={`appearance-none ${widthClass} bg-background text-foreground border border-border-color rounded py-3 px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary`}
            id={field.name}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            required={isRequired}
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
            required={isRequired}
            value={formValues[field.name] || ''}
            onChange={handleChange}
          ></textarea>
        )}

        {field.component === 'select' && (
          <select
            className="appearance-none block w-full bg-background text-foreground border border-border-color rounded py-3 px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            id={field.name}
            name={field.name}
            required={isRequired}
            value={formValues[field.name] || ''}
            onChange={handleChange}
          >
            <option value="" disabled>Selecciona una opción</option>
            {field.options.map((option) => {
              const shouldShowOption = option.showWhen ? evaluateCondition(option.showWhen, formValues) : true;
              return shouldShowOption && (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              );
            })}
          </select>
        )}
      </div>
    );
  };

  return (
    <form action={createCustomer} className="w-full max-w-lg bg-background p-8 rounded-lg shadow-md">
      {/* Renderizar campos no telefónicos */}
      {otherFields.map(renderField)}
      
      {/* Grupo de campos telefónicos */}
      <div className="mb-6">
        <div className="flex gap-4 items-end">
          {phoneFields.map(renderField)}
        </div>
      </div>

      <div className="mt-6">
        <SubmitButton />
      </div>
    </form>
  );
};

export default CreateCustomerForm;