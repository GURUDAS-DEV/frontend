"use client";
import React from "react";
import MarqueeRow from "./MarqueeRow";

const OurClientsSection = () => {
  const clients = [
    { id: 1, name: "Hindalco", logo: "/clogo/aditya_birla.png" },
    { id: 2, name: "Himadri", logo: "/clogo/himadri.png" },
    { id: 3, name: "EnergyCompany", logo: "/clogo/elec_blue.png" },
    { id: 4, name: "Sterling & Wilson", logo: "/clogo/ster&wil.png" },
    { id: 5, name: "Vikram", logo: "/clogo/vikramSolar.png" },
    { id: 6, name: "Tata Metaliks", logo: "/clogo/tata_metaliks.png" },
    { id: 7, name: "Exide", logo: "/clogo/exide.png" },
    { id: 8, name: "Utkarsh", logo: "/clogo/utkarsh.png" },
    { id: 9, name: "Rashmi", logo: "/clogo/rashmi_group.png" },
    { id: 10, name: "L&T", logo: "/clogo/L&T.png" },
    { id: 11, name: "Danieli", logo: "/clogo/Danieli.png" },
    { id: 12, name: "WBSEDCL", logo: "/clogo/wbsedcl.png" },
    { id: 13, name: "MSP", logo: "/clogo/msp_group.png" },
    { id: 14, name: "Swastik", logo: "/clogo/swastika_infra.png" },
    { id: 15, name: "Shyam", logo: "/clogo/shyam_group.png" },
    { id: 16, name: "TE", logo: "/clogo/te.png" },
    { id: 17, name: "PGCIL", logo: "/pgcil-logo.png" },
    { id: 18, name: "NALCO", logo: "/nalco_logo.jpg" },
    { id: 19, name: "DVC", logo: "/dvc_logo.avif" },
    { id: 20, name: "ONGC", logo: "/ongc_logo.webp" },
    { id: 21, name: "IOCL", logo: "/ind_oil_logo.webp" },
    { id: 22, name: "TATA POWER", logo: "/tata_power_logo.webp" },
    { id: 23, name: "ADANI POWER", logo: "/adani_power_logo.webp" },
    { id: 24, name: "NTPC", logo: "/ntpc_logo.jpg" },
  ];

  const firstLane = clients.slice(12);
  const secondLane = clients.slice(0,12);

  return (
    <section  id="our-clients" className="w-full bg-gray-100 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex justify-center items-center gap-2 mb-4">
            <div className="h-0.5 w-12 bg-amber-800" />
            <h2 className="sub-title-2">OUR CLIENTS</h2>
            <div className="h-0.5 w-12 bg-amber-800" />
          </div>

          <h1 className="title">Think Positive, Think Always</h1>
          <h2 className="sub-title mt-2">Powering Your Business</h2>
        </div>

        {/* Dual marquee */}
        <div className="space-y-10">
          <MarqueeRow clients={firstLane} direction="left" speed={45} />
          <MarqueeRow clients={secondLane} direction="right" speed={50} />
        </div>
      </div>
    </section>
  );
};

export default OurClientsSection;
