import { styled } from "styled-components";
import Dashboard from "../../img/dashboard.png";
import Share from "../../img/share.png";
import App from "../../img/app.png";
import AnimatedShapes from "./AnimatedShapes";

// const Container = styled.div`
//   display: flex;
//   @media only screen and (max-width: 480px) {
//     flex-direction: column;
//     padding: 30px 20px;
//   }
// `;

// const TopLeft = styled.div`
//   width: 40%;
//   @media only screen and (max-width: 480px) {
//     display: none;
//   }
// `;

// const Image = styled.img`
//   width: 100%;
//   position: relative;
//   top: 10%;
//   left: 7%;
//   font-size: 18px;
//   border-radius: 10px;  
//   box-shadow: 10px 5px 10px 10px rgba(0, 0, 0, 0.3);
// `;

// const TopRight = styled.div`
//   width: 60%;
//   position: relative;
//   margin-top: 4%;
//   left: 10%;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   @media only screen and (max-width: 480px) {
//     width: 100%; // It was just 50%
//   }
// `;

// const BottomLeft = styled.div`
//   width: 60%;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   @media only screen and (max-width: 480px) {
//     width: 100%;
//     height: 100%;
//   }
// `;

// const BottomRight = styled.div`
//   width: 40%;
//   @media only screen and (max-width: 480px) {
//     display: none;
//   }
//   position: relative;
// `;

const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  @media only screen and (max-width: 480px) {
    flex-direction: column;
    padding: 30px 20px;
  }
`;

const TopLeft = styled.div`
  width: 80%;
  @media only screen and (max-width: 480px) {
    display: none;
  }
`;

const Image = styled.img`
  width: 100%;
  position: relative;
  top: 10%;
  left: 7%;
  font-size: 18px;
  border-radius: 10px;  
  box-shadow: 10px 5px 10px 10px rgba(0, 0, 0, 0.3);
`;

const TopRight = styled.div`
  width: 100%;
  position: relative;
  margin-top: 4%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media only screen and (max-width: 480px) {
    width: 100%; // It was just 50%
  }
`;

const BottomLeft = styled.div`
  width: 100%;
  margin-top: 10%;
  margin-left: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: right;
  justify-content: center;
  @media only screen and (max-width: 480px) {
    width: 100%;
    height: 100%;
  }
`;

const BottomRight = styled.div`
  width: 80%;
  left: 10%;
  @media only screen and (max-width: 480px) {
    display: none;
  }
  position: relative;
`;

const Title = styled.h4`
  font-size: 50px;
  @media only screen and (max-width: 480px) {
    font-size: 50px;
  }
`;

const RightTitle = styled.h1`
  width: 80%;
  text-align: right;
  @media only screen and (max-width: 480px) {
    width: 100%;
    font-size: 50px;
  }
  font-size: 50px;
`;

const SubTitle = styled.span`
  font-size: 24px;
  font-style: italic;
  color: #333;
  margin-top: 30px;
`;

const Desc = styled.p`
  width: 80%;
  font-size: 20px;
  margin-top: 20px;
  @media only screen and (max-width: 480px) {
    width: 100%;
  }
`;

const Button = styled.button`
  width: 150px;
  border: none;
  padding: 15px 20px;
  background-color: darkblue;
  color: white;
  font-size: 20px;
  border-radius: 20px;
  margin-top: 20px;
  cursor: pointer;
`;

const Product = () => {
  return (
    <Container id="product">
      <TopLeft>
        <Image src={Dashboard} />
      </TopLeft>
      <TopRight>
        <Title>
          Dashboard
        </Title>
        <Desc>
        Experience the convenience of our website's dashboard, granting users the power to effortlessly manage their file server with just a glance. 
        Seamlessly monitor the total user count, stored files, shared files, and available storage capacity, putting comprehensive control and oversight at your fingertips.
        </Desc>
        {/* <Button>Learn More</Button> */}
        {/* <AnimatedShapes /> */}
      </TopRight>
      <BottomLeft>
        <RightTitle>
          Secure Sharing
        </RightTitle>
        <Desc>
        Gain a distinct advantage as you effortlessly share files with an extra layer of security. 
        Just typing the email address of a user registered on our advanced file system website, 
        you can ensure the confidentiality of your shared content.
        </Desc>
      </BottomLeft>
      <BottomRight>
        <Image src={Share} />
      </BottomRight>
    </Container>
  );
};

export default Product;
