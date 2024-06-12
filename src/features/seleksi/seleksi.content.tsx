import clsx from 'clsx'
import { useSelector } from 'react-redux'
import { getPilihSekolahSlice } from '@/store/reducer/statePilihSekolah'
import { HeaderType } from '@/libs/types'
import { useState } from 'react'
import { DaptarContentHeader } from '../daptar/daptar-content-header'
import { DaptarContentInfo } from '../daptar/daptar-content-info'
import { MappingPendaftar } from './mapping-pendaftar'
import { SeleksiType } from '@/libs/types/seleksi-type'

export function SeleksiContent({
  showJenjang,
  pendaftar,
  header,
  isLoading,
  kodeParams,
}: {
  showJenjang: string
  pendaftar: SeleksiType[]
  header: HeaderType
  isLoading: boolean
  kodeParams: string
}) {
  const pilihSekolah = useSelector(getPilihSekolahSlice)
  const [numberStart, setNumberStart] = useState<number>(0)
  const [search, setSearch] = useState<string>('')

  return (
    <div className="flex flex-col gap-24 rounded-lg border bg-white p-32 shadow-md">
      {pilihSekolah?.id ? (
        <div className="flex flex-col gap-24">
          <DaptarContentHeader
            setNumberStart={setNumberStart}
            setSearch={setSearch}
            jenjang={showJenjang?.toLowerCase()}
            kodeParams={kodeParams}
            idSekolah={pilihSekolah?.id}
          />
          <DaptarContentInfo header={header} />
          <MappingPendaftar
            pendaftar={pendaftar}
            isLoading={isLoading}
            search={search}
            numberStart={numberStart}
            setNumberStart={setNumberStart}
          />
        </div>
      ) : (
        <p
          className={clsx('rounded-2xl p-24 ', {
            'bg-primary-50 text-primary-700':
              showJenjang.toLowerCase() === 'smp',
            'bg-danger-tint-1 text-danger-300':
              showJenjang.toLowerCase() === 'sd',
          })}
        >
          <span className="font-bold">Informasi!</span> Silakan memilih loket
          Sekolah terlebih dahulu
        </p>
      )}
    </div>
  )
}
