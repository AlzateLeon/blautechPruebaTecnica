import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);
  

  return (
    <div>
      <h1>Productos</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.nombre} - ${product.precio}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
