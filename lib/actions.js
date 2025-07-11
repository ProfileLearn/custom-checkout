// lib/actions.js
'use server';

import { redirect } from 'next/navigation';
import { generateCustomerSchema } from './definitions'; // Asumimos que el esquema de Zod ya está completo
import customerFormConfig from '../config/tenants/default.json'; // Importamos la configuración del formulario
import { createCustomerApi } from './customer-service'; // Importamos la función del servicio

export async function createCustomer(formData) {
  const rawFormData = {};
  customerFormConfig.forEach(field => {
    const value = formData.get(field.name);
    rawFormData[field.name] = value == null ? '' : value;
  });

  console.log("Datos extraídos dinámicamente:", rawFormData);

  const validatedFields = generateCustomerSchema(customerFormConfig).safeParse(rawFormData);

  if (!validatedFields.success) {
    console.error("Errores de validación:", validatedFields.error.flatten().fieldErrors);
    return {
      success: false,
      message: 'Error de validación. Por favor, revisa los campos.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const customerData = validatedFields.data;

  try {
    // Llamamos a la función del servicio para interactuar con la API
    await createCustomerApi(customerData);

    // Si la llamada al servicio es exitosa, redirigimos
    redirect('/customers/new/success');

  } catch (error) {
    if (error.message === 'NEXT_REDIRECT') {
      throw error;
    }
    console.error("Error en la acción al crear el cliente:", error);
    return {
      success: false,
      message: error.message || 'Error desconocido al crear el cliente.',
      errors: null,
    };
  }
}
