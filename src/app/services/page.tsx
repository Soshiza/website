"use client";

import React from "react";
import '@/app/globals.css';
import { FloatingNavBar } from "@/components/floating-navbar";
import { AnimatePresence } from 'framer-motion';
import { CardServices } from '@/components/cardServices'; // Ajusta la ruta según corresponda

export default function Services() {
  return (
    <div className="relative min-h-screen">
      <FloatingNavBar />
      <div className="container mx-auto px-4 py-8">
        <AnimatePresence>
          <CardServices />
        </AnimatePresence>
      </div>
    </div>
  );
}
