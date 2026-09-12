"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../../store/store";
import { ArrowIcon } from "../ui/icons";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    const cleanUsername = username.trim();

    if (!cleanUsername) {
      setError("Enter your username to continue.");
      return;
    }

    dispatch(actions.login(cleanUsername));
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f3f3f0] px-5 py-10 text-zinc-950">
      <div aria-hidden="true" className="absolute inset-0 court-grid opacity-60" />
      <section className="relative w-full max-w-[440px]">
        <div className="mb-7 flex items-center justify-center gap-3">
          <div className="grid size-10 place-items-center rounded-xl bg-zinc-950 text-sm font-black tracking-tighter text-white">TM</div>
          <span className="text-[15px] font-semibold tracking-[-0.02em]">Team Manager</span>
        </div>

        <div className="rounded-[28px] border border-zinc-200 bg-white p-2 shadow-[0_28px_90px_-42px_rgba(0,0,0,0.42)]">
          <div className="rounded-[22px] border border-zinc-100 px-6 py-9 sm:px-9 sm:py-10">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">Welcome</p>
            <h1 className="text-[34px] font-semibold tracking-[-0.05em]">Team Workspace.</h1>
            <p className="mt-3 text-[15px] leading-6 text-zinc-500">Sign in with a username to manage teams and discover players.</p>

            <form className="mt-8" onSubmit={handleSubmit} noValidate>
              <label htmlFor="username" className="mb-2 block text-sm font-medium">Username</label>
              <input
                id="username"
                name="username"
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                  if (error) setError("");
                }}
                placeholder="e.g. susandi.thein"
                autoComplete="username"
                autoFocus
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "username-error" : undefined}
                className="h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 text-[15px] outline-none transition placeholder:text-zinc-400 hover:border-zinc-300 focus:border-zinc-950 focus:bg-white focus:ring-4 focus:ring-zinc-950/5"
              />
              <div className="min-h-7 pt-1.5">
                {error && <p id="username-error" role="alert" className="text-xs font-medium text-red-700">{error}</p>}
              </div>
              <button type="submit" className="group flex h-12 w-full items-center justify-center gap-1.5 rounded-xl bg-zinc-950 text-sm font-semibold text-white transition hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 active:scale-[0.99]">
                Enter workspace
                <ArrowIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </form>
            <p className="mt-6 text-center text-xs text-zinc-400">No password or account setup required.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
