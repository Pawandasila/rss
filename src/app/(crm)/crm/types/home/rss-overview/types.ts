export interface RSSInfoTab {
  id: string;
  title: string;
  icon: string;
  content: string;
  points: string[];
  image: string;
}

export interface RSSOverviewData {
  badgeText: string;
  mainTitle: string;
  mainSubtitle: string;
  tabs: RSSInfoTab[];
}
