import { ListHeaderNavigation } from '@/libs/dummy/list-header-navigation'
import clsx from 'clsx'
import { IconComponent } from './IconComponent'
import { convertToSlug } from '@/libs/helpers/format-text'

export function AppHeaderNavigasi({
  isSD,
  isSMP,
}: {
  isSMP: boolean
  isSD: boolean
}) {
  return (
    <div
      className={clsx(
        'flex items-center gap-32 px-[20rem] text-white phones:px-32',
        {
          'bg-primary': isSMP,
          'bg-danger-tint-2': isSD,
        },
      )}
    >
      <div className="w-1/6 phones:hidden"></div>
      <div className="flex w-5/6">
        {ListHeaderNavigation.map((item, idx) => (
          <div key={idx}>
            <IconComponent
              icon={item?.icon}
              title={item?.judul}
              link={convertToSlug(item?.judul)}
              isSD={isSD}
              isSMP={isSMP}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
