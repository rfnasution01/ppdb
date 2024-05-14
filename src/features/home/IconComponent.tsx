import Tooltips from '@/components/atoms/Tooltip'
import { setStateJenjang } from '@/store/reducer/stateJenjang'
import { CircleAlert } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

export function IconComponent({
  icon,
  title,
  link,
  isSD,
  isSMP,
  informasi,
}: {
  icon?: JSX.Element
  title?: string
  link?: string
  isSD?: boolean
  isSMP?: boolean
  informasi?: string
}) {
  const dispatch = useDispatch()

  const handleChangeJenjang = () => {
    dispatch(setStateJenjang({ tingkatan: isSD ? 'sd' : isSMP ? 'smp' : 'sd' }))
  }

  return (
    <Link
      to={link}
      onClick={() => {
        handleChangeJenjang()
      }}
      className="flex items-center gap-8 rounded-lg border p-16 hover:cursor-pointer hover:bg-background"
    >
      {icon}
      <p>{title}</p>
      <div className="phones:hidden">
        <Tooltips
          triggerComponent={<CircleAlert size={16} />}
          tooltipContent={
            <div dangerouslySetInnerHTML={{ __html: informasi }} />
          }
        />
      </div>
    </Link>
  )
}
