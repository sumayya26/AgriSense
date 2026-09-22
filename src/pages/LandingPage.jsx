import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import DemoVideo from '../components/DemoVideo';
import WhyChoose from '../components/WhyChoose';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <HowItWorks />
      <DemoVideo />
      <WhyChoose />
      <CTA />
      <Footer />
    </>
  );
};

export default LandingPage;
