import React, { useState } from 'react';
import Modal from 'react-modal';

const MembershipForm = ({ plan, onClose, onPayment }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handlePayment = () => {
    setTimeout(() => {
      onPayment();
      onClose();
    }, 1000);
  };

  return (
    <div className="membership-form">
      <h3>{`Payment for ${plan.name}`}</h3>
      <form>
        <div className="form-group">
          <label>Card Number:</label>
          <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Expiry Date:</label>
          <input type="text" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
        </div>
        <div className="form-group">
          <label>CVV:</label>
          <input type="text" value={cvv} onChange={(e) => setCvv(e.target.value)} />
        </div>
        <div className="form-actions">
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button type="button" onClick={handlePayment}>
            Pay
          </button>
        </div>
      </form>
    </div>
  );
};

const PaymentDialog = ({ plan, onClose }) => {
  return (
    <div className="payment-dialog">
      <h3>Payment Successful</h3>
      <p>{`Thank you for your payment for ${plan.name}!`}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

const MembershipItem = ({ plan }) => {
  const [showForm, setShowForm] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const handlePayNow = () => {
    setShowForm(true);
  };

  const handlePaymentSuccess = () => {
    setShowForm(false);
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  return (
    <div className="membership-plan">
      <h3>{plan.name}</h3>
      <p>{plan.description}</p>
      <p>Membership Benefits:</p>
      <ul>
        {plan.benefits.map((benefit, index) => (
          <li key={index}>
            <span className="checkmark">&#10004;</span> {benefit}
          </li>
        ))}
      </ul>
      {!showForm && !showDialog && <button onClick={handlePayNow}>Select</button>}
      <Modal isOpen={showForm} onRequestClose={() => setShowForm(false)} contentLabel="Membership Payment">
        <MembershipForm plan={plan} onClose={() => setShowForm(false)} onPayment={handlePaymentSuccess} />
      </Modal>
      {showDialog && (
        <Modal isOpen={showDialog} onRequestClose={handleCloseDialog} contentLabel="Payment Successful">
          <PaymentDialog plan={plan} onClose={handleCloseDialog} />
        </Modal>
      )}
    </div>
  );
};

const Memberships = () => {
  const membershipPlans = [
    {
      name: 'Starter Plan',
      description: 'Get access to our comprehensive fitness and health tracking tools. Track your workouts, set goals, and monitor your progress with ease.',
      benefits: ['Fitness and workout tracking', 'Personalized workout plans', 'Goal setting and progress tracking', 'Nutrition and meal planning'],
    },
    {
      name: 'Advanced Plan',
      description: 'Take your fitness journey to the next level with advanced features. Get access to specialized workouts, expert guidance, and more.',
      benefits: [
        'All features from Starter Plan',
        'Advanced workout analytics',
        'Personalized health tips',
        'Access to premium recipes',
        'Priority support',
      ],
    },
    {
      name: 'Premium Plan',
      description: 'Experience the ultimate fitness and health transformation with our Premium Plan. Get one-on-one coaching and exclusive perks.',
      benefits: [
        'All features from Advanced Plan',
        'Personalized coaching sessions',
        'Access to premium content',
        'Exclusive fitness challenges',
        'VIP access to events',
      ],
    },
  ];

  return (
    <section className="memberships">
      <h2>Membership Packages</h2>
      <div className="membership-plans">
        {membershipPlans.map((plan, index) => (
          <MembershipItem key={index} plan={plan} />
        ))}
      </div>
    </section>
  );
};

export default Memberships;
