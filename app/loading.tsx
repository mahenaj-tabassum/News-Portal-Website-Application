const Loading = () => {
  return (
    <main
      role="status"
      aria-live="polite"
      className="flex min-h-[70vh] flex-col items-center justify-center gap-6 bg-paper text-ink"
    >
      <div className="relative flex h-20 w-20 items-center justify-center">
        {/* Track */}
        <span className="absolute inset-0 rounded-full border-2 border-line" />
        {/* Spinning arc */}
        <span className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent motion-safe:animate-spin" />
        {/* Monogram */}
        <span className="font-serif text-3xl font-medium">B</span>
      </div>

      <p className="text-sm text-muted">Loading stories</p>
    </main>
  );
};

export default Loading;
