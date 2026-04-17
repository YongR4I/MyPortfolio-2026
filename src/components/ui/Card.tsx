/**
 * src/components/ui/Card.tsx
 * Fungsi: Komponen pembungkus kotak (kartu) untuk konten berulang
 * seperti list project atau list service agar stylingnya seragam.
 */

export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      {children}
    </div>
  );
}
