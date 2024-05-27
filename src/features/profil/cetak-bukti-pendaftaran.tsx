import { Printer } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'
import ReactToPrint from 'react-to-print'
import { DataComponent2 } from './data-component-2'
import { ProfilData } from '@/libs/types/pendaftaran-type'
import dayjs from 'dayjs'
import { enumVerifikasi } from '@/libs/enum/enum-verifikasi'
import { Link } from 'react-router-dom'
import { enumJalur } from '@/libs/enum/enum-jalur'
import Cookies from 'js-cookie'

export function CetakBuktiPendaftaran({ profil }: { profil: ProfilData }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const jenjang = Cookies.get('jenjang')

  const [isDataReady, setIsDataReady] = useState(false)

  useEffect(() => {
    if (profil) {
      setIsDataReady(true)
    }
  }, [profil])

  return (
    <>
      {isDataReady && (
        <section
          className="absolute left-[-10000px] top-auto h-auto overflow-hidden"
          aria-hidden
          tabIndex={-1}
        >
          <div ref={ref}>
            <div className="flex flex-col gap-32 p-32">
              {/* --- Kop Surat --- */}
              <div className="flex items-center gap-24 border-b-2 border-black-100 p-24">
                <img src="/img/tutwuri.png" alt="PPDB" className="w-[15rem]" />
                <div className="flex flex-col items-center gap-12">
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
                <p>bukti pendaftaran</p>
                <p className="text-center">
                  jenjang {jenjang?.toUpperCase()} PPDB Online tahun pelajaran
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
                  {jenjang?.toLowerCase() === 'smp' && (
                    <DataComponent2
                      label="NISN"
                      value={profil?.sekolah?.nisn ?? '-'}
                    />
                  )}
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
                <div className="flex flex-1 flex-col gap-12">
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
                        ? `${profil?.pilihan?.pilihan1?.nama_sekolah} (Skor Sementara: ${profil?.pilihan?.pilihan1?.skor})`
                        : '-'
                    }
                  />
                  {jenjang?.toLowerCase() === 'smp' && (
                    <DataComponent2
                      label="Pilihan 2"
                      value={
                        profil?.pilihan?.pilihan2?.nama_sekolah
                          ? `${profil?.pilihan?.pilihan2.nama_sekolah} (Skor Sementara: ${profil?.pilihan?.pilihan2?.skor})`
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
              <p className="bg-background p-24 text-[3rem] font-bold">
                Status Verifikasi Sekolah:{' '}
                {profil?.verifikasi?.status <= enumVerifikasi?.DIPROSES
                  ? 'Menunggu Verifikasi dari salah satu sekolah pilihan anda!'
                  : profil?.verifikasi?.status === enumVerifikasi?.DISETUJUI
                    ? 'Data anda sudah di verifikasi'
                    : profil?.verifikasi?.status === enumVerifikasi?.DITOLAK
                      ? 'Verifikasi data anda ditolak'
                      : 'Menunggu Verifikasi dari salah satu sekolah pilihan anda!'}
              </p>
              <div className="flex flex-col gap-12 text-[2.4rem]">
                <p>
                  *Tanggal Cetak{' '}
                  {dayjs().locale('id').format('DD MMMM YYYY hh:mm:ss A')}
                </p>
                <div>
                  * Untuk mendapatkan informasi lebih lanjut, silahkan kunjungi
                  website dinas pendidikan{' '}
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
      <ReactToPrint
        bodyClass="print-agreement"
        content={() => ref.current}
        trigger={() => (
          <div className="flex items-center gap-12 hover:cursor-pointer">
            <span className="phones:hidden">
              <Printer />
            </span>
            <p className="rounded-full bg-slate-200 px-24 py-12 text-[2rem] text-slate-700 phones:text-[2.4rem]">
              Cetak Bukti Pendaftaran
            </p>
          </div>
        )}
      />
    </>
  )
}
