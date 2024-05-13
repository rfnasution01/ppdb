export function SingleSkeleton({
  width = 'w-full',
  height = 'h-[5.5rem]',
}: {
  width?: string
  height?: string
}) {
  return (
    <div
      className={`${height} ${width} animate-pulse rounded-full bg-slate-200 font-roboto text-[3rem] duration-100`}
    />
  )
}
