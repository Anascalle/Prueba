import React from "react";
import "./Host.css";
import HostEvents from "./Host";
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import useHostEvents from "../../../hooks/useHostEvents";

const Host: React.FC<{ userId: string }> = ({ userId }) => {
  const { profiles, slidesPerView, loading, error } = useHostEvents(userId); 

  return (
    <div aria-label="carousel host events" id="Host_card">
      <h2 aria-label="carousel host events title" id="host_tittle">You are Host</h2>
      <div aria-label="carousel host events" id="carousel">
        {loading ? ( 
          <p id="loading" aria-live="polite">Loading events...</p>
        ) : error ? ( 
          <p id="error" aria-live="assertive">{error}</p>
        ) : (
          <Swiper
            spaceBetween={30}
            slidesPerView={profiles.length < slidesPerView ? profiles.length : slidesPerView}
            navigation={false}
            pagination={{ clickable: true }}
            loop={profiles.length > 1}
          >
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <SwiperSlide key={profile.id} aria-label={`Event ${profile.name} on ${profile.date}`}>
                  <HostEvents
                    id={profile.id}
                    name={profile.name}
                    date={profile.date}
                    url={profile.image}
                    aria-hidden="false" // Asegura que el evento es visible
                  />
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <p id="no_events" aria-live="polite">No events available</p>
              </SwiperSlide>
            )}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default Host;
