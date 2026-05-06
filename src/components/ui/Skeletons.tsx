export function ProjectCardSkeleton() {
  return (
    <div className="card-glass overflow-hidden animate-pulse">
      <div className="skeleton h-56 w-full" />
      <div className="p-5 space-y-3">
        <div className="skeleton h-3 w-20 rounded" />
        <div className="skeleton h-5 w-3/4 rounded" />
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-2/3 rounded" />
      </div>
    </div>
  )
}

export function ProjectGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProjectCardSkeleton key={i} />
      ))}
    </div>
  )
}
