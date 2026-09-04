"use client";

import { useState, type FormEvent } from "react";

const NAME_MAX = 80;
const EMAIL_MAX = 120;
const MESSAGE_MAX = 2000;

export function ContactForm({ email }: { email: string }) {
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const safeName = name.trim().slice(0, NAME_MAX);
    const safeFrom = from.trim().slice(0, EMAIL_MAX);
    const safeMessage = message.trim().slice(0, MESSAGE_MAX);
    const subject = encodeURIComponent(
      `Earthbits — message from ${safeName || "visitor"}`,
    );
    const body = encodeURIComponent(
      `${safeMessage}\n\n— ${safeName}${safeFrom ? `\n${safeFrom}` : ""}`,
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto w-full max-w-md space-y-4">
      <label className="block">
        <span className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-muted">
          Name
        </span>
        <input
          required
          name="name"
          autoComplete="name"
          maxLength={NAME_MAX}
          value={name}
          onChange={(event) => setName(event.target.value.slice(0, NAME_MAX))}
          className="w-full border border-line bg-transparent px-3 py-2.5 text-sm text-paper outline-none transition-colors focus:border-accent"
        />
      </label>
      <label className="block">
        <span className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-muted">
          Email
        </span>
        <input
          required
          type="email"
          name="email"
          autoComplete="email"
          maxLength={EMAIL_MAX}
          value={from}
          onChange={(event) => setFrom(event.target.value.slice(0, EMAIL_MAX))}
          className="w-full border border-line bg-transparent px-3 py-2.5 text-sm text-paper outline-none transition-colors focus:border-accent"
        />
      </label>
      <label className="block">
        <span className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-muted">
          Message
        </span>
        <textarea
          required
          name="message"
          rows={5}
          maxLength={MESSAGE_MAX}
          value={message}
          onChange={(event) =>
            setMessage(event.target.value.slice(0, MESSAGE_MAX))
          }
          className="w-full resize-y border border-line bg-transparent px-3 py-2.5 text-sm text-paper outline-none transition-colors focus:border-accent"
        />
      </label>
      <button
        type="submit"
        className="w-full rounded-full border border-paper/55 px-7 py-2.5 text-[11px] uppercase tracking-[0.2em] text-paper transition-colors hover:border-accent hover:text-accent"
      >
        Send
      </button>
      <p className="text-center text-xs leading-6 text-muted">
        Opens your email client. You can also write{" "}
        <a href={`mailto:${email}`} className="text-paper hover:text-accent">
          {email}
        </a>{" "}
        directly.
      </p>
      <noscript>
        <p className="text-center text-xs text-muted">
          JavaScript is off — email{" "}
          <a href={`mailto:${email}`} className="text-paper">
            {email}
          </a>{" "}
          instead.
        </p>
      </noscript>
    </form>
  );
}
