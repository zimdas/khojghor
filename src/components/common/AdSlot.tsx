import React from 'react';
import { useStore } from '../../context/StoreContext';
import { AdPlacement } from '../../types';

interface AdSlotProps {
  location: AdPlacement['location'];
  className?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({ location, className = '' }) => {
  const { ads, routeInfo } = useStore();

  const ad = ads.find(a => a.location === location);

  if (!ad || !ad.enabled) {
    return null;
  }

  // Check page target
  if (ad.pageTarget === 'homepage' && routeInfo.path !== '/') return null;
  if (ad.pageTarget === 'articles' && !routeInfo.path.startsWith('/article/')) return null;
  if (ad.pageTarget === 'tools' && !routeInfo.path.startsWith('/tools')) return null;
  if (ad.pageTarget === 'videos' && !routeInfo.path.startsWith('/videos') && !routeInfo.path.startsWith('/video/')) return null;

  return (
    <div 
      className={`ad-container my-3 overflow-hidden text-center ${ad.deviceTarget === 'desktop' ? 'hidden md:block' : ''} ${ad.deviceTarget === 'mobile' ? 'block md:hidden' : ''} ${className}`}
      dangerouslySetInnerHTML={{ __html: ad.code }}
    />
  );
};
