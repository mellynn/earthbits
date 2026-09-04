"use client";

import { useState } from "react";

export function ContactForm({ email }: { email: string }) {
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subject = encodeURIComponent(`Earthbits — message from ${name || "visitor"}`);
    const body = encodeURIComponent(
      `${message}\n\n— ${name}${from ? `\n${from}` : ""}`,
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
          value={name}
          onChange={(event) => setName(event.target.value)}
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
          value={from}
          onChange={(event) => setFrom(event.target.value)}
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
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="w-full resize-y border border-line bg-transparent px-3 py-2.5 text-sm text-paper outline-none transition-colors focus:border-accent"
        />
      </label>
      <button
        type="submit"
        className="w-full rounded-full border border-paper/55 px-7 py-2.5 text-[11px] uppercase tracking-[0.2em] text-paper transition-colors hover:border-accent hover:text-accent"
      >
        Send
      </button>
      <p className="text-center text-xs text-muted">
        Opens your email client to {email}. You can also write directly.
      </p>
    </form>
  );
}
