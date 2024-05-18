import { Dispatch, SetStateAction } from 'react'
import './index.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { convertToSlug } from '@/libs/helpers/format-text'
import { setStateBiodata } from '@/store/reducer/stateBiodata'
import clsx from 'clsx'
import { ProfilData } from '@/libs/types/pendaftaran-type'
import Cookies from 'js-cookie'

export default function Breadcrumb({
  setName,
  activeIndex,
  setActiveIndex,
  getProfil,
}: {
  setName: Dispatch<SetStateAction<string>>
  activeIndex: number
  setActiveIndex: Dispatch<SetStateAction<number>>
  getProfil: ProfilData
}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const jenjang = Cookies.get('jenjang') ?? 'sd'

  const menu = [
    'Jalur Pendaftaran',
    'Informasi Pribadi',
    'Pendidikan Sebelumnya',
    'Orang Tua',
    'Kelengkapan Dokumen',
    'Pilih Sekolah',
  ]

  const menuSD = menu?.filter((item) => item !== 'Pendidikan Sebelumnya')

  const filteredMenu = jenjang.toLowerCase() === 'sd' ? menuSD : menu

  const isDokumen = getProfil?.dokumen?.status
  const isOrangtua = getProfil?.orangtua?.status
  const isSekolah = getProfil?.sekolah?.status
  const isBiodata = getProfil?.biodata?.status

  const isSD = (id: number) => {
    if (
      (jenjang.toLowerCase() === 'sd' && id === 3) ||
      (jenjang.toLowerCase() === 'sd' && id === 4) ||
      (jenjang.toLowerCase() === 'sd' && id === 5)
    ) {
      return id - 1
    }
    return id
  }

  const isSDOnClick = (id: number) => {
    if (
      (jenjang.toLowerCase() === 'sd' && id === 3) ||
      (jenjang.toLowerCase() === 'sd' && id === 4) ||
      (jenjang.toLowerCase() === 'sd' && id === 5)
    ) {
      return id + 1
    }
    return id
  }

  const menuCondition = (idx: number) => {
    if (isDokumen) {
      return isOrangtua && idx <= isSD(5)
    } else if (isOrangtua) {
      return isOrangtua && idx <= isSD(4)
    } else if (isSekolah) {
      return isSekolah && idx <= isSD(3)
    } else if (isBiodata) {
      return isBiodata && idx <= isSD(2)
    } else {
      return idx < 2
    }
  }

  return (
    <div className="breadcrumb scrollbar flex overflow-auto text-center">
      {filteredMenu.map((item, idx) => (
        <a
          href="#"
          className={clsx('', {
            'breadcrumb__step--active breadcrumb__step':
              isSD(activeIndex) === idx,
            'breadcrumb__status--active breadcrumb__status':
              !(isSD(activeIndex) === idx) && menuCondition(idx),
            'breadcrumb__step hover:cursor-not-allowed':
              !(isSD(activeIndex) === idx) && !menuCondition(idx),
          })}
          key={idx}
          onClick={() => {
            if (activeIndex > idx || menuCondition(idx)) {
              setActiveIndex(isSDOnClick(idx))
              setName(convertToSlug(item))
              dispatch(setStateBiodata({ page: convertToSlug(item) }))
              navigate(`/main?page=${convertToSlug(item)}`)
            }
          }}
        >
          <p className="text-nowrap">{item}</p>
        </a>
      ))}
    </div>
  )
}
