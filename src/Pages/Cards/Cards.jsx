import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';

import { useEffect, useState } from "react";
import Card from "./Card";
import SectionTitle from "../../SectionTitle/SectionTitle";


const Cards = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then(res => res.json())
      .then(data => setCards(data));
  }, [])


  return (
    <div>
      <SectionTitle heading={'Featured Products'} subHeading={'Handpicked innovations making waves — upvote your favorites and explore the details.'}></SectionTitle>

      <Swiper
        slidesPerView={3}
        centeredSlides={true}
        spaceBetween={30}
        grabCursor={true}
        autoplay={{
          delay: 1000,           
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper mb-12"
      >
        <div className="py-4 grid lg:grid-cols-4 md:grid-cols-2 gap-2 my-3 ">

          {
            cards.map(card =>
              <SwiperSlide key={card.name}>
                <Card card={card}></Card>
              </SwiperSlide>)
          }

        </div>
      </Swiper>
    </div>
  );
};

export default Cards;