"use client";
import { authClient, signIn } from "@/lib/auth-client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsGoogle } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";

type Provider = "google" | "github";

export default function AuthForm({ mode }: { mode: "in" | "up" }) {
  const up = mode === "up";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<Provider | null>(null);
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const err = params.get("error");
    if (err) toast.error(err.replaceAll("_", " ").toLowerCase());
  }, [params]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (up) {
        // SIGN UP
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
          toast.error(
            error.message ||
              "Invalid email or password. Signed up with Google or GitHub? Use the buttons below.",
          );
          return;
        }
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

  const handleSocial = async (provider: Provider) => {
    try {
      setSocialLoading(provider);
      await signIn.social({
        provider,
        callbackURL: "/",
        errorCallbackURL: "/sign-in",
      });
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong. Please try again.");
      setSocialLoading(null);
    }
  };

  const inputClass =
    "mt-2 w-full border-b border-ink/30 bg-transparent py-3 text-base font-normal normal-case tracking-normal text-ink outline-none transition-colors focus:border-accent";

  const socialBtnClass =
    "w-full cursor-pointer border border-line bg-white py-3.5 text-sm font-medium transition-colors hover:border-accent rounded disabled:cursor-not-allowed disabled:opacity-60";

  return (
    <main className="grid my-20 min-h-screen px-5">
      <div className="mx-auto border border-line  bg-white flex w-full max-w-lg flex-col justify-center px-10 py-16">
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
            <label className="label block text-muted">
              Full name
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
                required
              />
            </label>
          )}

          <label className="label block text-muted">
            Email address
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              required
            />
          </label>

          <label className="label block text-muted">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
              required
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer bg-accent py-3.5 text-sm font-semibold text-white transition-colors hover:bg-ink disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? up
                ? "Creating account..."
                : "Signing in..."
              : up
                ? "Create account"
                : "Sign in"}
          </button>
        </form>

        {/* Divider */}
        <div className="mt-8 flex items-center gap-4 text-xs uppercase tracking-widest text-muted">
          <span className="h-px flex-1 bg-line" />
          or
          <span className="h-px flex-1 bg-line" />
        </div>

        {/* Social buttons */}
        <div className="mt-8 space-y-4">
          <button
            type="button"
            onClick={() => handleSocial("google")}
            disabled={socialLoading !== null}
            className={socialBtnClass}
          >
            <span className="flex items-center justify-center gap-3">
              <BsGoogle className="size-4 text-accent" />
              {socialLoading === "google"
                ? "Redirecting..."
                : "Continue with Google"}
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleSocial("github")}
            disabled={socialLoading !== null}
            className={socialBtnClass}
          >
            <span className="flex items-center justify-center gap-3">
              <FaGithub className="size-5 text-accent" />
              {socialLoading === "github"
                ? "Redirecting..."
                : "Continue with GitHub"}
            </span>
          </button>
        </div>

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
