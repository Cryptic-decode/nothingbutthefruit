export const siteConfig = {
  name: 'Nothing But The Fruit',
  title: 'Nothing But The Fruit Podcast',
  url: 'https://nothingbutthefruit.com',
  description:
    'Biblical teaching with Pastor Demetria Bass to help believers grow deeper in faith and bear lasting fruit.',
  organizationName: 'Bass Global Ministries',
  authorName: 'Pastor Demetria Bass',
  youtubeUrl: 'https://www.youtube.com/@nothingbutthefruit',
  facebookUrl: 'https://www.facebook.com/nothingbutthefruit',
} as const;

export const entityIds = {
  website: `${siteConfig.url}/#website`,
  organization: `${siteConfig.url}/#organization`,
  author: `${siteConfig.url}/about#pastor-demetria-bass`,
  podcast: `${siteConfig.url}/#podcast`,
} as const;
