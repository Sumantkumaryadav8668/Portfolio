import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Zap, Code, RotateCw } from 'lucide-react';
import { achievementsData } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

interface LeetCodeStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number;
  totalSubmissions: number;
  activeDays: number;
  streak: number;
  badgesCount: number;
  easyTotal: number;
  mediumTotal: number;
  hardTotal: number;
  totalQuestions: number;
}

export const AchievementsSection: React.FC = () => {
  const { t } = useLanguage();
  const awards = achievementsData.filter((a) => a.category !== 'coding');

  const [leetcodeData, setLeetcodeData] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const fetchLeetCodeData = (forceRefresh = false) => {
    if (forceRefresh) setRefreshing(true);
    else setLoading(true);

    const url = forceRefresh ? '/api/leetcode?refresh=true' : '/api/leetcode';
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('API response failed');
        return res.json();
      })
      .then((data) => {
        if (data && typeof data.totalSolved === 'number') {
          setLeetcodeData(data);
          setError(false);
        } else {
          setError(true);
        }
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    fetchLeetCodeData();
  }, []);

  const leetCodeBreakdown = leetcodeData
    ? [
        { label: 'Easy', solved: leetcodeData.easySolved, total: leetcodeData.easyTotal, color: 'bg-emerald-500' },
        { label: 'Medium', solved: leetcodeData.mediumSolved, total: leetcodeData.mediumTotal, color: 'bg-amber-500' },
        { label: 'Hard', solved: leetcodeData.hardSolved, total: leetcodeData.hardTotal, color: 'bg-rose-500' }
      ]
    : [];

  return (
    <section id="achievements" className="py-20 px-6 border-t border-slate-200/80 dark:border-slate-800/80 relative max-w-6xl mx-auto">
      <div className="flex flex-col space-y-3 mb-12 text-center">
        <h2 className="text-xs uppercase tracking-widest font-extrabold text-blue-600 dark:text-blue-400">{t('achievements.heading_tag')}</h2>
        <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">{t('achievements.heading_title')}</p>
        <div className="w-12 h-1 bg-blue-600 dark:bg-blue-500 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LeetCode & Competitive Coding Card */}
        <div className="lg:col-span-6 card card-elevated p-6 space-y-5">
          <div className="flex items-center space-x-3 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{t('achievements.coding_title')}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Performance on LeetCode & GeeksforGeeks</p>
            </div>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 rounded-xl animate-pulse space-y-2 text-center">
                <p className="text-xs text-slate-500 dark:text-slate-400">Loading LeetCode stats...</p>
              </div>
            ) : error || !leetcodeData ? (
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 rounded-xl text-center space-y-1">
                <p className="text-xs text-slate-500 dark:text-slate-400">Unable to load LeetCode stats.</p>
                <button
                  onClick={() => fetchLeetCodeData(true)}
                  className="text-[11px] text-blue-600 dark:text-blue-400 underline hover:text-slate-900 dark:hover:text-white"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-slate-900 dark:text-white">LeetCode ({leetcodeData.totalSolved} Solved)</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-600 dark:text-blue-400">
                      {leetcodeData.ranking > 0 ? `Rank #${leetcodeData.ranking.toLocaleString()}` : 'Knight Tier'}
                    </span>
                    <button
                      onClick={() => fetchLeetCodeData(true)}
                      disabled={refreshing}
                      className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors rounded hover:bg-slate-100 dark:hover:bg-slate-800"
                      title="Refresh Stats"
                    >
                      <RotateCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 rounded-xl p-3.5">
                  {leetCodeBreakdown.map((item, idx) => {
                    const percentage = item.total > 0 ? (item.solved / item.total) * 100 : 0;
                    return (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-[10px] font-medium text-slate-600 dark:text-slate-400">
                          <span>{item.label} ({item.solved}/{item.total})</span>
                          <span>{percentage < 1 && percentage > 0 ? percentage.toFixed(1) : Math.round(percentage)}%</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${Math.max(percentage, 2)}%` }}
                            viewport={{ once: true }}
                            className={`${item.color} h-full`}
                          ></motion.div>
                        </div>
                      </div>
                    );
                  })}

                  <div className="grid grid-cols-4 gap-2 pt-2.5 mt-2.5 border-t border-slate-200 dark:border-slate-700 text-center">
                    <div className="bg-white dark:bg-slate-800 p-1.5 rounded-lg border border-slate-200/60 dark:border-slate-700">
                      <span className="text-[9px] text-slate-500 dark:text-slate-400 uppercase font-bold block">Submissions</span>
                      <span className="text-xs font-extrabold text-slate-900 dark:text-white">{leetcodeData.totalSubmissions}</span>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-1.5 rounded-lg border border-slate-200/60 dark:border-slate-700">
                      <span className="text-[9px] text-slate-500 dark:text-slate-400 uppercase font-bold block">Active</span>
                      <span className="text-xs font-extrabold text-slate-900 dark:text-white">{leetcodeData.activeDays}d</span>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-1.5 rounded-lg border border-slate-200/60 dark:border-slate-700">
                      <span className="text-[9px] text-slate-500 dark:text-slate-400 uppercase font-bold block">Streak</span>
                      <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400">{leetcodeData.streak}d</span>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-1.5 rounded-lg border border-slate-200/60 dark:border-slate-700">
                      <span className="text-[9px] text-slate-500 dark:text-slate-400 uppercase font-bold block">Badges</span>
                      <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">{leetcodeData.badgesCount}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 rounded-xl p-3 text-center space-y-0.5">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold block">GeeksforGeeks</span>
                <span className="text-lg font-extrabold text-blue-600 dark:text-blue-400">Rank #5</span>
                <span className="text-[9px] text-slate-500 dark:text-slate-400 block">Out of 15,000+ users</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 rounded-xl p-3 text-center space-y-0.5">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold block">CodeChef</span>
                <span className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">4 Star</span>
                <span className="text-[9px] text-slate-500 dark:text-slate-400 block">Max Rating: 1850+</span>
              </div>
            </div>
          </div>
        </div>

        {/* Milestone Awards Column */}
        <div className="lg:col-span-6 space-y-4">
          {awards.map((award, index) => {
            return (
              <motion.div
                key={award.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="card card-hover p-5 flex space-x-4 items-start"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0">
                  {award.category === 'award' ? <Award className="w-5 h-5" /> : <Zap className="w-5 h-5" />}
                </div>

                <div className="space-y-1.5 flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[9px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">{award.issuer} • {award.date}</span>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">{award.title}</h3>
                    </div>
                    {award.metric && (
                      <span className="text-[10px] text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 px-2 py-0.5 rounded font-semibold whitespace-nowrap">
                        {award.metric}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {award.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
