import React from 'react';
import { Link } from 'react-router-dom';
import homeBackground from '../home_background.jpg'; 

const Card = ({title, description, link, icon}) => (
    <Link to={link}>
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
        {
            title: 'Real Estate (Rental)',
            description: 'Manage your income, Expense, Lease Tracking and more',
            link: '/real-estate',
            icon: '🏠'
        },
        {
            title: 'Investment Accounts',
            description: 'Manage Asset allocation, potential market predictions, and rebalance your accounts.',
            link: '/investments',
            icon: '📈'
        },
        {
            title: 'Retirement Accounts',
            description: 'Plan for your future with retirement account management',
            link: '/retirement',
            icon: '🕰️'
        }
        // {title: 'Tax Software', description: 'Simplify your tax preparation process', link: '/taxes', icon: '💼'}
    ];

    return (
        <div className="home-container">
            <div className="page-container">
                <div className="content-rectangle" style={{ backgroundColor: '#f0f0f0' }}>
                    <h1 className="dashboard-title">Dashboard</h1>
                    <div className="card-grid">
                        {cardData.map((card, index) => (
                            <Card key={index} title={card.title} description={card.description} link={card.link}
                                  icon={card.icon}/>
                        ))}
                    </div>
                </div>
            </div>
            <style jsx>{`
                .home-container {
                    min-height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                    padding: 20px 0;
                    background-image: url(${homeBackground});
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                }

                .page-container {
                    width: 100%;
                    max-width: 1200px;
                    padding: 0 20px;
                }

                .content-rectangle {
                    margin-top: 10em;
                    background-color: rgba(255, 255, 255, 0.9);
                    border-radius: 8px;
                    padding: 40px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }

                .dashboard-title {
                    margin-bottom: 30px;
                    color: #69a289;
                    font-family: 'Montserrat', sans-serif;
                    font-weight: 500;
                }

                .card-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 20px;
                }

                .card {
                    background-color: #69a289;
                    border-radius: 4px;
                    min-height: 200px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
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

                .card-grid h3 {
                    margin: 0;
                    color: #fff;
                    font-family: 'Montserrat', sans-serif;
                    font-weight: 600; /* Bold weight */
                }

                .card-grid p {
                    margin: 0;
                    color: #f0f0f0;
                    font-size: 0.9em;
                    font-family: 'Montserrat', sans-serif;
                    font-weight: 300; /* Light weight */
                }
            `}</style>
        </div>
    );
};

export default HomePage;