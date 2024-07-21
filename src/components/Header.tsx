import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";

// types
import { HeaderProps } from "../utils/types";

const HeaderContainer = styled.header`
  width: 100vw;
  padding: 2rem;
  background-color: ${(props) => props.theme.bg};
  color: ${(props) => props.theme.text};
  box-shadow: ${(props) => props.theme.shadow};
`;

const Nav = styled.nav`
  width: 100vw;
  position: relative;
  display: flex;
  justify-content: space-around;
  padding: 0 4rem;
  gap: 2rem;
`;

const NavItem = styled(Link)<{ isActive: boolean }>`
  position: relative;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: ${(props) => (props.isActive ? "bold" : "normal")};
  color: ${(props) => props.theme.text};
  text-align: center;

  &:hover {
    font-weight: bold;
  }
`;

const Selected = styled(motion.div)`
  position: absolute;
  bottom: -1.5rem;
  background-color: ${(props) => props.theme.primary};
`;

// const ThemeToggleButton = styled.button`
//   border: none;
//   cursor: pointer;
// `;

const Header: React.FC<HeaderProps> = ({ toggleTheme }) => {
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState(location.pathname);

  return (
    <HeaderContainer>
      <Nav>
        <NavItem
          to="/"
          isActive={location.pathname === "/"}
          onClick={() => setSelectedTab("/")}
        >
          Home
        </NavItem>
        <NavItem
          to="/coming-soon"
          isActive={location.pathname === "/coming-soon"}
          onClick={() => setSelectedTab("/coming-soon")}
        >
          Coming Soon
        </NavItem>
        <NavItem
          to="/now-playing"
          isActive={location.pathname === "/now-playing"}
          onClick={() => setSelectedTab("/now-playing")}
        >
          Now Playing
        </NavItem>
        <Selected
          layoutId="selectedMenu"
          initial={false}
          animate={{
            left:
              selectedTab === "/"
                ? "17vw"
                : selectedTab === "/coming-soon"
                ? "46vw"
                : "77vw",
            width: "15px",
            height: "15px",
            borderRadius: "50%",
          }}
        />
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
