import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <Skeleton className="h-10 w-[200px]" />
          <Skeleton className="h-10 w-[150px]" />
        </div>

        <Skeleton className="h-[100px] w-full rounded-xl" />

        <div className="flex items-center space-x-2 text-right">
          <div className="flex-1 flex items-center space-x-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-[100px]" />
            <Skeleton className="h-10 w-[100px]" />
          </div>
        </div>

        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-[250px] w-full rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
