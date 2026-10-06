"use client";
import { authClient, useSession } from "@/lib/auth-client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Profile = () => {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.name) setName(user.name);
  }, [user?.name]);

  const trimmed = name.trim();
  const isUnchanged = trimmed === user?.name;

  const handleProfileUpdate = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!trimmed) return toast.error("Name cannot be empty");
    if (isUnchanged) return toast.info("Nothing to update");

    setLoading(true);
    try {
      const { error } = await authClient.updateUser({ name: trimmed });
      if (error)
        return toast.error(error.message || "Failed to update profile");
      toast.success("Profile updated");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-12">
        <div className="h-72 animate-pulse rounded-3xl bg-line" />
      </main>
    );
  }

  if (!user) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
        <h1 className="font-serif text-3xl text-[#111]">
          You&apos;re not signed in
        </h1>
        <p className="mt-2 text-muted">Sign in to manage your profile.</p>
      </main>
    );
  }

  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <main className="mx-auto max-w-2xl px-4 py-10 sm:py-14">
      <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-accent">
        Account
      </p>
      <h1 className="mt-2 font-serif text-4xl text-[#111] sm:text-5xl">
        Your profile
      </h1>
      <p className="mt-2 text-muted">
        Manage how you appear on The Daily Brief.
      </p>

      <section className="mt-8 overflow-hidden rounded-3xl border border-line bg-white shadow-sm">
        {/* Banner */}
        <div className="h-28 bg-linear-to-br from-[#111] via-[#1d2a5c] to-accent" />

        <div className="px-6 pb-8 sm:px-10">
          {/* Avatar + identity */}
          <div className="-mt-12 flex items-end gap-4">
            {user.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.image}
                alt={user.name}
                className="size-24 rounded-full object-cover ring-4 ring-white"
              />
            ) : (
              <div className="flex size-24 items-center justify-center rounded-full bg-linear-to-br from-accent to-[#5a82ff] font-serif text-4xl uppercase text-white ring-4 ring-white">
                {user.name?.charAt(0)}
              </div>
            )}
            <div>
              <p className="font-serif text-2xl leading-tight text-[#111]">
                {user.name}
              </p>
              <p className="text-sm text-muted">{user.email}</p>
            </div>
          </div>

          {memberSince && (
            <p className="mt-4 text-xs uppercase tracking-widest text-muted">
              Member since {memberSince}
            </p>
          )}

          <hr className="my-8 border-line" />

          {/* Form */}
          <form onSubmit={handleProfileUpdate} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-[#111]"
              >
                Full name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-[#111] outline-none transition placeholder:text-muted/60 focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10"
              />
              <p className="mt-2 text-xs text-muted">
                This name is shown across the site.
              </p>
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-[#111]"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={user.email}
                disabled
                className="w-full cursor-not-allowed rounded-xl border border-line bg-paper px-4 py-3 text-muted"
              />
              <p className="mt-2 text-xs text-muted">
                Email can&apos;t be changed here.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setName(user.name)}
                disabled={loading || isUnchanged}
                className="cursor-pointer rounded-full px-5 py-2.5 text-sm font-medium text-muted transition hover:text-[#111] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={loading || isUnchanged || !trimmed}
                className="cursor-pointer rounded-full bg-[#111] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[#111]"
              >
                {loading ? "Saving..." : "Save changes"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Profile;
