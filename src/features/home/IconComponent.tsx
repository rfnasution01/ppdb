import { setStateJenjang } from '@/store/reducer/stateJenjang'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

export function IconComponent({
  icon,
  title,
  link,
  isSD,
  isSMP,
}: {
  icon?: JSX.Element
  title?: string
  link?: string
  isSD?: boolean
  isSMP?: boolean
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
    </Link>
  )
}
