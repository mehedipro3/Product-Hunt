import { useEffect, useState } from "react";

import SectionTitle from "../../SectionTitle/SectionTitle";
import Card from "../Cards/Card";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {
        // Sort by vote count (descending) & take top 6
        const sorted = data.sort((a, b) => b.votes - a.votes).slice(0, 6);
        setProducts(sorted);
      });
  }, []);

  return (
    <div>
      <SectionTitle
        heading={"Trending Products"}
        subHeading={
          "Discover the top-voted innovations that creators and users love right now."
        }
      />

      <div className="py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.name}
            className="transition-transform duration-300 transform hover:scale-105 hover:shadow-lg rounded-xl"
          >
            <Card card={product} />
          </div>
        ))}
      </div>

      <div className="text-center py-3">
        <Link
          to={"/products"}
          className="btn bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold transition-shadow shadow-md hover:shadow-lg"
        >
          Show All Products
        </Link>
      </div>
    </div>
  );
};

export default Products;
