import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import useAuth from "../../Hook/useAuth";

const MyProducts = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [products, setProducts] = useState([]);

  // Fetch products posted by the current user
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/products/user/${user.email}`)
        .then((res) => setProducts(res.data))
        .catch((err) => console.error(err));
    }
  }, [user, axiosSecure]);

  // Handle Delete Product
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This product will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/products/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Your product has been removed.", "success");
            setProducts(products.filter((p) => p._id !== id));
          }
        });
      }
    });
  };

  if (!user) {
    return (
      <div className="text-center py-10 text-lg text-gray-600">
        Please log in to view your products.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        MY PRODUCTS
      </h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products posted yet.</p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="w-full table-auto text-left border">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Votes</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4 font-semibold">{product.name}</td>
                  <td className="py-3 px-4">{product.votes || 0}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium 
                        ${
                          product.status === "Accepted"
                            ? "bg-green-100 text-green-800"
                            : product.status === "Rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                    >
                      {product.status || "Pending"}
                    </span>
                  </td>
                  <td className="py-3 px-4 space-x-2">
                    <Link
                      to={`/dashboard/update-product/${product._id}`}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyProducts;
