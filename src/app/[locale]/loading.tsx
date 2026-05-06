export default function Loading() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pt-28 pb-20">
      <div className="container-site">
        {/* Header skeleton */}
        <div className="text-center mb-14 space-y-4">
          <div className="skeleton h-3 w-24 mx-auto rounded" />
          <div className="skeleton h-10 w-72 mx-auto rounded" />
          <div className="skeleton h-1 w-16 mx-auto" />
          <div className="skeleton h-4 w-80 mx-auto rounded" />
        </div>

        {/* Grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="overflow-hidden border border-[var(--border)]">
              <div className="skeleton h-56 w-full" />
              <div className="p-5 space-y-3">
                <div className="skeleton h-4 w-3/4 rounded" />
                <div className="skeleton h-3 w-full rounded" />
                <div className="skeleton h-3 w-2/3 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
