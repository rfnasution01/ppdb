import { ListAccordionData } from '@/libs/dummy/list-aturan'
import { Accordion } from './accordion-aturan'

export function AturanContent() {
  return (
    <div className="flex flex-col gap-12 rounded-lg border bg-white p-32 shadow-md">
      {ListAccordionData.map(({ title, content }, idx) => (
        <div key={idx}>
          <Accordion title={title} content={content} idx={idx} />
        </div>
      ))}
    </div>
  )
}
