import { BiUpvote } from "react-icons/bi";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const Card = ({ card }) => {
  const {_id, name, image, tags, votes } = card;
  return (
    <div>
      <div className="card bg-base-100 shadow-sm">
        <figure>
          <img
            src={image}
            alt={name} 
            className="h-36"
            />
        </figure>
        <div className="card-body">
          <Link to={`/products/${_id}`} className="hover:text-blue-500"><h2 className="card-title">{name}</h2></Link>
          <p></p>
          <div className="card-actions">
            {
              tags.map(tag => <div className="badge badge-outline">{tag}</div>)
            }
          </div>
          <div className="card-actions justify-end">
            <button className="btn hover:border-b-indigo-800"><BiUpvote />{votes}</button>
          </div>
        </div>
      </div>
    </div>
     
  );
};

export default Card;