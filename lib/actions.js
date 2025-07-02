// lib/actions.js
'use server';

import { redirect } from 'next/navigation';
import { generateCustomerSchema } from './definitions'; // Asumimos que el esquema de Zod ya está completo
import customerFormConfig from '../config/tenants/default.json'; // 1. Importamos la configuración del formulario

export async function createCustomer(formData) {
  // 2. Construimos el objeto de datos dinámicamente
  const rawFormData = {};
  customerFormConfig.forEach(field => {
    // Para cada campo definido en la configuración, obtenemos su valor del formData
    rawFormData[field.name] = formData.get(field.name);
  });

  console.log("Datos extraídos dinámicamente:", rawFormData);

  // 3. Validar los datos usando el esquema de Zod
  // (El esquema en definitions.js sigue siendo nuestra "fuente de verdad" para las reglas)
  const validatedFields = generateCustomerSchema.safeParse(rawFormData);

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
    console.log("Enviando a la API:", customerData);
    const response = await fetch(process.env.API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.API_KEY}`,
      },
      body: JSON.stringify(customerData),
    });

    if (!response.ok) {
      throw new Error("Falló la llamada a la API.");
    }

  } catch (error) {
    if (error.message === 'NEXT_REDIRECT') {
      throw error;
    }
    return {
      success: false,
      message: 'Error de API: No se pudo crear el cliente.',
      errors: null,
    };
  }

  redirect('/customers/new/success');
}