'use client';

import { useEffect, useRef } from 'react';
import { useOrderDataStore } from '@/modules/Orders/store/useOrderDataStore';
import { supabase } from '@/lib/supabase';
import { Order } from '../types/orders';
import { playCustomBeep } from '@/utils/playCustomBeep';

export function usePendingOrderAlarm() {
  const { counts, fetchOrders, addOrder, updateOrder, removeOrder } =
    useOrderDataStore();
  const timeoutRef = useRef<number | null>(null);
  const heartbeatRef = useRef<number | null>(null);
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);

  useEffect(() => {
    const alertLoop = () => {
      playCustomBeep({ frequency: 1200, duration: 0.5, volume: 0.2 });
      if ('vibrate' in navigator) {
        navigator.vibrate([200, 100, 200]); // Pattern: 200ms on, 100ms off, 200ms on
      }
      if (useOrderDataStore.getState().counts.pending > 0) {
        timeoutRef.current = window.setTimeout(alertLoop, 2000);
      } else {
        timeoutRef.current = null;
      }
    };
    // Clear existing timeout
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // Start beeping and vibrating if pending orders exist
    if (counts.pending > 0) {
      alertLoop();
    }

    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [counts.pending]);

  // One-time effect for Supabase subscription and keep-alive mechanisms
  useEffect(() => {
    // Request wake lock to prevent sleep
    const requestWakeLock = async () => {
      if ('wakeLock' in navigator) {
        try {
          wakeLockRef.current = await navigator.wakeLock.request('screen');
          console.log('🔓 Wake lock acquired');
        } catch (err) {
          console.warn('⚠️ Wake lock failed:', err);
        }
      }
    };
    requestWakeLock();
    const channel = supabase
      .channel('orders-changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'orders' },
        (payload) => addOrder(payload.new as Order)
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'orders' },
        (payload) => updateOrder(payload.new.id, payload.new)
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'orders' },
        (payload) => removeOrder(payload.old.id)
      )
      .subscribe();

    // Handle network reconnect
    const handleOnline = () => {
      console.log('✅ Network back online — refreshing orders');
      fetchOrders();
      requestWakeLock();
    };

    const handleOffline = () => {
      console.warn('📴 Network offline');
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && !wakeLockRef.current) {
        requestWakeLock();
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Heartbeat to keep app awake
    const startHeartbeat = () => {
      const dataFetchInterval = window.setInterval(() => {
        console.log('⏳ Data heartbeat: refreshing orders');
        fetchOrders();
      }, 15000);
      const keepAliveInterval = window.setInterval(() => {
        Date.now();
      }, 5000);

      let audioContext: AudioContext | null = null;
      try {
        audioContext = new AudioContext();
        const keepAudioAlive = () => {
          if (audioContext && audioContext.state === 'running') {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            gainNode.gain.value = 0; // Silent
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.001);
          }
        };
        const audioInterval = window.setInterval(keepAudioAlive, 10000);
        heartbeatRef.current = {
          dataFetch: dataFetchInterval,
          keepAlive: keepAliveInterval,
          audio: audioInterval,
          audioContext,
        } as any;
      } catch (err) {
        console.warn('Audio context failed:', err);
        heartbeatRef.current = {
          dataFetch: dataFetchInterval,
          keepAlive: keepAliveInterval,
        } as any;
      }
    };

    startHeartbeat();

    return () => {
      // Cleanup heartbeat intervals
      if (heartbeatRef.current) {
        const intervals = heartbeatRef.current as any;
        if (intervals.dataFetch) clearInterval(intervals.dataFetch);
        if (intervals.keepAlive) clearInterval(intervals.keepAlive);
        if (intervals.audio) clearInterval(intervals.audio);
        if (intervals.audioContext) {
          try {
            intervals.audioContext.close();
          } catch (err) {
            console.warn('Audio context cleanup failed:', err);
          }
        }
        heartbeatRef.current = null;
      }
      // Release wake lock
      if (wakeLockRef.current) {
        wakeLockRef.current.release();
        wakeLockRef.current = null;
        console.log('🔓 Wake lock released');
      }

      // Cleanup event listeners
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      // Cleanup Supabase
      supabase.removeChannel(channel);
    };
  }, [fetchOrders, addOrder, updateOrder, removeOrder]);
}