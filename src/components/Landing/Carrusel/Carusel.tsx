import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import ButtonLogic from '../NavButtons/NavButtons'; 
import 'swiper/css';
import 'swiper/css/pagination';
import "./Carusel.css";

const CarouselBanner = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); 

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const slides = [
    {
      title: 'Eventix',
      text: 'Organize, create, and manage',
      image: isMobile 
        ? "https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/ImgLanding%2FImg1%20caruseel%20mob.webp?alt=media&token=1a40d335-808e-4a34-b4b4-10b91b3a4065"
        : "https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/ImgLanding%2FImg1%20caruusel.webp?alt=media&token=33ae14cc-287d-42c0-a2a6-a9171f6bed6a",
    },
    {
      title: 'Eventix',
      text: 'Organize, create, and manage',
      image: isMobile
        ? "https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/ImgLanding%2FImg2%20carrusel.webp?alt=media&token=be71b30c-5834-4e3e-bc63-df308450fe8b"
        : "https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/ImgLanding%2FImg2%20carrusel.webp?alt=media&token=be71b30c-5834-4e3e-bc63-df308450fe8b",
    },
    {
      title: 'Eventix',
      text: 'Organize, create, and manage',
      image: isMobile
        ? "https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/ImgLanding%2FImg3%20carrusel.webp?alt=media&token=6a6cd5f1-8505-401c-87ee-10af252c08da"
        : "https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/ImgLanding%2FImg3%20carrusel.webp?alt=media&token=6a6cd5f1-8505-401c-87ee-10af252c08da",
    },
  ];

  return (
    <Swiper
      pagination={{ clickable: true }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      modules={[Pagination, Autoplay]} 
      className="mySwiper"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            className="banner-slide"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
                                linear-gradient(to bottom, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 1)), 
                                url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              textAlign: 'center',
            }}
          >
            <h1 id='banner_title'>{slide.title}</h1>
            <p className='banner_text'>{slide.text}</p>
            <ButtonLogic showPrimary={false} showSecondary={true} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CarouselBanner;
