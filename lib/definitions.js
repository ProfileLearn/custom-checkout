// lib/definitions.js
import { z } from 'zod';

// Esta función toma el array de campos del JSON y construye un esquema de Zod
export function generateCustomerSchema(fields) {
  const schemaShape = {};

  fields.forEach(field => {
    // Ignoramos los campos que no se muestran, ya que no se enviarán
    if (!field.show) {
      return;
    }

    let validator;

    // Construimos el validador base según el tipo de componente/dato
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
        // Para 'select' y otros tipos
        validator = z.string();
    }

    // Aplicamos validaciones adicionales basadas en las propiedades del campo
    if (field.required) {
      // Usamos .min(1) para strings para asegurar que no estén vacíos
      validator = validator.min(1, { message: `${field.label} es un campo requerido.` });
    } else {
      // Hacemos que los campos no requeridos sean opcionales y acepten un string vacío
      validator = validator.optional().or(z.literal(''));
    }

    // Si es un 'select', añadimos la validación del enum
    if (field.component === 'select' && field.options) {
      const enumValues = field.options.map(opt => opt.value);
      if (enumValues.length > 0) {
        // Creamos un enum de Zod con los valores de las opciones
        validator = z.enum(enumValues, {
          errorMap: () => ({ message: `Por favor, selecciona una opción válida para ${field.label}.` })
        });
        // Si no es requerido, añadimos la opción de ser un string vacío
        if (!field.required) {
          validator = validator.optional().or(z.literal(''));
        }
      }
    }

    schemaShape[field.name] = validator;
  });

  return z.object(schemaShape);
}