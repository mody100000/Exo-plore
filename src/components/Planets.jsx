import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const planets = [
    { name: "55 Cancri E", image: "https://i.postimg.cc/L5JMjkNq/ezgif-com-crop.gif" },
    { name: "kepler 452b", image: "https://i.postimg.cc/DZyhw3GP/kepler-452b.webp" },
    { name: "kepler 16b", image: "https://i.postimg.cc/rmnkdZCX/kepler16b.webp" },
];

const Planets = ({ onPlanetChange }) => {
    const [currentPlanet, setCurrentPlanet] = useState(planets[0].name);

    useEffect(() => {
        if (typeof onPlanetChange === 'function') {
            onPlanetChange(currentPlanet);
        }
    }, [currentPlanet, onPlanetChange]);

    const handleSlideChange = (swiper) => {
        const planetName = planets[swiper.activeIndex].name;
        setCurrentPlanet(planetName);
        if (typeof onPlanetChange === 'function') {
            onPlanetChange(planetName);
        }
    };

    return (
        <div className="relative w-full overflow-hidden">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                onSlideChange={handleSlideChange}
                speed={1500}
                className="w-full"
            >
                {planets.map((planet, index) => (
                    <SwiperSlide key={index}>
                        <div className="flex justify-center items-center">
                            <div className="relative group">
                                <img
                                    src={planet.image}
                                    alt={planet.name}
                                    className="w-40 h-40 rounded-full shadow-lg object-cover transition-transform duration-300 ease-in-out group-hover:scale-110 cursor-pointer"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                                    <p className="text-white text-center text-2xl font-bold">{planet.name}</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="swiper-button-prev !text-white absolute w-100 sm:w-[60%] left-0 top-1/2 -translate-y-1/2 z-10"></div>
            <div className="swiper-button-next !text-white absolute w-100 sm:w-[60%] right-0 top-1/2 -translate-y-1/2 z-10"></div>
        </div>
    );
};

export default Planets;