import { DaptarContent, DaptarHeader } from '@/features/daptar'
import { DaptarAkunType } from '@/libs/types/daptar-akun'
import { getJenjangSlice } from '@/store/reducer/stateJenjang'
import { useGetAkunQuery } from '@/store/slices/daptarAkunAPI'
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

  // --- Daptar Akun ---
  const [daftarAkun, setDaftarAkun] = useState<DaptarAkunType>()
  const {
    data: getDaftarAkun,
    isLoading: isLoadingDaftarAkun,
    isFetching: isFetchingDaftarAkun,
  } = useGetAkunQuery({ jenjang: jenjang, jalur: kodeParams })

  const isLoading = isFetchingDaftarAkun || isLoadingDaftarAkun

  useEffect(() => {
    if (getDaftarAkun?.data) {
      setDaftarAkun(getDaftarAkun?.data)
    }
  }, [getDaftarAkun?.data])

  return (
    <div className="flex w-full flex-col gap-32">
      <DaptarHeader
        kode={kodeParams}
        jenjang={showJenjang?.toLowerCase()}
        showJenjang={showJenjang}
        pilihSekolah={pilihSekolah}
        setPilihSekolah={setPilihSekolah}
        getDaftarAkun={daftarAkun}
        isLoading={isLoading}
      />
      <DaptarContent showJenjang={showJenjang} pilihSekolah={pilihSekolah} />
    </div>
  )
}
