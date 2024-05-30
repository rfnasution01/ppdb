import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/atoms/Dialog'
import { DoorClosed, X } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'

export function ModalWelcome({
  isOpen,
  setIsOpen,
  handleCloseWelcome,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  handleCloseWelcome: () => void
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="text-dark scrollbar flex flex-col overflow-y-auto bg-white text-black"
        style={{
          width: '100%',
          height: '100%',
        }}
        position="left"
      >
        <div className="flex flex-col gap-16">
          {/* --- Header --- */}
          <DialogHeader>
            <DialogTitle>
              <p className="p-32 text-[2.8rem]">Welcome</p>
            </DialogTitle>
            <DialogPrimitive.Close className="focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute right-32 top-32 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none">
              <X size={18} />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </DialogHeader>
          <hr className="border" />
          {/* --- Navigasi --- */}
          <div className="flex flex-col gap-16 p-32 font-serif text-[2.4rem] phones:text-[2.8rem]">
            <p>
              Selamat datang di sistem pendaftaran online Seleksi Penerimaan
              Peserta Didik Baru (PPDB) Kabupaten Batu Bara. Kami sangat
              berterima kasih atas kepercayaan yang telah diberikan kepada kami
              dalam upaya melanjutkan pendidikan ke jenjang yang lebih tinggi.
              Proses seleksi ini merupakan langkah awal yang penting bagi masa
              depan akademik dan karier Anda. Melalui sistem pendaftaran online
              ini, kami berupaya memberikan kemudahan akses dan pelayanan yang
              optimal bagi seluruh calon siswa.
            </p>
            <p>
              Sistem pendaftaran online PPDB ini dirancang untuk memberikan
              kemudahan dalam proses pendaftaran, mulai dari pengisian data
              pribadi, pemilihan sekolah tujuan, hingga registrasi ulang. Kami
              berharap sistem ini dapat membantu calon siswa/i untuk mengelola
              waktu dengan lebih efektif dan efisien, serta memberikan
              pengalaman pendaftaran yang lebih nyaman dan terorganisir.
            </p>
            <p>
              Pada kesempatan ini, kami juga ingin memberikan beberapa petunjuk
              dan panduan agar proses pendaftaran dapat berjalan dengan lancar:
            </p>
            <ol className="list-decimal space-y-8 pl-32">
              <li>
                <span className="font-bold">
                  Pastikan terlebih dahulu Jalur Pendaftaran Anda
                </span>{' '}
                (Ingat jangan sampai salah memilih jalur pendaftaran)
              </li>
              <li>
                <span className="font-bold">Persiapkan Dokumen</span>: Pastikan
                semua dokumen yang diperlukan sudah lengkap dan siap diunggah
                sesuai dengan ketentuan yang berlaku.
              </li>
              <li>
                <span className="font-bold">Isi Data dengan Teliti</span>:
                Periksa kembali data yang telah diisi sebelum mengirimkan
                formulir pendaftaran untuk menghindari kesalahan yang dapat
                mempengaruhi proses seleksi.
              </li>
              <li>
                <span className="font-bold">Perhatikan Batas Waktu</span>:
                Patuhi jadwal yang telah ditetapkan agar tidak ada tahapan yang
                terlewatkan.
              </li>
              <li>
                <span className="font-bold">
                  Pastikan bahwa anda sudah validasi Data
                </span>
                . Data yang belum di validasi, tidak akan di verifikasi oleh
                salah satu tujuan sekolah anda
              </li>
            </ol>
            <p>
              Kami berharap semua calon siswa dapat mengikuti seluruh proses
              dengan baik dan dapat meraih hasil yang memuaskan. Semoga usaha
              yang telah dilakukan selama ini membuahkan hasil yang gemilang dan
              dapat menjadi langkah awal menuju masa depan yang cemerlang.
            </p>
            <p>
              Akhir kata, kami ucapkan selamat berjuang dan semoga sukses dalam
              seleksi PPDB Online Kabupaten Batu Bara Tahun 2024. Terima kasih
              atas perhatiannya.
            </p>
            <p>Wassalamu'alaikum warahmatullahi wabarakatuh</p>
            <p className="py-64">Hormat kami,</p>
            <p>Dinas Pendidikan Kabupaten Batu Bara</p>
            <div className="flex items-center justify-end">
              <div
                onClick={handleCloseWelcome}
                className="flex items-center gap-12 rounded-2xl bg-green-700 px-24 py-12 text-white hover:cursor-pointer hover:bg-green-900"
              >
                <DoorClosed size={16} />
                Jangan Tampilkan Lagi
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
