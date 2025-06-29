// components/CreatePostForm.js
import { createCustomer } from '@/lib/actions';

const CreateCustomerForm = ({ fields }) => {
  return (
    <form action={createCustomer} className="w-full max-w-lg">
      {fields.map((field) =>
        // 1. Renderizado condicional basado en la propiedad 'show'
        field.show && (
          <div key={field.name} className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2" htmlFor={field.name}>
                {field.label}
              </label>

              {field.component === 'input' && (
                <input
                  className="appearance-none block w-full bg-gray-800 text-gray-200 border border-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-700 focus:border-blue-500"
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  required={field.required} // 2. Aplicamos la propiedad 'required'
                />
              )}

              {field.component === 'textarea' && (
                <textarea
                  className="appearance-none block w-full bg-gray-800 text-gray-200 border border-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-700 focus:border-blue-500 h-48 resize-none"
                  id={field.name}
                  name={field.name}
                  placeholder={field.placeholder}
                  required={field.required} // 2. Aplicamos la propiedad 'required'
                ></textarea>
              )}

              {/* 3. Nuevo bloque para renderizar el componente 'select' */}
              {field.component === 'select' && (
                <select
                  className="appearance-none block w-full bg-gray-800 text-gray-200 border border-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-700 focus:border-blue-500"
                  id={field.name}
                  name={field.name}
                  required={field.required}
                  defaultValue="" // Para que la opción por defecto esté seleccionada
                >
                  <option value="" disabled>Selecciona una opción</option>
                  {/* Hacemos un bucle sobre el array de opciones del campo */}
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
        )
      )}

      <div className="flex items-center justify-end">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Continuar
        </button>
      </div>
    </form>
  );
};

export default CreateCustomerForm;