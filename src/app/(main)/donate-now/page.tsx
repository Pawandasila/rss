import React from 'react';
import { HeroSection, ImpactSection, DonationForm } from './_components';

const DonateNowPage = () => {
  return (
    <div className="min-h-screen bg-background pt-3">
      <HeroSection />
      <ImpactSection />
      <DonationForm />
    </div>
  );
};

export default DonateNowPage;
