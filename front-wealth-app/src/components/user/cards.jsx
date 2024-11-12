import React from 'react';

const Card = ({ imageSrc, title, description }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"> {/* Added border class */}
    <img src={imageSrc} alt={title} className="w-full h-48 object-cover" />
    <div className="p-6">
      <h3 className="font-bold text-xl mb-2">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  </div>
);

const Cards = ({ title, cards }) => {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-black">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default Cards;