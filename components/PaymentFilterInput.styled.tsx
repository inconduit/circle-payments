import styled from "styled-components";

export const InputContainer = styled.div`
  position: relative;

  input {
    width: 100%;
    padding: 0.3rem 0.4rem;
    font-size: 0.9rem;
    height: 1.75rem;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
`;

export const InputLabel = styled.label<{ isError?: boolean }>`
  position: absolute;
  color: ${({ isError }) => (isError ? "#cc0000" : "#092d8a")};
  font-size: 0.7rem;
  top: -16px;
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
