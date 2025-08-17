import Cards from "../Cards/Cards";
import FunFacts from "../FunFacts/FunFacts";
import Products from "../Products/Products";
import Banner from "./Carousel/Banner";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Cards></Cards>
      <FunFacts></FunFacts>
      <Products></Products>
    </div>
  );
};

export default Home;