/**
 * src/components/ui/Button.tsx
 * Fungsi: Komponen tombol yang bisa digunakan berulang kali di seluruh project.
 * Tujuannya agar desain tombol tetap konsisten tanpa menulis ulang class CSS berkali-kali.
 */

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button className="px-4 py-2 bg-blue-500 text-white rounded" {...props}>
      {children}
    </button>
  );
}
