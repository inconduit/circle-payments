import styled from "styled-components";

export const PageLayout = styled.div`
  padding: 1rem 2rem;
`;

export const RoundedBorderContainer = styled.div`
  border: 1px solid #bbb;
  border-radius: 0.4rem;
  position: relative;
  margin: 3rem;
  padding: 2rem 1rem 0 1rem;

  h5 {
    position: absolute;
    left: 0.5rem;
    top: -2.2rem;
    background: white;
    padding: 0.3rem;
  }
`;

export const FiltersRow = styled.div`
  text-align: center;
  display: flex;

  > div {
    flex: 1;
    margin-bottom: 1.2rem;

    &:nth-child(2) {
      margin: 0 0.5rem;
    }
  }
`;

export const PaymentsListContainer = styled.div`
  padding: 2rem 2rem;
  border: 1px solid #bbb;
  border-radius: 0.4rem;
`;
