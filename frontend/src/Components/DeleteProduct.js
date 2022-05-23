import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
function DeleteProduct() {
  const [products, setProducts] = useState([]);
    const params = useParams()  
    useEffect(() => {   
        axios.delete(`http://localhost:5000/api/admin/delete-product/${params.productId}`)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

  return (
    // product deleted successfully
    <div className="container">
        Product deleted successfully
    </div>

  );
}
export default DeleteProduct;
