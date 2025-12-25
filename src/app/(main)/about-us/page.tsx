"use client";

import React from "react";
import { aboutPageData } from "./about";
import dynamic from "next/dynamic";
import {
  HeroSection,
  PrimaryImageSection,
  IntroductionSection,
} from "./_components";

const WhoWeAreSection = dynamic(() =>
  import("./_components").then((mod) => mod.WhoWeAreSection)
);
const WhyDifferentSection = dynamic(() =>
  import("./_components").then((mod) => mod.WhyDifferentSection)
);
const TempleServiceSection = dynamic(() =>
  import("./_components").then((mod) => mod.TempleServiceSection)
);
const OurCallSection = dynamic(() =>
  import("./_components").then((mod) => mod.OurCallSection)
);
const GoalsSection = dynamic(() =>
  import("./_components").then((mod) => mod.GoalsSection)
);
const YourRoleSection = dynamic(() =>
  import("./_components").then((mod) => mod.YourRoleSection)
);

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-background pt-3">
      <HeroSection
        mainTitle={aboutPageData.mainTitle}
        subtitle="जब धर्म संकट में होता है, तब संकल्पों से संगठित होती है चेतना; और जब समाज दिशाहीन हो जाता है, तब सेवा बनती है शक्ति।"
      />

      <PrimaryImageSection image={aboutPageData.primaryImage} />

      <IntroductionSection introduction={aboutPageData.introduction} />

      <WhoWeAreSection whoWeAre={aboutPageData.sections.whoWeAre} />

      <WhyDifferentSection whyDifferent={aboutPageData.sections.whyDifferent} />

      {/* <WhyWeExistSection whyWeExist={aboutPageData.sections.whyWeExist} /> */}

      <TempleServiceSection />

      <OurCallSection ourCall={aboutPageData.sections.ourCall} />

      {/* <CommunityServiceSection /> */}

      <GoalsSection goals={aboutPageData.sections.goals} />

      <YourRoleSection yourRole={aboutPageData.sections.yourRole} />
    </div>
  );
};

export default AboutUsPage;
