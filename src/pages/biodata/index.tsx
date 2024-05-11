import { useEffect, useState } from 'react'
import './index.css'
import { convertSlugToText, convertToSlug } from '@/libs/helpers/format-text'
import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getBiodataSlice, setStateBiodata } from '@/store/reducer/stateBiodata'
import {
  BiodataDokumen,
  BiodataJalur,
  BiodataOrangTua,
  BiodataPendidikan,
  BiodataPribadi,
  BiodataSekolah,
} from '@/features/biodata'

export default function Biodata() {
  const searchParams = new URLSearchParams(location.search)
  const pageParams = searchParams.get('page')
  const stateBiodata = useSelector(getBiodataSlice)?.page
  const [name, setName] = useState<string>(
    pageParams ?? stateBiodata ?? 'jenjang-pendidikan',
  )

  useEffect(() => {
    if (stateBiodata) {
      setName(stateBiodata)
    }
  }, [stateBiodata])

  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <div className="flex h-full flex-col gap-32 px-[20rem] py-32 phones:p-32">
      <div className="scrollbar flex flex-shrink items-center gap-12 overflow-auto">
        {[
          'Jalur Pendaftaran',
          'Informasi Pribadi',
          'Pendidikan Sebelumnya',
          'Orang Tua',
          'Kelengkapan Dokumen',
          'Pilih Sekolah',
        ].map((item, idx) => (
          <div
            onClick={() => {
              setName(convertToSlug(item))
              dispatch(setStateBiodata({ page: convertToSlug(item) }))
              navigate(`/main?page=${convertToSlug(item)}`)
            }}
            className={clsx('flex cursor-pointer items-center p-32 ', {
              'bg-primary-200': convertToSlug(item) === name,
              'bg-white text-black hover:bg-primary-50':
                convertToSlug(item) !== name,
            })}
            key={idx}
          >
            <p className="text-nowrap">
              {idx + 1}. {item}
            </p>
          </div>
        ))}
      </div>
      <div className="scrollbar flex h-full flex-1 justify-center overflow-auto ">
        <div className="scrollbar flex h-full w-4/6 flex-col gap-32 overflow-auto rounded-2xl bg-white p-32 shadow-md phones:w-full">
          <p className="border-b-2 pb-16 text-[3rem]">
            {name === 'informasi-pribadi' ? 'Biodata' : convertSlugToText(name)}
          </p>
          <div className="scrollbar h-full overflow-auto">
            {name === 'jalur-pendaftaran' ? (
              <BiodataJalur />
            ) : name === 'informasi-pribadi' ? (
              <BiodataPribadi />
            ) : name === 'pendidikan-sebelumnya' ? (
              <BiodataPendidikan />
            ) : name === 'orang-tua' ? (
              <BiodataOrangTua />
            ) : name === 'kelengkapan-dokumen' ? (
              <BiodataDokumen />
            ) : name === 'pilih-sekolah' ? (
              <BiodataSekolah />
            ) : (
              <BiodataJalur />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
