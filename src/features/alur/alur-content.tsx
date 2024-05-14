import Loading from '@/components/atoms/Loading'
import { AlurType } from '@/libs/types'

export function AlurContent({
  getAlur,
  isLoading,
}: {
  getAlur: AlurType
  isLoading: boolean
}) {
  return (
    <div className="flex flex-col gap-24 rounded-lg border bg-white p-32 shadow-md">
      {isLoading ? (
        <Loading />
      ) : (
        <div dangerouslySetInnerHTML={{ __html: getAlur?.isi }} />
      )}
    </div>
  )
}
