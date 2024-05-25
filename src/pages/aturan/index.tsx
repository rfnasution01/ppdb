import { AturanContent, AturanHeader } from '@/features/aturan'
import { AturanType } from '@/libs/types'
import { getJalurSlice } from '@/store/reducer/stateJalur'
import { getJenjangSlice } from '@/store/reducer/stateJenjang'
import { useGetAturanQuery } from '@/store/slices/aturanAPI'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function Aturan() {
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

  console.log(showJenjang)

  // --- Aturan ---
  const [aturan, setAturan] = useState<AturanType>()
  const {
    data: getAturan,
    isLoading: isLoadingAturan,
    isFetching: isFetchingAturan,
  } = useGetAturanQuery({ jenjang: jenjang, jalur: kode })

  const isLoading = isFetchingAturan || isLoadingAturan

  useEffect(() => {
    if (getAturan?.data) {
      setAturan(getAturan?.data)
    }
  }, [getAturan?.data])

  return (
    <div className="flex w-full flex-col gap-32">
      <AturanHeader getAturan={aturan} isLoading={isLoading} />
      <AturanContent getAturan={aturan} isLoading={isLoading} />
    </div>
  )
}
