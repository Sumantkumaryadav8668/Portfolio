import React, { useState, useEffect } from 'react';
import { GitCommit, Activity, Flame, FolderGit2, BookOpen, RotateCw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const CURRENT_LEARNING_CONFIG = {
  title: 'Current Learning',
  value: 'System & Distributed Design',
  desc: 'Exploring microservice data schemas'
};

interface LanguageItem {
  label: string;
  percentage: number;
  color: string;
}

interface GitHubStats {
  username: string;
  totalContributions: number;
  publicRepositories: number;
  languages: LanguageItem[];
  heatmap: number[][];
  starsReceived: number;
  followers: number;
}

export const DashboardSection: React.FC = () => {
  const { t } = useLanguage();
  const [githubStats, setGithubStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchGitHubStats = (forceRefresh = false) => {
    if (forceRefresh) setRefreshing(true);
    else setLoading(true);

    const url = forceRefresh ? '/api/github/stats?refresh=true' : '/api/github/stats';
    fetch(url)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.details || data.error || `HTTP ${res.status}`);
        }
        return data;
      })
      .then((data) => {
        if (data && typeof data.publicRepositories === 'number') {
          setGithubStats(data);
          setErrorMessage(null);
        } else {
          throw new Error('Invalid GitHub response schema');
        }
      })
      .catch((err) => {
        console.error('GitHub API fetch error:', err);
        setErrorMessage(err.message || 'Unable to connect to GitHub API');
      })
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    fetchGitHubStats();
  }, []);

  const getColorClass = (level: number) => {
    switch (level) {
      case 1:
        return 'bg-emerald-200 dark:bg-emerald-950 border-emerald-300 dark:border-emerald-900/30';
      case 2:
        return 'bg-emerald-300 dark:bg-emerald-800 border-emerald-400 dark:border-emerald-700/30';
      case 3:
        return 'bg-emerald-400 dark:bg-emerald-600 border-emerald-500 dark:border-emerald-500/30';
      case 4:
        return 'bg-emerald-500 dark:bg-emerald-400 border-emerald-600 dark:border-emerald-300/30';
      default:
        return 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700/40';
    }
  };

  const contributions = githubStats?.heatmap && githubStats.heatmap.length === 28
    ? githubStats.heatmap
    : Array(28).fill(Array(7).fill(0));

  const techBreakdown = githubStats?.languages && githubStats.languages.length > 0
    ? githubStats.languages
    : [];

  return (
    <section id="dashboard" className="py-20 px-6 border-t border-slate-200/80 dark:border-slate-800/80 relative max-w-6xl mx-auto">
      <div className="flex flex-col space-y-3 mb-12 text-center">
        <h2 className="text-xs uppercase tracking-widest font-extrabold text-blue-600 dark:text-blue-400">{t('dashboard.heading_tag')}</h2>
        <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">{t('dashboard.heading_title')}</p>
        <div className="w-12 h-1 bg-blue-600 dark:bg-blue-500 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 card card-elevated p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">GitHub Contribution Heatmap</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {loading
                    ? 'Loading GitHub activity...'
                    : errorMessage
                    ? `Unable to load GitHub activity: ${errorMessage}`
                    : `${githubStats?.totalContributions.toLocaleString()} commits tracked in the past 12 months`}
                </p>
              </div>
            </div>
            <button
              onClick={() => fetchGitHubStats(true)}
              disabled={refreshing}
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              title="Refresh GitHub Stats"
            >
              <RotateCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {loading ? (
            <div className="h-28 flex items-center justify-center animate-pulse bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-800">
              <span className="text-xs text-slate-500 dark:text-slate-400">Loading GitHub activity...</span>
            </div>
          ) : errorMessage ? (
            <div className="h-28 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/80 dark:border-slate-800 p-4 space-y-1.5">
              <span className="text-xs text-slate-500 dark:text-slate-400 text-center">Unable to load GitHub activity.</span>
              <span className="text-[10px] text-rose-500 font-mono text-center">{errorMessage}</span>
              <button
                onClick={() => fetchGitHubStats(true)}
                className="text-[10px] text-blue-600 dark:text-blue-400 underline hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Retry Request
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto pb-2 no-scrollbar">
              <div className="flex gap-1.5 min-w-[480px]">
                {contributions.map((col: number[], cIdx: number) => (
                  <div key={cIdx} className="flex flex-col gap-1.5">
                    {col.map((level: number, rIdx: number) => (
                      <div
                        key={rIdx}
                        className={`w-3.5 h-3.5 rounded border transition-colors ${getColorClass(level)}`}
                        title={`Activity level ${level}`}
                      ></div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between items-center text-[10px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span>Live GitHub data ({githubStats?.username || 'Sumantkumaryadav8668'})</span>
            <div className="flex items-center space-x-1.5">
              <span>Less</span>
              <div className="w-2.5 h-2.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"></div>
              <div className="w-2.5 h-2.5 rounded bg-emerald-200 dark:bg-emerald-950"></div>
              <div className="w-2.5 h-2.5 rounded bg-emerald-300 dark:bg-emerald-800"></div>
              <div className="w-2.5 h-2.5 rounded bg-emerald-400 dark:bg-emerald-600"></div>
              <div className="w-2.5 h-2.5 rounded bg-emerald-500 dark:bg-emerald-400"></div>
              <span>More</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 card card-elevated p-6 space-y-4 flex flex-col justify-between">
          <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">Language & Tech Share</h3>

          {loading ? (
            <div className="h-40 flex items-center justify-center animate-pulse">
              <span className="text-xs text-slate-500 dark:text-slate-400">Loading repository language stats...</span>
            </div>
          ) : errorMessage ? (
            <div className="h-40 flex items-center justify-center p-4">
              <span className="text-xs text-slate-500 dark:text-slate-400 text-center">Unable to load language share.</span>
            </div>
          ) : (
            <>
              <div className="flex justify-center my-2">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 42 42">
                    <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="rgba(148, 163, 184, 0.1)" strokeWidth="4"></circle>
                    {techBreakdown.reduce(
                      (acc, item, index) => {
                        const strokeDasharray = `${item.percentage} ${100 - item.percentage}`;
                        const strokeDashoffset = -acc.offset;
                        acc.elements.push(
                          <circle
                            key={index}
                            cx="21"
                            cy="21"
                            r="15.915"
                            fill="transparent"
                            className={item.color}
                            strokeWidth="4.5"
                            strokeDasharray={strokeDasharray}
                            strokeDashoffset={strokeDashoffset}
                          ></circle>
                        );
                        acc.offset += item.percentage;
                        return acc;
                      },
                      { offset: 0, elements: [] as React.ReactNode[] }
                    ).elements}
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-lg font-extrabold text-slate-900 dark:text-white">
                      {techBreakdown[0]?.label || 'Code'}
                    </span>
                    <span className="text-[9px] text-slate-500 dark:text-slate-400 uppercase">Top Lang</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                {techBreakdown.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs">
                    <div className="flex items-center space-x-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${item.color.replace('stroke-', 'bg-')}`}></span>
                      <span className="text-slate-600 dark:text-slate-400">{item.label}</span>
                    </div>
                    <span className="text-slate-900 dark:text-white font-bold">{item.percentage}%</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mt-8">
        {[
          {
            icon: <GitCommit className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
            title: 'Total Contributions',
            value: loading ? '...' : errorMessage ? 'N/A' : `${githubStats?.totalContributions.toLocaleString() ?? 0}`,
            desc: 'Past 12 months on GitHub'
          },
          {
            icon: <Activity className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
            title: 'Stars Received',
            value: loading ? '...' : errorMessage ? 'N/A' : `${githubStats?.starsReceived ?? 0} Stars`,
            desc: 'Across public repositories'
          },
          {
            icon: <FolderGit2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
            title: 'Active Repositories',
            value: loading ? '...' : errorMessage ? 'N/A' : `${githubStats?.publicRepositories ?? 0} Repos`,
            desc: 'Public GitHub repositories'
          },
          {
            icon: <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
            title: CURRENT_LEARNING_CONFIG.title,
            value: CURRENT_LEARNING_CONFIG.value,
            desc: CURRENT_LEARNING_CONFIG.desc
          }
        ].map((stat, idx) => (
          <div key={idx} className="card card-hover p-5 space-y-3 flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200/80 dark:border-slate-700/80">
                {stat.icon}
              </div>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono uppercase">Telemetry</span>
            </div>
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 block">{stat.title}</span>
              <span className="text-xl font-extrabold text-slate-900 dark:text-white">{stat.value}</span>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{stat.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
