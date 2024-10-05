import React, { useState, useEffect } from "react";
import "./invitations.css";
import profiles from "../data/data";
import InvitationsCards from "./cards";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; // Importa los estilos de Swiper

const Invitations: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    // Función para actualizar el estado según el tamaño de la pantalla
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Agrega un listener para detectar cambios en el tamaño de la ventana
    window.addEventListener("resize", handleResize);

    // Limpia el listener cuando el componente se desmonta
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div id="invitations_div_shadow">
      <div id="invitations_div">
        <h2 id="invitations_tittle">Invitations</h2>

        {/* Carrusel solo en dispositivos móviles */}
        {isMobile ? (
          <Swiper
            spaceBetween={5}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation = {false}
          >
            {profiles.map((profile, index) => (
              <SwiperSlide key={index}>
                <InvitationsCards
                  name={profile.name}
                  ocation={profile.Ocation}
                  date={profile.Date}
                  url={profile.img}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          /* Versión de escritorio, sin carrusel */
          profiles.map((profile, index) => (
            <InvitationsCards
              key={index}
              name={profile.name}
              ocation={profile.Ocation}
              date={profile.Date}
              url={profile.img}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Invitations;
