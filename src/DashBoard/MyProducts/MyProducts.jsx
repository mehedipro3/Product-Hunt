import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import useAuth from "../../Hook/useAuth";
import { CheckCircle, XCircle, Clock } from "lucide-react";

const MyProducts = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products by logged-in user
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/products/user/${user.email}`)
        .then((res) => setProducts(res.data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [user, axiosSecure]);

  // Delete product handler
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you can’t recover this product.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it",
      background: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/products/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Product removed successfully.", "success");
            setProducts((prev) => prev.filter((p) => p._id !== id));
          }
        });
      }
    });
  };

  if (!user) {
    return (
      <div className="text-center py-20 text-lg text-gray-600">
        Please <Link to="/login" className="text-blue-600 font-semibold">log in</Link> to manage your products.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg text-gray-500 animate-pulse">Loading your products...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-4xl font-bold text-blue-600 text-center mb-10">
        My Products Dashboard
      </h2>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-20">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/empty-folder-illustration-download-in-svg-png-gif-file-formats--no-data-storage-box-lack-of-content-pack-files-folders-illustrations-5252783.png"
            alt="No Data"
            className="w-56 mb-6"
          />
          <p className="text-gray-500 text-lg mb-4">You haven’t posted any products yet.</p>
          <Link
            to="/add-product"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg transition"
          >
            Post Your First Product
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border-gray-200">
          <table className="w-full table-auto border-collapse text-left">
            <thead className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white uppercase text-sm tracking-wide">
              <tr>
                <th className="py-4 px-6">Product Name</th>
                <th className="py-4 px-6 text-center">Votes</th>
                <th className="py-4 px-6 text-center">Status</th>
                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {products.map((product, index) => (
                <tr
                  key={product._id}
                  className={`hover:bg-blue-50 transition ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="py-4 px-6 font-semibold">{product.name}</td>
                  <td className="py-4 px-6 text-center font-medium">
                    {product.votes || 0}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium
                        ${
                          product.status === "Accepted"
                            ? "bg-green-100 text-green-700"
                            : product.status === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {product.status === "Accepted" && <CheckCircle size={16} />}
                      {product.status === "Rejected" && <XCircle size={16} />}
                      {product.status !== "Accepted" &&
                        product.status !== "Rejected" && <Clock size={16} />}
                      {product.status || "Pending"}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center space-x-2">
                    <Link
                      to={`/dashboard/update-product/${product._id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition"
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
