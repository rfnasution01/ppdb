import { SeleksiContent, SeleksiHeader } from '@/features/seleksi'
import { HeaderType, StatistikType } from '@/libs/types'
import { SeleksiType } from '@/libs/types/seleksi-type'
import { getJalurSlice } from '@/store/reducer/stateJalur'
import { getJenjangSlice } from '@/store/reducer/stateJenjang'
import { getPilihSekolahSlice } from '@/store/reducer/statePilihSekolah'
import { useGetSeleksiQuery } from '@/store/slices/seleksiAPI'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function Seleksi() {
  const searchParams = new URLSearchParams(location.search)
  const jenjangParams = searchParams.get('jenjang')
  const kodeParams = searchParams.get('kode') ?? 'zn'
  const stateJenjang = useSelector(getJenjangSlice)?.tingkatan
  const stateKode = useSelector(getJalurSlice)?.kode

  useEffect(() => {
    if (stateJenjang) {
      setJenjang(stateJenjang)
    }
  }, [stateJenjang])

  useEffect(() => {
    if (stateKode) {
      setKode(stateKode)
    }
  }, [stateKode])

  const [jenjang, setJenjang] = useState<string>(
    jenjangParams ?? stateJenjang ?? 'sd',
  )

  const [kode, setKode] = useState<string>(kodeParams ?? stateKode ?? 'sd')

  const showJenjang = jenjang?.toLowerCase() === 'sd' ? 'SD' : 'SMP'
  const pilihSekolah = useSelector(getPilihSekolahSlice)

  // --- Seleksi Akun ---
  const [daftarAkun, setDaftarAkun] = useState<StatistikType>()
  const [pendaftar, setPendaftar] = useState<SeleksiType[]>([])
  const [headerPendaftar, setHeaderPendaftar] = useState<HeaderType>()

  const {
    data: getDaftarAkun,
    isLoading: isLoadingDaftarAkun,
    isFetching: isFetchingDaftarAkun,
  } = useGetSeleksiQuery({
    jenjang: jenjang,
    jalur: kode,
    id_sekolah: pilihSekolah?.id,
  })

  const isLoading = isFetchingDaftarAkun || isLoadingDaftarAkun

  useEffect(() => {
    if (getDaftarAkun) {
      setDaftarAkun(getDaftarAkun?.data)
      setPendaftar(getDaftarAkun?.hasil)
      setHeaderPendaftar(getDaftarAkun?.header)
    }
  }, [getDaftarAkun])

  return (
    <div className="flex w-full flex-col gap-32">
      <SeleksiHeader
        kode={kode}
        jenjang={showJenjang?.toLowerCase()}
        showJenjang={showJenjang}
        getDaftarAkun={daftarAkun}
        isLoading={isLoading}
      />
      <SeleksiContent
        showJenjang={showJenjang}
        pendaftar={pendaftar}
        header={headerPendaftar}
        isLoading={isLoading}
        kodeParams={kode}
      />
    </div>
  )
}
