import { JalurMasukMapping } from './jalur-masuk'

export function HomeContent() {
  return (
    <div className="flex items-center justify-center gap-32 phones:flex-col">
      {/* --- SD --- */}
      <JalurMasukMapping jenjang="sd" />
      {/* --- SMP --- */}
      <JalurMasukMapping jenjang="smp" />
    </div>
  )
}
