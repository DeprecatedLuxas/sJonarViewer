import styled from "styled-components";

type MessageProps = {
  width?: string;
  height?: string;
  color?: string;
  backgroundColor?: string;
  border?: string;
};

export const Message = styled.div<MessageProps>`
  display: block;
  width: ${(props) => props.width || "80%"};
  height: ${(props) => props.height || "auto"};
  color: ${(props) => props.backgroundColor || "#721c24"};
  background-color: ${(props) => props.backgroundColor || "#f8d7da"};
  text-align: center;
  margin: 5px auto 10px auto;
  position: relative;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: ${(props) => props.border || "1px solid  #f5c6cb"};
  border-radius: 0.25rem;
`;
