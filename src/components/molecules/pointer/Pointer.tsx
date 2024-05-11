import './index.css'

export function Pointer({ title }: { title: string }) {
  return (
    <div className="pointer flex border-2 border-red-300">
      <p>{title}</p>
    </div>
  )
}
