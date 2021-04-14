import styled from "styled-components";

export const InputContainer = styled.div`
  position: relative;

  input {
    width: 100%;
    padding: 0.1rem 0.2rem;
  }
`;

export const InputLabel = styled.label`
  position: absolute;
  font-size: 0.7rem;
  top: -14px;
  text-transform: capitalize;
`;

export const ClearButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 2rem;
  height: 100%;
  top: 0;
  right: -0.2rem;
  font-size: 0.5rem;
  cursor: pointer;
`;
