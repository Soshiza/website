'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { authentication } from '@/config/firebase';
import '@/app/globals.css';
import ProtectedRoute from '@/auth/protectedRoute';
import { FloatingDockDemo } from '@/components/floatingDockAdmin';

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
          <FloatingDockDemo />
        </div>
      </>
    </ProtectedRoute>
  );
}

export default Admin;
