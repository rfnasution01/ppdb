import { Printer } from 'lucide-react'
import { useRef } from 'react'
import ReactToPrint from 'react-to-print'
import { ProfilData } from '@/libs/types/pendaftaran-type'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { enumJalur } from '@/libs/enum/enum-jalur'
import { DataComponent2 } from '@/features/profil/data-component-2'

export function CetakHasilVerifikasi({ profil }: { profil: ProfilData }) {
  const ref = useRef<HTMLDivElement>()

  return (
    <>
      <ReactToPrint
        bodyClass="print-agreement"
        content={() => ref.current}
        trigger={() => (
          <div className="flex items-center gap-12 hover:cursor-pointer">
            <span className="phones:hidden">
              <Printer />
            </span>
            <p className="rounded-full bg-slate-200 px-24 py-12 text-[2rem] text-slate-700 phones:text-[2.4rem]">
              Cetak Hasil Verifikasi
            </p>
          </div>
        )}
      />
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
                  Penerimaan Peserta Didik Baru (PPDB) Kabupaten Batubara Tahun
                  2024
                </p>
              </div>
            </div>
            {/* --- Content Header --- */}
            <div className="flex flex-col items-center gap-12 text-[4rem] font-bold uppercase">
              <p>bukti pendaftaran</p>
              <p className="text-center">
                PPDB DINAS pendidikan kabupaten batubara
              </p>
            </div>
            {/* --- Divider --- */}
            <p className="bg-background p-24 text-[3rem] font-bold">
              Biodata Calon Peserta Didik
            </p>
            {/* --- Data Pendaftar --- */}
            <div className="flex gap-32 text-[2.4rem]">
              <div className="flex flex-1 flex-col gap-12">
                <DataComponent2 label="No. Pendaftar" value="-" />
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
                <DataComponent2
                  label="Asal Sekolah"
                  value={profil?.sekolah?.nama_sekolah ?? '-'}
                />
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
                <DataComponent2
                  label="Pilihan 2"
                  value={
                    profil?.pilihan?.pilihan2?.nama_sekolah
                      ? `${profil?.pilihan?.pilihan2.nama_sekolah} (Skor Sementara: ${profil?.pilihan?.pilihan2?.skor})`
                      : '-'
                  }
                />
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
                <p>Diverifikasi/Disetujui oleh: -</p>
                <p>Petugas Verifikasi: {profil?.verifikasi?.petugas ?? '-'}</p>
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
    </>
  )
}
