'use client';

import React, { useState, useEffect } from 'react';
import { Match } from '@/data/matches';
import { formatToBDT, getCountdown } from '@/utils/date';
import styles from './Hero.module.css';
import { MapPin, Calendar, Clock, Play } from 'lucide-react';

interface HeroProps {
  matches: Match[];
  currentTime: string;
}

export default function Hero({ matches, currentTime }: HeroProps) {
  const [mounted, setMounted] = useState(false);
  const [localTime, setLocalTime] = useState(currentTime);

  useEffect(() => {
    setMounted(true);
    setLocalTime(currentTime);
  }, [currentTime]);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    const timer = setInterval(() => {
      setLocalTime((prev) => {
        const d = new Date(prev);
        d.setSeconds(d.getSeconds() + 1);
        return d.toISOString();
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [mounted, currentTime]);

  if (!mounted) {
    return (
      <header className={styles.heroWrapper}>
        <div className="container">
          <h1 className={styles.title}>২০২৬ ফিফা বিশ্বকাপ সময়সূচী</h1>
          <p className={styles.subtitle}>বাংলাদেশ সময় অনুযায়ী লাইভ আপডেট ও টুর্নামেন্ট শিডিউল</p>
          <div className={`${styles.card} glass-panel`}>
            <div className={styles.matchHeader}>
              <div className="badge badge-upcoming">লোডিং...</div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  const liveMatch = matches.find((m) => m.status === 'live');
  const nextMatch = matches
    .filter((m) => m.status === 'scheduled')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];
  const lastCompleted = matches
    .filter((m) => m.status === 'completed')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

  const heroMatch = liveMatch ?? nextMatch ?? lastCompleted;

  if (heroMatch === undefined) {
    return (
      <header className={styles.heroWrapper}>
        <div className="container">
          <h1 className={styles.title}>২০২৬ ফিফা বিশ্বকাপ সময়সূচী</h1>
          <p className={styles.subtitle}>বাংলাদেশ সময় অনুযায়ী লাইভ আপডেট ও টুর্নামেন্ট শিডিউল</p>
          <div className={`${styles.card} glass-panel`}>
            <div className={styles.matchHeader}>
              <p className={styles.subtitle}>কোনো ম্যাচ পাওয়া যায়নি</p>
            </div>
          </div>
        </div>
      </header>
    );
  }

  const isLive = heroMatch.status === 'live';
  const isCompleted = heroMatch.status === 'completed';
  const countdown = getCountdown(heroMatch.date, localTime);

  return (
    <header className={styles.heroWrapper}>
      <div className="container">
        <h1 className={styles.title}>২০২৬ ফিফা বিশ্বকাপ সময়সূচী</h1>
        <p className={styles.subtitle}>বাংলাদেশ সময় অনুযায়ী লাইভ আপডেট ও টুর্নামেন্ট শিডিউল</p>

        <div className={`${styles.card} glass-panel ${isLive ? styles.cardLive : ''}`}>
          <div className={styles.matchHeader}>
            {isLive ? (
              <span className="badge badge-live">
                <Play size={12} fill="currentColor" /> লাইভ চলছে
              </span>
            ) : isCompleted ? (
              <span className="badge badge-completed">ম্যাচ সম্পন্ন</span>
            ) : (
              <span className="badge badge-upcoming">আসন্ন ম্যাচ</span>
            )}
            <p className={styles.venue} style={{ marginTop: '0.5rem', color: 'var(--primary)' }}>
              {heroMatch.stage}
            </p>
          </div>

          <div className={styles.matchBody}>
            <div className={styles.team}>
              <div className={styles.teamFlag}>
                <span className="flag-emoji">{heroMatch.team1.flag}</span>
              </div>
              <span className={styles.teamName}>{heroMatch.team1.name}</span>
              <span className={styles.teamCode}>{heroMatch.team1.code}</span>
            </div>

            <div className={styles.scoreArea}>
              {isLive || isCompleted ? (
                <div className={`${styles.score} ${isLive ? styles.scoreLive : ''}`}>
                  {heroMatch.score1?.toLocaleString('bn-BD')} - {heroMatch.score2?.toLocaleString('bn-BD')}
                </div>
              ) : (
                <div className={styles.vs}>VS</div>
              )}
            </div>

            <div className={styles.team}>
              <div className={styles.teamFlag}>
                <span className="flag-emoji">{heroMatch.team2.flag}</span>
              </div>
              <span className={styles.teamName}>{heroMatch.team2.name}</span>
              <span className={styles.teamCode}>{heroMatch.team2.code}</span>
            </div>
          </div>

          {!isLive && !isCompleted && countdown.totalSecs > 0 && (
            <div className={styles.countdown}>
              {parseInt(countdown.days, 10) > 0 && (
                <div className={styles.countdownUnit}>
                  <span className={styles.countdownVal}>{countdown.days}</span>
                  <span className={styles.countdownLbl}>দিন</span>
                </div>
              )}
              <div className={styles.countdownUnit}>
                <span className={styles.countdownVal}>{countdown.hours}</span>
                <span className={styles.countdownLbl}>ঘণ্টা</span>
              </div>
              <div className={styles.countdownUnit}>
                <span className={styles.countdownVal}>{countdown.minutes}</span>
                <span className={styles.countdownLbl}>মিনিট</span>
              </div>
              <div className={styles.countdownUnit}>
                <span className={styles.countdownVal}>{countdown.seconds}</span>
                <span className={styles.countdownLbl}>সেকেন্ড</span>
              </div>
            </div>
          )}

          <div className={styles.matchFooter}>
            <div className={`${styles.matchTime} ${isLive ? styles.matchTimeLive : ''}`}>
              <Clock size={16} />
              <span>{formatToBDT(heroMatch.date)}</span>
            </div>
            <div className={styles.venue}>
              <MapPin size={14} />
              <span>{heroMatch.venue}</span>
            </div>
            <span className={styles.city}>{heroMatch.city}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
