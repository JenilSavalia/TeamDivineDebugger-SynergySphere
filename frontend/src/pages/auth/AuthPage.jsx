import React, { useEffect, useState } from 'react'
import { Routes, Route, NavLink, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';

function AuthPage() {


  // Testimonials data
  const testimonials = [
    {
      id: 1,
      quote:
        'The contract changes we made have allowed our company to close business faster, speeding our time to revenue and allowing us to develop better relationships with our customers.',
      name: 'Justin Widlund',
      title: 'Freshworks AGC',
      company: 'Freshworks',
      avatar: 'FW',
    },
    {
      id: 2,
      quote:
        'TermScout has revolutionized how we handle contract negotiations. What used to take weeks now takes days, and our legal team can focus on strategic work rather than routine reviews.',
      name: 'Sarah Chen',
      title: 'Legal Director',
      company: 'TechFlow Inc',
      avatar: 'SC',
    },
    {
      id: 3,
      quote:
        "The AI-powered contract analysis has been a game-changer for our procurement process. We've reduced contract review time by 70% and improved compliance across all departments.",
      name: 'Michael Rodriguez',
      title: 'Chief Procurement Officer',
      company: 'Global Dynamics',
      avatar: 'MR',
    },
    {
      id: 4,
      quote:
        "Implementation was seamless and the ROI was immediate. Our contract approval process is now 3x faster, and we've eliminated most of the back-and-forth that used to slow us down.",
      name: 'Emma Thompson',
      title: 'Operations Manager',
      company: 'InnovateCorp',
      avatar: 'ET',
    },
  ];

  const TestimonialSection = React.memo(() => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      // Auto-cycle through testimonials
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 3000);

      return () => clearInterval(interval);
    }, []);

    return (
      <div className='flex-1 w-[50%] bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-8 lg:p-16 relative overflow-hidden'>
        {/* Background decoration */}
        <div className='absolute inset-0 opacity-10'>
          <div className='absolute top-10 left-10 w-32 h-32 border border-white rounded-full'></div>
          <div className='absolute bottom-10 right-10 w-24 h-24 border border-white rounded-full'></div>
          <div className='absolute top-1/3 right-20 w-16 h-16 border border-white rounded-full'></div>
        </div>

        <div className='relative z-10 max-w-lg w-full'>
          {/* Testimonials Container with Fixed Sequential Sliding */}
          <div className='relative overflow-hidden h-[500px] w-full'>
            <motion.div
              className='flex h-full'
              animate={{
                transform: `translateX(-${(currentIndex * 100) / testimonials.length
                  }%)`,
              }}
              transition={{
                type: 'tween',
                duration: 0.6,
                ease: 'easeInOut',
              }}
              style={{
                width: `${testimonials.length * 100}%`,
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className='h-full flex flex-col justify-center px-4 py-8'
                  style={{
                    width: `${100 / testimonials.length}%`,
                    flexShrink: 0,
                  }}
                >
                  {/* Quote icon */}
                  <div className='mb-6'>
                    <svg
                      className='w-12 h-12 text-white opacity-60'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path d='M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z' />
                    </svg>
                  </div>

                  {/* Testimonial content */}
                  <blockquote className='text-white text-xl lg:text-2xl leading-relaxed mb-8 font-light'>
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Author info */}
                  <div className='flex items-center mt-auto'>
                    <div className='w-16 h-16 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center mr-6 border border-white border-opacity-30'>
                      <span className='text-white font-bold text-lg'>
                        {testimonial.avatar}
                      </span>
                    </div>
                    <div>
                      <div className='font-semibold text-white text-lg'>
                        {testimonial.name}
                      </div>
                      <div className='text-blue-100 text-sm'>
                        {testimonial.title}
                      </div>
                      <div className='text-blue-200 text-sm font-medium'>
                        {testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Progress indicators */}
          <div className='flex justify-center mt-12 space-x-2'>
            {testimonials.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                  ? 'bg-white w-8'
                  : 'bg-white bg-opacity-30'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className='flex'>
      <TestimonialSection />
      {/* Render nested route */}
      <Outlet />
    </div>
  );
}

export default AuthPage;
