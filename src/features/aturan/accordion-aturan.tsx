import { useState } from 'react'

export function Accordion({
  title,
  content,
  idx,
}: {
  title: string
  content: string
  idx: number
}) {
  const [isActive, setIsActive] = useState(false)

  return (
    <div className="rounded-lg border bg-white hover:cursor-pointer hover:bg-slate-200">
      <div
        className="flex items-center justify-between bg-background px-32 py-16"
        onClick={() => setIsActive(!isActive)}
      >
        <div>
          {idx + 1}.{title}
        </div>
        <div>{isActive ? '-' : '+'}</div>
      </div>
      {isActive && (
        <div className="border-b border-l border-r bg-white px-32 py-16 text-[2.2rem] duration-300">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      )}
    </div>
  )
}
