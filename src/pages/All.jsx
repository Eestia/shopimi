// All.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './All.css';

function addFakeData(cards) {
  return cards.map(card => ({
    ...card,
    price: (Math.random() * 10 + 5).toFixed(2),
    rating: (Math.random() * 2 + 3).toFixed(1),
  }));
}

export default function All() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php')
      .then(res => res.json())
      .then(data => {
        const validCards = data.data.filter(card => card.card_images && card.card_images.length > 0);
        const limitedCards = validCards.slice(0, 500);
        setCards(addFakeData(limitedCards));
      });
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'center', color: 'white' }}>Toutes les cartes (500)</h1>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}>
        {cards.map(card => (
          <Link id='carte' key={card.id} to={`/products/${card.id}`}>
            <img
              src={card.card_images[0].image_url_small}
              alt={card.name}
              width={100}
            />
            <p>{card.name}</p>
            <p>⭐ {card.rating}</p>
            <p>{card.price} €</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
