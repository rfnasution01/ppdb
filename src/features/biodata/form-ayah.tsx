import { UseFormReturn } from 'react-hook-form'
import { FormLabelComponent } from './form-label-component'
import { FormLabelCheckBox } from './form-label-checkbox'
import { useEffect } from 'react'
import {
  FormListPekerjaan,
  FormListPendidikan,
} from '@/components/molecules/form'
import { ProfilData } from '@/libs/types/pendaftaran-type'

export function FormAyah({
  form,
  isLoading,
  getProfil,
  disabled,
}: {
  form: UseFormReturn
  isLoading?: boolean
  getProfil: ProfilData
  disabled
}) {
  useEffect(() => {
    if (getProfil?.orangtua?.ayah) {
      form.setValue(
        'isHidupAyah',
        getProfil?.orangtua?.ayah?.status === 'Hidup' ? true : false,
      )
      form.setValue('nama_ayah', getProfil?.orangtua?.ayah?.nama)
      form.setValue('nik_ayah', getProfil?.orangtua?.ayah?.nik)
      form.setValue('telepon_ayah', getProfil?.orangtua?.ayah?.hp)
      form.setValue('pekerjaan_ayah', getProfil?.orangtua?.ayah?.id_pekerjaan)
      form.setValue('pendidikan_ayah', getProfil?.orangtua?.ayah?.id_pendidikan)
    }
  }, [getProfil])

  const isChecked = form.watch('isHidupAyah') ?? false

  return (
    <div className="flex flex-col gap-12">
      <FormLabelCheckBox
        form={form}
        label="Ayah masih hidup?*"
        placeHolder="Ya"
        name="isHidupAyah"
        isChecked={isChecked}
        isDisabled={isLoading || disabled}
      />

      <FormLabelComponent
        form={form}
        label="Nama*"
        placeHolder="Masukkan nama ayah"
        name="nama_ayah"
        type="text"
        isDisabled={isLoading || disabled}
      />

      <FormLabelComponent
        form={form}
        label="NIK*"
        placeHolder="Masukkan NIK ayah"
        name="nik_ayah"
        type="text"
        isNumber
        isDisabled={isLoading || disabled}
      />

      {isChecked && (
        <>
          <FormLabelComponent
            form={form}
            label="Telepon*"
            placeHolder="Masukkan telepon ayah"
            name="telepon_ayah"
            type="text"
            isNumber
            isDisabled={isLoading || disabled}
          />

          <FormListPendidikan
            name="pendidikan_ayah"
            useFormReturn={form}
            headerLabel="Pendidikan Terakhir*"
            placeholder="Pilih Pendidikan Terakhir"
            isDisabled={isLoading || disabled}
          />

          <FormListPekerjaan
            name="pekerjaan_ayah"
            useFormReturn={form}
            headerLabel="Pekerjaan*"
            placeholder="Pilih Pekerjaan"
            isDisabled={isLoading || disabled}
          />
        </>
      )}
    </div>
  )
}
