// app/customers/new/success/page.js

import Link from 'next/link';

const SuccessPage = () => {
  return (
    <div className="container mx-auto px-4 text-center py-20">
      <h1 className="text-4xl font-bold text-green-500">Customer Created Successfully!</h1>
      <p className="mt-4 text-lg text-gray-300">
        information has been submitted correctly.
      </p>
      <Link href="/customers/new" className="mt-8 inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Create Another Customer
      </Link>
    </div>
  );
};

export default SuccessPage;