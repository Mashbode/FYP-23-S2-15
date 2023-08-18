import styled from "styled-components";
import PriceCard from "./PriceCard";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 480px) {
    flex-direction: column;
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

const RightTitle = styled.h1`
  width: 80%;
  text-align: right;
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

const RightDesc = styled.p`
  width: 80%;
  font-size: 20px;
  margin-top: 20px;
  text-align: right;
  @media only screen and (max-width: 480px) {
    width: 100%;
  }
`;

const Saftey = () => {
  return (
    <Container id="saftey">
      {/* <PriceCard price="10" type="Basic" />
      <PriceCard price="20" type="Premium" />
      <PriceCard price="30" type="Advanced" /> */}
      <Title>Enhanced Security</Title>
      <Desc>
      Our product ensures a higher level of security compared to traditional encryption methods used by big companies by incorporating Shamir's Secret Sharing, Reed solomon error correction, compression and encryption. 
      The secret key is split into shares and stored across multiple databases, 
      making it difficult for unauthorised individuals to access the shared files. 
      This distributed security approach offers robust protection against data breaches, unauthorised access and data loss.
      </Desc>
      <br/>
      <br/>
      <RightTitle>Privacy and Confidentiality</RightTitle>
      <RightDesc>
      The combination of Shamir's Secret Sharing and a distributed file storage ensures privacy and confidentiality. 
      The secret key shares and file data are stored on multiple databases, providing an extra layer of protection. 
      This separation enhances the privacy of sensitive data and prevents unauthorised access to both the shares and the files, safeguarding user confidentiality.
      </RightDesc>
    </Container>
  );
};

export default Saftey;
