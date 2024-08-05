import React, { useEffect } from "react";
import styled from "styled-components";
import CloseModalImg from "../../../imgs/MobModalClose.svg";

/* modal창 외부화면 */
const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 4;
`;

const Modal = styled.div`
  position: absolute;
  width: 272px;
  height: 216px;
  padding: 20px;
  text-align: center;
  background-color: rgb(255, 255, 255);
  border-radius: 20px;
`;

const CloseBtn = styled.button`
  border: none;
  background-color: white;
  position: absolute;
  top: 24px;
  right: 24px;
  cursor: pointer;
`;

function ModalComponent(props) {
  function closeModal() {
    props.closeModal();
  }
  useEffect(() => {
    document.body.style = `overflow: hidden`; //hidden : 스크롤 방지
    return () => (document.body.style = `overflow: auto`);
  }, []);

  return (
    <ModalWrapper onClick={closeModal}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <CloseBtn onClick={closeModal}>
          <img src={CloseModalImg} alt="closeModal" />
        </CloseBtn>
        {props.children}
      </Modal>
    </ModalWrapper>
  );
}

export default ModalComponent;
