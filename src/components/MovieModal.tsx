import { useQuery } from "react-query";
import { motion } from "framer-motion";
import styled from "styled-components";
import { DefaultTheme } from "styled-components";
import { getMovie, makeImagePath } from "../utils/api";
import { MovieModalProps } from "../utils/types";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const Modal = styled(motion.div)`
  background: #fff;
  padding: 2rem;
  border-radius: 15px;
  width: 80%;

  img {
    display: block;
    margin: 0 auto;
    width: 70%;
  }
`;

const ModalContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h1 {
    font-size: 2rem;
    font-weight: 700;
    margin: 1rem 0;
  }

  p {
    line-height: 120%;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

const ModalContentLi = styled.li<{ tag?: keyof DefaultTheme["tags"] }>`
  font-weight: 600;

  & > span:first-child {
    background-color: ${(props) =>
      props.tag ? props.theme.tags[props.tag] : props.theme.bg};
    color: ${(props) => props.theme.bg};
    font-size: 1.2rem;
    letter-spacing: 0.5px;
    padding: 0.2rem 0.4rem;
    border-radius: 2rem;
    margin-right: 0.4rem;
  }
`;

export default function MovieModal({ id, onClose }: MovieModalProps) {
  const { data, error, isLoading } = useQuery(["movieDetail", id], () =>
    getMovie(id)
  );

  if (isLoading) return null;
  if (error) return <div>Error loading movie details.</div>;

  return (
    <Overlay
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Modal
        onClick={(e) => e.stopPropagation()}
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        exit={{ y: 50 }}
      >

        <img src={makeImagePath(data.poster_path)} alt={data.title} />

        <ModalContentContainer>
          <h1>{data.title}</h1>
          <p>{data.overview}</p>
          <ul>
            <ModalContentLi tag="budgetTag">
              <span>Budget</span>
              <span>${data.budget}</span>
            </ModalContentLi>
            <ModalContentLi tag="revenueTag">
              <span>Revenue</span>
              <span>{data.revenue}</span>
            </ModalContentLi>
            <ModalContentLi tag="runtimeTag">
              <span>Runtime</span>
              <span>{data.runtime}min</span>
            </ModalContentLi>
            <ModalContentLi tag="ratingTag">
              <span>Rating</span>
              <span>🤩{Math.round(data.popularity / 10)}</span>
            </ModalContentLi>
          </ul>
        </ModalContentContainer>
      </Modal>
    </Overlay>
  );
}
