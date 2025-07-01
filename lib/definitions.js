// lib/definitions.js
import { z } from 'zod';

// Esta función toma el array de campos del JSON y construye un esquema de Zod dinámico
export function generateCustomerSchema(fields) {
  const schemaShape = {};

  // --- PRIMERA PASADA: Construir la forma base del esquema ---
  // Todos los campos se tratan como strings opcionales inicialmente.
  // Esto previene errores de "Expected string, received null" para los campos que están ocultos
  // y no se envían con el formulario.
  fields.forEach(field => {
    // Ignoramos los campos que nunca se muestran
    if (!field.show) {
      return;
    }

    let validator;
    if (field.type === 'email') {
      // Un campo de email puede ser una string vacía o un email con formato válido.
      validator = z.string().email({ message: "Debe ser un correo electrónico válido." }).or(z.literal(''));
    } else {
      // Para todos los demás tipos (text, tel, textarea, select) empezamos con un string simple.
      validator = z.string();
    }

    // Hacemos que TODOS los campos sean opcionales en este nivel.
    // La obligatoriedad (requerido) la aplicaremos de forma condicional más adelante con .refine().
    schemaShape[field.name] = validator.optional();
  });

  let schema = z.object(schemaShape);

  // --- SEGUNDA PASADA: Añadir reglas de validación inteligentes (`refinements`) ---
  fields.forEach(field => {
    if (!field.show || !field.required) {
      return; // No necesitamos reglas para campos no visibles o no requeridos.
    }

    // REGLA 1: Para campos que SIEMPRE son requeridos (no tienen `showWhen`).
    if (field.required && !field.showWhen) {
      schema = schema.refine(data => {
        // La validación pasa si el campo existe y no es una string vacía ni solo espacios.
        return !!data[field.name] && data[field.name].trim().length > 0;
      }, {
        message: `${field.label} es un campo requerido.`,
        path: [field.name], // Muy importante: aplica el error al campo correcto.
      });
    }

    // REGLA 2: Para campos que son REQUERIDOS CONDICIONALMENTE (tienen `showWhen`).
    if (field.required && field.showWhen) {
      const dependentField = field.showWhen.field;
      const requiredValues = field.showWhen.is;

      schema = schema.refine(data => {
        const dependentValue = data[dependentField];

        // Si el valor del campo dependiente está en la lista de valores que activan esta regla...
        if (dependentValue && requiredValues.includes(dependentValue)) {
          // ...ENTONCES este campo se vuelve obligatorio y no puede estar vacío ni solo espacios.
          return !!data[field.name] && data[field.name].trim().length > 0;
        }

        // Si la condición no se cumple, el campo no es obligatorio, por lo tanto la validación para este campo pasa.
        return true;
      }, {
        message: `${field.label} es un campo requerido.`,
        path: [field.name], // Aplica el error al campo correcto.
      });
    }
  });

  return schema;
}