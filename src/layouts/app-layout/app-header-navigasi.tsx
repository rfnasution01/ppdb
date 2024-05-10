import { ListHeaderNavigation } from '@/libs/dummy/list-header-navigation'
import clsx from 'clsx'
import { IconComponent } from './IconComponent'
import { convertToSlug } from '@/libs/helpers/format-text'
import { usePathname } from '@/libs/hooks/usePathname'
import { ListHeaderNavigationMobile } from '@/libs/dummy/list-header-navigation -mobile'
import { ListAsideNavigationMobile } from '@/libs/dummy/list-aside-navigation-mobile'

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
  const isActivePage = ListHeaderNavigationMobile.find(
    (item) => convertToSlug(item?.judul) === firstPathname,
  )
  const isAsideActivePage = ListAsideNavigationMobile.find(
    (item) => convertToSlug(item?.title) === firstPathname,
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
        <div className="flex items-center gap-12 py-16">
          {isActivePage?.icon ?? isAsideActivePage?.icon}
          <p className="text-[2.4rem] uppercase">
            {isActivePage?.judul ?? isAsideActivePage?.title}
          </p>
        </div>
      </div>
    </div>
  )
}
