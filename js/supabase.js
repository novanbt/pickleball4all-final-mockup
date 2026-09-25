/**
 * Supabase Client Configuration & Helpers for PickleBall4All
 * Project ID: seelycwozohgvrxayvvt
 */

(function () {
  'use strict';

  const SUPABASE_PROJECT_ID = 'seelycwozohgvrxayvvt';
  const SUPABASE_URL = 'https://seelycwozohgvrxayvvt.supabase.co';
  const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_Vf1TkD4fRjJWxPuOXIhwcA_gGeNTheQ';

  let _sbClient = null;

  // Initialize Supabase Client safely without namespace collisions
  function getSupabaseClient() {
    if (_sbClient) return _sbClient;

    if (typeof window !== 'undefined' && window.supabase && typeof window.supabase.createClient === 'function') {
      try {
        _sbClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
        window.supabaseClient = _sbClient;
        console.log('✅ Supabase initialized for project:', SUPABASE_PROJECT_ID);
        return _sbClient;
      } catch (e) {
        console.warn('Supabase createClient error:', e);
      }
    }
    return null;
  }

  // Attempt immediate initialization
  getSupabaseClient();

  // Retry on DOMContentLoaded if SDK was deferred
  if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
      getSupabaseClient();
    });
  }

  /**
   * Submit a coaching inquiry to the 'bookings' table in Supabase
   * @param {Object} bookingData - { name, phone, email, level, program, time_slot, notes }
   * @returns {Promise<{success: boolean, data?: any, error?: any}>}
   */
  async function submitBookingToSupabase(bookingData) {
    const client = getSupabaseClient();

    const payload = {
      full_name: bookingData.name || bookingData.full_name || '',
      phone_number: bookingData.phone || bookingData.phone_number || '',
      email: bookingData.email || null,
      playing_level: bookingData.level || bookingData.playing_level || '',
      program_type: bookingData.program || bookingData.program_type || '',
      timing_pref: bookingData.time_slot || bookingData.timing_pref || '',
      notes: bookingData.notes || null
    };

    // Primary path: Use Supabase JS Client if available
    if (client) {
      try {
        // Insert without select() to ensure anonymous RLS insert policies succeed smoothly
        const { data, error } = await client
          .from('bookings')
          .insert([payload]);

        if (error) {
          console.warn('Supabase client insert error, attempting REST fallback:', error);
        } else {
          console.log('✅ Booking successfully saved to Supabase (client)!', payload);
          return { success: true, data };
        }
      } catch (err) {
        console.warn('Supabase client exception, trying direct REST API:', err);
      }
    }

    // Direct REST API Fallback (guarantees submission even if SDK load fails)
    try {
      const restResponse = await fetch(`${SUPABASE_URL}/rest/v1/bookings`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_PUBLISHABLE_KEY,
          'Authorization': `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(payload)
      });

      if (restResponse.ok) {
        console.log('✅ Booking successfully saved to Supabase (REST API)!', payload);
        return { success: true };
      } else {
        const errorText = await restResponse.text();
        console.error('Supabase REST API error:', restResponse.status, errorText);
        return { success: false, error: errorText };
      }
    } catch (fetchErr) {
      console.error('Supabase REST connection error:', fetchErr);
      return { success: false, error: fetchErr };
    }
  }

  // Expose configuration and functions globally
  window.SUPABASE_CONFIG = {
    projectId: SUPABASE_PROJECT_ID,
    url: SUPABASE_URL,
    publishableKey: SUPABASE_PUBLISHABLE_KEY
  };
  window.getSupabaseClient = getSupabaseClient;
  window.submitBookingToSupabase = submitBookingToSupabase;
})();
