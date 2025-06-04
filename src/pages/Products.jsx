import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function addFakeData(cards) {
  return cards.map(card => ({
    ...card,
    price: (Math.random() * 10 + 5).toFixed(2),
    rating: (Math.random() * 2 + 3).toFixed(1),
  }));
}

export default function Products() {
  const [cards, setCards] = useState([]);

useEffect(() => {
  fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php')
    .then(res => res.json())
    .then(data => {
  const validCards = data.data.filter(card => card.card_images && card.card_images.length > 0);
  const limitedCards = validCards.slice(0, 53);
  setCards(addFakeData(limitedCards));
});

}, []);


  return (
    <div>
      <h1>Produits</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {cards.map(card => (
          <Link
            key={card.id}
            to={`/products/${card.id}`}
            style={{
              width: 150,
              margin: 10,
              textDecoration: 'none',
              color: 'black',
              border: '1px solid #ccc',
              borderRadius: 8,
              padding: 10,
              textAlign: 'center',
            }}
          >
            <img
              src={card.card_images[0].image_url_small}
              alt={card.name}
              width={120}
              style={{ marginBottom: 5 }}
            />
            <h4 style={{ fontSize: '1rem', margin: '5px 0' }}>{card.name}</h4>
            <p>${card.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
