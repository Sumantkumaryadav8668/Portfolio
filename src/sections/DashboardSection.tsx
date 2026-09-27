import React, { useState, useEffect } from 'react';
import { GitCommit, Activity, Flame, FolderGit2, BookOpen, RotateCw } from 'lucide-react';

// Single clear configuration object for current learning focus
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
        return 'bg-emerald-950 border-emerald-900/30';
      case 2:
        return 'bg-emerald-800 border-emerald-700/30';
      case 3:
        return 'bg-emerald-600 border-emerald-500/30';
      case 4:
        return 'bg-emerald-400 border-emerald-300/30';
      default:
        return 'bg-brand-bgSec/60 border-brand-border/40';
    }
  };

  const contributions = githubStats?.heatmap && githubStats.heatmap.length === 28
    ? githubStats.heatmap
    : Array(28).fill(Array(7).fill(0));

  const techBreakdown = githubStats?.languages && githubStats.languages.length > 0
    ? githubStats.languages
    : [];

  return (
    <section id="dashboard" className="py-24 px-6 border-t border-brand-border/40 relative max-w-7xl mx-auto">
      <div className="flex flex-col space-y-4 mb-16 text-center">
        <h2 className="text-xs uppercase tracking-widest font-extrabold text-brand-accent">Dashboard</h2>
        <p className="text-3xl sm:text-4xl font-extrabold text-brand-text">Developer Activity Engine</p>
        <div className="w-12 h-1 bg-brand-primary mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-brand-card/15 border border-brand-border/60 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-brand-text">GitHub Contribution Heatmap</h3>
                <p className="text-xs text-brand-muted">
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
              className="p-1.5 text-brand-muted hover:text-brand-accent transition-colors rounded-lg hover:bg-brand-bgSec/60"
              title="Refresh GitHub Stats"
            >
              <RotateCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {loading ? (
            <div className="h-28 flex items-center justify-center animate-pulse bg-brand-bg/40 rounded-2xl border border-brand-border/30">
              <span className="text-xs text-brand-muted">Loading GitHub activity...</span>
            </div>
          ) : errorMessage ? (
            <div className="h-28 flex flex-col items-center justify-center bg-brand-bg/40 rounded-2xl border border-brand-border/30 p-4 space-y-2">
              <span className="text-xs text-brand-muted text-center">Unable to load GitHub activity.</span>
              <span className="text-[10px] text-red-400/80 font-mono text-center">{errorMessage}</span>
              <button
                onClick={() => fetchGitHubStats(true)}
                className="text-[10px] text-brand-accent underline hover:text-brand-text transition-colors mt-1"
              >
                Retry Request
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto pb-4 no-scrollbar">
              <div className="flex gap-1.5 min-w-[500px]">
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

          <div className="flex justify-between items-center text-[10px] text-brand-muted pt-2 border-t border-brand-border/20">
            <span>Live GitHub data ({githubStats?.username || 'Sumantkumaryadav8668'})</span>
            <div className="flex items-center space-x-1.5">
              <span>Less</span>
              <div className="w-2.5 h-2.5 rounded bg-brand-bgSec/60 border border-brand-border/40"></div>
              <div className="w-2.5 h-2.5 rounded bg-emerald-950"></div>
              <div className="w-2.5 h-2.5 rounded bg-emerald-800"></div>
              <div className="w-2.5 h-2.5 rounded bg-emerald-600"></div>
              <div className="w-2.5 h-2.5 rounded bg-emerald-400"></div>
              <span>More</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 bg-brand-card/15 border border-brand-border/60 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <h3 className="text-lg font-bold text-brand-text">Language & Tech Share</h3>

          {loading ? (
            <div className="h-44 flex items-center justify-center animate-pulse">
              <span className="text-xs text-brand-muted">Loading repository language stats...</span>
            </div>
          ) : errorMessage ? (
            <div className="h-44 flex items-center justify-center p-4">
              <span className="text-xs text-brand-muted text-center">Unable to load language share.</span>
            </div>
          ) : (
            <>
              <div className="flex justify-center my-4">
                <div className="relative w-36 h-36 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 42 42">
                    <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="rgba(255,255,255,0.02)" strokeWidth="4"></circle>
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
                    <span className="text-xl font-extrabold text-brand-text">
                      {techBreakdown[0]?.label || 'Code'}
                    </span>
                    <span className="text-[10px] text-brand-muted uppercase">Top Lang</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                {techBreakdown.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs">
                    <div className="flex items-center space-x-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${item.color.replace('stroke-', 'bg-')}`}></span>
                      <span className="text-brand-muted">{item.label}</span>
                    </div>
                    <span className="text-brand-text font-bold">{item.percentage}%</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
        {[
          {
            icon: <GitCommit className="w-5 h-5 text-brand-primary" />,
            title: 'Total Contributions',
            value: loading ? '...' : errorMessage ? 'N/A' : `${githubStats?.totalContributions.toLocaleString() ?? 0}`,
            desc: 'Past 12 months on GitHub'
          },
          {
            icon: <Activity className="w-5 h-5 text-brand-accent" />,
            title: 'Stars Received',
            value: loading ? '...' : errorMessage ? 'N/A' : `${githubStats?.starsReceived ?? 0} Stars`,
            desc: 'Across public repositories'
          },
          {
            icon: <FolderGit2 className="w-5 h-5 text-brand-success" />,
            title: 'Active Repositories',
            value: loading ? '...' : errorMessage ? 'N/A' : `${githubStats?.publicRepositories ?? 0} Repos`,
            desc: 'Public GitHub repositories'
          },
          {
            icon: <BookOpen className="w-5 h-5 text-purple-400" />,
            title: CURRENT_LEARNING_CONFIG.title,
            value: CURRENT_LEARNING_CONFIG.value,
            desc: CURRENT_LEARNING_CONFIG.desc
          }
        ].map((stat, idx) => (
          <div key={idx} className="bg-brand-card/25 border border-brand-border/60 rounded-2xl p-5 space-y-3 flex flex-col justify-between shadow-md">
            <div className="flex justify-between items-center">
              <div className="w-10 h-10 rounded-xl bg-brand-bg flex items-center justify-center border border-brand-border/30">
                {stat.icon}
              </div>
              <span className="text-[10px] text-brand-muted font-mono uppercase">Telemetry</span>
            </div>
            <div>
              <span className="text-xs text-brand-muted block">{stat.title}</span>
              <span className="text-2xl font-extrabold text-brand-text">{stat.value}</span>
              <p className="text-[10px] text-brand-muted mt-1">{stat.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
