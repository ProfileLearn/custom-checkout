// lib/actions.js

'use server';

import { redirect } from 'next/navigation';
import { generateCustomerSchema } from './definitions';
import fs from 'fs'; // Usamos la versión síncrona, ya que las Server Actions lo permiten
import path from 'path';

export async function createCustomer(prevState, formData) {

  // ... (comprobación de formData sin cambios)

  // 1. Leer tenantId y cargar la configuración correcta
  const tenantId = formData.get('tenantId') || 'default';
  let filePath;
  let fileContent;

  try {
    filePath = path.join(process.cwd(), 'config', 'tenants', `${tenantId}.json`);
    fileContent = fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.warn(`Configuración para el tenant "${tenantId}" no encontrada en la acción. Usando default.`);
    filePath = path.join(process.cwd(), 'config', 'tenants', 'default.json');
    fileContent = fs.readFileSync(filePath, 'utf8');
  }

  const fields = JSON.parse(fileContent);

  // 2. Extraer datos del formulario (sin cambios)
  const rawFormData = {
    // ...campos extraídos...
  };

  // Depuración: mostrar los datos recibidos antes de validar
  console.log('Datos recibidos para validar:', rawFormData);

  // 3. Validar los datos usando el esquema generado con los campos correctos
  const customerSchema = generateCustomerSchema(fields); // ¡Ahora sí tenemos 'fields'!
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

  redirect('customers/new/success');
}