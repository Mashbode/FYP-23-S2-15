import styled from "styled-components";
import Files from "../../img/files.png";
import AnimatedShapes from "./AnimatedShapes";

import { Link } from "react-router-dom";

const Container = styled.div`
  height: calc(100vh - 60px); // 50px is the size of Navbar
  display: flex;
  padding: 20px;

  @media only screen and (max-width: 480px) {
    flex-direction: column;
  }
`;

const Left = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 480px) {
    width: 100%;
    height: 100%;
  }
`;

const Title = styled.h1`
  width: 80%;
  @media only screen and (max-width: 480px) {
    width: 100%;
    font-size: 50px;
  }
  font-size: 50px;
`;

const Desc = styled.p`
  width: 80%;
  font-size: 20px;
  margin-top: 20px;
  @media only screen and (max-width: 480px) {
    width: 100%;
  }
`;

const Info = styled.div`
  width: 80%;
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media only screen and (max-width: 480px) {
    width: 100%;
    flex-direction: column;
  }
`;

const Button = styled.button`
  padding: 15px;
  background-color: darkblue;
  color: white; // Text color
  border-radius: 10px;
  font-weight: bold;
  border: none;
  letter-spacing: 2px;
  cursor: pointer;

  @media only screen and (max-width: 480px) {
    margin-bottom: 20px;
  }
`;

const Contact = styled.div`
  display: flex;
  flex-direction: column;
`;

const Phone = styled.span`
  color: #f0667d;
  font-weight: bold;
`;

const ContactText = styled.span`
  color: gray;
  margin-top: 5px;
`;

const Right = styled.div`
  width: 40%;
  @media only screen and (max-width: 480px) {
    display: none;
  }
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  position: absolute;
  top: 32%;
  right: 7%;
  font-size: 18px;
  border-radius: 10px;  
  box-shadow: 10px 5px 10px 10px rgba(0, 0, 0, 0.3);
`;

const Intro = () => {
  return (
    <Container id="intro">
      <Left>
        <Title>Introducing Secure File Sharing</Title>
        <Desc>
        Welcome to our cutting-edge platform that specializes in secure file sharing.<br/>
        Your data's confidentiality is our priority, employing robust security measures to prevent unauthorized access. 
        Experience the future of secure sharing today.
        </Desc>
        <Info>
          <Link to="/register">
            <Button>START A PROJECT</Button>
          </Link>
          {/* <Contact>
            <Phone>Call Us (012) 345 - 6789</Phone>
            <ContactText>For any question or concern</ContactText>
          </Contact> */}
        </Info>
      </Left>
      <Right>
        <Image src={Files} />
      </Right>
      {/* Location of below does not matter */}
      {/* <AnimatedShapes /> */}
    </Container>
  );
};

export default Intro;
