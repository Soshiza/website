"use client";

import { motion } from "framer-motion";
import '@/app/globals.css';
import React from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { FloatingNavBar } from "@/components/floating-navbar";
import { Sidebar } from "@/components/sidebar";
import EmailForm from "@/components/emailForm";



export default function Multimedia() {
  return (
    <AuroraBackground>
    <FloatingNavBar />
    <Sidebar />
    </AuroraBackground>
  );
}
