import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
// import useAuth from "../../hooks/useAuth"; // 👈 assuming you have an auth hook

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  // const { user } = useAuth(); // get current logged-in user

  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) {
    return <p className="text-center py-10 text-lg">Loading...</p>;
  }

  // Handle voting
  const handleVote = () => {
    // if (!user) return Swal.fire("Login Required", "Please login to vote", "warning");

    fetch(`http://localhost:5000/products/${id}/vote`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify({ userEmail: user.email })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          Swal.fire("Thank you!", "Your vote has been counted.", "success");
          setProduct((prev) => ({ ...prev, votes: prev.votes + 1 }));
        } else {
          Swal.fire("Oops!", data.message || "You already voted.", "info");
        }
      });
  };

  // Handle comment
  const handleComment = (e) => {
    e.preventDefault();
    // if (!user) return Swal.fire("Login Required", "Please login to comment", "warning");

    const newComment = {
      // user: user.displayName,
      user: "Demo User",
      text: comment,
      timestamp: new Date().toISOString(),
    };

    fetch(`http://localhost:5000/products/${id}/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire("Posted!", "Your comment has been added.", "success");
          setProduct((prev) => ({
            ...prev,
            comments: [...(prev.comments || []), newComment],
          }));
          setComment("");
        }
      });
  };

  // Handle rating
  const handleRating = (value) => {
    // if (!user) return Swal.fire("Login Required", "Please login to rate", "warning");
    setRating(value);

    fetch(`http://localhost:5000/products/${id}/rating`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating: value }),
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <img
          src={product.logo || product.image}
          alt={`${product.name} logo`}
          className="w-28 h-28 rounded-xl object-cover shadow-lg"
        />
        <div>
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="text-lg text-gray-600 mt-2">{product.tagline}</p>
          <div className="mt-4 flex items-center gap-6">
            <button
              onClick={handleVote}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold"
            >
              👍 Vote ({product.votes || 0})
            </button>
            <span className="text-gray-600">⭐ {product.avgRating || 0}/5</span>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {product.tags?.map((tag) => (
          <span
            key={tag}
            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Banner */}
      <div>
        <img
          src={product.image}
          alt={`${product.name} banner`}
          className="w-full rounded-xl object-cover shadow"
        />
      </div>

      {/* Description */}
      <div className="text-gray-700 leading-relaxed">
        <p>{product.description}</p>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <p className="font-semibold">Your Rating:</p>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => handleRating(star)}
            className={`cursor-pointer text-2xl ${
              star <= rating ? "text-yellow-400" : "text-gray-400"
            }`}
          >
            ★
          </span>
        ))}
      </div>

      {/* Comments */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Comments</h2>
        <form onSubmit={handleComment} className="flex gap-3">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700"
          >
            Post
          </button>
        </form>
        <div className="space-y-3">
          {product.comments?.map((c, index) => (
            <div key={index} className="p-3">
              <p className="font-semibold">{c.user}</p>
              <p className="text-gray-600">{c.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="flex gap-4 mt-6">
        <a
          href={product.website}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg font-semibold"
        >
          Visit Website
        </a>
        <button className="border border-green-600 text-green-600 hover:bg-green-50 px-5 py-3 rounded-lg font-semibold">
          Add to Collection
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
