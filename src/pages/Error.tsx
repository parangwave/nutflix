import styled from "styled-components";

const ErrorHeader = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: 700;
`;

export default function Error() {
  return <ErrorHeader>Error</ErrorHeader>;
}
