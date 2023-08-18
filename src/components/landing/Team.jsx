import styled from "styled-components";
import TeamImg from "../../img/dev_team-removebg.png";
import How from "../../img/how.png";
import MiniCard from "./MiniCard";
import Play from "../../img/play.png";

import { useState } from "react";

// const Container = styled.div`
//   display: flex;
//   height: 100%;
//   @media only screen and (max-width: 480px) {
//     flex-direction: column;
//   }
// `;

// const Left = styled.div`
//   width: 50%;
//   position: relative;
//   @media only screen and (max-width: 480px) {
//     display: none; // This will also remove the video
//   }
// `;

// const Image = styled.img`
//   /* display: flex; */
//   // Turn on video when open state is false
//   display: ${(props) => props.open && "none"};
//   height: 100%;
//   /* margin-left: 100px; */
// `;

// const Video = styled.video`
//   // Turn on video when open state is true
//   display: ${(props) => !props.open && "none"};
//   height: 300px;
//   position: absolute; // Parent should be relative
//   top: 0;
//   bottom: 0;
//   /* left: 0; */
//   right: 0;
//   margin: auto;
//   @media only screen and (max-width: 480px) {
//     width: 100%;
//   }
// `;

// const Right = styled.div`
//   width: 50%;
//   @media only screen and (max-width: 480px) {
//     width: 100%;
//   }
// `;

// const Wrapper = styled.div`
//   padding: 50px;
//   display: flex;
//   flex-direction: column;
//   @media only screen and (max-width: 480px) {
//     padding: 20px; // It was orignially 50px
//     // Still above the size because of the MiniCard.jsx -> turn the width of this to 50px + font-size to 14px
//   }
// `;

// const Title = styled.h1``;

// const Desc = styled.p`
//   font-size: 20px;
//   margin-top: 20px;
//   color: #555;
// `;

// const CardContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   margin-top: 50px;
// `;

// const Button = styled.button`
//   width: 180px;
//   border: none;
//   border-radius: 10px;
//   background-color: darkblue;
//   color: white;
//   font-size: 20px;
//   padding: 15px;
//   margin-top: 50px;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
// `;

// const Icon = styled.img`
//   width: 20px;
//   margin-right: 10px;
// `;

// const Modal = styled.div`
//   width: 100vw;
//   height: 100vh;
//   position: absolute;
//   top: 0;
//   left: 0;
//   // black (0, 0, 0) 0.5 is opacity
//   background-color: rgba(0, 0, 0, 0.5);
// `;

// const CloseButton = styled.button`
//   position: absolute;
//   background-color: white;
//   padding: 5px;
//   border: none;
//   border-radius: 5px;
//   right: 5px;
//   top: 33%;
// `;

const Container = styled.div`
  height: calc(100vh - 60px); // 50px is the size of Navbar
  display: flex;
  height: 60%;

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
  margin-top: 10%;
  @media only screen and (max-width: 480px) {
    width: 100%;
    font-size: 50px;
  }
  font-size: 50px;
`;

const Desc = styled.p`
  width: 130%;
  margin-left: 50%;
  font-size: 20px;
  margin-top: 20px;
  @media only screen and (max-width: 480px) {
    width: 100%;
  }
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
  top: 80%;
  right: 7%;
`;

const Info = styled.div`
  width: 80%;
  margin-top: 10px;
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
  display: flex;

  @media only screen and (max-width: 480px) {
    margin-bottom: 20px;
  }
`;

const Team = () => {
  // To toggle between how.png and the video
  const [open, setOpen] = useState(false);

  const smallScreen = window.screen.width <= 480 ? true : false;

  return (
    <Container id="team">
      <Left>
        {/* <Image open={open} src={How} /> */}
        {/* <Video
          open={open}
          autoPlay
          loop
          controls
          src="https://player.vimeo.com/external/449759244.sd.mp4?s=d5f3da46ddc17aa69a7de84f1e420610ebd2a391&profile_id=139&oauth2_token_id=57447761"
        /> */}
        <Title>Our Team</Title>
        <Desc>
        Introducing our exceptional developer team behind this groundbreaking project. 
        From skilled engineers to visionary designers, 
        our diverse and dedicated team members collaborate seamlessly to bring this innovative website to life. 
        To explore more about the individuals who are shaping the future of secure file sharing, 
        delve into the detailed profiles on our Wix website.
        </Desc>
        <br/>
        <Info>
          <a href="https://fyp23s215.wixsite.com/fyp-23-s2-15" target="_blank" rel="wix">
            <Button>Go to Wix &gt;</Button>
          </a>
        </Info>
      </Left>
      <Right>
        <Image src={TeamImg} />
        {/* <Wrapper>
          <CardContainer>
            <MiniCard />
            <MiniCard />
            <MiniCard />
          </CardContainer>
          <Button onClick={() => setOpen(true)}>
            <Icon src={Play} />
            How it works
          </Button>
        </Wrapper> */}
      </Right>
      {/* {smallScreen && open && (
        <Modal>
          <Video
            open={open}
            autoPlay
            loop
            controls
            src="https://player.vimeo.com/external/449759244.sd.mp4?s=d5f3da46ddc17aa69a7de84f1e420610ebd2a391&profile_id=139&oauth2_token_id=57447761"
          />
          <CloseButton onClick={() => setOpen(false)}>Close</CloseButton>
        </Modal>
      )} */}
    </Container>
  );
};

export default Team;
