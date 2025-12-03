import { Monitor, Smartphone, Wrench, ShieldCheck, HardDrive } from "lucide-react";

export const BUSINESS_INFO = {
  name: "Khusboo Electronics",
  owner: "K.L. Saini",
  phone: "7206770673",
  whatsapp: "7206770673", // Only digits for API links
  whatsappDisplay: "+91 7206770673",
  email: "kanheya@live.com",
  address: "Kl Saini Khusboo Electronics, Sunder Lal Market, Near Everest Cinema, Rewari 123401 (HR)",
  mapLink: "https://www.google.com/maps/place/Kl+Saini%7BLaptop+Sell+%26+Service%7D/@28.1964042,76.5939546,15z/data=!4m22!1m15!4m14!1m6!1m2!1s0x390d5075e45aa17b:0x77972a700f21cfb0!2zS2wgU2Fpbml7TGFwdG9wIFNlbGwgJiBTZXJ2aWNlfSDgpJXgpYfgpI_gpLIg4KS44KWI4KSo4KWAe-CksuCliOCkquCkn-ClieCkqiDgpLjgpYfgpLIgJiDgpLjgpLDgpY3gpLXgpL_gpLh9!2m2!1d76.6119764!2d28.1964069!1m6!1m2!1s0x390d5075e45aa17b:0x77972a700f21cfb0!2ssunder+lal+market,+near+Everest+cinema,+Rewari,+Haryana+123401!2m2!1d76.6119764!2d28.1964069!3m5!1s0x390d5075e45aa17b:0x77972a700f21cfb0!8m2!3d28.1964069!4d76.6119764!16s%2Fg%2F11c7symfdp?entry=ttu&g_ep=EgoyMDI1MTEzMC4wIKXMDSoASAFQAw%3D%3D",
  catalogLink: "https://wa.me/c/917206770673",
  experience: "15 Years",
  tagline: "Expert Laptop Repair & Quality Refurbished Devices"
};

export const SERVICES = [
  {
    title: "Refurbished Laptops",
    description: "High-performance business laptops at a fraction of the cost. Fully tested and quality checked.",
    details: [
      "Brands: Dell Latitude, HP EliteBook, Lenovo ThinkPad",
      "Specs: Core i3, i5, i7 Processors (Gen 6-11)",
      "Upgrades: High-speed SSDs & RAM upgrades",
      "Warranty: 1-month comprehensive testing warranty"
    ],
    icon: Monitor
  },
  {
    title: "Expert Repair",
    description: "Advanced chip-level repairing for laptops with 15 years of technical expertise.",
    details: [
      "Laptop: Screen, Battery, Keyboard & Hinge replacement",
      "Motherboard: Chip-level diagnosis (No Power/Display)",
      "Software: Data Recovery, Windows Installation",
      "Fabrication: Broken body repair & hinge rework"
    ],
    icon: Wrench
  },
  {
    title: "Data Recovery & Unlocking",
    description: "Specialized services for recovering lost data and unlocking security passwords.",
    details: [
      "Storage Recovery: HDD, SSD, Pen Drives & SD Cards",
      "BIOS Password Cracking & Removal",
      "Windows Login Password Reset",
      "Recover Data from Formatted/Crashed Drives"
    ],
    icon: HardDrive
  },
  {
    title: "Quality Guarantee",
    description: "We stand by our products and services with reliable support and transparent dealings.",
    details: [
      "15 Years of local market trust",
      "Transparent pricing estimate before repair",
      "Use of high-quality genuine spare parts",
      "Dedicated after-sales support"
    ],
    icon: ShieldCheck
  }
];

export const CATALOG_PRODUCTS = [
  { 
    name: "Dell Latitude 7480", 
    specs: "Core i5 6th Gen, 8GB RAM, 256GB SSD, Win 11",
    price: "₹14,990", 
    tag: "Best Value", 
    img: "https://i.ibb.co/sdm2Whxh/Dell-jpg.jpg", 
    link: "https://wa.me/p/25836281255958120/917206770673"
  },
  { 
    name: "HP EliteBook 840 G5", 
    specs: "Core i5 7th Gen, 8GB RAM, 256GB SSD, Win 11",
    price: "₹16,990", 
    tag: "Premium Design", 
    img: "https://i.ibb.co/5X1DBX0V/hp-jpg.jpg", 
    link: "https://wa.me/p/8783197445040361/917206770673"
  },
  { 
    name: "MacBook Air A1466 (2017)", 
    specs: "Core i5, 8GB RAM, 256GB SSD, macOS Monterey",
    price: "₹18,990", 
    tag: "Apple Deal", 
    img: "https://i.ibb.co/gbvK5b66/mac-jpg.jpg", 
    link: BUSINESS_INFO.catalogLink
  },
  { 
    name: "Lenovo ThinkPad T470s", 
    specs: "Core i5 7th Gen, 8GB RAM, 256GB SSD, Win 11",
    price: "₹14,990", 
    tag: "Business Rugged", 
    img: "https://i.ibb.co/vx864wwt/thinkpad-jpg.jpg", 
    link: "https://wa.me/p/8294710417324994/917206770673"
  },
];
