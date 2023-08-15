import styled, { css } from "styled-components";
// import css from "styled-components";
import Navbar from "../../components/landing/Navbar";
import Intro from "../../components/landing/Intro";
import Feature from "../../components/landing/Feature";
import Service from "../../components/landing/Service";
import Price from "../../components/landing/Price";
import Contact from "../../components/landing/Contact";
import Footer from "../../components/landing/Footer";

const Container = styled.div`
  height: 100vh;
  overflow: hidden; // Prevent Woman image to overflow
  position: relative; // Otherwise, FeatureShape will be at the top
`;

const Shape = css`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1; // https://www.w3schools.com/cssref/pr_pos_z-index.php
`;

// IntroShape
const IntoShape = styled.div`
  ${Shape}
  clip-path: polygon(67% 0, 100% 0%, 100% 100%, 55% 100%);
  background-color: crimson;
`;

const FeatureShape = styled.div`
  ${Shape}
  //                   (1)                         (2)
  /* clip-path: polygon(67% 0, 100% 0%, 100% 100%, 55% 100%); */
  //                      (2)     100%-(1)
  clip-path: polygon(0 0, 55% 0%, 33% 100%, 0 100%);
  background-color: pink;
`;

const ServiceShape = styled.div`
  ${Shape}
  clip-path: polygon(0 0, 33% 0%, 33% 100%, 0 100%);
  background-color: #ff4ca5;
`;

const PriceShape = styled.div`
  ${Shape}
  clip-path: polygon(33% 0, 100% 0%, 100% 100%, 67% 100%);
  background-color: crimson;
`;

const App = () => {
  // Also able to implement this using useState w/ useEffect
  const smallScreen = window.screen.width <= 480 ? true : false;
  return (
    <>
      <Container>
        <Navbar />
        <Intro />
        <IntoShape />
      </Container>
      <Container>
        <Feature />
        <FeatureShape />
      </Container>
      <Container>
        <Service />
        {/* Show this animation only when it is not a small screen */}
        {!smallScreen && <ServiceShape />}
      </Container>
      <Container>
        <Price />
        <PriceShape />
      </Container>
      <Container>
        <Contact />
        <Footer />
      </Container>
    </>
  );
  // return <div className="container">Hello World!</div>;
};

export default App;
