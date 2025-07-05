// lib/definitions.js
import { z } from 'zod';

// Esta función toma el array de campos del JSON y construye un esquema de Zod
export function generateCustomerSchema(fields) {
  const schemaShape = {};

  fields.forEach(field => {
    // Todos los campos son opcionales en el backend
    let validator;
    switch (field.type) {
      case 'email':
        validator = z.string().email({ message: "Debe ser un correo electrónico válido." }).optional().or(z.literal(''));
        break;
      case 'tel':
      case 'text':
      case 'textarea':
        validator = z.string().optional().or(z.literal(''));
        break;
      default:
        validator = z.string().optional().or(z.literal(''));
    }

    if (field.component === 'select' && field.options) {
      const enumValues = field.options.map(opt => opt.value);
      if (enumValues.length > 0) {
        validator = z.enum(enumValues, {
          errorMap: () => ({ message: `Por favor, selecciona una opción válida para ${field.label}.` })
        }).optional().or(z.literal(''));
      }
    }

    schemaShape[field.name] = validator;
  });

  return z.object(schemaShape);
}