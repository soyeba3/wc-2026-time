'use client';

import React from 'react';
import { StandingsEntry } from '@/data/matches';
import styles from './GroupNav.module.css';

interface GroupNavProps {
  stages: string[];
  activeStage: string;
  onStageChange: (stage: string) => void;
  groups: string[];
  activeGroup: string;
  onGroupChange: (group: string) => void;
  groupStandings: StandingsEntry[];
}

export default function GroupNav({
  stages,
  activeStage,
  onStageChange,
  groups,
  activeGroup,
  onGroupChange,
  groupStandings
}: GroupNavProps) {
  const getRankClass = (idx: number): string => {
    if (idx === 0) {
      return styles.rank1;
    }
    if (idx === 1) {
      return styles.rank2;
    }
    if (idx === 2) {
      return styles.rank3;
    }
    return '';
  };

  const isGroupStage = activeStage === 'Group Stage';

  return (
    <div className={styles.navContainer}>
      <div className={styles.stageTabsList}>
        {stages.map((stage) => {
          const isSelected = activeStage === stage;
          let label = stage;
          if (stage === 'Group Stage') {
            label = 'গ্রুপ পর্ব';
          } else if (stage === 'Round of 32') {
            label = 'রাউন্ড অফ ৩২';
          } else if (stage === 'Round of 16') {
            label = 'রাউন্ড অফ ১৬';
          } else if (stage === 'Quarter-finals') {
            label = 'কোয়ার্টার-ফাইনাল';
          } else if (stage === 'Semi-finals & Finals') {
            label = 'সেমি ও ফাইনাল';
          }

          return (
            <button
              key={stage}
              type="button"
              className={`tab-btn ${isSelected ? 'active' : ''}`}
              onClick={() => onStageChange(stage)}
            >
              {label}
            </button>
          );
        })}
      </div>

      {isGroupStage && (
        <>
          <div className={styles.groupTabsList}>
            {groups.map((group) => {
              const isSelected = activeGroup === group;
              const letter = group.replace('Group ', '');
              return (
                <button
                  key={group}
                  type="button"
                  className={`${styles.groupTabBtn} ${isSelected ? styles.groupTabBtnActive : ''}`}
                  onClick={() => onGroupChange(group)}
                >
                  গ্রুপ {letter}
                </button>
              );
            })}
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.standingsTable}>
              <thead>
                <tr>
                  <th style={{ width: '60px' }}>অবস্থান</th>
                  <th>দল</th>
                  <th style={{ textAlign: 'center' }}>ম্যাচ</th>
                  <th style={{ textAlign: 'center' }}>জয়</th>
                  <th style={{ textAlign: 'center' }}>ড্র</th>
                  <th style={{ textAlign: 'center' }}>পরাজয়</th>
                  <th style={{ textAlign: 'center' }}>গোল +/-</th>
                  <th style={{ textAlign: 'center' }}>পয়েন্ট</th>
                </tr>
              </thead>
              <tbody>
                {groupStandings.map((entry, idx) => {
                  const rankClass = getRankClass(idx);
                  let rowClass = '';
                  if (idx < 2) {
                    rowClass = styles.rowAdvance12;
                  } else if (idx === 2) {
                    rowClass = styles.rowAdvance3;
                  }

                  return (
                    <tr key={entry.team.code} className={rowClass}>
                      <td>
                        <span className={`${styles.rankIndicator} ${rankClass}`}>
                          {(idx + 1).toLocaleString('bn-BD')}
                        </span>
                      </td>
                      <td>
                        <div className={styles.teamCell}>
                          <span className="flag-emoji">{entry.team.flag}</span>
                          <span>{entry.team.name}</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            ({entry.team.code})
                          </span>
                        </div>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        {entry.played.toLocaleString('bn-BD')}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        {entry.won.toLocaleString('bn-BD')}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        {entry.drawn.toLocaleString('bn-BD')}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        {entry.lost.toLocaleString('bn-BD')}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        {entry.goalsFor.toLocaleString('bn-BD')}-{entry.goalsAgainst.toLocaleString('bn-BD')} (
                        {entry.goalDifference >= 0 ? '+' : ''}
                        {entry.goalDifference.toLocaleString('bn-BD')})
                      </td>
                      <td style={{ textAlign: 'center' }} className={styles.pointsCell}>
                        {entry.points.toLocaleString('bn-BD')}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
