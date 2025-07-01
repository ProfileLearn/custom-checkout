'use client';

import { useState, useEffect } from 'react';
import { useActionState } from 'react';
import { createCustomer } from '@/lib/actions';
import SubmitButton from './SubmitButton';

// El estado inicial que nuestra server action devolverá.
// Es una buena práctica definirlo fuera del componente.
const initialState = {
  success: false,
  message: null,
  errors: {},
};

/**
 * Un formulario dinámico para crear clientes.
 * @param {object[]} fields - Un array de objetos que define los campos del formulario.
 * @param {string} tenantId - El identificador del tenant para pasarlo a la server action.
 */
const CreateCustomerForm = ({ fields, tenantId }) => {
  // useFormState maneja el estado retornado por la server action.
  // 'state' es el resultado de la última ejecución de la acción.
  // 'dispatch' es la función que usamos en el formulario para invocar la acción.
  const [state, formAction] = useActionState(createCustomer, initialState);

  // Mantenemos un estado local para los valores del formulario.
  // Esto es crucial para la lógica de visualización condicional (showWhen).
  const [formValues, setFormValues] = useState({});

  // Establece los valores por defecto del formulario cuando los campos se cargan.
  useEffect(() => {
    const defaultValues = {};
    fields.forEach(field => {
      // Usamos el valor por defecto del JSON si existe.
      if (field.defaultValue) {
        defaultValues[field.name] = field.defaultValue;
      }
    });
    setFormValues(defaultValues);
  }, [fields]);

  // Manejador para actualizar el estado local 'formValues' cuando el usuario escribe.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    // La acción del formulario ahora es 'dispatch', que invocará 'createCustomer'.
    <form action={formAction} className="w-full max-w-lg bg-background p-8 rounded-lg shadow-md">

      {/* Campo oculto para enviar el tenantId a la server action */}
      <input type="hidden" name="tenantId" value={tenantId} />

      {fields.map((field) => {
        // Lógica para mostrar/ocultar campos dinámicamente
        let shouldShow = field.show;
        if (field.showWhen) {
          const dependentFieldValue = formValues[field.showWhen.field];
          shouldShow = field.showWhen.is
            ? field.showWhen.is.includes(dependentFieldValue)
            : !!dependentFieldValue;
        }

        // Si el campo no se debe mostrar, no renderizamos nada.
        if (!shouldShow) return null;

        return (
          <div key={field.name} className="mb-4">
            <label className="block text-foreground text-sm font-semibold mb-2" htmlFor={field.name}>
              {field.label}
            </label>

            {/* Renderizado condicional de componentes de formulario */}

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
                  // Lógica para mostrar/ocultar opciones dinámicamente
                  let shouldShowOption = true;
                  if (option.showWhen) {
                    const dependentFieldValue = formValues[option.showWhen.field];
                    shouldShowOption = dependentFieldValue && option.showWhen.is.includes(dependentFieldValue);
                  }
                  return shouldShowOption && (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  );
                })}
              </select>
            )}

            {/* --- BLOQUE DE VISUALIZACIÓN DE ERRORES --- */}
            {/* Si hay errores para este campo en el estado, los mostramos. */}
            {state.errors?.[field.name] && (
              <div id={`${field.name}-error`} aria-live="polite" className="mt-2 text-sm text-red-500">
                {state.errors[field.name].map((error) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            )}
            {/* --- FIN DEL BLOQUE DE ERRORES --- */}

          </div>
        );
      })}

      {/* --- BLOQUE DE MENSAJE GENERAL DEL FORMULARIO --- */}
      {/* Muestra un mensaje general si la acción falla por una razón no ligada a un campo (ej. error de API) */}
      {!state.success && state.message && (
        <div aria-live="polite" className="mt-4 text-sm text-red-500">
          <p>{state.message}</p>
        </div>
      )}
      {/* --- FIN DEL BLOQUE DE MENSAJE GENERAL --- */}


      <div className="mt-6">
        <SubmitButton />
      </div>
    </form>
  );
};

export default CreateCustomerForm;