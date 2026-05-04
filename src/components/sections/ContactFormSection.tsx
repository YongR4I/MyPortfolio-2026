"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactFormSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in your name, email, and message.');
      return;
    }

    setIsSubmitting(true);

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

      await emailjs.send(
        serviceId,
        templateId,
        {
          user_name: formData.name,
          user_email: formData.email,
          message: formData.message,
        },
        publicKey
      );

      setIsSuccess(true);

      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          message: '',
        });
        setIsSuccess(false);
      }, 5000);

    } catch (error) {
      console.error('FAILED...', error);
      alert('Failed to send the message. Please try again or contact me directly via email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-black text-white min-h-screen py-24 md:py-32 px-6 md:px-10 lg:px-20 relative overflow-hidden flex flex-col justify-center items-center">

      {/* Loading Overlay */}
      <AnimatePresence>
        {isSubmitting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-16 h-16 border-4 border-white/20 border-t-[#FF442B] rounded-full"
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
            className="absolute inset-0 z-[90] flex flex-col items-center justify-center text-center bg-black px-6 md:px-10"
          >
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              THANK YOU!
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl font-normal opacity-70 leading-relaxed mb-12 max-w-xl"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              <p>Your request has been successfully sent.</p>
              <p>I will get back to you as soon as possible.</p>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
              onClick={() => setIsSuccess(false)}
              className="px-8 py-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors"
            >
              Close
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[1280px] w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative z-10">
        
        {/* Left Column: Info */}
        <div className="lg:col-span-5 flex flex-col justify-start">
          <div className="flex items-center gap-3 mb-10 md:mb-16">
            <div className="w-2 h-2 bg-[#FF442B] rounded-sm"></div>
            <span className="font-medium text-sm tracking-wide text-white/90" style={{ fontFamily: 'var(--font-inter)' }}>Let's Work Together</span>
          </div>

          <div className="mb-10">
            <h2 className="text-5xl md:text-6xl lg:text-[72px] font-bold tracking-tight leading-[1.05] mb-6" style={{ fontFamily: 'var(--font-inter)' }}>
              Contact Me!
            </h2>
            <p className="text-[#A1A1AA] text-base md:text-lg leading-relaxed max-w-md" style={{ fontFamily: 'var(--font-inter)' }}>
              Let's create something amazing together! Reach out I'd love to hear about your project and ideas.
            </p>
          </div>

          <div className="flex flex-col gap-4 mb-12">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-[#FF442B]/10 flex items-center justify-center text-[#FF442B] font-light text-sm">
                +
              </div>
              <span className="text-sm font-medium text-white/80" style={{ fontFamily: 'var(--font-inter)' }}>24/7 Full Time Support</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-[#FF442B]/10 flex items-center justify-center text-[#FF442B] font-light text-sm">
                +
              </div>
              <span className="text-sm font-medium text-white/80" style={{ fontFamily: 'var(--font-inter)' }}>Available Worldwide</span>
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="lg:col-span-7">
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name*"
              className="w-full bg-[#111111] border border-transparent rounded-xl px-6 py-5 text-white placeholder:text-[#666666] focus:outline-none focus:border-white/10 transition-colors"
              style={{ fontFamily: 'var(--font-inter)' }}
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email*"
              className="w-full bg-[#111111] border border-transparent rounded-xl px-6 py-5 text-white placeholder:text-[#666666] focus:outline-none focus:border-white/10 transition-colors"
              style={{ fontFamily: 'var(--font-inter)' }}
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Message*"
              rows={7}
              className="w-full bg-[#111111] border border-transparent rounded-xl px-6 py-5 text-white placeholder:text-[#666666] focus:outline-none focus:border-white/10 transition-colors resize-none"
              style={{ fontFamily: 'var(--font-inter)' }}
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-5 rounded-xl font-semibold tracking-wide text-base transition-all duration-300 mt-2 ${
                isSubmitting ? 'bg-white/50 cursor-not-allowed text-black' : 'bg-white text-black hover:bg-[#FF442B] hover:text-white'
              }`}
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              {isSubmitting ? 'Sending...' : 'Submit Now'}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
