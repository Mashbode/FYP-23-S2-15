import styled from "styled-components";
import logo from "../../img/logo2_capture-removebg.png";
import { Link as LinkScroll } from "react-scroll";
import { useState } from "react";
import { Link } from "react-router-dom";

const Container = styled.div.attrs((props) => ({ className: props.className }))`
  &.changeBackground {
    background-color: rgba(207, 194, 232, 0.7);   // 207, 194, 232, 1
  }

  position: fixed;
  height: 70px;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  transition: 0.3s ease-in;
  overflow: hidden;
`;

const Wrapper = styled.div`
  padding: 5px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  width: 50%;
  display: flex; // Logo & Menu horizontally
  align-items: center;
  justify-content: space-between;
`;

const Right = styled.div`
  width: 12%;
  display: flex; // Logo & Menu horizontally
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.img`
  width: 25%;
  height: 25%;
  padding-top: 5px;
`;

const Menu = styled.ul`
  display: flex;
  list-style: none;

  // 480px - Small screen
  @media only screen and (max-width: 480px) {
    display: none;
  }
`;

// const MenuItem = styled.li`
//   margin-right: 30px;
//   font-size: 20px;
//   font-weight: bold;
//   color: gray;
// `;
const MenuItem = styled.a`
  margin-right: 30px;
  font-size: 20px;
  font-weight: bold;
  color: gray;

  &:hover {
    /* padding-bottom: 12px; */
    border-bottom: 3px solid #5e35b1;
    cursor: pointer;
  }
`;

const Button = styled.button`
  border: 2px solid white;
  padding: 10px 15px;
  background-color: #5e35b1;
  color: white;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
`;

const Navbar = () => {
  // Change nav bar color when scrolling
  const [navColor, setNavColor] = useState(false);
  const changeNavColor = () => {
    // Y is vertical axis >= Navbar size 50px
    if (window.scrollY >= 50) {
      setNavColor(true);
    } else {
      setNavColor(false);
    }
  };

  // Adding event listener
  window.addEventListener("scroll", changeNavColor);

  return (
    // <Container>
    <Container className={navColor ? "changeBackground" : ""}>
      <Wrapper>
        <Left>
          <Logo src={logo} alt="Logo" />
          <Menu>
            <MenuItem>
              <LinkScroll
                to="intro"
                spy={true}
                smooth={true}
                // offset={0}
                duration={500}
                // onClick={closeMenu}
              >
                Intro
              </LinkScroll>
            </MenuItem>
            <MenuItem>
              <LinkScroll
                to="product" // Give same id to Feature component
                spy={true}
                smooth={true}
                offset={-60} // Due to Navbar size
                duration={500}
                // onClick={closeMenu}
              >
                Product
              </LinkScroll>
            </MenuItem>
            <MenuItem>
              <LinkScroll
                to="team"
                spy={true}
                smooth={true}
                offset={-60}
                duration={500}
                // onClick={closeMenu}
              >
                Team
              </LinkScroll>
            </MenuItem>
            <MenuItem>
              <LinkScroll
                to="saftey"
                spy={true}
                smooth={true}
                offset={-60}
                duration={500}
                // onClick={closeMenu}
              >
                Safety
              </LinkScroll>
            </MenuItem>
            <MenuItem>
              <LinkScroll
                to="contact"
                spy={true}
                smooth={true}
                // offset={-60}
                duration={500}
                // onClick={closeMenu}
              >
                Contact
              </LinkScroll>
            </MenuItem>
          </Menu>
        </Left>
        <Right>
          <Link to="/login">
            <Button>LOGIN</Button>
          </Link>
          <Link to="/register">
            <Button>JOIN TODAY</Button>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
