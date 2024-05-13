import { JalurMasukMapping } from './jalur-masuk'

export function HomeContent() {
  return (
    <div className="grid grid-cols-12 gap-32">
      {/* --- SD --- */}
      <JalurMasukMapping jenjang="sd" />
      {/* --- SMP --- */}
      <JalurMasukMapping jenjang="smp" />
    </div>
  )
}
