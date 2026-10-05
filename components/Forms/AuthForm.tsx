"use client";
import { authClient, signIn } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react";
import { BsGoogle } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function AuthForm({ mode }: { mode: "in" | "up" }) {
  const up = mode === "up";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (up) {
        // SING Un
        const { error } = await authClient.signUp.email({
          name,
          email,
          password,
          callbackURL: "/",
        });
        if (error) {
          toast.error(error.message || "Failed to create account.");
          return;
        }
        // Sign Up Successful
        toast.success("Account created successfully! 🎉");
        router.push("/");
        router.refresh();
      } else {
        // SIGN IN
        const { error } = await signIn.email({
          email,
          password,
          callbackURL: "/",
        });
        if (error) {
          toast.error(error.message || "Invalid email or password.");
          return;
        }
        // Sign Successful
        toast.success("Signed in successfully! 👋");
        router.push("/");
        router.refresh();
      }
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="grid my-20 min-h-screen">
      <div className="mx-auto border border-line bg-white flex w-full max-w-lg flex-col justify-center px-10 py-16">
        <h1 className="h-serif text-5xl">
          {up ? "Join the conversation." : "Welcome back."}
        </h1>
        <p className="mt-4 text-muted">
          {up
            ? "Create your account and make The Daily Brief part of your daily reading."
            : "Sign in to continue reading the news"}
        </p>
        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          {up && (
            <>
              <label className="label block text-muted">
                Full name
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 w-full border-b border-ink/30 bg-transparent py-3 text-base font-normal normal-case tracking-normal text-ink outline-none transition-colors focus:border-accent"
                  required
                />
              </label>
            </>
          )}

          <label className="label block text-muted">
            Email address
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full border-b border-ink/30 bg-transparent py-3 text-base font-normal normal-case tracking-normal text-ink outline-none transition-colors focus:border-accent"
              required
            />
          </label>

          <label className="label block text-muted">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full border-b border-ink/30 bg-transparent py-3 text-base font-normal normal-case tracking-normal text-ink outline-none transition-colors focus:border-accent"
              required
            />
          </label>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer bg-accent py-3.5 text-sm font-semibold text-white transition-colors hover:bg-ink"
          >
            {loading
              ? up
                ? "Creating account..."
                : "Signing in..."
              : up
                ? "Create account"
                : "Sign in"}
          </button>
          <button
            type="button"
            className="w-full cursor-pointer border border-line bg-white py-3.5 text-sm font-medium transition-colors hover:border-ink"
          >
            <span className="flex items-center justify-center gap-3">
              <BsGoogle className="text-accent size-4" />
              Continue with Google
            </span>
          </button>
          <button
            type="button"
            className="w-full cursor-pointer border border-line bg-white py-3.5 text-sm font-medium transition-colors hover:border-ink"
          >
            <span className="flex items-center justify-center gap-3">
              <FaGithub className="size-5 text-accent" />
              Continue with Github
            </span>
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
