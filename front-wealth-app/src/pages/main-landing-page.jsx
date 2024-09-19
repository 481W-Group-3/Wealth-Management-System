import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ title, description, link, icon }) => (
  <Link to={link} className="card-link">
    <div className="card">
      <div className="card-header">
        {icon && <span className="card-icon">{icon}</span>}
        <h3>{title}</h3>
      </div>
      <p>{description}</p>
    </div>
  </Link>
);

const HomePage = () => {
  const cardData = [
    { title: 'Real Estate (Rental)', description: 'Manage your income, Expense, Lease Tracking and more', link: '/real-estate', icon: '🏠' },
    { title: 'Investment Accounts', description: 'Manage Asset allocation, potential market predictions, and rebalance your accounts.', link: '/investments', icon: '📈' },
    { title: 'Retirement Accounts', description: 'Plan for your future with retirement account management', link: '/retirement', icon: '🕰️' },
    { title: 'User Accounts', description: 'Manage user profiles and settings', link: '/users', icon: '👤' },
    { title: 'Tax Software', description: 'Simplify your tax preparation process', link: '/taxes', icon: '💼' }
  ];

  return (
    <div className="home-container">
      <div className="content-rectangle">
        <h1 className="dashboard-title">Dashboard</h1>
        <div className="card-grid">
          {cardData.map((card, index) => (
            <Card key={index} title={card.title} description={card.description} link={card.link} icon={card.icon} />
          ))}
        </div>
      </div>
      <style jsx>{`
        .home-container {
          min-height: calc(100vh - 60px);
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding: 20px;
        }
        .content-rectangle {
          background-color: white;
          border-radius: 8px;
          padding: 40px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          width: 80%;
          max-width: 1000px;
          margin-top: 50px;
        }
        .dashboard-title {
          margin-bottom: 30px;
          color: #333;
          font-family: 'Quicksand', sans-serif; 
          font-weight: 300;
        }
        .card-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .card-link {
          text-decoration: none;
          color: inherit;
        }
        .card {
          background-color: #f8f8f8;
          border-radius: 4px;
          padding: 20px;
          text-align: center;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 8px rgba(0, 0, 0, 0.1);
        }
        .card-header {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 10px;
        }
        .card-icon {
          font-size: 1.5em;
          margin-right: 10px;
        }
        h3 {
          margin: 0;
          color: #444;
          font-family: 'Quicksand', sans-serif; 
          font-weight: 600; /* Bold weight */
        }
        p {
          margin: 0;
          color: #000;
          font-size: 0.9em;
          font-family: 'Quicksand', sans-serif; 
          font-weight: 100; /* Thin weight */
        }
      `}</style>
    </div>
  );
};

export default HomePage;
