import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import useAuth from "../../Hook/useAuth";

const ProductDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setReviews(data.reviews || []);
        console.log("Fetched product data:",data);
        if (user && data.votedUsers?.includes(user.email)) {
          setHasVoted(true);
        }
      });
  }, [id, user]);

  // avgRating
  const avgRating = reviews.length
    ? (
        reviews.reduce((sum, r) => sum + Number(r.rating || 0), 0) /
        reviews.length
      ).toFixed(1)
    : "0.0";

  // Handle Voting
  const handleVote = () => {
    if (!user) {
      return Swal.fire("Login Required", "Please login to vote", "warning");
    }

    fetch(`http://localhost:5000/products/${id}/vote`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userEmail: user.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          Swal.fire("Thank you!", "Your vote has been counted.", "success");
          setProduct((prev) => ({ ...prev, votes: prev.votes + 1 }));
          setHasVoted(true);
        } else {
          Swal.fire("Oops!", data.message || "You already voted.", "info");
        }
      });
  };

  // Handle Review Submit
  const handleReviewSubmit = () => {
    if (!user) {
      return Swal.fire(
        "Login Required",
        "Please login to add review",
        "warning"
      );
    }
    if (!rating || !comment.trim()) {
      return Swal.fire(
        "Missing Info",
        "Please add rating & comment",
        "warning"
      );
    }

    const newReview = { rating, comment, user: user.email };

    fetch(`http://localhost:5000/products/${id}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReview),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setReviews((prev) => [...prev, newReview]);
          setRating(0);
          setComment("");
          Swal.fire("Thanks!", "Your review was added.", "success");
        }
      });
  };

  if (!product) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <img
          src={product.logo}
          alt={product.name}
          className="w-24 h-24 md:w-32 md:h-32 rounded-lg shadow object-cover"
        />
        <div>
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="text-lg text-gray-600">{product.tagline}</p>
          <div className="flex items-center space-x-3 mt-3">
            <span className="text-yellow-500 text-lg">⭐ {avgRating}</span>
            <span>•</span>
            <span>{reviews.length} reviews</span>
            <span>•</span>
            <span>{product.votes} votes</span>
          </div>
          <button
            onClick={handleVote}
            disabled={hasVoted}
            className={`mt-4 px-5 py-2 rounded-lg font-semibold ${
              hasVoted
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {hasVoted ? "Voted" : "Vote"}
          </button>
        </div>
      </div>

      {/* Banner Slider */}
      <Swiper
        slidesPerView={2}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="rounded-lg shadow"
      >
        {product.gallery?.map((img, i) => (
          <SwiperSlide key={i}>
            <img
              src={img}
              alt={`media-${i}`}
              className="w-[320px] h-[200px] object-cover rounded-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Description */}
      <div className="prose max-w-none">
        <p>{product.description}</p>
      </div>

      {/* Reviews Section */}
      <div className="bg-gray-50 p-6 rounded-lg shadow space-y-4">
        <h2 className="text-2xl font-semibold">Reviews</h2>

        {/* Add Review */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                className={`cursor-pointer text-2xl ${
                  star <= rating ? "text-yellow-500" : "text-gray-400"
                }`}
              >
                ★
              </span>
            ))}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review..."
            className="w-full border p-3 rounded"
          />
          <button
            onClick={handleReviewSubmit}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Submit Review
          </button>
        </div>

        {/* Display Reviews */}
        <div className="space-y-4 mt-6">
          {reviews.length === 0 && <p>No reviews yet.</p>}
          {reviews.map((r, i) => (
            <div key={i} className="border-b pb-3">
              <div className="flex items-center gap-2">
                <span className="text-yellow-500">{`⭐`.repeat(r.rating)}</span>
                <span className="text-gray-500 text-sm">by {r.user}</span>
              </div>
              <p>{r.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
