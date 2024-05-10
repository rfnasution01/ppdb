import { ListHeaderNavigation } from '@/libs/dummy/list-header-navigation'
import clsx from 'clsx'
import { IconComponent } from './IconComponent'
import { convertToSlug } from '@/libs/helpers/format-text'
import { usePathname } from '@/libs/hooks/usePathname'

export function AppHeaderNavigasi({
  isSD,
  isSMP,
  jenjang,
}: {
  isSMP: boolean
  isSD: boolean
  jenjang: string
}) {
  const { firstPathname } = usePathname()
  const isActivePage = ListHeaderNavigation.find(
    (item) => convertToSlug(item?.judul) === firstPathname,
  )

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
      <div className="flex w-5/6 phones:hidden">
        {ListHeaderNavigation.map((item, idx) => (
          <div key={idx}>
            <IconComponent
              icon={item?.icon}
              title={item?.judul}
              link={`/${convertToSlug(item?.judul)}?jenjang=${jenjang}`}
              isSD={isSD}
              isSMP={isSMP}
            />
          </div>
        ))}
      </div>
      <div className="hidden phones:block">
        <div className="flex items-center gap-8 py-16">
          {isActivePage?.icon}
          <p>{isActivePage?.judul}</p>
        </div>
      </div>
    </div>
  )
}
