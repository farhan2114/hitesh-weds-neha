import { createClient } from '@supabase/supabase-js';
import { weddingConfig } from '../wedding.config';

export interface BlessingItem {
  id: string;
  name: string;
  city: string | null;
  message: string;
  created_at?: string;
}

const SUPABASE_URL = 'https://lyukxpzpcjedvrkwrcur.supabase.co';
const SUPABASE_KEY = 'sb_publishable_7USKYo1sBAT7p3_kqWdrqg_RCxNm3yd';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export const GOOGLE_SHEET_WEBHOOK_URL =
  weddingConfig.rsvp.googleSheetWebhookUrl ||
  'https://script.google.com/macros/s/AKfycbz9ar1L74KCKJgym2fztj8CGbptrG807JaMgYu3wMTzIhLVxFzLUUy3JKDJBkZkakP7/exec';

export interface RsvpPayload {
  name: string;
  email: string;
  adults: number;
  kids: number;
  guest_count: number;
  attending_events: string;
  declined_events: string;
  haldi?: 'Yes' | 'No';
  marriage?: 'Yes' | 'No';
  sangeet?: 'Yes' | 'No';
  vratham?: 'Yes' | 'No';
  note: string;
  isUpdate?: boolean;
  originalEmail?: string;
  originalName?: string;
  submissionId?: string;
}

export async function saveRsvpToGoogleSheet(payload: RsvpPayload): Promise<void> {
  const webhookUrl = weddingConfig.rsvp.googleSheetWebhookUrl || GOOGLE_SHEET_WEBHOOK_URL;
  if (!webhookUrl) return;

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify({
        action: payload.isUpdate ? 'update' : 'create',
        isUpdate: !!payload.isUpdate,
        submissionId: payload.submissionId || '',
        originalEmail: payload.originalEmail || payload.email,
        originalName: payload.originalName || payload.name,
        name: payload.name,
        email: payload.email,
        contact: payload.email,
        adults: payload.adults,
        kids: payload.kids,
        guest_count: payload.guest_count,
        attending_events: payload.attending_events,
        declined_events: payload.declined_events,
        haldi: payload.haldi || 'No',
        marriage: payload.marriage || 'No',
        sangeet: payload.sangeet || 'No',
        vratham: payload.vratham || 'No',
        blessings: payload.note || '-',
        note: payload.note || '-',
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (err) {
    console.warn('Google Sheet RSVP sync failed:', err);
  }
}

export async function saveRsvp(payload: RsvpPayload): Promise<{ success: boolean; error?: string }> {
  try {
    await saveRsvpToGoogleSheet(payload);
  } catch (err) {
    console.warn('Google Sheet sync error:', err);
  }
  return { success: true };
}

const FALLBACK_KEY = 'vows_blessings_cache';

const defaultSeedBlessings: BlessingItem[] = [
  {
    id: 'seed-1',
    name: 'Karthik & Divya',
    city: 'Chennai',
    message: 'Wishing you both a lifetime of laughter, harmony and endless love together!',
    created_at: new Date().toISOString(),
  },
  {
    id: 'seed-2',
    name: 'Lakshmi Auntie',
    city: 'Madurai',
    message: 'May Lord Sundareswarar shower His divine blessings upon Aarthi and Nikhil on this beautiful beginning.',
    created_at: new Date().toISOString(),
  },
  {
    id: 'seed-3',
    name: 'Siddharth Raman',
    city: 'Bengaluru',
    message: 'From the train rides to the mandapam, so happy to see this journey unfold. Heartiest congratulations!',
    created_at: new Date().toISOString(),
  },
];

export async function fetchBlessings(): Promise<BlessingItem[]> {
  try {
    const { data, error } = await supabase
      .from('blessings')
      .select('id, name, city, message, created_at')
      .order('created_at', { ascending: false })
      .limit(60);

    if (error) throw error;
    if (data && data.length > 0) {
      try {
        localStorage.setItem(FALLBACK_KEY, JSON.stringify(data));
      } catch (_) {}
      return data;
    }
  } catch (err) {
    console.warn('Supabase fetch failed, checking local cache:', err);
  }

  try {
    const cached = localStorage.getItem(FALLBACK_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (_) {}

  return defaultSeedBlessings;
}

export async function addBlessing(name: string, city: string | null, message: string): Promise<void> {
  const newBlessing: BlessingItem = {
    id: 'local-' + Date.now(),
    name: name.trim(),
    city: city ? city.trim() : null,
    message: message.trim(),
    created_at: new Date().toISOString(),
  };

  try {
    const { error } = await supabase
      .from('blessings')
      .insert({ name: newBlessing.name, city: newBlessing.city, message: newBlessing.message });
    if (error) throw error;
  } catch (err) {
    console.warn('Supabase insert failed, persisting locally:', err);
  }

  // Always update local cache
  try {
    const cached = localStorage.getItem(FALLBACK_KEY);
    const list: BlessingItem[] = cached ? JSON.parse(cached) : [...defaultSeedBlessings];
    list.unshift(newBlessing);
    localStorage.setItem(FALLBACK_KEY, JSON.stringify(list));
  } catch (_) {}
}
