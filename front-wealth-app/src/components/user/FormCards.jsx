import React from 'react';
import User from './user';
import Cards from './cards';

const FormCards = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="w-full md:w-1/2 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Welcome Text</h2>
          <p>This is the space for your welcome text or any other information you'd like to display alongside the form.</p>
        </div>
        <div className="w-full md:w-1/2">
          <User />
        </div>
      </div>
      <Cards />
    </div>
  );
};

export default FormCards;