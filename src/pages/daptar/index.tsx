import { DaptarContent, DaptarHeader } from '@/features/daptar'
import { getJenjangSlice } from '@/store/reducer/stateJenjang'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export type PilihSekolahType = {
  id: string
  name: string
  status: string
  npsn: string
}

export default function Daptar() {
  const searchParams = new URLSearchParams(location.search)
  const jenjangParams = searchParams.get('jenjang')
  const kodeParams = searchParams.get('kode') ?? 'zn'
  const stateJenjang = useSelector(getJenjangSlice)?.tingkatan
  const [pilihSekolah, setPilihSekolah] = useState<PilihSekolahType | null>(
    null,
  )

  useEffect(() => {
    if (stateJenjang) {
      setJenjang(stateJenjang)
    }
  }, [stateJenjang])

  const [jenjang, setJenjang] = useState<string>(
    jenjangParams ?? stateJenjang ?? 'sd',
  )

  const showJenjang = jenjang?.toLowerCase() === 'sd' ? 'SD' : 'SMP'

  return (
    <div className="flex w-full flex-col gap-32">
      <DaptarHeader
        kode={kodeParams}
        jenjang={showJenjang?.toLowerCase()}
        showJenjang={showJenjang}
        pilihSekolah={pilihSekolah}
        setPilihSekolah={setPilihSekolah}
      />
      <DaptarContent showJenjang={showJenjang} pilihSekolah={pilihSekolah} />
    </div>
  )
}
