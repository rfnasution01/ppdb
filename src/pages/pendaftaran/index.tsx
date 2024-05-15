import Breadcrumb from './Breadcrumbs'
import { useDispatch, useSelector } from 'react-redux'
import { getBiodataSlice, setStateBiodata } from '@/store/reducer/stateBiodata'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { convertSlugToText, convertToSlug } from '@/libs/helpers/format-text'
import clsx from 'clsx'
import {
  BiodataDokumen,
  BiodataJalur,
  BiodataOrangTua,
  BiodataPendidikan,
  BiodataPribadi,
  BiodataSekolah,
} from '@/features/biodata'
import { enumPendaftaran } from '@/libs/enum/enum-pendaftaran'

export default function Pendaftaran() {
  const searchParams = new URLSearchParams(location.search)
  const pageParams = searchParams.get('page')
  const stateBiodata = useSelector(getBiodataSlice)?.page
  const [name, setName] = useState<string>(
    pageParams ?? stateBiodata ?? 'jalur-pendaftaran',
  )
  const [activeIndex, setActiveIndex] = useState<number>(
    name === 'jalur-pendaftaran'
      ? enumPendaftaran?.JALUR_PENDAFTARAN
      : name === 'informasi-pribadi'
        ? enumPendaftaran?.INFORMASI_PRIBADI
        : name === 'pendidikan-sebelumnya'
          ? enumPendaftaran?.PENDIDIKAN_SEBELUMNYA
          : name === 'orang-tua'
            ? enumPendaftaran.ORANGTUA
            : name === 'kelengkapan-dokumen'
              ? enumPendaftaran.DOKUMEN
              : name === 'pilih-sekolah'
                ? enumPendaftaran?.PilihSEKOLAH
                : enumPendaftaran.JALUR_PENDAFTARAN,
  )

  useEffect(() => {
    if (stateBiodata) {
      setName(stateBiodata)
    }
  }, [stateBiodata])

  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <div className="flex h-full flex-col gap-64">
      {/* --- Header --- */}
      <div>
        <div className="phones:hidden">
          <Breadcrumb
            setName={setName}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        </div>
        <div className="hidden phones:block">
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
                <p className="text-nowrap text-[2rem]">
                  {idx + 1}. {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* --- Content --- */}
      <div className="scrollbar flex h-full flex-1 justify-center overflow-auto">
        <div className="flex w-4/6 flex-col gap-32 rounded-2xl bg-white p-32 shadow-md phones:w-full">
          <p className="border-b-2 pb-16 text-[3rem]">
            {name === 'informasi-pribadi' ? 'Biodata' : convertSlugToText(name)}
          </p>
          <div className="scrollbar h-full overflow-auto">
            {name === 'jalur-pendaftaran' ? (
              <BiodataJalur setName={setName} setActiveIndex={setActiveIndex} />
            ) : name === 'informasi-pribadi' ? (
              <BiodataPribadi
                setName={setName}
                setActiveIndex={setActiveIndex}
              />
            ) : name === 'pendidikan-sebelumnya' ? (
              <BiodataPendidikan />
            ) : name === 'orang-tua' ? (
              <BiodataOrangTua />
            ) : name === 'kelengkapan-dokumen' ? (
              <BiodataDokumen />
            ) : name === 'pilih-sekolah' ? (
              <BiodataSekolah />
            ) : (
              <BiodataJalur setName={setName} setActiveIndex={setActiveIndex} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
