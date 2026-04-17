/**
 * src/components/layout/Navbar.tsx
 * Fungsi: Komponen navigasi atas. Biasanya diletakkan secara global atau di halaman utama 
 * berisi logo, menu navigasi, dan tombol aksi (misal: tombol kontak).
 */

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 bg-white border-b h-16 flex items-center justify-center">
      <span className="font-bold">Navbar Section</span>
    </nav>
  );
}
