import { FormDaptarAkun } from '@/features/daptar-akun'
import { getJenjangSlice } from '@/store/reducer/stateJenjang'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function DaptarAkun() {
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

  return (
    <div className="flex flex-col gap-24 rounded-lg border bg-white p-32 shadow-md">
      <p className="text-[3.6rem]">Daptar Akun {showJenjang}</p>
      <hr className="w-full border" />
      <FormDaptarAkun showJenjang={showJenjang} />
    </div>
  )
}
