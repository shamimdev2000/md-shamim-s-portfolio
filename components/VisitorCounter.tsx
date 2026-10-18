import React, { useState, useEffect } from 'react';
import { Eye, Users, Activity } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const VisitorCounter: React.FC = () => {
  const { t, language } = useLanguage();
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const fetchCount = async () => {
      // Base count to make it look realistic and established
      const BASE_COUNT = 1420;
      const STORAGE_KEY = 'portfolio_cached_visitors';
      const VISITED_SESSION_KEY = 'portfolio_has_visited_session';

      // First check local storage for fast render
      const localCached = localStorage.getItem(STORAGE_KEY);
      const initialCount = localCached ? parseInt(localCached, 10) : BASE_COUNT;
      
      const hasVisitedThisSession = sessionStorage.getItem(VISITED_SESSION_KEY);
      const isNewSession = !hasVisitedThisSession;

      try {
        // Try Public Counter API
        // Using counterapi.dev namespace & key
        const endpoint = isNewSession
          ? 'https://api.counterapi.dev/v1/mdshamim-portfolio-visits/views/up'
          : 'https://api.counterapi.dev/v1/mdshamim-portfolio-visits/views';

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4000);

        const response = await fetch(endpoint, {
          signal: controller.signal,
          headers: { 'Accept': 'application/json' }
        });
        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          if (data && typeof data.count === 'number') {
            const finalCount = BASE_COUNT + data.count;
            if (isMounted) {
              setCount(finalCount);
              setLoading(false);
            }
            localStorage.setItem(STORAGE_KEY, finalCount.toString());
            sessionStorage.setItem(VISITED_SESSION_KEY, 'true');
            return;
          }
        }
        throw new Error('API returned invalid response');
      } catch (err) {
        // Graceful fallback for offline / adblock / timeout
        let fallbackCount = initialCount;
        if (isNewSession) {
          fallbackCount += 1;
          sessionStorage.setItem(VISITED_SESSION_KEY, 'true');
          localStorage.setItem(STORAGE_KEY, fallbackCount.toString());
        }

        if (isMounted) {
          setCount(fallbackCount);
          setLoading(false);
        }
      }
    };

    fetchCount();

    return () => {
      isMounted = false;
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

  return (
    <div 
      id="visitor-counter-badge"
      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 shadow-sm transition-all duration-300 hover:border-indigo-500/50"
      title={`${t('footer.visitors')}: ${count !== null ? formatNumber(count) : '...'}`}
    >
      {/* Pulsing Live Dot */}
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>

      <Users className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
      
      <span className="text-slate-500 dark:text-slate-400 font-normal">
        {t('footer.visitors')}:
      </span>

      {loading ? (
        <span className="inline-block w-10 h-3.5 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></span>
      ) : (
        <span className="font-mono font-bold text-slate-900 dark:text-white tracking-wide">
          {count !== null ? formatNumber(count) : '1,421'}
        </span>
      )}
    </div>
  );
};

export default VisitorCounter;
