import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import {useState,useEffect} from 'react';
import axios from "axios";
function Slider() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
      axios
        .get("http://localhost:5000/api/shop/all-products", {
          //have to put withCredentials:true to get cookies from client
          //have to put it in every axios request
          withCredentials: true,
        })
        .then((response) => {
          console.log(response.data);
          setProducts(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
  return (
    <Carousel
      infiniteLoop={true}
      autoPlay={true}
      interval={3000}
      showArrows={false}
    >
        {products.map((product,i=0) => (

      <div>
        <img src={"https://source.unsplash.com/random/1000x500?sig="+product.price} />
        <p className="legend">{product.title}</p>
      </div>)
      )}
    
    </Carousel>
  );
}
export default Slider;
