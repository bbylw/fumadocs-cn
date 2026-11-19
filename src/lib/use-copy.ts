'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

let lastAnnouncement = '';

/**
 * Accessible clipboard copy helper returning status (`copied` / `failed`), a separate live-region
 * announcement string deduplicated with `\u00A0` for VoiceOver, and an imperative trigger.
 */
export function useCopyFeedback(getText: () => string, onSuccess?: () => void) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle');
  const [announcement, setAnnouncement] = useState('');
  const timerRef = useRef<number>(0);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const announce = useCallback((message: string) => {
    const next = message === lastAnnouncement ? `${message}\u00a0` : message;
    lastAnnouncement = next;
    setAnnouncement('');
    requestAnimationFrame(() => setAnnouncement(next));
  }, []);

  const onCopy = useCallback(async () => {
    window.clearTimeout(timerRef.current);
    try {
      await navigator.clipboard.writeText(getText());
      setStatus('copied');
      announce('已复制');
      onSuccess?.();
    } catch {
      setStatus('failed');
      announce('复制失败');
    }
    timerRef.current = window.setTimeout(() => {
      setStatus('idle');
      setAnnouncement('');
    }, 2000);
  }, [announce, getText, onSuccess]);

  return {
    copied: status === 'copied',
    failed: status === 'failed',
    announcement,
    onCopy,
  };
}
