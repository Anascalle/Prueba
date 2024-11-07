import React from "react";
import GuestEventes from "./guest";
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import "./guest.css";
import useGuestEvents from "../../../hooks/useGuest";

const Guest: React.FC<{ userId: string }> = React.memo(({ userId }) => {
  const { profiles, slidesPerView, loading, error } = useGuestEvents(userId); 

  return (
    <div aria-label="carousel guest events" id="Guest_card">
      <h2 aria-label="carousel guest events title" id="Guest_tittle">You are Guest</h2>
      <div aria-label="carousel guest events" id="carousel">
        {loading ? (
          <p id="loading" aria-live="polite">Loading events...</p>
        ) : error ? (
          <p id="error" aria-live="assertive">{error}</p>
        ) : (
          <Swiper
            spaceBetween={30}
            slidesPerView={Math.min(profiles.length, slidesPerView)}
            navigation={false}
            pagination={{ clickable: true }}
            loop={profiles.length > 1}
          >
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <SwiperSlide key={profile.id} aria-label={`Event ${profile.name} on ${profile.date}`}>
                  <GuestEventes
                    id={profile.id}
                    ocation={profile.eventType}
                    name={profile.name}
                    date={profile.date}
                    url={profile.image}
                    aria-hidden="false" 
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
});

export default Guest;
