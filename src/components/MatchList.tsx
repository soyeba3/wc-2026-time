'use client';

import React from 'react';
import { Match } from '@/data/matches';
import { formatToBDTDateOnly, formatToBDTTimeOnly } from '@/utils/date';
import styles from './MatchList.module.css';
import { Search, MapPin, Clock, Calendar, AlertCircle } from 'lucide-react';

interface MatchListProps {
  matches: Match[];
  searchTerm: string;
  onSearchChange: (val: string) => void;
  onUpdateScore: (matchId: string, score1: number, score2: number) => void;
}

export default function MatchList({
  matches,
  searchTerm,
  onSearchChange,
  onUpdateScore
}: MatchListProps) {
  const handleSimulate = (match: Match) => {
    onUpdateScore(match.id, 0, 0);
  };

  const adjustScore = (match: Match, teamNum: number, amount: number) => {
    const s1 = match.score1 ?? 0;
    const s2 = match.score2 ?? 0;

    if (teamNum === 1) {
      const newS1 = Math.max(0, s1 + amount);
      onUpdateScore(match.id, newS1, s2);
    } else {
      const newS2 = Math.max(0, s2 + amount);
      onUpdateScore(match.id, s1, newS2);
    }
  };

  return (
    <div className={styles.listSection}>
      <div className={styles.searchBarWrapper}>
        <Search size={18} className={styles.searchIcon} />
        <input
          type="text"
          className={styles.searchInput}
          placeholder="দল বা দেশ অনুসন্ধান করুন... (যেমন: Brazil)"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className={styles.sectionHeader}>
        <div className={styles.sectionTitle}>
          <span>খেলা ও সময়সূচী</span>
          <span className={styles.matchCount}>
            {matches.length.toLocaleString('bn-BD')} টি ম্যাচ
          </span>
        </div>
      </div>

      {matches.length === 0 ? (
        <div className={`${styles.emptyState} glass-panel`}>
          <AlertCircle size={40} style={{ color: 'var(--text-muted)' }} />
          <h3 className={styles.emptyTitle}>কোনো ম্যাচ পাওয়া যায়নি</h3>
          <p>আপনার অনুসন্ধান পরিবর্তন করে আবার চেষ্টা করুন।</p>
        </div>
      ) : (
        <div className={styles.gridMatches}>
          {matches.map((match) => {
            const isLive = match.status === 'live';
            const isCompleted = match.status === 'completed';
            const hasScore = match.score1 !== undefined && match.score2 !== undefined;

            return (
              <div
                key={match.id}
                className={`${styles.matchCard} glass-panel`}
                id={`match-${match.id}`}
              >
                <div className={styles.cardHeader}>
                  <span className={styles.stageLabel}>{match.stage}</span>
                  {isLive ? (
                    <span className="badge badge-live">লাইভ</span>
                  ) : isCompleted ? (
                    <span className="badge badge-completed">সম্পন্ন</span>
                  ) : (
                    <span className="badge badge-upcoming">আসন্ন</span>
                  )}
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.teamWrapper}>
                    <span className={styles.flag}>{match.team1.flag}</span>
                    <div style={{ minWidth: 0 }}>
                      <div className={styles.teamName}>{match.team1.name}</div>
                      <div className={styles.teamCode}>{match.team1.code}</div>
                    </div>
                  </div>

                  <div className={styles.scoreWrapper}>
                    {hasScore ? (
                      <>
                        <div className={styles.scoreAdjuster}>
                          <button
                            type="button"
                            className={styles.adjustBtn}
                            onClick={() => adjustScore(match, 1, 1)}
                            title="গোল বাড়ান"
                          >
                            ▲
                          </button>
                          <span className={styles.scoreValue}>
                            {match.score1?.toLocaleString('bn-BD')}
                          </span>
                          <button
                            type="button"
                            className={styles.adjustBtn}
                            onClick={() => adjustScore(match, 1, -1)}
                            title="গোল কমান"
                          >
                            ▼
                          </button>
                        </div>

                        <span className={styles.scoreDash}>-</span>

                        <div className={styles.scoreAdjuster}>
                          <button
                            type="button"
                            className={styles.adjustBtn}
                            onClick={() => adjustScore(match, 2, 1)}
                            title="গোল বাড়ান"
                          >
                            ▲
                          </button>
                          <span className={styles.scoreValue}>
                            {match.score2?.toLocaleString('bn-BD')}
                          </span>
                          <button
                            type="button"
                            className={styles.adjustBtn}
                            onClick={() => adjustScore(match, 2, -1)}
                            title="গোল কমান"
                          >
                            ▼
                          </button>
                        </div>
                      </>
                    ) : (
                      <span className={styles.vsBadge}>VS</span>
                    )}
                  </div>

                  <div className={`${styles.teamWrapper} styles.teamRight`} style={{ justifyContent: 'flex-end', textAlign: 'right' }}>
                    <div style={{ minWidth: 0, marginRight: '0.75rem' }}>
                      <div className={styles.teamName}>{match.team2.name}</div>
                      <div className={styles.teamCode}>{match.team2.code}</div>
                    </div>
                    <span className={styles.flag}>{match.team2.flag}</span>
                  </div>
                </div>

                {!hasScore && (
                  <button
                    type="button"
                    className={styles.simBtn}
                    onClick={() => handleSimulate(match)}
                  >
                    স্কোর সিমুলেট করুন
                  </button>
                )}

                <div className={styles.cardFooter}>
                  <div className={styles.footerRow}>
                    <Clock size={12} />
                    <span className={styles.footerTime}>
                      {formatToBDTTimeOnly(match.date)} (BD Time)
                    </span>
                  </div>
                  <div className={styles.footerRow}>
                    <Calendar size={12} />
                    <span>{formatToBDTDateOnly(match.date)}</span>
                  </div>
                  <div className={styles.footerRow}>
                    <MapPin size={12} />
                    <span>
                      {match.venue}, {match.city}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
