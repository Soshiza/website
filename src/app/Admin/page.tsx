'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { authentication } from '@/config/firebase';
import { motion } from 'framer-motion';
import Image from 'next/image';
import '@/app/globals.css';
import ProtectedRoute from '@/auth/protectedRoute';

const Admin: React.FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(authentication);
      router.push('/');
    } catch (error: any) {
      console.error('Error al cerrar sesión:', error.message);
    }
  };

  return (
    <ProtectedRoute>
      <>
        <div className="min-h-screen flex justify-center items-center bg-transparent z-[100]">
          
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-center"
              >
                <button 
                  onClick={handleLogout} 
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md shadow-md transition duration-300"
                >
                  Cerrar sesión
                </button>
              </motion.div>
            </div>
          
      </>
    </ProtectedRoute>
  );
}

export default Admin;
