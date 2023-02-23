import { useState, useEffect } from "react";
import CarouselProducts from "./carousels/products/CarouselProducts";
import CarouselBanner from "./carousels/banner/CarouselBanner";
import "./Home.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { newGoogleUser } from "../../../redux/thunks/userThunk";

// const CarrouselImg = styled.img`
//   width: 100%;
//   height: 500px;
//   opacity: 0;
//   transition: 0.5s;
//   &.loaded {
//     opacity: 1;
//   }
// `;

const Home = () => {
  const images = ["baner1.jpg", "baner2.jpg", "baner0.jpg"];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedImages, setSelectedImages] = useState(images[0]);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const { user } = useAuth0();
  const { userLocal } = useSelector((state) => state.user);

  function verifyAuth() {
    if (user) {
      if (!userLocal.email) {
        const newUserAuth = {
          name: user.given_name,
          lastName: user.family_name,
          image: user.picture,
          email: user.email,
        };
        dispatch(newGoogleUser(newUserAuth));
      }
    }
  }

  const selectNewImage = (index, images, next = true) => {
    setLoaded(false);
    setTimeout(() => {
      const condition = next
        ? selectedIndex < images.length - 1
        : selectedIndex > 0;
      const nextIndex = next
        ? condition
          ? selectedIndex + 1
          : 0
        : condition
        ? selectedIndex - 1
        : images.length - 1;
      setSelectedImages(images[nextIndex]);
      setSelectedIndex(nextIndex);
    }, 500);
  };

  useEffect(() => {
    verifyAuth();
    const reloj = setInterval(() => {
      selectNewImage(selectedIndex, images);
    }, 3000);
    return () => clearInterval(reloj);
  });

  return (
    <div className="home">
      <div className="carousel-banner">
        <CarouselBanner />
      </div>
      <hr />
      <br />
      <h1 className="text-center">Recomendados</h1>
      <div class="container-fluid carousel-productos">
        <CarouselProducts />
      </div>
      <hr />
      <div className="text-center">
        <h1>¿Quieres ver mas productos?</h1>
        <a href="/products">
          <button className="btn btn-secondary">Click aquí</button>
          <hr />
        </a>
      </div>
    </div>
  );
};

export default Home;
