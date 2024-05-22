import { JalurMasukMapping } from './jalur-masuk'

export function HomeContent() {
  return (
    <div className="flex h-full justify-center gap-32 phones:flex-col">
      {/* --- SD --- */}
      <div className="w-1/3 phones:w-full">
        <JalurMasukMapping jenjang="sd" />
      </div>
      {/* --- SMP --- */}
      <div className="w-1/3 phones:w-full">
        <JalurMasukMapping jenjang="smp" />
      </div>
    </div>
  )
}
