"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules"; 
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import Navbar from "./Navbar/page";
import Mission from "./Mission/page";

const heroSlides = [
  {
    id: 1,
    image: "/1.JPG",
    title: "Welcome to Chia View",
    description: "Spreading Hope & God's Love",
    linkHref: "#mission",
    linkText: "Learn More"
  },
  {
    id: 2,
    image: "/2.JPG",
    title: "Our Mission",
    description: "Serving the community through faith and action",
    linkHref: "#mission",
    linkText: "Join Us"
  },
  {
    id: 3,
    image: "/3.JPG",
    title: "Join Us",
    description: "Be part of the Chia View Church Mission",
    linkHref: "#contact",
    linkText: "Contact Us"
  }
];

export default function Hero() {
  return (
    <section className="relative w-full h-screen" aria-label="Hero section">
      <Navbar/>
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        className="h-full"
        aria-label="Hero carousel"
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="w-full h-screen bg-cover bg-center relative flex items-center justify-center"
              style={{ backgroundImage: `url('${slide.image}')` }}
              role="img"
              aria-label={`Slide ${slide.id}: ${slide.title}`}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60" aria-hidden="true"></div>
              <div className="relative text-center px-6">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 animate-fadeIn">
                  {slide.title}
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-white mb-8 animate-fadeIn delay-200">
                  {slide.description}
                </p>
                <Link
                  href={slide.linkHref}
                  className="inline-block bg-blue-800 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 animate-fadeIn delay-400"
                  aria-label={`${slide.linkText} - ${slide.title}`}
                >
                  {slide.linkText}
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Mission/>
    </section>
  );
}

