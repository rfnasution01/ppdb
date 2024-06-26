import { ListUserNavigation } from '@/libs/dummy/list-user-navigation'
import { enumValidasi } from '@/libs/enum/enum-validasi'
import { convertToSlug } from '@/libs/helpers/format-text'
import { usePathname } from '@/libs/hooks/usePathname'
import { ProfilData } from '@/libs/types/pendaftaran-type'
import clsx from 'clsx'
import Cookies from 'js-cookie'
import { Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ModalLogout } from '../root-layout/modal-logout'
import { DashboardType } from '@/libs/types/dashboard-type'
import { useGetDashboardQuery } from '@/store/slices/dashboardAPI'

export function MainHeader({ profil }: { profil: ProfilData }) {
  const { secondPathname, thirdPathname } = usePathname()
  const navigate = useNavigate()
  const [isShowLogout, setisShowLogout] = useState<boolean>(false)

  const isActivePage = (item: string) => {
    if (
      convertToSlug(item) === secondPathname ||
      (item.toLowerCase() === 'beranda' && secondPathname === undefined) ||
      (secondPathname === 'profil' && item === 'profil') ||
      (secondPathname === 'profil' &&
        thirdPathname === 'biodata' &&
        item === 'profil')
    ) {
      return true
    }
    return false
  }

  const handleLogout = () => {
    Cookies.remove('token')
    navigate('/login')
  }

  const [dashboard, setDashboard] = useState<DashboardType>()
  const { data, isFetching, isLoading } = useGetDashboardQuery()
  const load = isFetching || isLoading

  useEffect(() => {
    if (data) {
      setDashboard(data?.data)
    }
  }, [data])

  const isValidasi = profil?.validasi?.status === enumValidasi.SUDAHVALIDASI
  const isLulus = !load && dashboard?.status_pendaftaran?.lulus !== 1

  const listNotValidasi = ListUserNavigation.filter(
    (item) =>
      item?.title === 'Profil' ||
      item?.title === 'Jadwal PPDB' ||
      item?.title === 'Hubungi Kami',
  )

  const listNotLulus = ListUserNavigation.filter(
    (item) => item?.title !== 'Daftar Ulang',
  )

  const list = isLulus
    ? listNotLulus
    : isValidasi
      ? ListUserNavigation
      : listNotValidasi

  return (
    <div className="flex h-full flex-col gap-64">
      {/* --- Logo --- */}
      <Link to="/">
        <img src="/img/logo.png" />
      </Link>

      <div className="flex flex-1 flex-col justify-between">
        {/* --- Navigasi --- */}
        <div className="flex flex-col gap-12">
          {list?.map((item, idx) => (
            <Link
              to={
                item?.title === 'Beranda'
                  ? '/main'
                  : `/main/${convertToSlug(item?.title)}`
              }
              key={idx}
              className={clsx(
                'flex items-center gap-16 border-l-2 px-24 py-8 hover:cursor-pointer hover:border-danger-300 hover:bg-danger-tint-1 hover:bg-opacity-20 hover:text-danger-300',
                {
                  'border-danger-300 bg-danger-tint-1 bg-opacity-20 text-danger-300':
                    isActivePage(convertToSlug(item?.title)),
                  'text-balance border-transparent': !isActivePage(
                    convertToSlug(item?.title),
                  ),
                },
              )}
            >
              {item?.icon}
              <p>{item?.title}</p>
            </Link>
          ))}
        </div>
        <div
          onClick={() => {
            setisShowLogout(true)
          }}
          className="flex items-center gap-16 border-l-2 border-transparent px-24 py-8 hover:cursor-pointer hover:border-danger-300 hover:bg-danger-tint-1 hover:bg-opacity-20 hover:text-danger-300"
        >
          <Trash2 size={16} />
          <p>Keluar</p>
        </div>
      </div>
      <ModalLogout
        isOpen={isShowLogout}
        setIsOpen={setisShowLogout}
        handleLogout={handleLogout}
      />
    </div>
  )
}
