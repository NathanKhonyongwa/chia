"use client";

import Link from "next/link"; // ✅ Import Next.js Link
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules"; 
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

export default function Hero() {
  return (
    <section className="relative w-full h-screen">
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
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div
            className="w-full h-screen bg-cover bg-center relative flex items-center justify-center"
            style={{ backgroundImage: "url('/1.jpg')" }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60"></div>
            <div className="relative text-center px-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 animate-fadeIn">
                Welcome to Chia View
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white mb-8 animate-fadeIn delay-200">
                Spreading Hope & God’s Love
              </p>
              <Link
                href="#mission"
                className="inline-block bg-blue-800 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 animate-fadeIn delay-400"
              >
                Learn More
              </Link>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div
            className="w-full h-screen bg-cover bg-center relative flex items-center justify-center"
            style={{ backgroundImage: "url('/2.jpg')" }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60"></div>
            <div className="relative text-center px-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 animate-fadeIn">
                Our Mission
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white mb-8 animate-fadeIn delay-200">
                Serving the community through faith and action
              </p>
              <Link
                href="#mission"
                className="inline-block bg-blue-800 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 animate-fadeIn delay-400"
              >
                Join Us
              </Link>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div
            className="w-full h-screen bg-cover bg-center relative flex items-center justify-center"
            style={{ backgroundImage: "url('/3.jpg')" }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60"></div>
            <div className="relative text-center px-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 animate-fadeIn">
                Join Us
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white mb-8 animate-fadeIn delay-200">
                Be part of the Chia View Church Mission
              </p>
              <Link
                href="#contact"
                className="inline-block bg-blue-800 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 animate-fadeIn delay-400"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Tailwind Animations */}
      <style jsx>{`
        .animate-fadeIn {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 1s forwards;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-400 {
          animation-delay: 0.4s;
        }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}

