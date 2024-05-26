import { FormListDayaTampung } from '@/components/molecules/form'
import { ProfilData } from '@/libs/types/pendaftaran-type'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { UseFormReturn } from 'react-hook-form'

export function FormSekolah({
  form,
  isLoading,
  getProfil,
  disabled,
}: {
  form: UseFormReturn
  isLoading?: boolean
  getProfil?: ProfilData
  disabled: boolean
}) {
  useEffect(() => {
    if (getProfil?.pilihan) {
      form.setValue('tujuan_pertama', getProfil?.pilihan?.pilihan1?.id_sekolah)
      form.setValue('tujuan_kedua', getProfil?.pilihan?.pilihan2?.id_sekolah)
    }
  }, [getProfil])

  const jenjang = Cookies.get('jenjang')

  return (
    <div className="flex flex-col gap-32">
      <FormListDayaTampung
        name="tujuan_pertama"
        useFormReturn={form}
        headerLabel="Pilihan 1*"
        placeholder="Pilih Sekolah"
        isDisabled={isLoading || disabled}
      />

      {jenjang.toLowerCase() === 'smp' && (
        <FormListDayaTampung
          name="tujuan_kedua"
          useFormReturn={form}
          headerLabel="Pilihan 2"
          placeholder="Pilih Sekolah"
          isDisabled={isLoading || disabled}
        />
      )}
    </div>
  )
}
