import React from 'react';

const Card = ({ imagePath, title, description }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full h-48 object-cover" src={imagePath} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">
          {description}
        </p>
      </div>
    </div>
  );
};

const Cards = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <Card 
        imagePath="/path/to/image1.jpg" 
        title="Card 1 Title" 
        description="Description for Card 1" 
      />
      <Card 
        imagePath="/path/to/image2.jpg" 
        title="Card 2 Title" 
        description="Description for Card 2" 
      />
      <Card 
        imagePath="/path/to/image3.jpg" 
        title="Card 3 Title" 
        description="Description for Card 3" 
      />
    </div>
  );
};

export default Cards;