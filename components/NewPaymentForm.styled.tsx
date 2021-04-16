import styled from "styled-components";
import { StylesConfig } from "react-select";

export const InputRow = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 1.2rem;

  > * {
    flex: 1;
  }
`;

export const SubmitButton = styled.button`
  padding: 0.2rem 0.6rem;
  margin: 0.7rem 0;
`;

export const SubmitContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const SpinnerContainer = styled.div`
  display: inline-block;
  transform: scale(0.5, 0.5);
`;

export const customSelectStyles: StylesConfig<any, any> = {
  control: (provided) => ({
    ...provided,
    background: "#fff",
    minHeight: "1.75rem",
    height: "1.75rem",
    boxShadow: "none",
    fontFamily: "Arial",
  }),
  menu: (provided) => ({
    ...provided,
    marginTop: "0",
  }),
  menuList: (provided) => ({
    ...provided,
    paddingTop: "0",
  }),
  valueContainer: (provided) => ({
    ...provided,
    height: "1.75rem",
    padding: "0.5rem",
    fontSize: "0.9rem",
  }),
  input: (provided) => ({
    ...provided,
    margin: "0px",
    height: "1.75rem",
    position: "absolute",
    top: "3px",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: "1.75rem",
  }),
  option: (provided) => ({
    ...provided,
    fontSize: "0.9rem",
  }),
};
