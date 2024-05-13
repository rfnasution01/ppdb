import { Dispatch, SetStateAction } from 'react'
import './index.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { convertToSlug } from '@/libs/helpers/format-text'
import { setStateBiodata } from '@/store/reducer/stateBiodata'
import clsx from 'clsx'

export default function Breadcrumb({
  setName,
  activeIndex,
  setActiveIndex,
}: {
  setName: Dispatch<SetStateAction<string>>
  activeIndex: number
  setActiveIndex: Dispatch<SetStateAction<number>>
}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <div className="breadcrumb scrollbar flex overflow-auto text-center">
      {[
        'Jalur Pendaftaran',
        'Informasi Pribadi',
        'Pendidikan Sebelumnya',
        'Orang Tua',
        'Kelengkapan Dokumen',
        'Pilih Sekolah',
      ].map((item, idx) => (
        <a
          href="#"
          className={clsx('breadcrumb__step', {
            'breadcrumb__step--active': activeIndex >= idx,
            'hover:cursor-not-allowed': !(activeIndex >= idx),
          })}
          key={idx}
          onClick={() => {
            if (activeIndex > idx) {
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
    </div>
  )
}
