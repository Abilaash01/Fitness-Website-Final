import React from 'react';

const gymLocations = [
  {
    name: 'Planet Fitness',
    address: '1821 Robertson Rd, Ottawa, ON K2H 8X3',
    hours: 'Open 24 Hours',
    contact: 'Phone: (613) 829-7111',
    website: 'https://www.planetfitness.com',
  },
  {
    name: 'GoodLife Fitness',
    address: '900 Exhibition Way, Ottawa, ON K1S 5J3',
    hours: 'Open 24 Hours',
    contact: 'Phone: (613) 695-2407',
    website: 'https://www.goodlifefitness.com',
  },
  {
    name: 'Anytime Fitness',
    address: '901 Carling Ave, Ottawa, ON K1Y 4E3',
    hours: 'Mon - Sun: 5 AM - 11 PM',
    contact: 'Phone: (456) 789-0123',
    website: 'https://www.anytimefitness.com',
  },
];

const Finder = () => {
  return (
    <div className="find-a-gym">
      <h2>Find a Gym</h2>
      <div className="gym-list">
        {gymLocations.map((gym, index) => (
          <div className="gym-card" key={index}>
            <h3>{gym.name}</h3>
            <p className="address">{gym.address}</p>
            <p>{gym.hours}</p>
            <p>{gym.contact}</p>
            <a href={gym.website} target="_blank" rel="noopener noreferrer">
              <button>Visit Website</button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Finder;
