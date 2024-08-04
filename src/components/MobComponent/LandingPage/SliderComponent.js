import styled from "styled-components";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Slide1Component from "./Slide1Component";
import Slide2Component from "./Slide2Component";

const CarouselWrapper = styled.div`
  width: 375px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function SliderComponent({ onMoveBox }) {
  return (
    <CarouselWrapper>
      <Carousel
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        autoPlay={true}
        autoplaySpeed={1000}
        width={375}
      >
        <Slide1Component onMoveBox={onMoveBox} />
        <Slide2Component onMoveBox={onMoveBox} />
      </Carousel>
    </CarouselWrapper>
  );
}
