"use client"

import { useState, useCallback, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const certificates = [
  {
    id: 1,
    title: "Dowell's Authorization Certificate",
    image: "/clogo/dowells_cert.jpg",
  },
  {
    id: 2,
    title: "3M Authorization Certificate",
    image: "/clogo/3M_cert.png",
  },
]

const useCarousel = (length: number) => {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1))
  }, [length])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? length - 1 : prev - 1))
  }, [length])

  const goTo = useCallback((index: number) => {
    setCurrent(index)
  }, [])

  return { current, next, prev, goTo }
}

export default function CertificatesSection() {
  const { current, next, prev, goTo } = useCarousel(certificates.length)

  // Authority-style autoplay (forward only, slow)
  useEffect(() => {
    const interval = setInterval(() => {
      next()
    }, 6000)

    return () => clearInterval(interval)
  }, [next])

  return (
    <section className="py-12 md:py-24 bg-gray-50">
      <div className="container mx-auto max-w-[76rem] px-4">
        {/* Header */}
        <div className="mb-8 flex items-center justify-center space-x-2">
          <div className="h-[2px] w-12 bg-[#5C1E1E]" />
          <h2 className="sub-title-2">OUR CERTIFICATES</h2>
          <div className="h-[2px] w-12 bg-[#5C1E1E]" />
        </div>

        {/* Main Title */}
        <div className="mb-16 text-center">
          <h3 className="title">
            Authorized Distributor
            <br />
            Certificates
          </h3>
        </div>

        {/* Spotlight Container */}
        <div className="relative mx-auto max-w-[60rem]">
          {/* Navigation Buttons */}
          <button
            onClick={prev}
            className="absolute -left-6 md:-left-16 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[#5C1E1E] text-white hover:bg-[#4A1818] transition"
            aria-label="Previous Certificate"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={next}
            className="absolute -right-6 md:-right-16 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[#5C1E1E] text-white hover:bg-[#4A1818] transition"
            aria-label="Next Certificate"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Certificate Spotlight */}
          <div className="relative h-[420px] md:h-[520px]">
            {certificates.map((certificate, index) => {
              const isActive = current === index

              return (
                <div
                  key={certificate.id}
                  className={cn(
                    "absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isActive
                      ? "opacity-100 scale-100 z-10"
                      : "opacity-0 scale-95 z-0 pointer-events-none"
                  )}
                >
                  <div className="h-full rounded-xl bg-white p-8 md:p-12 shadow-2xl flex flex-col">
                    <h4 className="mb-6 text-center title">
                      {certificate.title}
                    </h4>

                    <div className="relative flex-1 w-full">
                      <Image
                        src={certificate.image}
                        alt={certificate.title}
                        fill
                        priority={isActive}
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Dots */}
          <div className="mt-10 flex justify-center gap-3">
            {certificates.map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                aria-label={`Go to certificate ${index + 1}`}
                className={cn(
                  "h-2 rounded-full transition-all",
                  current === index
                    ? "w-10 bg-[#5C1E1E]"
                    : "w-2 bg-gray-300 hover:bg-gray-400"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
