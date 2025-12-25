export interface VideoInfo {
  title: string;
  duration: string;
  description: string;
  videoSrc: string;
  posterSrc: string;
}

export interface IntroSection {
  title: string;
  description: string;
  joinButtonText: string;
  learnMoreButtonText: string;
}

export interface RecognitionLogo {
  id: number;
  name: string;
  imageUrl: string;
  alt: string;
  order?: number;
}

export interface SupportersData {
  organizationName: string;
  mainSubtitle: string;
  videoInfo: VideoInfo;
  introSection: IntroSection;
  recognitionLogos: RecognitionLogo[];
}
