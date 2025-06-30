// components/SubmitButton.js

'use client';

import { useFormStatus } from 'react-dom';

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
      type="submit"
      disabled={pending}
    >
      {pending ? 'Confirmando...' : 'Confirmar >>'}
    </button>
  );
};

export default SubmitButton;