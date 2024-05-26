import Breadcrumb from './Breadcrumbs'
import { useSelector } from 'react-redux'
import { getBiodataSlice } from '@/store/reducer/stateBiodata'
import { useEffect, useState } from 'react'
import { convertSlugToText } from '@/libs/helpers/format-text'
import {
  BiodataDokumen,
  BiodataJalur,
  BiodataOrangTua,
  BiodataPendidikan,
  BiodataPribadi,
  BiodataSekolah,
} from '@/features/biodata'
import { enumPendaftaran } from '@/libs/enum/enum-pendaftaran'
import Cookies from 'js-cookie'
import { ProfilData } from '@/libs/types/pendaftaran-type'
import { useGetProfilQuery } from '@/store/slices/pendaftaranAPI'
import clsx from 'clsx'

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

  const jalurParams = Cookies.get('jalur')
  const jenjangParams = Cookies.get('jenjang')

  // --- Profil ---
  const [profil, setProfil] = useState<ProfilData>()
  const {
    data: getProfil,
    isLoading: isLoadingProfil,
    isFetching: isFetchingProfil,
  } = useGetProfilQuery()

  const isLoading = isFetchingProfil || isLoadingProfil

  useEffect(() => {
    if (getProfil?.data) {
      setProfil(getProfil?.data)
    }
  }, [getProfil?.data])

  return (
    <div className="flex h-full flex-col gap-64">
      {/* --- Header --- */}
      <div>
        <Breadcrumb
          setName={setName}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          getProfil={profil}
        />
      </div>
      {/* --- Content --- */}
      <div className="scrollbar flex h-full flex-1 justify-center overflow-auto">
        <div
          className={clsx(
            'flex flex-col gap-32 rounded-2xl bg-white p-32 shadow-md phones:w-full',
            {
              'w-full': name === 'kelengkapan-dokumen',
              'w-4/6': name !== 'kelengkapan-dokumen',
            },
          )}
        >
          <p className="border-b-2 pb-16 text-[3rem]">
            {name === 'informasi-pribadi' ? 'Biodata' : convertSlugToText(name)}
          </p>
          <div className="scrollbar h-full overflow-auto">
            {name === 'jalur-pendaftaran' ? (
              <BiodataJalur
                getProfile={profil}
                jalurParams={jalurParams}
                jenjangParams={jenjangParams}
                setName={setName}
                setActiveIndex={setActiveIndex}
                isLoading={isLoading}
              />
            ) : name === 'informasi-pribadi' ? (
              <BiodataPribadi
                setName={setName}
                setActiveIndex={setActiveIndex}
                getProfil={profil}
                isLoading={isLoading}
              />
            ) : name === 'pendidikan-sebelumnya' ? (
              <BiodataPendidikan
                setName={setName}
                setActiveIndex={setActiveIndex}
                getProfil={profil}
                isLoading={isLoading}
              />
            ) : name === 'orang-tua' ? (
              <BiodataOrangTua
                setName={setName}
                setActiveIndex={setActiveIndex}
                getProfil={profil}
                isLoadingProfil={isLoading}
              />
            ) : name === 'kelengkapan-dokumen' ? (
              <BiodataDokumen
                setName={setName}
                setActiveIndex={setActiveIndex}
                getProfil={profil}
                isLoading={isLoading}
              />
            ) : name === 'pilih-sekolah' ? (
              <BiodataSekolah
                setName={setName}
                setActiveIndex={setActiveIndex}
                getProfil={profil}
                isLoading={isLoading}
              />
            ) : (
              <BiodataJalur
                getProfile={profil}
                jalurParams={jalurParams}
                jenjangParams={jenjangParams}
                setName={setName}
                setActiveIndex={setActiveIndex}
                isLoading={isLoading}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
