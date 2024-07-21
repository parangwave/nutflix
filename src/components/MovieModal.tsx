import { useQuery } from "react-query";
import { motion } from "framer-motion";
import styled from "styled-components";
import { DefaultTheme } from "styled-components";

// api
import { getMovie, makeImagePath } from "../utils/api";

// types
import { MovieModalProps } from "../utils/types";

// icons
import { XCircleIcon } from "../asset/icons/XCircle";

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

const Modal = styled(motion.div)<{ src: string }>`
  width: 80%;
  height: 80vh;
  border-radius: 15px;
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-color: ${(props) => props.theme.bg};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: end;
`;

const ModalCloseButton = styled(motion.button)`
  cursor: pointer;
  margin: 1.2rem;
  background: none;
  border: none;
  padding: 0;
  width: 8%;

  svg {
    fill: ${(props) => props.theme.bg};
  }

  &:hover {
    svg {
      opacity: 1;
    }
  }
`;

const ModalContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 1rem;
  width: 100%;
  height: 50%;
  padding: 1.5rem;
  border-radius: 15px;
  background-color: ${(props) => props.theme.bg};
  background: linear-gradient(transparent 0%, ${(props) => props.theme.bg} 30%);

  h1 {
    font-size: 2rem;
    font-weight: 700;
    margin: 0.5rem 0;
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

// variants for nodal animation
const modalVariants = {
  initial: { opacity: 0, y: -50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 50 },
};

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
      transition={{ duration: 0.3 }}
    >
      <Modal
        src={makeImagePath(data.poster_path)}
        onClick={(e) => e.stopPropagation()}
        variants={modalVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.3 }}
      >
        <ModalCloseButton
          onClick={onClose}
          initial={{ opacity: 0.7 }}
          whileHover={{ opacity: 1 }}
          whileTap={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <XCircleIcon />
        </ModalCloseButton>

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
