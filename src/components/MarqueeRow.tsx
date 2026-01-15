"use client";
import { motion } from "motion/react";
import Image from "next/image";

type Client = {
  id: number;
  name: string;
  logo: string;
};

const MarqueeRow = ({
  clients,
  direction = "left",
  speed = 40,
}: {
  clients: Client[];
  direction?: "left" | "right";
  speed?: number;
}) => {
  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex gap-12 w-max"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          repeat: Infinity,
          duration: speed,
          ease: "linear",
        }}
      >
        {[...clients, ...clients].map((client, index) => (
          <div
            key={`${client.id}-${index}`}
            className="flex items-center justify-center bg-white border border-gray-200 rounded-xl px-12 py-8 min-w-[260px]
                       shadow-sm hover:shadow-md transition-all"
          >
            <div className="relative h-24 w-48  hover:grayscale-0 transition duration-300">
              <Image
                src={client.logo}
                alt={client.name}
                fill
                className="object-contain"
              />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default MarqueeRow;
