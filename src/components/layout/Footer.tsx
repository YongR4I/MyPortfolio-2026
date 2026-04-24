"use client";

/**
 * src/components/layout/Footer.tsx
 * Fungsi: Komponen penutup di bagian paling bawah website.
 * Biasanya berisi informasi hak cipta (copyright), link sosial media, atau navigasi tambahan.
 */

export default function Footer() {
  const links = [
    { number: '01', name: 'Home', href: '#home' },
    { number: '02', name: 'About', href: '#about' },
    { number: '03', name: 'Service', href: '#services' },
    { number: '04', name: 'Project', href: '/projects' },
    { number: '05', name: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="relative w-full min-h-[100svh] bg-white pt-16 md:pt-20 pb-6 px-6 md:px-12 flex flex-col justify-between font-inter text-black z-50 rounded-t-[30px] md:rounded-t-[40px] shadow-[0_-10px_40px_rgba(0,0,0,0.2)] mt-auto">
      <div className="flex flex-col md:flex-row justify-between w-full mx-auto items-start md:items-end mb-16 md:mb-20 gap-12 md:gap-0">

        {/* Left Section - Contact Info */}
        <div className="flex flex-col gap-6 md:gap-10">
          <div className="flex flex-col">
            <h2 className="text-[#6E6E6E] text-3xl md:text-[40px] font-semibold tracking-tight">
              Stay Connected
            </h2>
            <div className="relative inline-block w-fit">
              <a
                href="mailto:Sayhi@raihandaffa.com"
                className="text-black text-2xl sm:text-3xl md:text-[40px] font-semibold tracking-tight relative z-10"
              >
                Sayhi@raihandaffa.com
              </a>
              <div className="absolute bottom-0 md:bottom-1 left-0 w-full h-[2px] bg-black"></div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="inline-block mt-4">
            <button className="relative flex items-center bg-[#E5E5E5] rounded-full p-1 group overflow-hidden cursor-pointer w-fit pr-6">
              <div className="absolute left-1 top-1 bottom-1 bg-[#FF4D00] rounded-full z-0 w-10 group-hover:w-[calc(100%-8px)] transition-all duration-300 ease-out"></div>
              <div className="relative flex items-center justify-center w-10 h-10 rounded-full z-10 shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                  <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="relative text-sm font-semibold pl-2 z-10 whitespace-nowrap text-black group-hover:text-white transition-colors duration-300">
                Contact Now
              </span>
            </button>
          </div>
        </div>

        {/* Right Section - Navigation Links */}
        <div className="w-full md:w-[400px] flex flex-col">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className={`flex items-center justify-between py-4 border-t-[0.5px] border-[#B3B3B3] group ${index === links.length - 1 ? 'border-b-[0.5px]' : ''}`}
            >
              <div className="flex gap-1 text-[12px] text-[#525252] group-hover:text-black transition-colors font-medium">
                <span>{link.number}/</span>
                <span>{link.name}</span>
              </div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#525252] group-hover:text-black transition-all group-hover:translate-x-1 duration-300">
                <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          ))}
        </div>
      </div>

      {/* Big RAIHAN Text Section */}
      <div className="w-full flex flex-col items-center mt-auto md:mt-0">
        <div className="w-full md:w-[98%] border-t-[0.5px] border-[#B3B3B3]"></div>

        <h1 className="text-[60px] sm:text-[100px] md:text-[160px] lg:text-[250px] font-extrabold text-black leading-[0.8] md:leading-none text-center tracking-tighter my-6 md:my-2 w-full overflow-hidden flex justify-center uppercase">
          <span className="-ml-2 md:-ml-8 lg:-ml-12">Raihan</span>
        </h1>

        <div className="w-full md:w-[98%] border-b-[0.5px] border-[#B3B3B3] mb-6 md:mb-8"></div>
      </div>

      {/* Bottom Footer Info */}
      <div className="flex flex-col md:flex-row justify-between items-center w-full md:w-[98%] mx-auto text-[12px] text-black font-medium gap-4 md:gap-0">
        <p>Copyright © Raihan 2025</p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center hover:text-[#FF4D00] transition-colors cursor-pointer"
        >
          © Back to top
        </button>
      </div>
    </footer>
  );
}
