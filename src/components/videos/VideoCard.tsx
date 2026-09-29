import React from 'react';
import { VideoItem } from '../../types';
import { useStore } from '../../context/StoreContext';
import { Play, Eye, Clock } from 'lucide-react';

interface VideoCardProps {
  video: VideoItem;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const { navigateTo, categories } = useStore();

  const categoryObj = categories.find(c => c.slug === video.category);
  const categoryName = categoryObj ? categoryObj.nameBn : video.category;

  return (
    <div
      onClick={() => navigateTo(`/video/${video.id}`)}
      className="group cursor-pointer flex flex-col rounded-xl overflow-hidden bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 hover:shadow-md transition-all duration-200"
    >
      {/* Thumbnail with Play Overlay */}
      <div className="relative aspect-video w-full overflow-hidden bg-stone-950">
        <img
          src={video.thumbnailUrl}
          alt={video.titleBn}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          referrerPolicy="no-referrer"
        />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-black/25 flex items-center justify-center group-hover:bg-black/40 transition-colors">
          <div className="w-10 h-10 rounded-full bg-white/90 text-stone-900 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Play className="w-4 h-4 fill-stone-900 ml-0.5" />
          </div>
        </div>

        {/* Duration badge */}
        <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/85 text-[11px] font-mono text-white tracking-wider">
          {video.duration}
        </span>
      </div>

      {/* Info */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
        <div>
          <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-1.5">
            <span className="text-emerald-700 dark:text-emerald-400 font-medium">{categoryName}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 font-mono">
              <Eye className="w-3 h-3" />
              {video.views.toLocaleString('bn-BD')}
            </span>
          </div>

          <h3 className="text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 line-clamp-2 leading-snug">
            {video.titleBn}
          </h3>

          <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 mt-1">
            {video.summaryBn}
          </p>
        </div>

        <div className="pt-2 border-t border-stone-100 dark:border-stone-800 text-[11px] text-stone-400 font-mono">
          প্রকাশিত: {video.publishedAt}
        </div>
      </div>
    </div>
  );
};
