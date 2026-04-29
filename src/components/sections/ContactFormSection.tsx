"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

interface FormData {
  name: string;
  email: string;
  service: string;
  projectDetails: string;
}

export default function ContactFormSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
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
      type: 'text',
      name: 'user_name' // For EmailJS
    },
    {
      id: '02',
      label: "HERE IS MY EMAIL",
      field: 'email' as keyof FormData,
      placeholder: 'EMAIL@EXAMPLE.COM',
      type: 'email',
      name: 'user_email' // For EmailJS
    },
    {
      id: '03',
      label: "I NEED YOUR SERVICE FOR",
      field: 'service' as keyof FormData,
      placeholder: 'WEB DESIGN, DEVELOPMENT...',
      type: 'text',
      name: 'service_needed' // For EmailJS
    },
    {
      id: '04',
      label: "HERE MY PROJECT",
      field: 'projectDetails' as keyof FormData,
      placeholder: 'TELL ME MORE ABOUT IT...',
      type: 'textarea',
      name: 'message' // For EmailJS
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.projectDetails) {
      alert('Please fill in your name, email, and project details.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Replace these with your actual EmailJS credentials
      // You can get them by signing up at https://www.emailjs.com/
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

      // Send the email using React state instead of form elements
      // because inactive accordion inputs are removed from the DOM
      await emailjs.send(
        serviceId,
        templateId,
        {
          user_name: formData.name,
          user_email: formData.email,
          service_needed: formData.service,
          message: formData.projectDetails,
        },
        publicKey
      );

      // Replace alert with success state
      setIsSuccess(true);

      // Optional: Reset form after a delay or let user close the success message
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          service: '',
          projectDetails: '',
        });
        setActiveField(null);
        setIsSuccess(false);
      }, 5000); // Reset after 5 seconds

    } catch (error) {
      console.error('FAILED...', error);
      alert('Failed to send the message. Please try again or contact me directly via email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-black text-white py-32 px-6 md:px-10 min-h-screen flex flex-col items-center relative overflow-hidden">

      {/* Full Screen Loading Overlay */}
      <AnimatePresence>
        {isSubmitting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          >
            {/* Loading Circle Animation */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-20 h-20 border-4 border-white/20 border-t-white rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Message Overlay */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="absolute inset-0 z-40 flex flex-col items-start justify-center bg-black px-10 md:px-32"
          >
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-medium tracking-wide uppercase mb-10"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              THANK YOU!
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-4xl font-normal tracking-wide uppercase opacity-90 leading-tight mb-20"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              <p>YOUR REQUEST HAS BEEN REGISTERED.</p>
              <p>WE WILL GET BACK TO YOU AS SOON AS POSSIBLE.</p>
            </motion.div>

            {/* Back Button (O) */}
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
              onClick={() => setIsSuccess(false)}
              className="w-16 h-16 md:w-24 md:h-24 border-[6px] md:border-[8px] border-white rounded-full bg-transparent hover:bg-white/10 transition-colors duration-300"
              aria-label="Close success message"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <form ref={formRef} onSubmit={handleSubmit} className="max-w-[1440px] w-full flex flex-col md:flex-row justify-end px-4 relative z-10">
        
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
                            name={item.name}
                            autoFocus
                            value={formData[item.field]}
                            onChange={(e) => handleInputChange(item.field, e.target.value)}
                            placeholder={item.placeholder}
                            className="w-full bg-transparent border-b-2 border-white/60 focus:border-[#FF4D00] outline-none text-xl md:text-3xl font-medium tracking-wide py-2 transition-colors placeholder:text-white/10 resize-none min-h-[40px]"
                            style={{ fontFamily: 'var(--font-inter)' }}
                          />
                        ) : (
                          <input
                            name={item.name}
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
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
              className={`px-14 py-5 bg-white text-black rounded-full font-bold text-lg md:text-2xl uppercase tracking-[0.1em] transition-all duration-300 shadow-2xl ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#FF4D00] hover:text-white'
              }`}
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              {isSubmitting ? 'SENDING...' : 'SUBMIT'}
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
