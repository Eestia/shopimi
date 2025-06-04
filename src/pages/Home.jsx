import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Yu-Gi-Oh!.png';
import konami from '../assets/Konami.png';
import Slider from 'react-slick';
import psp2 from '../assets/psp2.png'
import './Home.css';

// Générer un prix et rating simulé
function addFakeData(cards) {
  return cards.map(card => ({
    ...card,
    price: (Math.random() * 10 + 5).toFixed(2), // prix entre 5 et 15 $
    rating: (Math.random() * 2 + 3).toFixed(1), // note entre 3 et 5
  }));
}

export default function Home() {
  const [cards, setCards] = useState([]);
  const [legendaryCards, setLegendaryCards] = useState([]);

  // Chargement des 300 premières cartes
  useEffect(() => {
    fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php')
      .then(res => res.json())
      .then(data => {
  const validCards = data.data.filter(card => card.card_images && card.card_images.length > 0);
  const limitedCards = validCards.slice(0, 53);
  setCards(addFakeData(limitedCards));
});

  }, []);

  // Chargement des cartes légendaires
  useEffect(() => {
    const legendaryIDs = [
      33396948, // Exodia
      89631139, // Blue-Eyes
      46986414, // Dark Magician
      74677422, // Red-Eyes
      10000020, // Slifer
      10000000, // Obelisk
      10000010, // Ra
    ];

    Promise.all(
      legendaryIDs.map(id =>
        fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${id}`)
          .then(res => res.json())
          .then(data => addFakeData([data.data[0]])[0])
      )
    ).then(setLegendaryCards);
  }, []);

  const highRating = cards.filter(card => card.rating > 4);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div>
      <div id='nav'>
        <img src={logo} alt="" />
        <img src={konami} alt="" />
      </div>
    <div id='titre'>
      <h2>C’est l’heure du Du-du-duel !</h2>
    </div>

    <section id='bg-anime'>
      <img id='screen' src={psp2} alt="" />
      <Slider {...settings} className="carousel" id="CarouselPR">
        {legendaryCards.map(card => (
          <div className="slide" key={card.id}>
            <img src={card.card_images[0].image_url} alt={card.name} className="card-image" />
            <div className="card-info">
              <h3>{card.name}</h3>
              <p><strong>Prix :</strong> {card.price} €</p>
              <p><strong>Note :</strong> ⭐ {card.rating}</p>
              {card.type && <p><strong>Type :</strong> {card.type}</p>}
              <Link to={`/products/${card.id}`} className="btn-details">Voir les détails</Link>
            </div>
          </div>
        ))}
      </Slider>
    </section>



      <h2 id='etoile'>⭐ Produits bien notés (note > 4)</h2>
      <div id='les-cartes'>
        {highRating.map(card => (
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
      <div style={{ textAlign: 'center', margin: '30px 0' }}>
        <Link to="/all" className="btn-all-cards">Voir toutes les cartes</Link>
      </div>

    </div>
    
);

}

