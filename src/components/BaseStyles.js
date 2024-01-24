import styled, { keyframes } from "styled-components";

export const Flex = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction || "row"};
  justify-content: ${(props) => props.justify || "flex-start"};
  align-items: ${(props) => props.align || "flex-start"};
  flex-wrap: ${(props) => props.wrap || "nowrap"};
  margin: ${(props) => props.margin || "0"};
  padding: ${(props) => props.padding || "0"};
  width: ${(props) => props.width || "auto"};
`;

export const Box = styled.div`
  position: ${(props) => props.position || "auto"};
  margin: ${(props) => props.margin || "0"};
  padding: ${(props) => props.padding || "0"};
  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "auto"};
  flex: ${(props) => props.flex || "0 1 auto"};
  display: ${(props) => props.display || "block"};
  flex-direction: ${(props) => props.direction || "row"};
  justify-content: ${(props) => props.justify || "flex-start"};
  align-items: ${(props) => props.align || "flex-start"};
  flex-wrap: ${(props) => props.wrap || "nowrap"};
  order: ${(props) => props.order || "0"};
  align-self: ${(props) => props.alignSelf || "auto"};
  background-color: ${(props) => props.backgroundColor || "transparent"};
  border: ${(props) => props.border || "none"};
  border-radius: ${(props) => props.borderRadius || "0"};
  color: ${(props) => props.color || "white"};
  font-size: ${(props) => props.fontSize || "inherit"};
  font-weight: ${(props) => props.fontWeight || "normal"};
  z-index: ${(props) => props.zIndex || "auto"};
  max-width: ${(props) => props.maxWidth || "none"};
  top: ${(props) => props.top || "auto"};
`;

export const Title = styled.div`
  font-weight: bold;
  padding: 5px 5px;
  font-size: ${(props) => props.fontSize || "16px"};
`;

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  display: inline-block;
  animation: ${rotate360} 1s ease infinite;
  transform: translateZ(0);

  border-top: 2px solid white;
  border-right: 2px solid white;
  border-bottom: 2px solid white;
  border-left: 2px solid rgba(44, 44, 44, 0.9);
  background: transparent;

  width: ${(props) => props.size || "20px"};
  height: ${(props) => props.size || "20px"};
  border-radius: 50%;
`;
