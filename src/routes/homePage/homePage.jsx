import { useContext } from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";
import { AuthContext } from "../../context/AuthContext";
import Footer from "../../components/Footer/Footer";
import Features from "../../components/Features/Features";
import FeaturedProperties from "../../components/FeaturedProperties/FeaturedProperties";
import Contact from "../../components/Contact/Contact";

function HomePage() {

  const {currentUser} = useContext(AuthContext)

  return (
   <div>
     <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Search Homes & Turn Your Dream into Reality</h1>
          <p>
          Discover the perfect property in your favorite location cum eius, iure est nulla animi consequatur
            facilis id pariatur fugit quos laudantium temporibus dolor ea
            repellat provident impedit!
          </p>
          <SearchBar />
          <div className="boxes">
            <div className="box">
              <h1>16+</h1>
              <h2>Years of Experience</h2>
            </div>
            <div className="box">
              <h1>200</h1>
              <h2>Award Gained</h2>
            </div>
            <div className="box">
              <h1>2000+</h1>
              <h2>Property Ready</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg-1.png" alt="" />
      </div>

     
    </div>

<div className="mt_44px"> 

  <FeaturedProperties/>
<Features/>
<Contact/>
<Footer/>
</div>
   </div>
  );
}

export default HomePage;
