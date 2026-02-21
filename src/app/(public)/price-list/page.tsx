import Header from "@/components/header";
import TopBar from "@/components/top-bar";
import React from "react";
import Navigation from "@/components/nav";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/footer";
import Carousel from "@/components/carousel";

export default function Page() {
  return (
    <main>
     
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-visible">
        <Navigation />
        <div className="relative w-full aspect-[2.73/1] sm:h-[400px] md:h-[500px] min-h-[240px]">
            {/* Background Image */}
            <Image
              src="/Banners/banner 2.png"
              alt="Banner"
              fill
              className="object-cover"
              priority
            />
        
            {/* Optional dark overlay for readability */}
            <div className="absolute inset-0 bg-black/20 sm:bg-black/10"></div>
        
            {/* Overlay content */}
            <div className="absolute inset-0 flex items-center px-4 sm:px-10">
              <h1
                className="
                  text-3xl font-bold text-white drop-shadow-md 
                  sm:text-4xl md:text-5xl lg:text-6xl
                "
              >
                Pricelist & Brochure
              </h1>
            </div>
          </div>
      </section>

      <section className="w-full bg-[#5C1E1E] py-12 px-4 flex-grow">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-white text-3xl font-bold text-center mb-12">
            <span className="font-extrabold">3M</span> Pricelist and Brochure
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 place-items-center">
            {/* Pricelist Card */}
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center w-full max-w-[23rem]">
              <div className="relative w-full h-[28rem] mb-6">
                <Image
                  src="/3m_price/img1.png"
                  alt="3M Pricelist Cover"
                  fill
                  className="object-cover rounded-md"
                  priority
                />
              </div>
              <h3 className="text-gray-800 text-xl font-medium mb-5">
                Pricelist PDF
              </h3>
              <a download href="/3m_price/3m_pricelist.pdf">
                <button className="bg-gradient-to-r from-[#5a1c0e] to-[#7a2b16] text-white text-sm font-medium py-2 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 uppercase">
                  Download Pricelist
                </button>
              </a>
            </div>

            {/* Brochure Card */}
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center w-full max-w-[23rem]">
              <div className="relative w-full h-[28rem] mb-6">
                <Image
                  src="/3m_Brouch/img1.png"
                  alt="3M Brochure Cover"
                  fill
                  className="object-cover rounded-md"
                  priority
                />
              </div>
              <h3 className="text-gray-800 text-xl font-medium mb-5">
                Brochure PDF
              </h3>
              <a download href="/3m_Brouch/3m_Brouchure.pdf">
                <button className="bg-gradient-to-r from-[#5a1c0e] to-[#7a2b16] text-white text-sm font-medium py-2 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 uppercase">
                  Download Brochure
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full bg-[#5C1E1E] py-12 px-4 flex-grow">
        <div className="max-w-6xl space-x-2 mx-auto">
          <h2 className="text-white text-3xl font-bold text-center mb-12">
            <span className="font-extrabold">Dowell's</span> Pricelist and Brochure
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 place-items-center">
            {/* Pricelist Card */}
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center w-full max-w-[23rem]">
              <div className="relative w-full h-[28rem] mb-6">
                <Image
                  src="/new_pricelist_img.png"
                  alt="3M Pricelist Cover"
                  fill
                  className="object-cover rounded-md"
                  priority
                />
              </div>
              <h3 className="text-gray-800 text-xl font-medium mb-5">
                Dowells Pricelist PDF
              </h3>
              <a download href="/DOWELL'S PRICE LIST 1st FEBRUARY 2026 (vertical pdf) (1).pdf">
                <button className="bg-gradient-to-r from-[#5a1c0e] to-[#7a2b16] text-white text-sm font-medium py-2 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 uppercase">
                  Download Pricelist
                </button>
              </a>
            </div>

            {/* Brochure Card 
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center w-full max-w-[23rem]">
              <div className="relative w-full h-[28rem] mb-6">
                <Image
                  src="/gland_cat/img1.png"
                  alt="3M Brochure Cover"
                  fill
                  className="object-cover rounded-md"
                  priority
                />
              </div>
              <h3 className="text-gray-800 text-xl font-medium mb-5">
                Glands Catalogue PDF
              </h3>
              <a download href="/sock_cat/Sockets_catalogue_1.pdf">
                <button className="bg-gradient-to-r from-[#5a1c0e] to-[#7a2b16] text-white text-sm font-medium py-2 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 uppercase">
                  Download Brochure
                </button>
              </a>
            </div>
*/}
            {/* Brochure Card */}
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center w-full max-w-[23rem]">
              <div className="relative w-full h-[28rem] mb-6">
                <Image
                  src="/Dowells-cat-new.png"
                  alt="3M Brochure Cover"
                  fill
                  className="object-cover rounded-md"
                  priority
                />
              </div>
              <h3 className="text-gray-800 text-xl font-medium mb-5">
                Dowells Catalogue
              </h3>
              <a download href="/Dowells Catalogue New.pdf">
                <button className="bg-gradient-to-r from-[#5a1c0e] to-[#7a2b16] text-white text-sm font-medium py-2 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 uppercase">
                  Download Brochure
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
