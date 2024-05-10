import { StatistikContentHeader } from './statistik-content-header'
import { StatistikContentInfo } from './statistik-content-info'
import { StatistikTable } from './statistik-table'

export function StatistikContent() {
  return (
    <div className="flex flex-col gap-24 rounded-lg border bg-white p-32 shadow-md">
      <StatistikContentHeader />
      <StatistikContentInfo />
      <StatistikTable />
    </div>
  )
}
