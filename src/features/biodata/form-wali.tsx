import { UseFormReturn } from 'react-hook-form'
import { FormLabelComponent } from './form-label-component'
import {
  FormListPekerjaan,
  FormListPendidikan,
} from '@/components/molecules/form'
import { ProfilData } from '@/libs/types/pendaftaran-type'
import { useEffect } from 'react'

export function FormWali({
  form,
  isLoading,
  getProfil,
  disabled,
}: {
  form: UseFormReturn
  isLoading?: boolean
  getProfil: ProfilData
  disabled: boolean
}) {
  useEffect(() => {
    if (getProfil?.orangtua?.status === true) {
      form.setValue('nama_wali', getProfil?.orangtua?.wali?.nama)
      form.setValue('nik_wali', getProfil?.orangtua?.wali?.nik)
      form.setValue('telepon_wali', getProfil?.orangtua?.wali?.hp)
      form.setValue('pekerjaan_wali', getProfil?.orangtua?.wali?.id_pekerjaan)
      form.setValue('pendidikan_wali', getProfil?.orangtua?.wali?.id_pendidikan)
    }
  }, [getProfil])
  return (
    <div className="flex flex-col gap-12">
      <FormLabelComponent
        form={form}
        label="Nama*"
        placeHolder="Masukkan nama wali"
        name="nama_wali"
        type="text"
        isDisabled={isLoading || disabled}
      />

      <FormLabelComponent
        form={form}
        label="NIK*"
        placeHolder="Masukkan NIK wali"
        name="nik_wali"
        type="text"
        isNumber
        isDisabled={isLoading || disabled}
      />

      <FormLabelComponent
        form={form}
        label="Telepon*"
        placeHolder="Masukkan telepon wali"
        name="telepon_wali"
        type="text"
        isNumber
        isDisabled={isLoading || disabled}
      />

      <FormListPendidikan
        name="pendidikan_wali"
        useFormReturn={form}
        headerLabel="Pendidikan Terakhir*"
        placeholder="Pilih Pendidikan Terakhir"
        isDisabled={isLoading || disabled}
      />

      <FormListPekerjaan
        name="pekerjaan_wali"
        useFormReturn={form}
        headerLabel="Pekerjaan*"
        placeholder="Pilih Pekerjaan"
        isDisabled={isLoading || disabled}
      />
    </div>
  )
}
