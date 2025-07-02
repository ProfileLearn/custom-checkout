// lib/definitions.js
import { z } from 'zod';
import { evaluateCondition } from './form-logic';

// Esta función toma el array de campos del JSON y construye un esquema de Zod
export function generateCustomerSchema(fields) {
  const schemaShape = {};

  fields.forEach(field => {
    if (!field.show) {
      return;
    }

    let validator;
    switch (field.type) {
      case 'email':
        validator = z.string().email({ message: "Debe ser un correo electrónico válido." });
        break;
      case 'tel':
      case 'text':
      case 'textarea':
        validator = z.string();
        break;
      default:
        validator = z.string();
    }

    // Si es un 'select', añadimos la validación del enum
    if (field.component === 'select' && field.options) {
      const enumValues = field.options.map(opt => opt.value);
      if (enumValues.length > 0) {
        validator = z.enum(enumValues, {
          errorMap: () => ({ message: `Por favor, selecciona una opción válida para ${field.label}.` })
        });
        if (!field.required) {
          validator = validator.optional().or(z.literal(''));
        }
      }
    }

    // Por defecto, los campos no requeridos son opcionales
    if (!field.required) {
      validator = validator.optional().or(z.literal(''));
    }

    schemaShape[field.name] = validator;
  });

  let schema = z.object(schemaShape);

  // Refinamiento: solo requerir si showWhen se cumple
  fields.forEach(field => {
    if (!field.required || !field.showWhen) return;
    schema = schema.refine((data) => {
      // Usamos evaluateCondition para saber si el campo debería ser requerido
      if (evaluateCondition(field.showWhen, data)) {
        return !!data[field.name] && data[field.name].toString().trim().length > 0;
      }
      return true;
    }, {
      message: `${field.label} es un campo requerido.`,
      path: [field.name],
    });
  });

  return schema;
}