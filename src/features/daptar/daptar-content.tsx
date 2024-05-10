export function DaptarContent() {
  return (
    <div className="flex flex-col gap-24 rounded-lg border bg-white p-32 shadow-md">
      <button
        type="button"
        className="rounded-2xl bg-primary-background py-16 text-white hover:bg-primary-700"
      >
        Data Pendaftar
      </button>
      <p className="bg-primary-50 rounded-2xl p-24 text-primary-700">
        <span className="font-bold">Informasi!</span> Silakan memilih loket
        Sekolah terlebih dahulu
      </p>
    </div>
  )
}
