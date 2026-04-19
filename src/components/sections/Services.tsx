/**
 * src/components/sections/Services.tsx
 * Fungsi: Section untuk menampilkan jasa, keahlian, atau layanan yang kamu tawarkan.
 * Nantinya akan mengambil data array dari folder src/data/.
 */

const pages = [
  { id: 1, title: "Service Page 1", subtitle: "Placeholder content for service page 1" },
  { id: 2, title: "Service Page 2", subtitle: "Placeholder content for service page 2" },
  { id: 3, title: "Service Page 3", subtitle: "Placeholder content for service page 3" },
];

export default function Services() {
  return (
    <>
      {pages.map((page) => (
        <section
          key={page.id}
          id={page.id === 1 ? "services" : undefined}
          className="h-screen w-full flex items-center justify-center"
          style={{ backgroundColor: '#1A1A1A' }}
        >
          <div style={{ textAlign: 'center' }}>
            <h2
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 600,
                fontSize: 'clamp(32px, 5vw, 64px)',
                color: '#FFFFFF',
                marginBottom: '16px',
              }}
            >
              {page.title}
            </h2>
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 400,
                fontSize: 'clamp(14px, 1.2vw, 18px)',
                color: '#666666',
              }}
            >
              {page.subtitle}
            </p>
          </div>
        </section>
      ))}
    </>
  );
}
