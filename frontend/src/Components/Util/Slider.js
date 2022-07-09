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
      showThumbs={false}
      
    >
        {products.map((product,i=0) => (

      <div key={i++}>
        <img src={"https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2020&q=80"} 
          style={{width: "100%", height: "600px"}}
        />
        <p className="legend">{product.title}</p>
      </div>)
      )}
    
    </Carousel>
  );
}
export default Slider;
