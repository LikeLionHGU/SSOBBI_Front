import styled from "styled-components";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Slide1Component from "./Slide1Component";

const CarouselWrapper = styled.div`
  width: 100%;
  height: 576px;
  background: linear-gradient(to right, #caf8f5, #d5fac8);
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Box = styled.div`
  width: 100%;
  height: 100%;
`;

export default function SliderComponent({ onMoveBox }) {
  return (
    <CarouselWrapper>
      <Carousel showThumbs={false} showStatus={false}>
        <Slide1Component onMoveBox={onMoveBox} />
        <Box>2</Box>
        <Box>3</Box>
      </Carousel>
    </CarouselWrapper>
  );
}
