// hooks/useTabTitle.js
import { useEffect, useRef } from 'react';

export const useTabTitle = (hiddenTitle: string, emoji: string) => {
  const originalTitle = useRef(document.title);
  const originalFavicon = createFavicon('😎')
  const newfavIcon = createFavicon(emoji);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = hiddenTitle;
        changeFavicon(newfavIcon);
      } else {
        document.title = originalTitle.current;
        changeFavicon(originalFavicon);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [hiddenTitle]);
};

export const createFavicon = (emoji: string) => {
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.font = '24px serif';
    ctx.fillText(emoji, 4, 24);
  }
  
  return canvas.toDataURL();
};

export const changeFavicon = (iconUrl: string) => {
  let favicon = document.querySelector("link[rel*='icon']") as HTMLLinkElement | null;
  
  if (!favicon) {
    favicon = document.createElement('link') as HTMLLinkElement;
    favicon.rel = 'icon';
    document.head.appendChild(favicon);
  }
  
  favicon.href = iconUrl;
};