export function formatToBDT(dateIsoStr: string): string {
  const date = new Date(dateIsoStr);
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'Asia/Dhaka',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };
  return new Intl.DateTimeFormat('bn-BD', options).format(date);
}

export function formatToBDTTimeOnly(dateIsoStr: string): string {
  const date = new Date(dateIsoStr);
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'Asia/Dhaka',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };
  return new Intl.DateTimeFormat('bn-BD', options).format(date);
}

export function formatToBDTDateOnly(dateIsoStr: string): string {
  const date = new Date(dateIsoStr);
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'Asia/Dhaka',
    month: 'long',
    day: 'numeric',
    weekday: 'short'
  };
  return new Intl.DateTimeFormat('bn-BD', options).format(date);
}

interface Countdown {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  totalSecs: number;
}

export function getCountdown(targetIsoStr: string, currentIsoStr: string): Countdown {
  const target = new Date(targetIsoStr).getTime();
  const current = new Date(currentIsoStr).getTime();
  const diffMs = target - current;

  if (diffMs <= 0) {
    return { days: '০০', hours: '০০', minutes: '০০', seconds: '০০', totalSecs: 0 };
  }

  const totalSecs = Math.floor(diffMs / 1000);
  const secs = totalSecs % 60;
  const mins = Math.floor(totalSecs / 60) % 60;
  const hrs = Math.floor(totalSecs / 3600) % 24;
  const days = Math.floor(totalSecs / 86400);

  const pad = (n: number): string => {
    const s = n.toString();
    const padded = s.length < 2 ? '0' + s : s;
    return padded.replace(/\d/g, (d) => {
      const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
      const val = parseInt(d, 10);
      return bnDigits[val];
    });
  };

  return {
    days: pad(days),
    hours: pad(hrs),
    minutes: pad(mins),
    seconds: pad(secs),
    totalSecs
  };
}
