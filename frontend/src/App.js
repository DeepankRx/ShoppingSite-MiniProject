import NavigationBar from "./Components/NavigationBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddProduct from "./Components/AddProduct";
import Home from "./Components/Home";
function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <Routes>
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/" element={<Home />} />
          <Route path="/product/:productId" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
