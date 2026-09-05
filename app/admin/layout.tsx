export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-full bg-light-bg text-text-dark">
      <div
        className="pointer-events-none fixed top-0 right-0 left-0 z-[60] border-t-4 border-t-primary"
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
