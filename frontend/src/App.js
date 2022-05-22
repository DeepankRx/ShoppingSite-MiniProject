
import NavigationBar from "./Components/NavigationBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddProduct from "./Components/AddProduct";
function App() {
  return (
    <Router>
    <div className="App">
    <NavigationBar />
    <Routes>
      <Route path="/add-product" element={<AddProduct />} />
    </Routes>
    </div>
    </Router>
  );
}

export default App;
