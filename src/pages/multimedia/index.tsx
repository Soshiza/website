"use client";

import '@/app/globals.css';
import React from "react";
import { FloatingNavBar } from "@/components/floating-navbar";
import { FloatingDockMultimedia } from '@/components/floatingDockMultimedia';




export default function Multimedia() {
  return (
    <>
    <FloatingNavBar />
    <FloatingDockMultimedia />
    </>    
  );
}
