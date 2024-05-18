import { FormListDayaTampung } from '@/components/molecules/form'
import { ProfilData } from '@/libs/types/pendaftaran-type'
import { useEffect } from 'react'
import { UseFormReturn } from 'react-hook-form'

export function FormSekolah({
  form,
  isLoading,
  getProfil,
}: {
  form: UseFormReturn
  isLoading?: boolean
  getProfil?: ProfilData
}) {
  useEffect(() => {
    if (getProfil?.pilihan) {
      form.setValue('tujuan_pertama', getProfil?.pilihan?.pilihan1?.id_sekolah)
      form.setValue('tujuan_kedua', getProfil?.pilihan?.pilihan2?.nama_sekolah)
    }
  }, [getProfil])

  return (
    <div className="flex flex-col gap-12">
      <FormListDayaTampung
        name="tujuan_pertama"
        useFormReturn={form}
        headerLabel="Pilihan 1*"
        placeholder="Pilih Sekolah"
        isDisabled={isLoading}
      />

      <FormListDayaTampung
        name="tujuan_kedua"
        useFormReturn={form}
        headerLabel="Pilihan 2"
        placeholder="Pilih Sekolah"
        isDisabled={isLoading}
      />
    </div>
  )
}
