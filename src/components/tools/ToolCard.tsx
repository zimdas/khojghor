import React from 'react';
import { ToolItem } from '../../types';
import { useStore } from '../../context/StoreContext';
import { ExternalLink, Star, ArrowRight, BookOpen } from 'lucide-react';

interface ToolCardProps {
  tool: ToolItem;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const { navigateTo } = useStore();

  const handleCardClick = () => {
    navigateTo(`/tool/${tool.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group cursor-pointer flex flex-col justify-between p-5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 hover:shadow-md transition-all duration-200"
    >
      <div className="space-y-4">
        {/* Top Header: Logo, Name, Pricing */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src={tool.logo}
              alt={tool.name}
              className="w-11 h-11 rounded-lg object-cover border border-stone-200 dark:border-stone-800 shrink-0"
              referrerPolicy="no-referrer"
            />
            <div>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {tool.name}
              </h3>
              <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                <span className="capitalize">{tool.category}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-0.5 text-amber-500 font-mono">
                  <Star className="w-3 h-3 fill-amber-500" />
                  {tool.rating}
                </span>
              </div>
            </div>
          </div>

          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
            tool.pricing === 'Free' 
              ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400' 
              : tool.pricing === 'Freemium'
              ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400'
              : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
          }`}>
            {tool.pricing}
          </span>
        </div>

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed">
          {tool.descriptionBn}
        </p>

        {/* Key Features (Unboxed list) */}
        <div className="space-y-1 pt-1">
          {tool.featuresBn.slice(0, 2).map((feat, idx) => (
            <div key={idx} className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400">
              <span className="text-emerald-600 font-bold">•</span>
              <span className="truncate">{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="pt-4 mt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
        <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
          <span>রিভিউ ও গাইড</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </span>

        <a
          href={tool.affiliateUrl || tool.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
          title="অফিসিয়াল সাইট"
          aria-label={`${tool.name} official website`}
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
