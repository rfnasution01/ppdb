import { Accordion } from './accordion-aturan'
import { AturanType } from '@/libs/types'
import Loading from '@/components/atoms/Loading'
import { NoData } from '@/components/atoms/NoData'

export function AturanContent({
  getAturan,
  isLoading,
}: {
  getAturan: AturanType
  isLoading: boolean
}) {
  return (
    <div className="flex flex-col gap-12 rounded-lg border bg-white p-32 shadow-md">
      {isLoading ? (
        <Loading />
      ) : getAturan ? (
        <>
          {getAturan?.isi?.map((item, idx) => (
            <div key={idx}>
              <Accordion
                title={item?.judul}
                content={item?.deskripsi}
                idx={idx}
              />
            </div>
          ))}
        </>
      ) : (
        <NoData />
      )}
    </div>
  )
}
