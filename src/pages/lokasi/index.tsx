import { LokasiHeader } from '@/features/lokasi'
import LokasiContent from '@/features/lokasi/lokasi-content'
import { getJenjangSlice } from '@/store/reducer/stateJenjang'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function Lokasi() {
  const searchParams = new URLSearchParams(location.search)
  const jenjangParams = searchParams.get('jenjang')
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

  console.log(showJenjang)

  return (
    <div className="flex w-full flex-col gap-32">
      <LokasiHeader />
      <LokasiContent />
    </div>
  )
}
