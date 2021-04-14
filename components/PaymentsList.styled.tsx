import styled from "styled-components";

export const PaymentListContainer = styled.div`
  padding: 0;
`;

export const PaymentRow = styled.div<{ isHeader?: boolean }>`
  display: flex;
  font-weight: ${({ isHeader }) => (isHeader ? "bold" : "normal")};
  margin-bottom: ${({ isHeader }) => (isHeader ? "1rem" : "0")};
  width: 100%;
`;

export const PaymentCol = styled.div<{ flex?: string }>`
  flex: ${({ flex }) => flex || 1};
`;
