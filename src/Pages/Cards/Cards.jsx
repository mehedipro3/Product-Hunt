import { useEffect, useState } from "react";
import Card from "./Card";

const Cards = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch('./temp.json')
      .then(res => res.json())
      .then(data => setCards(data));
  }, [])


  return (
    <div>
      <div className="text-center pt-2">
        <h2 className="text-4xl font-bold text-blue-600">Featured Products</h2>
        <p className="text-lg text-gray-500">Handpicked innovations making waves — upvote your favorites and explore the details.</p>
      </div>
      <div className="py-4 grid lg:grid-cols-4 md:grid-cols-2 gap-2 my-3 ">
        {
          cards.map(card => <Card key={card.name} card={card}></Card>)
        }
      </div>
      <div className="text-center pb-2">
        <btn className="btn btn-soft btn-primary text-2xl font-bold ">More Product</btn>
      </div>
    </div>
  );
};

export default Cards;