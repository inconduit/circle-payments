import { StylesConfig } from "react-select";

const customSelectStyles: StylesConfig<any, any> = {
  control: (provided) => ({
    ...provided,
    background: "#fff",
    minHeight: "1.75rem",
    height: "1.75rem",
    boxShadow: "none",
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
  }),
};

// eslint-disable-next-line import/prefer-default-export
export { customSelectStyles };
