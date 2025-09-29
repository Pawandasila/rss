export interface PressItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  publishDate: string;
  publication: string;
  category: 'newspaper' | 'magazine' | 'digital' | 'award';
}

// Extracted press coverage data from your carousel
export const pressData: PressItem[] = [
  {
    id: 'press-1',
    title: 'RSS Community Initiative Coverage',
    description: 'Major newspaper coverage of RSS community development initiatives and social programs',
    imageUrl: 'https://joinrss.org.in/wp-content/uploads/2025/08/WhatsApp-Image-2025-08-09-at-8.41.40-PM.webp',
    publishDate: '2025-08-09',
    publication: 'Local Daily',
    category: 'newspaper'
  },
  {
    id: 'press-2',
    title: 'RSS Training Program Recognition',
    description: 'Press coverage highlighting the impact of RSS training and development programs',
    imageUrl: 'https://joinrss.org.in/wp-content/uploads/2025/08/WhatsApp-Image-2025-08-09-at-8.41.41-PM-1.webp',
    publishDate: '2025-08-09',
    publication: 'Regional Times',
    category: 'newspaper'
  },
  {
    id: 'press-3',
    title: 'Community Service Awards',
    description: 'Recognition for outstanding community service and social welfare activities',
    imageUrl: 'https://joinrss.org.in/wp-content/uploads/2025/08/WhatsApp-Image-2025-08-09-at-8.41.41-PM-2.webp',
    publishDate: '2025-08-09',
    publication: 'City Herald',
    category: 'award'
  },
  {
    id: 'press-4',
    title: 'Cultural Heritage Preservation',
    description: 'Media coverage of RSS efforts in preserving and promoting cultural heritage',
    imageUrl: 'https://joinrss.org.in/wp-content/uploads/2025/08/WhatsApp-Image-2025-08-09-at-8.41.42-PM-e1755609759576.webp',
    publishDate: '2025-08-09',
    publication: 'Heritage Weekly',
    category: 'magazine'
  },
  {
    id: 'press-5',
    title: 'Youth Development Program Success',
    description: 'Press coverage of successful youth development and leadership programs',
    imageUrl: 'https://joinrss.org.in/wp-content/uploads/2025/08/WhatsApp-Image-2025-08-09-at-8.41.43-PM-e1755610220591.webp',
    publishDate: '2025-08-09',
    publication: 'Youth Tribune',
    category: 'digital'
  },
  {
    id: 'press-6',
    title: 'Educational Initiative Recognition',
    description: 'Recognition for educational initiatives and scholarship programs',
    imageUrl: 'https://joinrss.org.in/wp-content/uploads/2025/08/WhatsApp-Image-2025-08-09-at-8.41.44-PM.webp',
    publishDate: '2025-08-09',
    publication: 'Education Today',
    category: 'magazine'
  },
  {
    id: 'press-7',
    title: 'Social Welfare Programs',
    description: 'Coverage of comprehensive social welfare and community outreach programs',
    imageUrl: 'https://joinrss.org.in/wp-content/uploads/2025/08/WhatsApp-Image-2025-08-09-at-8.41.44-PM-1.webp',
    publishDate: '2025-08-09',
    publication: 'Social Impact Journal',
    category: 'magazine'
  },
  {
    id: 'press-8',
    title: 'Environmental Conservation Efforts',
    description: 'Press coverage of environmental conservation and sustainability initiatives',
    imageUrl: 'https://joinrss.org.in/wp-content/uploads/2025/08/WhatsApp-Image-2025-08-09-at-8.41.45-PM.webp',
    publishDate: '2025-08-09',
    publication: 'Green News',
    category: 'digital'
  },
  {
    id: 'press-9',
    title: 'Annual Achievement Awards',
    description: 'Annual awards ceremony coverage recognizing outstanding achievements',
    imageUrl: 'https://joinrss.org.in/wp-content/uploads/2025/08/WhatsApp-Image-2025-08-09-at-8.43.47-PM.webp',
    publishDate: '2025-08-09',
    publication: 'Achievement Weekly',
    category: 'award'
  },
  {
    id: 'press-10',
    title: 'Leadership Development Coverage',
    description: 'Media coverage of leadership development programs and their impact',
    imageUrl: 'https://joinrss.org.in/wp-content/uploads/2025/07/WhatsApp-Image-2025-07-21-at-6.29.51-PM-1.jpeg',
    publishDate: '2025-07-21',
    publication: 'Leadership Daily',
    category: 'newspaper'
  },
  {
    id: 'press-11',
    title: 'Community Building Success',
    description: 'Press feature on successful community building and social cohesion initiatives',
    imageUrl: 'https://joinrss.org.in/wp-content/uploads/2025/07/WhatsApp-Image-2025-07-21-at-6.29.52-PM.jpeg',
    publishDate: '2025-07-21',
    publication: 'Community Voice',
    category: 'newspaper'
  },
  {
    id: 'press-12',
    title: 'Cultural Festival Coverage',
    description: 'Extensive coverage of cultural festivals and traditional celebrations',
    imageUrl: 'https://joinrss.org.in/wp-content/uploads/2025/07/WhatsApp-Image-2025-07-21-at-6.29.53-PM-e1755609987976.jpeg',
    publishDate: '2025-07-21',
    publication: 'Cultural Times',
    category: 'magazine'
  },
  {
    id: 'press-13',
    title: 'Innovation in Education',
    description: 'Coverage of innovative educational approaches and methodologies',
    imageUrl: 'https://joinrss.org.in/wp-content/uploads/2025/07/WhatsApp-Image-2025-07-21-at-6.29.58-PM-e1753257065839.jpeg',
    publishDate: '2025-07-21',
    publication: 'Innovation Journal',
    category: 'digital'
  },
  {
    id: 'press-14',
    title: 'Volunteer Recognition Program',
    description: 'Special recognition for outstanding volunteer contributions and service',
    imageUrl: 'https://joinrss.org.in/wp-content/uploads/2025/07/WhatsApp-Image-2025-07-21-at-6.29.59-PM.jpeg',
    publishDate: '2025-07-21',
    publication: 'Volunteer Tribune',
    category: 'award'
  },
  {
    id: 'press-15',
    title: 'Excellence in Service Award',
    description: 'Prestigious award for excellence in community service and social impact',
    imageUrl: 'https://joinrss.org.in/wp-content/uploads/2025/07/WhatsApp-Image-2025-07-21-at-6.29.59-PM-1.jpeg',
    publishDate: '2025-07-21',
    publication: 'Excellence Awards',
    category: 'award'
  },
  {
    id: 'press-16',
    title: 'National Recognition Feature',
    description: 'National media coverage highlighting significant contributions and achievements',
    imageUrl: 'https://joinrss.org.in/wp-content/uploads/2025/07/WhatsApp-Image-2025-07-21-at-6.30.00-PM-e1755610084123.jpeg',
    publishDate: '2025-07-21',
    publication: 'National Daily',
    category: 'newspaper'
  },
  {
    id: 'press-17',
    title: 'Digital Innovation Coverage',
    description: 'Coverage of digital transformation and innovation initiatives',
    imageUrl: 'https://joinrss.org.in/wp-content/uploads/2025/07/WhatsApp-Image-2025-07-21-at-6.30.02-PM-2.jpeg',
    publishDate: '2025-07-21',
    publication: 'Tech Today',
    category: 'digital'
  },
  {
    id: 'press-18',
    title: 'Media Partnership Success',
    description: 'Successful media partnerships and collaborative initiatives coverage',
    imageUrl: 'https://joinrss.org.in/wp-content/uploads/2025/07/WhatsApp-Image-2025-07-21-at-6.30.03-PM.jpeg',
    publishDate: '2025-07-21',
    publication: 'Media Network',
    category: 'magazine'
  }
];

// Press categories for filtering
export const pressCategories = [
  { key: 'all', label: 'All Coverage', icon: '📰' },
  { key: 'newspaper', label: 'Newspapers', icon: '📰' },
  { key: 'magazine', label: 'Magazines', icon: '📖' },
  { key: 'digital', label: 'Digital Media', icon: '💻' },
  { key: 'award', label: 'Awards', icon: '🏆' }
];

// Utility functions
export const getPressByCategory = (category: string): PressItem[] => {
  if (category === 'all') return pressData;
  return pressData.filter(item => item.category === category);
};

export const formatPressDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

export const getRecentPress = (count: number = 6): PressItem[] => {
  return pressData
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, count);
};