import { HeaderType, PendaftarStatistik, StatistikType } from '@/libs/types'
import { StatistikContentInfo } from './statistik-content-info'
import { useState } from 'react'
import { MappingPendaftar } from './mapping-pendaftar'
import Loading from '@/components/atoms/Loading'
import { StatistiksContentHeader } from './statistiks-content-header'

export function StatistikContent({
  showJenjang,
  pendaftar,
  header,
  isLoading,
  kodeParams,
  getStatistik,
}: {
  showJenjang: string
  pendaftar: PendaftarStatistik[]
  header: HeaderType
  isLoading: boolean
  kodeParams: string
  getStatistik: StatistikType
}) {
  const [numberStart, setNumberStart] = useState<number>(0)
  const [search, setSearch] = useState<string>('')

  return (
    <div className="flex flex-col gap-24 rounded-lg border bg-white p-32 shadow-md">
      <StatistiksContentHeader
        setNumberStart={setNumberStart}
        setSearch={setSearch}
        jenjang={showJenjang?.toLowerCase()}
        getStatistik={getStatistik}
        pendaftar={pendaftar}
        kode={kodeParams}
      />
      <StatistikContentInfo header={header} />
      {isLoading ? (
        <Loading />
      ) : (
        <MappingPendaftar
          pendaftar={pendaftar}
          isLoading={isLoading}
          search={search}
          numberStart={numberStart}
          setNumberStart={setNumberStart}
          jenjang={showJenjang?.toLowerCase()}
          jalur={kodeParams}
        />
      )}
    </div>
  )
}
