export function StatistikContentInfo() {
  return (
    <div className="flex flex-col gap-12 rounded-lg bg-warning-tint-2 p-24 text-[2rem]">
      <div className="flex w-full items-center gap-y-12">
        <p className="flex-1">
          Status Data: <span className="text-orange-700">Sementara</span>
        </p>
        <p className="flex-1">
          Wilayah Seleksi:{' '}
          <span className="text-orange-700">Kab. Batu Bara</span>
        </p>
      </div>
      <div className="flex w-full items-center gap-y-12">
        <p className="flex-1">
          Hasil s/d tanggal:{' '}
          <span className="text-orange-700">17 Mei 2018 10:06 WIB</span>
        </p>
        <p className="flex-1">
          Tanggal seleksi:{' '}
          <span className="text-orange-700">11 Jun 2015 - 30 Jun 2016</span>
        </p>
      </div>
    </div>
  )
}
