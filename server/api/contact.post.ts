import { defineEventHandler, readBody, createError } from 'h3';

interface ContactBody {
  name?: string;
  email?: string;
  message?: string;
  /** honeypot — humans leave this empty */
  website?: string;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIMITS = { name: 120, email: 200, message: 5000 };

export default defineEventHandler(async (event) => {
  const body = await readBody<ContactBody>(event);

  // Bot: accept and discard, so it gets no signal that it was caught.
  if (body?.website) return { ok: true };

  const name = (body?.name ?? '').trim();
  const email = (body?.email ?? '').trim();
  const message = (body?.message ?? '').trim();

  if (
    !name ||
    name.length > LIMITS.name ||
    !email ||
    email.length > LIMITS.email ||
    !EMAIL.test(email) ||
    !message ||
    message.length > LIMITS.message
  ) {
    throw createError({
      statusCode: 422,
      message: 'Please check the form and try again.',
    });
  }

  // TRANSPORT — not yet chosen. Set CONTACT_WEBHOOK_URL to a form service
  // (Formspree, Web3Forms, a Zapier catch hook, …) and submissions forward
  // there as JSON. To send mail directly instead, replace this block with an
  // SMTP or API call; nothing above needs to change.
  const endpoint = process.env.CONTACT_WEBHOOK_URL;
  if (!endpoint) {
    throw createError({
      statusCode: 501,
      message: 'The contact form is not connected yet — please email me directly.',
    });
  }

  try {
    await $fetch(endpoint, {
      method: 'POST',
      body: { name, email, message },
    });
  } catch {
    throw createError({
      statusCode: 502,
      message: 'Could not send that just now — please email me directly.',
    });
  }

  return { ok: true };
});
