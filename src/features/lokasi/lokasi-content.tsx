import { LokasiTable } from './lokasi-table'

export default function LokasiContent() {
  return (
    <div
      className="flex flex-col rounded-lg border bg-white p-32 shadow-md"
      style={{ lineHeight: '130%' }}
    >
      <p className="bg-black bg-opacity-10 p-24 text-[3rem] font-bold uppercase">
        kab. deli serdang
      </p>
      <LokasiTable />
    </div>
  )
}
