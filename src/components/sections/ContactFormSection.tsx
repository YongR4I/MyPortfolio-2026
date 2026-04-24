"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FormData {
  name: string;
  email: string;
  service: string;
  projectDetails: string;
}

export default function ContactFormSection() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    service: '',
    projectDetails: '',
  });

  const [activeField, setActiveField] = useState<string | null>(null);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formItems = [
    { 
      id: '01', 
      label: "I'M", 
      field: 'name' as keyof FormData, 
      placeholder: 'YOUR NAME',
      type: 'text'
    },
    { 
      id: '02', 
      label: "HERE IS MY EMAIL", 
      field: 'email' as keyof FormData, 
      placeholder: 'EMAIL@EXAMPLE.COM',
      type: 'email'
    },
    { 
      id: '03', 
      label: "I NEED YOUR SERVICE FOR", 
      field: 'service' as keyof FormData, 
      placeholder: 'WEB DESIGN, DEVELOPMENT...',
      type: 'text'
    },
    { 
      id: '04', 
      label: "HERE MY PROJECT", 
      field: 'projectDetails' as keyof FormData, 
      placeholder: 'TELL ME MORE ABOUT IT...',
      type: 'textarea'
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    alert('Thank you! This is a demo submission.');
  };

  return (
    <section className="bg-black text-white py-32 px-6 md:px-10 min-h-screen flex flex-col items-center">
      <form onSubmit={handleSubmit} className="max-w-[1440px] w-full flex flex-col md:flex-row justify-end px-4">
        
        <div className="w-full md:w-[70%] flex flex-col pt-10">
          {/* Heading */}
          <div className="mb-24">
            <motion.h2 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-white font-bold leading-[0.7] tracking-tighter"
              style={{ fontFamily: 'var(--font-inter)', fontSize: 'clamp(80px, 15vw, 180px)' }}
            >
              HELLO
            </motion.h2>
            <motion.h2 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-white font-medium tracking-tight mt-4 uppercase opacity-90"
              style={{ fontFamily: 'var(--font-inter)', fontSize: 'clamp(40px, 8vw, 100px)', lineHeight: '1' }}
            >
              RAIHAN DAFFA
            </motion.h2>
          </div>

          {/* Form List */}
          <div className="flex flex-col w-full">
            {formItems.map((item, index) => (
              <div 
                key={item.id}
                className="border-b border-white/20 py-4 md:py-6 flex flex-col cursor-pointer transition-colors duration-300 hover:bg-white/[0.02]"
                onClick={() => setActiveField(item.id === activeField ? null : item.id)}
              >
                {/* Top Row: Pill and Label */}
                <div className="flex items-center mb-2">
                  <div className={`flex items-center justify-center border rounded-full px-4 py-1 mr-8 transition-all duration-500 
                    ${activeField === item.id ? 'border-[#FF4D00] bg-[#FF4D00]' : 'border-white/40'}`}>
                    <span className="text-[10px] md:text-sm font-mono font-medium tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>{item.id}</span>
                  </div>
                  <span 
                    className={`text-xl md:text-5xl font-medium tracking-widest uppercase transition-colors duration-500
                      ${activeField === item.id ? 'text-[#FF4D00]' : 'text-white'}`}
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {item.label}
                  </span>
                </div>

                {/* Bottom Row: Expanding Input */}
                <AnimatePresence>
                  {activeField === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="overflow-hidden"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="pt-6 pb-2 pl-16 md:pl-24">
                        {item.type === 'textarea' ? (
                          <textarea
                            autoFocus
                            value={formData[item.field]}
                            onChange={(e) => handleInputChange(item.field, e.target.value)}
                            placeholder={item.placeholder}
                            className="w-full bg-transparent border-b-2 border-white/60 focus:border-[#FF4D00] outline-none text-xl md:text-3xl font-medium tracking-wide py-2 transition-colors placeholder:text-white/10 resize-none min-h-[40px]"
                            style={{ fontFamily: 'var(--font-inter)' }}
                          />
                        ) : (
                          <input
                            autoFocus
                            type={item.type}
                            value={formData[item.field]}
                            onChange={(e) => handleInputChange(item.field, e.target.value)}
                            placeholder={item.placeholder}
                            className="w-full bg-transparent border-b-2 border-white/60 focus:border-[#FF4D00] outline-none text-xl md:text-4xl font-medium tracking-wide py-2 transition-colors placeholder:text-white/10"
                            style={{ fontFamily: 'var(--font-inter)' }}
                          />
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="mt-20 flex justify-end">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-14 py-5 bg-white text-black rounded-full font-bold text-lg md:text-2xl uppercase tracking-[0.1em] hover:bg-[#FF4D00] hover:text-white transition-all duration-300 shadow-2xl"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Submit
            </motion.button>
          </div>
        </div>
      </form>

      <div className="w-full max-w-[1440px] px-8 mt-auto pb-10">
        <span className="text-white/5 text-[10px] uppercase tracking-[0.5em] font-mono">
          © Raihan Daffa 2026
        </span>
      </div>
    </section>
  );
}
