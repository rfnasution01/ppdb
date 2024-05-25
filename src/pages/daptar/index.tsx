import { DaptarContent, DaptarHeader } from '@/features/daptar'
import {
  DaptarAkunType,
  HeaderType,
  PendaftarType,
} from '@/libs/types/daptar-akun'
import { getJenjangSlice } from '@/store/reducer/stateJenjang'
import { getPilihSekolahSlice } from '@/store/reducer/statePilihSekolah'
import { useGetAkunQuery } from '@/store/slices/daptarAkunAPI'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function Daptar() {
  const searchParams = new URLSearchParams(location.search)
  const jenjangParams = searchParams.get('jenjang')
  const kodeParams = searchParams.get('kode') ?? 'zn'
  const stateJenjang = useSelector(getJenjangSlice)?.tingkatan

  useEffect(() => {
    if (stateJenjang) {
      setJenjang(stateJenjang)
    }
  }, [stateJenjang])

  const [jenjang, setJenjang] = useState<string>(
    jenjangParams ?? stateJenjang ?? 'sd',
  )

  const showJenjang = jenjang?.toLowerCase() === 'sd' ? 'SD' : 'SMP'
  const pilihSekolah = useSelector(getPilihSekolahSlice)

  // --- Daptar Akun ---
  const [daftarAkun, setDaftarAkun] = useState<DaptarAkunType>()
  const [pendaftar, setPendaftar] = useState<PendaftarType[]>([])
  const [headerPendaftar, setHeaderPendaftar] = useState<HeaderType>()

  const {
    data: getDaftarAkun,
    isLoading: isLoadingDaftarAkun,
    isFetching: isFetchingDaftarAkun,
  } = useGetAkunQuery({
    jenjang: jenjang,
    jalur: kodeParams,
    id_sekolah: pilihSekolah?.id,
  })

  const isLoading = isFetchingDaftarAkun || isLoadingDaftarAkun

  useEffect(() => {
    if (getDaftarAkun) {
      setDaftarAkun(getDaftarAkun?.data)
      setPendaftar(getDaftarAkun?.pendaftar)
      setHeaderPendaftar(getDaftarAkun?.header)
    }
  }, [getDaftarAkun])

  return (
    <div className="flex w-full flex-col gap-32">
      <DaptarHeader
        kode={kodeParams}
        jenjang={showJenjang?.toLowerCase()}
        showJenjang={showJenjang}
        getDaftarAkun={daftarAkun}
        isLoading={isLoading}
      />
      <DaptarContent
        showJenjang={showJenjang}
        pendaftar={pendaftar}
        header={headerPendaftar}
        isLoading={isLoading}
        kodeParams={kodeParams}
      />
    </div>
  )
}
