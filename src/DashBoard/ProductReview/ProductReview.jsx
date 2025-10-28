import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import useAuth from "../../Hook/useAuth";

const ProductReview = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [products, setProducts] = useState([]);

  // Fetch all products for review
  useEffect(() => {
    axiosSecure
      .get("/products")
      .then((res) => {
        // Sort products: Pending first, then Accepted, then Rejected
        const sorted = res.data.sort((a, b) => {
          const order = { pending: 1, accepted: 2, rejected: 3 };
          return (order[a.status?.toLowerCase()] || 4) - (order[b.status?.toLowerCase()] || 4);
        });
        setProducts(sorted);
      })
      .catch((err) => console.error("Error loading products:", err));
  }, [axiosSecure]);

  // Handle Accept Product
  const handleAccept = async (id) => {
    try {
      const res = await axiosSecure.patch(`/products/${id}/status`, { status: "accepted" });
      if (res.data.modifiedCount > 0) {
        Swal.fire("Approved!", "Product has been accepted.", "success");
        setProducts((prev) =>
          prev.map((p) => (p._id === id ? { ...p, status: "accepted" } : p))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Handle Reject Product
  const handleReject = async (id) => {
    try {
      const res = await axiosSecure.patch(`/products/${id}/status`, { status: "rejected" });
      if (res.data.modifiedCount > 0) {
        Swal.fire("Rejected!", "Product has been rejected.", "error");
        setProducts((prev) =>
          prev.map((p) => (p._id === id ? { ...p, status: "rejected" } : p))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Handle Make Featured
  const handleMakeFeatured = async (id) => {
    try {
      const res = await axiosSecure.patch(`/products/${id}/featured`, { featured: true });
      if (res.data.modifiedCount > 0) {
        Swal.fire("Featured!", "Product marked as featured.", "success");
        setProducts((prev) =>
          prev.map((p) => (p._id === id ? { ...p, featured: true } : p))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        Product Review Queue
      </h2>

      <div className="overflow-x-auto shadow-xl rounded-xl bg-base-100 border border-gray-200">
        <table className="table w-full text-sm">
          <thead className="bg-blue-600 text-white text-base">
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Status</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={product._id}
                className="hover:bg-gray-50 transition duration-200"
              >
                <td>{index + 1}</td>
                <td className="font-medium">{product.name}</td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      product.status === "accepted"
                        ? "bg-green-100 text-green-700"
                        : product.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {product.status || "pending"}
                  </span>
                </td>
                <td>
                  {product.featured ? (
                    <span className="text-green-600 font-semibold">Yes</span>
                  ) : (
                    <span className="text-gray-400">No</span>
                  )}
                </td>
                <td className="space-x-2">
                  <Link
                    to={`/products/${product._id}`}
                    className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600"
                  >
                    View Details
                  </Link>

                  <button
                    onClick={() => handleMakeFeatured(product._id)}
                    disabled={product.featured}
                    className="btn btn-sm bg-yellow-500 text-white hover:bg-yellow-600 disabled:bg-gray-300"
                  >
                    {product.featured ? "Featured" : "Make Featured"}
                  </button>

                  <button
                    onClick={() => handleAccept(product._id)}
                    disabled={product.status === "accepted"}
                    className="btn btn-sm bg-green-500 text-white hover:bg-green-600 disabled:bg-gray-300"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => handleReject(product._id)}
                    disabled={product.status === "rejected"}
                    className="btn btn-sm bg-red-500 text-white hover:bg-red-600 disabled:bg-gray-300"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductReview;
