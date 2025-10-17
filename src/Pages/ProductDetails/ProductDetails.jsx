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

  // Fetch product details
  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setReviews(data.reviews || []);
        if (user && data.votedUsers?.includes(user.email)) {
          setHasVoted(true);
        }
      });
  }, [id, user]);

  if (!product) return <p className="text-center py-10">Loading...</p>;

  // Calculate average rating
  const avgRating = reviews.length
    ? (
        reviews.reduce((sum, r) => sum + Number(r.rating || 0), 0) / reviews.length
      ).toFixed(1)
    : "0.0";

  // ✅ Handle Vote
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

  // ✅ Handle Review
  const handleReviewSubmit = () => {
    if (!user) {
      return Swal.fire("Login Required", "Please login to add a review", "warning");
    }
    if (!rating || !comment.trim()) {
      return Swal.fire("Missing Info", "Please add rating & comment", "warning");
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

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-32 h-32 rounded-lg object-cover shadow-lg"
        />
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="text-lg text-gray-600">{product.tagline}</p>
          <div className="flex items-center space-x-3 text-sm mt-3">
            <span className="text-yellow-500 font-semibold">⭐ {avgRating}</span>
            <span>•</span>
            <span>{reviews.length} reviews</span>
            <span>•</span>
            <span>{product.votes} votes</span>
          </div>
          <button
            onClick={handleVote}
            disabled={hasVoted}
            className={`mt-4 px-6 py-2 rounded-lg font-semibold transition ${
              hasVoted
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {hasVoted ? "Voted" : "Vote"}
          </button>
        </div>
      </div>

      {/* ================= GALLERY SLIDER ================= */}
      {product.gallery?.length > 0 && (
        <Swiper
          slidesPerView={2}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="rounded-lg shadow-lg"
        >
          {product.gallery.map((img, i) => (
            <SwiperSlide key={i}>
              <img
                src={img}
                alt={`gallery-${i}`}
                className="w-[320px] h-[200px] object-cover rounded-lg"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* ================= DESCRIPTION ================= */}
      <div className="prose max-w-none">
        <h2 className="text-2xl font-bold mb-2">Overview</h2>
        <p>{product.description}</p>
      </div>

      {/* ================= OWNER INFO ================= */}
      {product.owner && (
        <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg shadow">
          <img
            src={product.owner.profileImage}
            alt={product.owner.name}
            className="w-14 h-14 rounded-full object-cover border"
          />
          <div>
            <h3 className="text-lg font-semibold">{product.owner.name}</h3>
            <p className="text-gray-600 text-sm">{product.owner.email}</p>
          </div>
        </div>
      )}

      {/* ================= PRICING ================= */}
      {product.pricing && (
        <div className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-3">Pricing</h2>
          {product.pricing.freePlan && <p>✅ Free plan available</p>}
          {product.pricing.premiumPlan && (
            <div className="mt-3">
              <p className="font-semibold">
                Premium: ${product.pricing.premiumPlan.price} {product.pricing.premiumPlan.currency}/mo
              </p>
              <ul className="list-disc list-inside text-gray-700 mt-2">
                {product.pricing.premiumPlan.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* ================= REVIEWS ================= */}
      <div className="bg-gray-50 p-6 rounded-lg shadow space-y-5">
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
