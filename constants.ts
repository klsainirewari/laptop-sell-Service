import { Monitor, Smartphone, Wrench, ShieldCheck, HardDrive } from "lucide-react";

export const BUSINESS_INFO = {
  name: "Khusboo Electric",
  owner: "K.L. Saini",
  phone: "7206770673",
  whatsapp: "7206770673", // Only digits for API links
  whatsappDisplay: "+91 7206770673",
  email: "kanheya@live.com",
  address: "Sunder Lal Market, Near Everest Cinema",
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