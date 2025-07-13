// lib/customer-service.js

import customerFormConfig from '../config/tenants/default.json';

export function transformFormValues(formValues) {
  const address = {};
  const other = {};

  customerFormConfig.forEach(field => {
    const value = formValues[field.name];
    if (field.group === 'address') {
      address[field.name] = value;
    } else {
      other[field.name] = value;
    }
  });

  return { ...other, address };
}

export async function createCustomerApi(customerData) {
  try {
    console.log("Enviando a la API desde el servicio:", transformFormValues(customerData));

    /*const response = await fetch(process.env.API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        //'Authorization': `Bearer ${process.env.API_KEY}`,
      },
      body: JSON.stringify(customerData),
    });

    if (!response.ok) {
      // Aquí podrías manejar diferentes códigos de estado HTTP si es necesario
      const errorData = await response.json(); // Intenta leer el cuerpo del error si la API lo proporciona
      throw new Error(`Error de API: ${response.status} - ${errorData.message || response.statusText}`);
    }

    // Si la API devuelve algún dato útil en una respuesta exitosa, podrías retornarlo
    // const responseData = await response.json();
    // return responseData;
*/
  } catch (error) {
    console.error("Error en el servicio al llamar a la API:", error);
    throw new Error('Error en el servicio: No se pudo crear el cliente.');
  }
}
