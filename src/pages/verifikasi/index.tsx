import { ProfilData } from '@/libs/types/pendaftaran-type'
import { useGetProfilQuery } from '@/store/slices/pendaftaranAPI'
import { useEffect, useRef, useState } from 'react'
import { CetakHasilVerifikasi } from './cetak-hasil-verifikasi'
import { enumVerifikasi } from '@/libs/enum/enum-verifikasi'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { MultiSkeleton } from '@/components/molecules/skeleton'
import { NoData } from '@/components/atoms/NoData'
import { enumValidasi } from '@/libs/enum/enum-validasi'
import { DataComponent } from './data-component'
import { Link } from 'react-router-dom'
import { DataComponent2 } from '@/features/profil/data-component-2'
import { enumJalur } from '@/libs/enum/enum-jalur'
import Cookies from 'js-cookie'

export default function Verifikasi() {
  const ref = useRef<HTMLDivElement>(null)

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

  const jenjang = Cookies.get('jenjang')

  return (
    <div className="flex h-full flex-col gap-32">
      {/* --- Header --- */}
      <div className="flex items-center justify-between gap-32">
        <p className="text-[3.2rem] font-bold phones:text-[3.6rem]">
          Verifikasi
        </p>
        {profil?.verifikasi?.status === enumVerifikasi?.DISETUJUI && (
          <CetakHasilVerifikasi profil={profil} />
        )}
      </div>
      {/* --- Content --- */}
      <div className="flex h-full w-full flex-col items-start gap-32">
        <div className="flex w-1/2 flex-col gap-12 rounded-2xl bg-white p-32 phones:w-full">
          {isLoading ? (
            <MultiSkeleton />
          ) : (
            <>
              {profil?.validasi?.status === enumValidasi.BELUMVALIDASI ? (
                <NoData title="Data Belum Divalidasi" />
              ) : profil?.verifikasi?.status <= enumVerifikasi?.DIPROSES ? (
                <NoData title="Menunggu Verifikasi" />
              ) : (
                <>
                  <div className="flex">
                    <p
                      className={clsx(
                        'border-l-2 p-12 text-[1.8rem] phones:text-[2.2rem]',
                        {
                          'border-red-100 bg-red-50 bg-opacity-40 text-red-700':
                            profil?.verifikasi?.status ===
                            enumVerifikasi?.DITOLAK,
                          'border-green-100 bg-green-50 bg-opacity-40 text-green-700':
                            profil?.verifikasi?.status ===
                            enumVerifikasi?.DISETUJUI,
                          'border-yellow-100 bg-yellow-50 bg-opacity-40 text-yellow-700':
                            profil?.verifikasi?.status <=
                            enumVerifikasi?.DIPROSES,
                        },
                      )}
                    >
                      {profil?.verifikasi?.status === enumVerifikasi?.DISETUJUI
                        ? 'Verifikasi Diterima'
                        : profil?.verifikasi?.status === enumVerifikasi?.DITOLAK
                          ? 'Verifikasi Ditolak'
                          : profil?.verifikasi?.status <=
                              enumVerifikasi?.DIPROSES
                            ? 'Menunggu Verifikasi'
                            : 'Belum Unggah'}
                    </p>
                  </div>
                  <DataComponent
                    label="Tanggal Verifikasi"
                    value={
                      profil?.verifikasi?.tanggal_verifikasi
                        ? dayjs(profil?.verifikasi?.tanggal_verifikasi)
                            .locale('id')
                            .format('DD MMMM YYYY hh:mm:ss A')
                        : '-'
                    }
                  />
                  <DataComponent
                    label="Petugas Verifikasi"
                    value={profil?.verifikasi?.petugas ?? '-'}
                  />

                  <DataComponent
                    label="Komentar"
                    value={profil?.verifikasi?.komentar ?? '-'}
                  />
                </>
              )}
            </>
          )}
        </div>
        {profil?.verifikasi?.status === enumVerifikasi?.DISETUJUI && (
          <section
            className="top-auto h-auto w-full bg-white phones:hidden"
            aria-hidden
            tabIndex={-1}
          >
            <div ref={ref}>
              <div className="flex flex-col gap-32 p-32">
                {/* --- Kop Surat --- */}
                <div className="flex items-center gap-24 border-b-2 border-black-100 p-24">
                  <img
                    src="/img/tutwuri.png"
                    alt="PPDB"
                    className="w-[15rem]"
                  />
                  <div className="flex flex-1 flex-col items-center gap-12">
                    <p className="text-[5rem] font-bold uppercase">
                      Pemerintah Kabupaten Batu Bara
                    </p>
                    <p className="text-[5rem] font-bold uppercase">
                      dinas pendidikan
                    </p>
                    <p className="text-center text-[3rem]">
                      Penerimaan Peserta Didik Baru (PPDB) Kabupaten Batubara
                      Tahun 2024
                    </p>
                  </div>
                </div>
                {/* --- Content Header --- */}
                <div className="flex flex-col items-center gap-12 text-[4rem] font-bold uppercase">
                  <p>Hasil Verifikasi Pendaftaran</p>
                  <p className="text-center">
                    PPDB Jenjang {jenjang.toUpperCase()} Tahun Pelajaran
                    2024/2025
                  </p>
                </div>
                {/* --- Divider --- */}
                <p className="bg-background p-24 text-[3rem] font-bold">
                  Biodata Calon Peserta Didik
                </p>
                {/* --- Data Pendaftar --- */}
                <div className="flex gap-32 text-[2.4rem]">
                  <div className="flex flex-1 flex-col gap-12">
                    <DataComponent2
                      label="No. Pendaftar"
                      value={profil?.biodata?.nomor_peserta ?? '-'}
                    />
                    <DataComponent2
                      label="NIK"
                      value={profil?.biodata?.nik ?? '-'}
                    />
                    <DataComponent2
                      label="NISN"
                      value={profil?.sekolah?.nisn ?? '-'}
                    />
                    <DataComponent2
                      label="Nama Lengkap"
                      value={profil?.biodata?.nama ?? '-'}
                    />
                    <DataComponent2
                      label="Tempat/Tgl. Lahir"
                      value={`${profil?.biodata?.tempat_lahir}, ${dayjs(profil?.biodata?.tanggal_lahir).format('DD MMMM YYYY')}`}
                    />
                    <DataComponent2
                      label="Jenis Kelamin"
                      value={
                        profil?.biodata?.jenis_kelamin === 'L'
                          ? 'Laki-laki'
                          : 'Perempuan' ?? '-'
                      }
                    />
                    {jenjang?.toLowerCase() === 'smp' && (
                      <DataComponent2
                        label="Asal Sekolah"
                        value={profil?.sekolah?.nama_sekolah ?? '-'}
                      />
                    )}
                    <DataComponent2
                      label="Alamat"
                      value={profil?.biodata?.alamat_lengkap ?? '-'}
                    />
                  </div>
                  <div className="flex w-full flex-1 flex-col gap-12">
                    <DataComponent2
                      label="Jalur Pendaftaran"
                      value={
                        profil?.jalur === enumJalur.ZONASI
                          ? 'Zonasi'
                          : profil?.jalur === enumJalur.AFIRMASI
                            ? 'Afirmasi'
                            : profil?.jalur === enumJalur.PRESTASI
                              ? 'Prestasi'
                              : profil?.jalur === enumJalur.PINDAHTUGAS
                                ? 'Pindah Tugas'
                                : 'Zonasi'
                      }
                    />
                    <DataComponent2
                      label="Pilihan 1"
                      value={
                        profil?.pilihan?.pilihan1?.nama_sekolah
                          ? `${profil?.pilihan?.pilihan1?.nama_sekolah} (Skor: ${profil?.pilihan?.pilihan1?.skor})`
                          : '-'
                      }
                    />
                    {jenjang.toLowerCase() === 'smp' && (
                      <DataComponent2
                        label="Pilihan 2"
                        value={
                          profil?.pilihan?.pilihan2?.nama_sekolah
                            ? `${profil?.pilihan?.pilihan2.nama_sekolah} (Skor: ${profil?.pilihan?.pilihan2?.skor})`
                            : '-'
                        }
                      />
                    )}
                    <DataComponent2
                      label="Tanggal Pendaftaran"
                      value={
                        dayjs(profil?.validasi?.tanggal_daftar)
                          .locale('id')
                          .format('DD MMMM YYYY hh:mm:ss A') ?? '-'
                      }
                    />
                  </div>
                </div>
                {/* --- Divider --- */}

                <div className="flex flex-col text-[2.4rem]">
                  <p className="border-l border-r border-t border-black bg-background p-24 text-[3rem] font-bold">
                    Status Verifikasi Sekolah
                  </p>
                  <div className="flex flex-col gap-12 border-b border-l border-r border-black p-24">
                    <p>
                      Diverifikasi/Disetujui oleh:{' '}
                      {profil?.verifikasi?.sekolah_verifikasi}
                    </p>
                    <p>
                      Petugas Verifikasi: {profil?.verifikasi?.petugas ?? '-'}
                    </p>
                    <p>
                      Tanggal Verifikasi:{' '}
                      {profil?.verifikasi?.tanggal_verifikasi
                        ? dayjs(profil?.verifikasi?.tanggal_verifikasi)
                            .locale('id')
                            .format('DD MMMM YYYY hh:mm:ss A')
                        : '-'}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-12 text-[2.4rem]">
                  <p>
                    *Tanggal Cetak{' '}
                    {dayjs().locale('id').format('DD MMMM YYYY hh:mm:ss A')}
                  </p>
                  <div>
                    * Untuk mendapatkan informasi lebih lanjut, silahkan
                    kunjungi website dinas pendidikan{' '}
                    <Link to="disdik.batubarakab.go.id">
                      disdik.batubarakab.go.id
                    </Link>
                  </div>
                  <div>
                    * Atau kunjungi website resmi PPDB Kabupaten Batu Bara
                    <Link to="https://ppdbonline-batubara.com">
                      https://ppdbonline-batubara.com
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
