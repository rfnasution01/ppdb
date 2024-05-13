export function MultiSkeleton() {
  return (
    <div className="flex flex-col gap-16">
      <div className="h-[5.5rem] w-full animate-pulse rounded-full bg-slate-200 font-roboto text-[3rem] duration-100" />
      <div className="h-[5.5rem] w-full animate-pulse rounded-full bg-slate-200 font-roboto text-[3rem] duration-100" />
      <div className="h-[5.5rem] w-full animate-pulse rounded-full bg-slate-200 font-roboto text-[3rem] duration-100" />
    </div>
  )
}
