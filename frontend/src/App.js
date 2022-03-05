import logo from './logo.svg';
import './App.css';
import data from './data' ;
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';

function App() {
  const openMenue =() =>{
    document.querySelector(".sidebar").classList.add("open");
} 

const  closeMenue =() =>{
    document.querySelector(".sidebar").classList.remove("open");
}

  return (
    <Router> 
    <div className="grid-container">
        <header className="header"> 
            
            <div className="brand">
                <button onClick={openMenue}>
                &#9776;
                </button>
                <Link to="/">Amazone</Link>
              
            </div>
            <div className="header-links">
                
                <a href="cart.html">Cart </a>
                <a href="signin.html">sign In </a>
            
            </div>
        </header>
      <aside className="sidebar">
          <h3>Shopping Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenue}>X</button>
          <ul>
              <li>  <a href="index.html">Pants</a></li>
              <li>  <a href="index.html">Shirts</a></li>
          </ul>

      </aside>
        <main className="main">
            <div className="content"> 
            <Routes>
            <Route path="/products/:id" element={<ProductScreen />}/>
            <Route path="/" exact={true} element={<HomeScreen />} />
            </Routes>
          
            </div>
        </main>
        <footer className="footer"> Allright reserved </footer>
    </div>
    </Router>
  );
}

export default App;
