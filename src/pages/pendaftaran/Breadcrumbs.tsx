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

  const indexInformasiDataIsTrue = 2

  const menu = [
    'Jalur Pendaftaran',
    'Informasi Pribadi',
    'Pendidikan Sebelumnya',
    'Orang Tua',
    'Kelengkapan Dokumen',
    'Pilih Sekolah',
  ]

  const menuSD = menu?.filter((item) => item !== 'Pendidikan Sebelumnya')

  return (
    <div className="breadcrumb scrollbar flex overflow-auto text-center">
      {jenjang.toLowerCase() === 'sd' ? (
        <>
          {menuSD.map((item, idx) => (
            <a
              href="#"
              className={clsx('', {
                'breadcrumb__step--active breadcrumb__step': activeIndex >= idx,
                'breadcrumb__status--active breadcrumb__status':
                  !(activeIndex >= idx) &&
                  getProfil?.biodata?.status === true &&
                  idx <= indexInformasiDataIsTrue,
                'breadcrumb__step hover:cursor-not-allowed':
                  !(activeIndex >= idx) &&
                  !(
                    getProfil?.biodata?.status === true &&
                    idx <= indexInformasiDataIsTrue
                  ),
              })}
              key={idx}
              onClick={() => {
                if (
                  activeIndex > idx ||
                  (getProfil?.biodata?.status === true &&
                    idx <= indexInformasiDataIsTrue)
                ) {
                  setActiveIndex(idx)
                  setName(convertToSlug(item))
                  dispatch(setStateBiodata({ page: convertToSlug(item) }))
                  navigate(`/main?page=${convertToSlug(item)}`)
                }
              }}
            >
              <p className="text-nowrap">{item}</p>
            </a>
          ))}
        </>
      ) : (
        <>
          {menu.map((item, idx) => (
            <a
              href="#"
              className={clsx('breadcrumb__step', {
                'breadcrumb__step--active':
                  activeIndex >= idx ||
                  (getProfil?.biodata?.status === true &&
                    idx <= indexInformasiDataIsTrue),
                'hover:cursor-not-allowed':
                  !(activeIndex >= idx) &&
                  !(
                    getProfil?.biodata?.status === true &&
                    idx <= indexInformasiDataIsTrue
                  ),
              })}
              key={idx}
              onClick={() => {
                if (
                  activeIndex > idx ||
                  (getProfil?.biodata?.status === true &&
                    idx <= indexInformasiDataIsTrue)
                ) {
                  setActiveIndex(idx)
                  setName(convertToSlug(item))
                  dispatch(setStateBiodata({ page: convertToSlug(item) }))
                  navigate(`/main?page=${convertToSlug(item)}`)
                }
              }}
            >
              <p className="text-nowrap">{item}</p>
            </a>
          ))}
        </>
      )}
    </div>
  )
}
