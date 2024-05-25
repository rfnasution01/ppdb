import { ReactNode, useState } from 'react'

export function Accordion({
  title,
  content,
}: {
  title: string | ReactNode
  content: ReactNode
}) {
  const [isActive, setIsActive] = useState(false)

  return (
    <div className="flex flex-col gap-12">
      <div onClick={() => setIsActive(!isActive)}>{title}</div>
      {isActive && (
        <div className="border-b border-l border-r bg-white p-32 text-[2.2rem] duration-300">
          {content}
        </div>
      )}
    </div>
  )
}
