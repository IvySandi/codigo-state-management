"use client";

import { useEffect } from "react";
import { CloseIcon } from "./icons";

export default function Modal({ title, description, onClose, children, size = "large" }) {
  const sizeClass = {
    small: "max-w-md",
    medium: "max-w-xl",
    large: "max-w-3xl",
  }[size];

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6">
      <button aria-label="Close modal" className="absolute inset-0 cursor-default bg-zinc-950/55 backdrop-blur-[2px]" onClick={onClose} />
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby={description ? "modal-description" : undefined}
        className={`relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-[28px] border border-zinc-200 bg-white shadow-2xl sm:rounded-[28px] ${sizeClass}`}
      >
        <header className="flex items-start justify-between gap-6 border-b border-zinc-100 px-6 py-5 sm:px-8">
          <div>
            <h2 id="modal-title" className="text-xl font-semibold tracking-[-0.03em] text-zinc-950">{title}</h2>
            {description && <p id="modal-description" className="mt-1 text-sm leading-5 text-zinc-500">{description}</p>}
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="grid size-9 shrink-0 place-items-center rounded-full text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950">
            <CloseIcon className="size-5" />
          </button>
        </header>
        {children}
      </section>
    </div>
  );
}
