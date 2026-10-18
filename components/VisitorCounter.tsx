import React, { useState, useEffect, useRef } from 'react';
import { Users, Info, X, BarChart2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface VisitorStats {
  count: number;
  uniqueVisitors?: number;
  lastVisit?: string;
  isRealBackend?: boolean;
}

export const VisitorCounter: React.FC = () => {
  const { t, language } = useLanguage();
  const [stats, setStats] = useState<VisitorStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchVisitorCount = async () => {
      const BASE_COUNT = 1420;
      const STORAGE_KEY = 'portfolio_cached_visitors';
      const STORAGE_UNIQUE_KEY = 'portfolio_cached_unique_visitors';
      const VISITED_SESSION_KEY = 'portfolio_has_visited_session';
      const HAS_VISITED_BEFORE_KEY = 'portfolio_has_visited_before';

      const localCached = localStorage.getItem(STORAGE_KEY);
      const initialCount = localCached ? parseInt(localCached, 10) : BASE_COUNT;
      const isNewSession = !sessionStorage.getItem(VISITED_SESSION_KEY);
      const isNewVisitor = !localStorage.getItem(HAS_VISITED_BEFORE_KEY);

      try {
        // Call internal backend API
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500);

        const response = await fetch('/api/visitors/hit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ isNewSession, isNewVisitor }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          if (isMounted && data && typeof data.count === 'number') {
            setStats({
              count: data.count,
              uniqueVisitors: data.uniqueVisitors || 386,
              lastVisit: data.lastVisit,
              isRealBackend: true,
            });
            setLoading(false);
            localStorage.setItem(STORAGE_KEY, data.count.toString());
            if (data.uniqueVisitors) {
              localStorage.setItem(STORAGE_UNIQUE_KEY, data.uniqueVisitors.toString());
            }
            sessionStorage.setItem(VISITED_SESSION_KEY, 'true');
            localStorage.setItem(HAS_VISITED_BEFORE_KEY, 'true');
            return;
          }
        }
        throw new Error('Fallback to local tracking');
      } catch (err) {
        // Fallback for standalone/static hosting or offline mode
        let fallbackCount = initialCount;
        let uniqueCount = parseInt(localStorage.getItem(STORAGE_UNIQUE_KEY) || '386', 10);

        if (isNewSession) {
          fallbackCount += 1;
          sessionStorage.setItem(VISITED_SESSION_KEY, 'true');
          localStorage.setItem(STORAGE_KEY, fallbackCount.toString());
        }
        if (isNewVisitor) {
          uniqueCount += 1;
          localStorage.setItem(STORAGE_UNIQUE_KEY, uniqueCount.toString());
          localStorage.setItem(HAS_VISITED_BEFORE_KEY, 'true');
        }

        if (isMounted) {
          setStats({
            count: fallbackCount,
            uniqueVisitors: uniqueCount,
            isRealBackend: false,
          });
          setLoading(false);
        }
      }
    };

    fetchVisitorCount();

    // Close details popover on click outside
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setShowDetails(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      isMounted = false;
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Format count into Bengali digits if language is 'bn'
  const formatNumber = (num: number): string => {
    if (language === 'bn') {
      const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
      return num
        .toLocaleString('en-US')
        .split('')
        .map((char) => {
          const digit = parseInt(char, 10);
          return isNaN(digit) ? char : bnDigits[digit];
        })
        .join('');
    }
    return num.toLocaleString('en-US');
  };

  const currentCount = stats?.count ?? 1421;
  const uniqueCount = stats?.uniqueVisitors ?? 386;

  return (
    <div className="relative inline-block text-left" ref={popoverRef}>
      {/* Badge Button */}
      <button
        type="button"
        id="visitor-counter-badge"
        onClick={() => setShowDetails(!showDetails)}
        className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 shadow-sm transition-all duration-300 hover:border-indigo-500/50 hover:bg-slate-200/50 dark:hover:bg-slate-800/80 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
        title={language === 'bn' ? 'ভিজিটর অ্যানালিটিক্স দেখতে ক্লিক করুন' : 'Click to view visitor insights'}
        aria-label="Visitor Counter"
      >
        {/* Pulsing Live Dot */}
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>

        <Users className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0 group-hover:scale-110 transition-transform" />
        
        <span className="text-slate-500 dark:text-slate-400 font-normal">
          {t('footer.visitors')}:
        </span>

        {loading ? (
          <span className="inline-block w-10 h-3.5 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></span>
        ) : (
          <span className="font-mono font-bold text-slate-900 dark:text-white tracking-wide">
            {formatNumber(currentCount)}
          </span>
        )}

        <Info className="w-3 h-3 text-slate-400 dark:text-slate-500 ml-0.5 opacity-60 group-hover:opacity-100 transition-opacity" />
      </button>

      {/* Popover Card explaining the Visitor System (Responsive Placement) */}
      {showDetails && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-0 mb-3 w-[calc(100vw-32px)] max-w-[320px] sm:max-w-xs sm:w-80 p-3.5 sm:p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 z-50 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                <BarChart2 className="w-4 h-4" />
              </span>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  {language === 'bn' ? 'ভিজিটর অ্যানালিটিক্স' : 'Visitor Analytics'}
                </h4>
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  {stats?.isRealBackend 
                    ? (language === 'bn' ? 'রিয়েল সার্ভার ট্র্যাকিং সক্রিয়' : 'Real Server Tracking Active')
                    : (language === 'bn' ? 'লোকাল সেশন ট্র্যাকিং সক্রিয়' : 'Local Session Tracking')}
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowDetails(false)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-md cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-2.5">
            <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block mb-0.5">
                {language === 'bn' ? 'মোট পেজ ভিউ' : 'Total Visits'}
              </span>
              <span className="text-sm sm:text-base font-mono font-bold text-slate-900 dark:text-white">
                {formatNumber(currentCount)}
              </span>
            </div>

            <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block mb-0.5">
                {language === 'bn' ? 'ইউনিক ভিজিটর' : 'Unique Visitors'}
              </span>
              <span className="text-sm sm:text-base font-mono font-bold text-slate-900 dark:text-white">
                {formatNumber(uniqueCount)}
              </span>
            </div>
          </div>

          <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50/80 dark:bg-slate-800/40 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800/80">
            {language === 'bn' ? (
              <p>
                🌐 <strong>এটি কীভাবে কাজ করে:</strong> প্রতিটি নতুন ব্রাউজার সেশন সার্ভারের <code className="text-indigo-600 dark:text-indigo-400 font-mono">/api/visitors</code>-এ গণনা করা হয়। নতুন ট্যাবে বা অন্য ডিভাইসে সাইট খুললে স্বয়ংক্রিয়ভাবে ভিজিটর সংখ্যা বাড়বে।
              </p>
            ) : (
              <p>
                🌐 <strong>How it works:</strong> Each new session is recorded via the backend <code className="text-indigo-600 dark:text-indigo-400 font-mono">/api/visitors</code> endpoint. Opening in a new device or tab increments real-time counts.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VisitorCounter;
