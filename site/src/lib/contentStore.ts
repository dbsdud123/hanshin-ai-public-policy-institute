/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ADMIN_EMAILS } from '../config';
import { InstituteIntro, Inquiry, Member, Notice, ResearchReport } from '../types';
import { isSupabaseConfigured, supabase } from './supabase';

export interface SiteContentBundle {
  intro: InstituteIntro;
  members: Member[];
  research: ResearchReport[];
  notices: Notice[];
}

export type SiteContentKey = keyof SiteContentBundle;

type ContentRow = {
  key: SiteContentKey;
  value: unknown;
};

type InquiryRow = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  affiliation: string | null;
  title: string;
  content: string;
  status: Inquiry['status'];
  created_at: string;
};

const PUBLIC_CONTENT_KEYS: SiteContentKey[] = ['intro', 'members', 'research', 'notices'];

function assertSupabase() {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase 환경변수가 아직 설정되지 않았습니다.');
  }
  return supabase;
}

function toInquiry(row: InquiryRow): Inquiry {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone || '',
    affiliation: row.affiliation || '',
    title: row.title,
    content: row.content,
    date: row.created_at.substring(0, 10),
    status: row.status,
  };
}

function toInquiryRow(inquiry: Inquiry): InquiryRow {
  return {
    id: inquiry.id,
    name: inquiry.name,
    email: inquiry.email,
    phone: inquiry.phone || null,
    affiliation: inquiry.affiliation || null,
    title: inquiry.title,
    content: inquiry.content,
    status: inquiry.status,
    created_at: new Date(inquiry.date || new Date().toISOString()).toISOString(),
  };
}

export function canUseSupabase() {
  return isSupabaseConfigured;
}

export async function getCurrentAdminEmail(): Promise<string | null> {
  if (!supabase) return null;
  const { data } = await supabase.auth.getUser();
  const email = data.user?.email?.toLowerCase() || null;
  return email && ADMIN_EMAILS.includes(email) ? email : null;
}

export async function signInAdminWithPassword(email: string, password: string): Promise<string> {
  const client = assertSupabase();
  const normalizedEmail = email.trim().toLowerCase();

  if (!ADMIN_EMAILS.includes(normalizedEmail)) {
    throw new Error('등록된 관리자 이메일이 아닙니다.');
  }

  const { data, error } = await client.auth.signInWithPassword({
    email: normalizedEmail,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  const signedEmail = data.user?.email?.toLowerCase();
  if (!signedEmail || !ADMIN_EMAILS.includes(signedEmail)) {
    await client.auth.signOut();
    throw new Error('관리자 허용 목록에 없는 계정입니다.');
  }

  return signedEmail;
}

export async function signOutAdmin(): Promise<void> {
  if (!supabase) return;
  await supabase.auth.signOut();
}

export async function loadPublicContent(): Promise<Partial<SiteContentBundle>> {
  const client = assertSupabase();
  const { data, error } = await client
    .from('site_content')
    .select('key,value')
    .in('key', PUBLIC_CONTENT_KEYS);

  if (error) {
    throw new Error(error.message);
  }

  return (data as ContentRow[]).reduce<Partial<SiteContentBundle>>((acc, row) => {
    acc[row.key] = row.value as never;
    return acc;
  }, {});
}

export async function saveContent<K extends SiteContentKey>(
  key: K,
  value: SiteContentBundle[K],
): Promise<void> {
  const client = assertSupabase();
  const { error } = await client
    .from('site_content')
    .upsert(
      {
        key,
        value,
        public_read: true,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'key' },
    );

  if (error) {
    throw new Error(error.message);
  }
}

export async function loadAdminInquiries(): Promise<Inquiry[]> {
  const client = assertSupabase();
  const { data, error } = await client
    .from('inquiries')
    .select('id,name,email,phone,affiliation,title,content,status,created_at')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data as InquiryRow[]).map(toInquiry);
}

export async function createInquiry(inquiry: Omit<Inquiry, 'id' | 'date' | 'status'>): Promise<Inquiry> {
  const client = assertSupabase();
  const id = 'HSX-' + Math.floor(100000 + Math.random() * 900000);
  const createdAt = new Date().toISOString();
  const row = {
    id,
    name: inquiry.name,
    email: inquiry.email,
    phone: inquiry.phone || null,
    affiliation: inquiry.affiliation || null,
    title: inquiry.title,
    content: inquiry.content,
    status: 'PENDING',
    created_at: createdAt,
  };

  const { data, error } = await client
    .from('inquiries')
    .insert(row)
    .select('id,name,email,phone,affiliation,title,content,status,created_at')
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return toInquiry(data as InquiryRow);
}

export async function replaceInquiries(inquiries: Inquiry[]): Promise<void> {
  const client = assertSupabase();
  const { error: deleteError } = await client
    .from('inquiries')
    .delete()
    .neq('id', '__never__');

  if (deleteError) {
    throw new Error(deleteError.message);
  }

  if (inquiries.length === 0) return;

  const { error: insertError } = await client
    .from('inquiries')
    .insert(inquiries.map(toInquiryRow));

  if (insertError) {
    throw new Error(insertError.message);
  }
}

