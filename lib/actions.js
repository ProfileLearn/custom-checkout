// lib/actions.js
'use server';

import { redirect } from 'next/navigation';
import { generateCustomerSchema } from './definitions';
import customerFormFields from './customer-form-config-completo.json';

export async function createCustomer(formData) {
  console.log('createCustomer function called');
  console.log('API_URL:', process.env.API_URL);
  console.log('API_KEY:', process.env.API_KEY);

  if (!formData || typeof formData.get !== 'function') {
    console.error('Error: formData no válido', formData);
    return {
      success: false,
      message: 'Error interno: Datos del formulario no válidos',
      errors: { form: ['Hubo un problema al procesar el formulario'] }
    };
  }
  // 1. Extraer TODOS los datos del formulario
  const rawFormData = {
    name: formData.get('name'),
    email: formData.get('email'),
    iva_condition: formData.get('iva_condition'),
    identification_type: formData.get('identification_type'),
    identification: formData.get('identification'),
    address: formData.get('address'),
    city: formData.get('city'),
    province: formData.get('province'),
    postal_code: formData.get('postal_code'),
    phone_country_code: formData.get('phone_country_code'),
    phone_area_code: formData.get('phone_area_code'),
    phone_number: formData.get('phone_number'), 
    observations: formData.get('observations'),
  };

  // 2. Validar los datos usando el nuevo esquema completo
  const customerSchema = generateCustomerSchema(customerFormFields);
  const validatedFields = customerSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      success: false,
      message: 'Error de validación. Por favor, revisa los campos.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const customerData = validatedFields.data;

  try {
    console.log("Enviando a la API:", customerData);
    console.log("API_URL:", process.env.API_URL);
    console.log("API_KEY:", process.env.API_KEY);
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

    // Redirigir después de éxito
    redirect('/customers/new/success');
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

  
}