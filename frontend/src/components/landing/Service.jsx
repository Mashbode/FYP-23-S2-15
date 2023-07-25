import styled from "styled-components";
import How from "../../img/how.png";
import MiniCard from "./MiniCard";
import Play from "../../img/play.png";
import { useState } from "react";

const Container = styled.div`
  display: flex;
  height: 100%;
  @media only screen and (max-width: 480px) {
    flex-direction: column;
  }
`;

const Left = styled.div`
  width: 50%;
  position: relative;
  @media only screen and (max-width: 480px) {
    display: none; // This will also remove the video
  }
`;

const Image = styled.img`
  /* display: flex; */
  // Turn on video when open state is false
  display: ${(props) => props.open && "none"};
  height: 100%;
  /* margin-left: 100px; */
`;

const Video = styled.video`
  // Turn on video when open state is true
  display: ${(props) => !props.open && "none"};
  height: 300px;
  position: absolute; // Parent should be relative
  top: 0;
  bottom: 0;
  /* left: 0; */
  right: 0;
  margin: auto;
  @media only screen and (max-width: 480px) {
    width: 100%;
  }
`;

const Right = styled.div`
  width: 50%;
  @media only screen and (max-width: 480px) {
    width: 100%;
  }
`;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 480px) {
    padding: 20px; // It was orignially 50px
    // Still above the size because of the MiniCard.jsx -> turn the width of this to 50px + font-size to 14px
  }
`;

const Title = styled.h1``;

const Desc = styled.p`
  font-size: 20px;
  margin-top: 20px;
  color: #555;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
`;

const Button = styled.button`
  width: 180px;
  border: none;
  border-radius: 10px;
  background-color: darkblue;
  color: white;
  font-size: 20px;
  padding: 15px;
  margin-top: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const Icon = styled.img`
  width: 20px;
  margin-right: 10px;
`;

const Modal = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  // black (0, 0, 0) 0.5 is opacity
  background-color: rgba(0, 0, 0, 0.5);
`;

const CloseButton = styled.button`
  position: absolute;
  background-color: white;
  padding: 5px;
  border: none;
  border-radius: 5px;
  right: 5px;
  top: 33%;
`;

const Service = () => {
  // To toggle between how.png and the video
  const [open, setOpen] = useState(false);

  const smallScreen = window.screen.width <= 480 ? true : false;

  return (
    <Container id="service">
      <Left>
        <Image open={open} src={How} />
        <Video
          open={open}
          autoPlay
          loop
          controls
          src="https://player.vimeo.com/external/449759244.sd.mp4?s=d5f3da46ddc17aa69a7de84f1e420610ebd2a391&profile_id=139&oauth2_token_id=57447761"
        />
      </Left>
      <Right>
        <Wrapper>
          <Title>Simple process to start</Title>
          <Desc>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
            vero molestias nam itaque veritatis ab culpa eos nemo asperiores.
            Dolorum inventore vel aperiam ducimus tempore, ut dolores eligendi
            dignissimos sequi. ut dolores eligendi dignissimos sequi.
          </Desc>
          <CardContainer>
            <MiniCard />
            <MiniCard />
            <MiniCard />
          </CardContainer>
          <Button onClick={() => setOpen(true)}>
            <Icon src={Play} />
            How it works
          </Button>
        </Wrapper>
      </Right>
      {smallScreen && open && (
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
      )}
    </Container>
  );
};

export default Service;
