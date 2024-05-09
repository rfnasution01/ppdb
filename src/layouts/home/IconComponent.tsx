export function IconComponent({
  icon,
  title,
}: {
  icon?: JSX.Element
  title?: string
}) {
  return (
    <div className="flex items-center gap-8 rounded-lg border p-16 hover:cursor-pointer hover:bg-background">
      {icon}
      <p>{title}</p>
    </div>
  )
}
