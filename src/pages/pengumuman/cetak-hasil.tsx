import { useRef } from 'react'
import printJS from 'print-js'
import { Printer } from 'lucide-react'

export function PrintHasil({
  sekolah,
  alamat,
  noSurat,
  nama,
  tempat_lahir,
  tanggal_lahir,
  noPendaftaran,
  nisn,
  tgl_daftarUlang,
  kadis,
  kepsek,
  nip_kadis,
  nip_kepsek,
  diterbitkan_di,
  diterbitkan_tgl,
}: {
  sekolah: string
  alamat: string
  noSurat: string
  nama: string
  tempat_lahir: string
  tanggal_lahir: string
  noPendaftaran: string
  nisn: string
  tgl_daftarUlang: string
  kadis: string
  kepsek: string
  nip_kadis: string
  nip_kepsek: string
  diterbitkan_di: string
  diterbitkan_tgl: string
}) {
  const printRef = useRef<HTMLDivElement>(null)
  // const totalPage = Math.ceil((profil?.length + 2) / 15)

  const handlePrint = () => {
    if (printRef.current) {
      printJS({
        printable: printRef.current.innerHTML,
        type: 'raw-html',
        style: `
            @media print {
              @page {
                size: A4;
                margin: 0;
              }
              body, html {
                height: 100%;
                margin: 0;
                padding: 0;
              }
              .header-space {
                height: 136px;
                padding-bottom: 32px;
              }
              .footer-space {
                height: 50px;
                padding: 0 16px 0 16px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
              }
              .footer-space p {
                font-style: italic
              }
              .content {
                padding: 32px;
                display: flex;
                flex-direction: column;
                gap: 16px;
              }
              .header {
                display: flex;
                flex-direction: row;
                gap: 16px;
                padding: 16px;
                border-bottom: 1px solid black;
              }
              .header img { 
                width: 120px;
                height: 120px; 
              }
              .header-text {
                flex: 1;
                display: flex;
                flex-direction: column;
                gap: 0;
                justify-content: center;
                align-items: center; 
              }
              .header-text p {
                margin: 0;
                padding: 0;
              }
              .content-header {
                font-size: 18px;
                text-align: center;
                text-transform: uppercase;
                font-weight: 700;
              }
              .section-content {
                display: flex;
                flex-direction: column;
                gap: 0;
              }
              .section-content p {
                margin: 0;
                padding: 0;
                text-align: center;
              }
              .title {
                font-size: 22px;
                font-weight: 700;
                text-align: center;
                text-transform: uppercase;
              }
              .description {
                font-size: 20px;
                text-align: center;
              }
              .title-header {
                font-size: 20px;
                text-align: center;
                text-transform: uppercase;
              }
              table { 
                width: 100%; 
                border-collapse: collapse; 
              }
              .table-border {
                border: 1px solid black;
                padding: 0 4px 0 4px;
              } 
              .table-border p {
                font-size: 12px;
              } 
              .identitas {
                display: flex;
                flex-direction: column;
                gap: 0;
              }
              .identitas-row {
                display: flex;
                flex-direction: row;
                width: 100%;
              }
              .identitas-row p {
                margin: 0;
                padding: 0;  
              }
              .identitas-row-value {
                width: 75%;
              }
              .identitas-row-label {
                width: 25%;
              }
              .content p {
                padding: 0;
                margin: 0;
              }
              .bold {
                font-weight: 700;
              }
              .mengetahui {
                display: flex;
                flex-direction: row;
                width: 100%;
                align-items: end;
              }
              .kadis {
                dispay: flex;
                flex-direction: column;
                gap: 0;
                flex: 1;
              }
              kadis p {
                padding: 0;
                margin: 0;
              }
              .kepsek {
                dispay: flex;
                flex-direction: column;
                gap: 0;
                flex: 1;
              }
              kepsek p {
                padding: 0;
                margin: 0;
              }
                .diterbitkan {
                display: flex;
                flex-direction: row;
                width: 100%;
              }
              .diterbitkan p {
                margin: 0;
                padding: 0;  
              }
              .diterbitkan {
                width: 50%;
              }
              .diterbitkan {
                width: 50%;
              }
            }
        `,
      })
    }
  }

  return (
    <>
      <div ref={printRef} style={{ display: 'none' }}>
        <table>
          <thead>
            <tr>
              <td>
                <div className="header-space">
                  <div className="header">
                    <img src="/img/batubara.png" alt="PPDB" />
                    <div className="header-text">
                      <p className="title-header">
                        Pemerintah Kabupaten Batu Bara
                      </p>
                      <p className="title">Dinas Pendidikan</p>
                      <p className="title">{sekolah}</p>
                      <p className="description">Alamat: {alamat}</p>
                    </div>
                    <img src="/img/tutwuri.png" alt="PPDB" />
                  </div>
                </div>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="content">
                  <div className="section-content">
                    <p className="content-header">SURAT KETERANGAN LULUS</p>
                    <p>Nomor: {noSurat}</p>
                  </div>
                  <p>
                    Dinas Pendidikan Batubara Provinsi Sumatera Utara
                    menerangkan bahwa:
                  </p>
                  <div className="identitas">
                    <div className="identitas-row">
                      <p className="identitas-row-label">Nama</p>
                      <p className="identitas-row-value">: {nama}</p>
                    </div>
                    <div className="identitas-row">
                      <p className="identitas-row-label">
                        Tempat/ Tanggal Lahir
                      </p>
                      <p className="identitas-row-value">
                        : {`${tempat_lahir}, ${tanggal_lahir}`}
                      </p>
                    </div>
                    <div className="identitas-row">
                      <p className="identitas-row-label">Nomor Pendaftaran</p>
                      <p className="identitas-row-value">: {noPendaftaran}</p>
                    </div>
                    <div className="identitas-row">
                      <p className="identitas-row-label">NISN</p>
                      <p className="identitas-row-value">: {nisn}</p>
                    </div>
                  </div>
                  <p>
                    Telah dinyatakan <span className="bold">LULUS</span> di{' '}
                    {sekolah} ({alamat}) berdasarkan hasil seleksi Penerimaan
                    Peserta Didik Baru Tingkat SMP Kabupaten Batu Bara Tahun
                    Akademik 2023/2024
                  </p>
                  <p>
                    Kami beritahukan agar segera mendaftar ulang ke sekolah
                    masing-masing dari tanggal: {tgl_daftarUlang}, apabila siswa
                    yang bersangkutan tidak daftar ulang, pada tanggal yang
                    sudah ditentukan maka CALON PESERTA DIDIK tersebut
                    dinyatakan <span className="bold">GUGUR</span>
                  </p>
                  <p>
                    Demikian surat keterangan ini dibuat, agar dapat
                    dipergunakan sebagaimana mestinya.
                  </p>
                  <div className="mengetahui">
                    <div className="kadis">
                      <p>Mengetahui,</p>
                      <p className="bold">Kepala Dinas Pendidikan</p>
                      <p className="bold">Kabupaten Batu Bara</p>

                      <p className="bold">{kadis}</p>
                      <p>NIP. {nip_kadis}</p>
                    </div>
                    <div className="kepsek">
                      <div className="diterbitkan">
                        <p>Diterbitkan di</p>
                        <p>: {diterbitkan_di}</p>
                      </div>
                      <div className="diterbitkan">
                        <p>Pada Tanggal</p>
                        <p>: {diterbitkan_tgl}</p>
                      </div>
                      <p>Mengetahui,</p>
                      <p className="bold">Kepala Sekolah</p>
                      <p className="bold">{sekolah}</p>
                      <p className="bold">{kepsek}</p>
                      <p>NIP. {nip_kepsek}</p>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>
                <div className="footer-space"></div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation()
          handlePrint()
        }}
        type="button"
        className="flex items-center justify-center gap-12 text-nowrap text-[2rem] hover:text-emerald-500 phones:text-[2.4rem]"
      >
        <Printer size={16} />
        Cetak Keterangan Lulus
      </button>
    </>
  )
}
