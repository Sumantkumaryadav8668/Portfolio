import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Zap, Code, RotateCw } from 'lucide-react';
import { achievementsData } from '../data/portfolioData';

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
        { label: 'Hard', solved: leetcodeData.hardSolved, total: leetcodeData.hardTotal, color: 'bg-red-500' }
      ]
    : [];

  return (
    <section id="achievements" className="py-24 px-6 border-t border-brand-border/40 relative max-w-7xl mx-auto">
      <div className="flex flex-col space-y-4 mb-16 text-center">
        <h2 className="text-xs uppercase tracking-widest font-extrabold text-brand-accent">Achievements</h2>
        <p className="text-3xl sm:text-4xl font-extrabold text-brand-text">Milestones & Competitive Coding</p>
        <div className="w-12 h-1 bg-brand-primary mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-6 bg-brand-card/15 border border-brand-border/60 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-brand-text">Coding Profiles Breakdown</h3>
              <p className="text-xs text-brand-muted">Performance on LeetCode & GeeksforGeeks</p>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-brand-border/20">
            {loading ? (
              <div className="p-4 bg-brand-bg/50 border border-brand-border/40 rounded-2xl animate-pulse space-y-3">
                <p className="text-xs text-brand-muted text-center py-2">Loading LeetCode data...</p>
                <div className="h-4 bg-brand-bgSec/80 rounded w-1/2 mx-auto"></div>
                <div className="h-2 bg-brand-bgSec/60 rounded w-full"></div>
                <div className="h-2 bg-brand-bgSec/60 rounded w-full"></div>
                <div className="h-2 bg-brand-bgSec/60 rounded w-full"></div>
              </div>
            ) : error || !leetcodeData ? (
              <div className="p-4 bg-brand-bg/50 border border-brand-border/40 rounded-2xl text-center space-y-2">
                <p className="text-xs text-brand-muted">Unable to load LeetCode data.</p>
                <button
                  onClick={() => fetchLeetCodeData(true)}
                  className="text-[10px] text-brand-accent underline hover:text-brand-text transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center text-xs font-semibold mb-1">
                  <span className="text-brand-text">LeetCode ({leetcodeData.totalSolved} Solved)</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-brand-accent">
                      {leetcodeData.ranking > 0 ? `Rank #${leetcodeData.ranking.toLocaleString()}` : 'Knight Tier'}
                    </span>
                    <button
                      onClick={() => fetchLeetCodeData(true)}
                      disabled={refreshing}
                      className="p-1 text-brand-muted hover:text-brand-accent transition-colors rounded-lg hover:bg-brand-bgSec/60"
                      title="Fetch Latest LeetCode Data"
                    >
                      <RotateCw className={`w-3 h-3 ${refreshing ? 'animate-spin' : ''}`} />
                    </button>
                  </div>
                </div>
                <div className="space-y-2 bg-brand-bg/50 border border-brand-border/40 rounded-2xl p-4">
                  {leetCodeBreakdown.map((item, idx) => {
                    const percentage = item.total > 0 ? (item.solved / item.total) * 100 : 0;
                    return (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-[10px] font-medium text-brand-muted">
                          <span>{item.label} ({item.solved}/{item.total})</span>
                          <span>{percentage < 1 && percentage > 0 ? percentage.toFixed(1) : Math.round(percentage)}%</span>
                        </div>
                        <div className="w-full bg-brand-bgSec/60 rounded-full h-1.5 overflow-hidden">
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

                  <div className="grid grid-cols-4 gap-2 pt-3 mt-3 border-t border-brand-border/20 text-center">
                    <div className="bg-brand-bgSec/40 p-2 rounded-xl border border-brand-border/30">
                      <span className="text-[9px] text-brand-muted uppercase font-bold block">Submissions</span>
                      <span className="text-xs font-extrabold text-brand-text">{leetcodeData.totalSubmissions}</span>
                    </div>
                    <div className="bg-brand-bgSec/40 p-2 rounded-xl border border-brand-border/30">
                      <span className="text-[9px] text-brand-muted uppercase font-bold block">Active Days</span>
                      <span className="text-xs font-extrabold text-brand-text">{leetcodeData.activeDays}d</span>
                    </div>
                    <div className="bg-brand-bgSec/40 p-2 rounded-xl border border-brand-border/30">
                      <span className="text-[9px] text-brand-muted uppercase font-bold block">Max Streak</span>
                      <span className="text-xs font-extrabold text-brand-accent">{leetcodeData.streak}d</span>
                    </div>
                    <div className="bg-brand-bgSec/40 p-2 rounded-xl border border-brand-border/30">
                      <span className="text-[9px] text-brand-muted uppercase font-bold block">Badges</span>
                      <span className="text-xs font-extrabold text-brand-success">{leetcodeData.badgesCount}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-brand-bg/50 border border-brand-border/40 rounded-2xl p-4 text-center space-y-1">
                <span className="text-[10px] text-brand-muted uppercase font-bold block">GeeksforGeeks</span>
                <span className="text-xl font-extrabold text-brand-accent">Rank #5</span>
                <span className="text-[9px] text-brand-muted block">Out of 15,000+ users</span>
              </div>
              <div className="bg-brand-bg/50 border border-brand-border/40 rounded-2xl p-4 text-center space-y-1">
                <span className="text-[10px] text-brand-muted uppercase font-bold block">CodeChef</span>
                <span className="text-xl font-extrabold text-brand-success">4 Star</span>
                <span className="text-[9px] text-brand-muted block">Max Rating: 1850+</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-6">
          {awards.map((award, index) => {
            return (
              <motion.div
                key={award.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-brand-card/25 border border-brand-border/60 hover:border-brand-accent/40 rounded-2xl p-6 flex space-x-4 items-start shadow-md relative group transition-colors animate-none"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-accent border border-brand-primary/20 flex-shrink-0 group-hover:bg-brand-primary/25 transition-colors">
                  {award.category === 'award' ? <Award className="w-6 h-6" /> : <Zap className="w-6 h-6" />}
                </div>

                <div className="space-y-2 flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[9px] text-brand-muted uppercase font-bold tracking-wider">{award.issuer} • {award.date}</span>
                      <h3 className="text-lg font-bold text-brand-text group-hover:text-brand-accent transition-colors">{award.title}</h3>
                    </div>
                    {award.metric && (
                      <span className="text-[10px] text-brand-accent bg-brand-primary/10 border border-brand-primary/20 px-2 py-0.5 rounded-lg font-semibold whitespace-nowrap">
                        {award.metric}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-brand-muted leading-relaxed">
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
