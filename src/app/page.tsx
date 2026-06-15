'use client';

import React, { useState, useMemo } from 'react';
import {
  generateGroupMatches,
  generateKnockoutMatches,
  calculateStandings,
  Match
} from '@/data/matches';
import Hero from '@/components/Hero';
import GroupNav from '@/components/GroupNav';
import MatchList from '@/components/MatchList';
import styles from './page.module.css';
import { Calendar, RefreshCw } from 'lucide-react';

const STAGES = [
  'Group Stage',
  'Round of 32',
  'Round of 16',
  'Quarter-finals',
  'Semi-finals & Finals'
];

const GROUPS = [
  'Group A', 'Group B', 'Group C', 'Group D',
  'Group E', 'Group F', 'Group G', 'Group H',
  'Group I', 'Group J', 'Group K', 'Group L'
];

const PRESETS = [
  { label: 'গ্রুপ পর্ব (জুন ১৫)', time: '2026-06-15T07:42:10+06:00' },
  { label: '৩২ দলের পর্ব (জুন ২৯)', time: '2026-06-29T18:00:00+06:00' },
  { label: '১৬ দলের পর্ব (জুলাই ৮)', time: '2026-07-08T18:00:00+06:00' },
  { label: 'ফাইনাল ম্যাচ (জুলাই ১৯)', time: '2026-07-19T20:00:00+06:00' }
];

interface ScoreOverride {
  score1: number;
  score2: number;
}

export default function Home() {
  const [currentTime, setCurrentTime] = useState<string>('2026-06-15T07:42:10+06:00');
  const [scoreOverrides, setScoreOverrides] = useState<Record<string, ScoreOverride>>({});
  const [activeStage, setActiveStage] = useState<string>('Group Stage');
  const [activeGroup, setActiveGroup] = useState<string>('Group A');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const baseGroupMatches = useMemo(() => {
    return generateGroupMatches(currentTime);
  }, [currentTime]);

  const groupMatches = useMemo(() => {
    return baseGroupMatches.map((m) => {
      const override = scoreOverrides[m.id];
      if (override !== undefined) {
        return {
          ...m,
          score1: override.score1,
          score2: override.score2,
          status: 'completed' as const
        };
      }
      return m;
    });
  }, [baseGroupMatches, scoreOverrides]);

  const baseKnockoutMatches = useMemo(() => {
    return generateKnockoutMatches(groupMatches, currentTime);
  }, [groupMatches, currentTime]);

  const knockoutMatches = useMemo(() => {
    return baseKnockoutMatches.map((m) => {
      const override = scoreOverrides[m.id];
      if (override !== undefined) {
        return {
          ...m,
          score1: override.score1,
          score2: override.score2,
          status: 'completed' as const
        };
      }
      return m;
    });
  }, [baseKnockoutMatches, scoreOverrides]);

  const allMatches = useMemo(() => {
    return [...groupMatches, ...knockoutMatches];
  }, [groupMatches, knockoutMatches]);

  const standings = useMemo(() => {
    return calculateStandings(groupMatches);
  }, [groupMatches]);

  const activeGroupStandings = useMemo(() => {
    const list = standings[activeGroup];
    return list !== undefined ? list : [];
  }, [standings, activeGroup]);

  const filteredMatches = useMemo(() => {
    if (searchTerm.trim() !== '') {
      const query = searchTerm.toLowerCase();
      return allMatches.filter(
        (m) =>
          m.team1.name.toLowerCase().includes(query) ||
          m.team1.code.toLowerCase().includes(query) ||
          m.team2.name.toLowerCase().includes(query) ||
          m.team2.code.toLowerCase().includes(query)
      );
    }

    if (activeStage === 'Group Stage') {
      return groupMatches.filter((m) => m.stage === activeGroup);
    }
    if (activeStage === 'Round of 32') {
      return knockoutMatches.filter((m) => m.stage === 'Round of 32');
    }
    if (activeStage === 'Round of 16') {
      return knockoutMatches.filter((m) => m.stage === 'Round of 16');
    }
    if (activeStage === 'Quarter-finals') {
      return knockoutMatches.filter((m) => m.stage === 'Quarter-finals');
    }
    return knockoutMatches.filter(
      (m) =>
        m.stage === 'Semi-finals' ||
        m.stage === 'Third place' ||
        m.stage === 'Final'
    );
  }, [allMatches, groupMatches, knockoutMatches, activeStage, activeGroup, searchTerm]);

  const handleUpdateScore = (matchId: string, score1: number, score2: number) => {
    setScoreOverrides((prev) => ({
      ...prev,
      [matchId]: { score1, score2 }
    }));
  };

  const handleResetOverrides = () => {
    setScoreOverrides({});
  };

  const handleTimePreset = (timeStr: string) => {
    setCurrentTime(timeStr);
  };

  return (
    <main className={styles.main}>
      <div className="glow-bg glow-1"></div>
      <div className="glow-bg glow-2"></div>

      <nav className={styles.headerBar}>
        <div className="container">
          <div className={styles.headerContent}>
            <div className={styles.logo}>
              <span>🏆</span>
              <span>FIFA 2026 BDT Schedule</span>
            </div>
            <div className={styles.timezoneNote}>
              <span>সব ম্যাচ বাংলাদেশ সময় (BDT) অনুযায়ী প্রদর্শিত</span>
            </div>
          </div>
        </div>
      </nav>

      <Hero matches={allMatches} currentTime={currentTime} />

      <section className="container">
        <div className={`${styles.timeTravelCard} glass-panel`}>
          <div className={styles.timeTravelTitle}>
            <Calendar size={18} style={{ color: 'var(--primary)' }} />
            <span>⏱️ টাইম ট্রাভেল সিমুলেটর (টুর্নামেন্ট স্টেজ পরিবর্তন করুন)</span>
          </div>
          <div className={styles.travelBtnList}>
            {PRESETS.map((preset) => {
              const isActive = currentTime === preset.time;
              return (
                <button
                  key={preset.time}
                  type="button"
                  className={`${styles.travelBtn} ${isActive ? styles.travelBtnActive : ''}`}
                  onClick={() => handleTimePreset(preset.time)}
                >
                  {preset.label}
                </button>
              );
            })}
            {Object.keys(scoreOverrides).length > 0 && (
              <button
                type="button"
                className={`${styles.travelBtn} ${styles.resetBtn}`}
                onClick={handleResetOverrides}
              >
                <RefreshCw size={12} /> স্কোর রিসেট
              </button>
            )}
          </div>
        </div>

        <GroupNav
          stages={STAGES}
          activeStage={activeStage}
          onStageChange={setActiveStage}
          groups={GROUPS}
          activeGroup={activeGroup}
          onGroupChange={setActiveGroup}
          groupStandings={activeGroupStandings}
        />

        <MatchList
          matches={filteredMatches}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onUpdateScore={handleUpdateScore}
        />
      </section>

      <footer className={styles.footer}>
        <div className="container">
          <p className={styles.footerText}>
            ২০২৬ ফিফা বিশ্বকাপ ফুটবল বাংলাদেশ সময় (BDT) ফ্যান সাইট।
            <br />
            ডিজাইন করেছেন <span className={styles.footerLogo}>Antigravity</span>
          </p>
        </div>
      </footer>
    </main>
  );
}
