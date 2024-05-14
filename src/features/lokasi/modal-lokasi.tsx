import { Dialog, DialogContent } from '@/components/atoms/Dialog'
import { NoData } from '@/components/atoms/NoData'
import { Dispatch, SetStateAction } from 'react'
import { LokasiMap } from './lokasi-map'

export function ModalLokasi({
  isOpen,
  setIsOpen,
  row,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  row
}) {
  const latitude = row?.latitude
  const longitude = row?.longitude

  const isBelumDiIsi = Number(latitude) === 0 || Number(longitude) === 0

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="text-dark scrollbar flex flex-col overflow-y-auto bg-white text-black"
        style={{
          width: '80%',
          height: '80%',
        }}
        position="middle"
      >
        <div className="flex flex-col gap-16">
          {/* --- Header --- */}
          <div className="flex items-center gap-32 bg-gradient-to-br from-danger-300 via-danger-100 to-danger-200 p-32 text-white">
            {/* --- Logo --- */}
            <div className="rounded-lg bg-white p-16">
              <img
                src="/img/tutwuri.png"
                alt="tut wuri handayani"
                className="w-[7rem]"
              />
            </div>
            {/* --- Sekolah --- */}
            <div className="flex w-full flex-col gap-16">
              <p className="text-[2.8rem] font-bold uppercase">
                Lokasi {row?.nama_sekolah}
              </p>
              <hr className="w-full border border-white" />
              <p className="text-[2.4rem]">{row?.alamat}</p>
            </div>
          </div>
          {/* --- Navigasi --- */}
          {isBelumDiIsi ? (
            <div className="m-24">
              <NoData />
            </div>
          ) : (
            <LokasiMap
              latitude={latitude}
              longitude={longitude}
              description={row?.nama_sekolah}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
