/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { ADMIN_EMAILS } from '../src/config';
import {
  INITIAL_INTRO,
  INITIAL_MEMBERS,
  INITIAL_NOTICES,
  INITIAL_RESEARCH,
} from '../src/data';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const adminDefaultPassword = process.env.ADMIN_DEFAULT_PASSWORD;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error('VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.');
}

const adminClient = createClient(supabaseUrl, serviceRoleKey);

const contentRows = [
  { key: 'intro', value: INITIAL_INTRO, public_read: true },
  { key: 'members', value: INITIAL_MEMBERS, public_read: true },
  { key: 'research', value: INITIAL_RESEARCH, public_read: true },
  { key: 'notices', value: INITIAL_NOTICES, public_read: true },
];

const { error: contentError } = await adminClient
  .from('site_content')
  .upsert(contentRows, { onConflict: 'key' });

if (contentError) {
  throw contentError;
}

console.log('Seeded public site_content rows.');

if (serviceRoleKey && adminDefaultPassword) {
  for (const email of ADMIN_EMAILS) {
    const { error } = await adminClient.auth.admin.createUser({
      email,
      password: adminDefaultPassword,
      email_confirm: true,
      user_metadata: {
        role: 'hs_aipp_admin',
      },
    });

    if (error && !error.message.toLowerCase().includes('already')) {
      throw error;
    }
  }

  console.log('Ensured Supabase Auth admin users.');
} else {
  console.log('Skipped Auth user creation. Set SUPABASE_SERVICE_ROLE_KEY and ADMIN_DEFAULT_PASSWORD to create admin accounts.');
}
