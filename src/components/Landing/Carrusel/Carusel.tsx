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
        ? "https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/smiley-girl-holding-drink-side-view_1.webp?alt=media&token=26c5a78a-314e-4233-8004-393954d018a6"
        : "https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/medium-shot-young-people-having-fun-party_1.webp?alt=media&token=db0297ac-cb9d-4a2f-9e12-bcf9d7b61434",
    },
    {
      title: 'Eventix',
      text: 'Organize, create, and manage',
      image: isMobile
        ? "https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/9ab4cf94-27ab-4473-b351-ed10e38b6951_16-9-discover-aspect-ratio_default_0.webp?alt=media&token=4c8291f0-dd17-4232-8325-a7ee9a4043e7"
        : "https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/9ab4cf94-27ab-4473-b351-ed10e38b6951_16-9-discover-aspect-ratio_default_0.webp?alt=media&token=4c8291f0-dd17-4232-8325-a7ee9a4043e7",
    },
    {
      title: 'Eventix',
      text: 'Organize, create, and manage',
      image: isMobile
        ? "https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/organizar-fiesta-familia-amigos-1024x683.webp?alt=media&token=07af3815-6e2c-4944-98a7-f4f9854411b3"
        : "https://firebasestorage.googleapis.com/v0/b/programacion-ec39e.appspot.com/o/organizar-fiesta-familia-amigos-1024x683.webp?alt=media&token=07af3815-6e2c-4944-98a7-f4f9854411b3",
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
