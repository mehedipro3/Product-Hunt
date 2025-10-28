import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateProducts = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch existing product data
  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  // Handle update submission
  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedProduct = {
      name: form.name.value,
      tagline: form.tagline.value,
      description: form.description.value,
      image: form.image.value,
      category: form.category.value,
      website: form.website.value,
      github: form.github.value,
      tags: form.tags.value.split(",").map((t) => t.trim()),
    };

    fetch(`http://localhost:5000/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0 || data.matchedCount > 0) {
          Swal.fire("Updated!", "Your product has been updated.", "success");
          navigate("/dashboard/myProducts");
        } else {
          Swal.fire("No Changes", "Nothing was updated.", "info");
        }
      })
      .catch(() =>
        Swal.fire("Error", "Failed to update product. Try again.", "error")
      );
  };

  if (loading) {
    return <p className="text-center mt-20 text-lg">Loading product...</p>;
  }

  if (!product) {
    return <p className="text-center mt-20 text-red-500">Product not found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-2xl mt-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Update Product
      </h2>

      <form onSubmit={handleUpdate} className="space-y-6">
        {/* Product Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            defaultValue={product.name}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Tagline */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Tagline</label>
          <input
            type="text"
            name="tagline"
            defaultValue={product.tagline}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            name="description"
            rows="5"
            defaultValue={product.description}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            defaultValue={product.image}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Category
          </label>
          <input
            type="text"
            name="category"
            defaultValue={product.category}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Tags (comma separated)
          </label>
          <input
            type="text"
            name="tags"
            defaultValue={product.tags?.join(", ")}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Website */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Website
          </label>
          <input
            type="url"
            name="website"
            defaultValue={product.website}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* GitHub */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">GitHub</label>
          <input
            type="url"
            name="github"
            defaultValue={product.github}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UpdateProducts;
