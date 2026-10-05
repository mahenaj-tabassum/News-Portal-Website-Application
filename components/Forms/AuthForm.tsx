import Link from "next/link";

export default function AuthForm({ mode }: { mode: "in" | "up" }) {
  const up = mode === "up";
  const fields = [
    ...(up ? [["Full name", "text"]] : []),
    ["Email address", "email"],
    ["Password", "password"],
  ];
  return (
    <main className="grid my-20 min-h-screen">
      <div className="mx-auto border border-line bg-white flex w-full max-w-lg flex-col justify-center px-10 py-16">
        <h1 className="h-serif text-5xl">
          {up ? "Join the conversation." : "Welcome back."}
        </h1>
        <p className="mt-4 text-muted">
          {up
            ? "Create your account and make The Daily Brief part of your daily reading."
            : "Sign in to continue reading the stories that matter."}
        </p>
        <form className="mt-10 space-y-6">
          {fields.map(([l, t]) => (
            <label key={l} className="label block text-muted">
              {l}
              <input
                type={t}
                className="mt-2 w-full border-b border-ink/30 bg-transparent py-3 text-base font-normal normal-case tracking-normal text-ink outline-none transition-colors focus:border-accent"
              />
            </label>
          ))}
          <button className="w-full cursor-pointer bg-accent py-3.5 text-sm font-semibold text-white transition-colors hover:bg-ink">
            {up ? "Create account" : "Sign in"}
          </button>
          <button
            type="button"
            className="w-full cursor-pointer border border-line bg-white py-3.5 text-sm font-medium transition-colors hover:border-ink"
          >
            Continue with Google
          </button>
          <button
            type="button"
            className="w-full cursor-pointer border border-line bg-white py-3.5 text-sm font-medium transition-colors hover:border-ink"
          >
            Continue with Github
          </button>
        </form>
        <p className="mt-8 text-sm text-muted">
          {up ? "Already have an account?" : "Don't have an account?"}{" "}
          <Link
            href={up ? "/sign-in" : "/sign-up"}
            className="font-medium text-accent"
          >
            {up ? "Sign in" : "Create one"}
          </Link>
        </p>
      </div>
    </main>
  );
}
