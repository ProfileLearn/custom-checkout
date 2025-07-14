// lib/customer-service.js

import customerFormConfig from '../config/tenants/default.json';

export function transformFormValues(formValues) {

  const nativeFieldsPattern = /fname|lname|email|phone|phone_country_code|area_code/;
  const address = {};
  const metadata = {};
  const other = {};

  customerFormConfig.forEach(field => {
    const value = formValues[field.name];
    if (field.group === 'address') {
      address[field.name] = value;
    }

    else if (nativeFieldsPattern.test(field.name)) {
      other[field.name] = value;
    }

    else {

      metadata[field.name] = value;
    }
  });

  return { ...other, address, metadata };
}

export async function createCustomerApi(customerData) {
  try {
    const data = JSON.stringify(transformFormValues(customerData));
    console.log("Datos del cliente transformados:", data);

    const response = await fetch(`${process.env.API_URL}/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.API_KEY}`,
      },
      body: data,
    });

    if (!response.ok) {
      const contentType = response.headers.get('content-type');
      let errorMessage = response.statusText;
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } else {
        const errorText = await response.text();
        errorMessage = errorText;
      }
      throw new Error(`Error de API: ${response.status} - ${errorMessage}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const responseData = await response.json();
      return responseData;
    } else {
      return await response.text();
    }

  } catch (error) {
    console.error("Error en el servicio al llamar a la API:", error);
    throw new Error('Error en el servicio: No se pudo crear el cliente.');
  }
}
