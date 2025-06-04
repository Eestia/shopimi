import { useParams, useNavigate } from 'react-router-dom'; // on importe useNavigate
import { useEffect, useState } from 'react';
import './ProductDetail.css';

function addFakeData(card) {
  return {
    ...card,
    price: (Math.random() * 10 + 5).toFixed(2),
    rating: (Math.random() * 2 + 3).toFixed(1),
  };
}

export default function ProductDetail() {
  const { id } = useParams();
  const [card, setCard] = useState(null);
  const navigate = useNavigate(); // hook pour naviguer

  useEffect(() => {
    fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${id}`)
      .then(res => res.json())
      .then(data => setCard(addFakeData(data.data[0])));
  }, [id]);

  if (!card) return <p>Chargement...</p>;

  return (
    <div className="product-detail">
      <button className="back-button" onClick={() => navigate('/')}>
        ← Retour à l'accueil
      </button>

      <h1 id='nom'>{card.name}</h1>

      <div className="card-container">
        <div className="card-flip">
          <div className="card-face front">
            <img src={card.card_images[0].image_url} alt={card.name} />
          </div>
          <div className="card-face back">
            <img
              src="https://ms.yugipedia.com//thumb/e/e5/Back-EN.png/257px-Back-EN.png"
              alt="Card Back"
            />
          </div>
        </div>
      </div>

      <p><b>Type :</b> {card.type}</p>
      <div className="description-block">
        <p><b>Description :</b> {card.desc}</p>
      </div>
      <p><b>Rating :</b> ⭐ {card.rating}</p>
      <p><b>Price :</b> ${card.price}</p>
    </div>
  );
}
