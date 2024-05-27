import { ProfilData } from '@/libs/types/pendaftaran-type'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { ModalTambahPrestasi } from './modal-tambah-prestasi'
import { NoData } from '@/components/atoms/NoData'
import { Link } from 'react-router-dom'
import { DataComponent } from '../profil'
import dayjs from 'dayjs'
import { MenubarPrestasi } from './menubar-prestasi'
import { ModalEditPrestasi } from './modal-edit-prestasi'
import { ModalDeletePrestasi } from './modal-delete-prestasi'

export function BiodataPrestasi({
  getProfil,
  isValidasi,
}: {
  getProfil: ProfilData
  isValidasi: boolean
}) {
  const [isShow, setIsShow] = useState<boolean>(false)
  const [show, setShow] = useState<boolean>(false)
  const [name, setName] = useState('')
  const [modalIsOpen, setModalIsOpen] = useState<number | null>(null)

  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-1 flex-col gap-32 pb-32">
        <p className="font-bold">Prestasi</p>
        <div className="flex">
          <button
            type="button"
            onClick={() => setIsShow(true)}
            disabled={isValidasi}
            className="flex items-center gap-12 rounded-lg bg-green-700 px-24 py-12 text-white hover:bg-green-900"
          >
            <Plus size={16} /> Tambah
          </button>
        </div>

        {/* --- Dokumen --- */}
        <div className="w-full overflow-x-auto">
          <table className="w-full flex-1 border-collapse text-[2.4rem]">
            <thead className="relative z-10 align-top leading-medium">
              <tr className="border-b-[1.6rem] border-transparent">
                <th className="sticky top-0 border-b-2 bg-background p-4 px-24 py-12 text-left uppercase">
                  No
                </th>
                <th className="sticky top-0 border-b-2 bg-background p-4 px-24 py-12 text-left uppercase">
                  Nama Prestasi
                </th>
                <th className="sticky top-0 border-b-2 bg-background p-4 px-24 py-12 text-left uppercase">
                  Tingkat
                </th>
                <th className="sticky top-0 border-b-2 bg-background p-4 px-24 py-12 text-left uppercase">
                  Juara
                </th>
                <th className="sticky top-0 border-b-2 bg-background p-4 px-24 py-12 text-left uppercase">
                  Kelas
                </th>
                <th className="sticky top-0 text-nowrap border-b-2 bg-background p-4 px-24 py-12 text-left uppercase">
                  Penyelenggara
                </th>
                <th className="sticky top-0 text-nowrap border-b-2 bg-background p-4 px-24 py-12 text-left uppercase">
                  Tampilkan
                </th>
                <th className="sticky top-0 text-nowrap border-b-2 bg-background p-4 px-24 py-12 text-left uppercase">
                  Info
                </th>
                <th className="sticky top-0 text-nowrap border-b-2 bg-background p-4 px-24 py-12 text-left uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {getProfil?.prestasi?.data.length === 0 ? (
                <tr>
                  <td colSpan={9}>
                    <NoData />
                  </td>
                </tr>
              ) : (
                <>
                  {getProfil?.prestasi?.data?.map((item, idx) => (
                    <tr
                      key={idx}
                      onClick={() => setModalIsOpen(idx)}
                      className="w-full border-b-[1.6rem] border-transparent transition-all ease-in odd:bg-surface-disabled hover:cursor-pointer hover:bg-warning-tint-2"
                    >
                      <td className="px-24 py-12 leading-medium">{idx + 1}</td>
                      <td className="px-24 py-12 leading-medium">
                        {item?.nama_prestasi}
                      </td>
                      <td className="px-24 py-12 leading-medium">
                        {item?.tingkat}
                      </td>
                      <td className="px-24 py-12 leading-medium">
                        {item?.juara}
                      </td>
                      <td className="px-24 py-12 leading-medium">
                        {item?.kelas}
                      </td>
                      <td className="px-24 py-12 leading-medium">
                        {item?.penyelenggara}
                      </td>
                      <td className="px-24 py-12 leading-medium">
                        <Link
                          target="_blank"
                          to={item?.sertifikat}
                          className="text-primary"
                        >
                          Tampilkan
                        </Link>
                      </td>
                      <td>
                        {item?.validasi === 0 ? (
                          'Menunggu Validasi'
                        ) : (
                          <div className="flex flex-col gap-12">
                            <DataComponent
                              label="Tanggal Validasi"
                              value={
                                item?.tgl_validasi
                                  ? dayjs(item?.tgl_validasi)
                                      .locale('id')
                                      .format('DD/MM/YY hh:mm A')
                                  : '-'
                              }
                            />
                            <DataComponent
                              label="User Validasi"
                              value={item?.user_validasi ?? '-'}
                            />
                            <DataComponent
                              label="Catatan"
                              value={item?.catatan ?? '-'}
                            />
                          </div>
                        )}
                      </td>
                      <td>
                        <MenubarPrestasi
                          setName={setName}
                          setIsShow={setShow}
                          isValidasi={isValidasi}
                        />
                      </td>
                      {idx === modalIsOpen && name === 'Edit' && (
                        <ModalEditPrestasi
                          setIsOpen={setShow}
                          isOpen={show}
                          data={item}
                        />
                      )}
                      {idx === modalIsOpen && name === 'Delete' && (
                        <ModalDeletePrestasi
                          setIsOpen={setShow}
                          isOpen={show}
                          data={item}
                        />
                      )}
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ModalTambahPrestasi isOpen={isShow} setIsOpen={setIsShow} />
    </div>
  )
}
