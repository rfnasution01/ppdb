import { UseFormReturn } from 'react-hook-form'
import { FormLabelComponent } from './form-label-component'
import { FormLabelCheckBox } from './form-label-checkbox'
import {
  FormListPekerjaan,
  FormListPendidikan,
} from '@/components/molecules/form'
import { ProfilData } from '@/libs/types/pendaftaran-type'
import { useEffect } from 'react'

export function FormIbu({
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
    if (getProfil?.orangtua?.ibu) {
      form.setValue(
        'isHidupIbu',
        getProfil?.orangtua?.ibu?.status === 'Hidup' ? true : false,
      )
      form.setValue('nama_ibu', getProfil?.orangtua?.ibu?.nama)
      form.setValue('nik_ibu', getProfil?.orangtua?.ibu?.nik)
      form.setValue('telepon_ibu', getProfil?.orangtua?.ibu?.hp)
      form.setValue('pekerjaan_ibu', getProfil?.orangtua?.ibu?.id_pekerjaan)
      form.setValue('pendidikan_ibu', getProfil?.orangtua?.ibu?.id_pendidikan)
    }
  }, [getProfil])

  const isChecked = form.watch('isHidupIbu')

  return (
    <div className="flex flex-col gap-12">
      <FormLabelCheckBox
        form={form}
        label="Ibu masih hidup?*"
        placeHolder="Ya"
        name="isHidupIbu"
        isChecked={isChecked}
        isDisabled={isLoading || disabled}
      />

      <FormLabelComponent
        form={form}
        label="Nama*"
        placeHolder="Masukkan nama ibu"
        name="nama_ibu"
        type="text"
        isDisabled={isLoading || disabled}
      />

      <FormLabelComponent
        form={form}
        label="NIK*"
        placeHolder="Masukkan NIK ibu"
        name="nik_ibu"
        type="text"
        isNumber
        isDisabled={isLoading || disabled}
      />

      {isChecked && (
        <>
          <FormLabelComponent
            form={form}
            label="Telepon*"
            placeHolder="Masukkan telepon ibu"
            name="telepon_ibu"
            type="text"
            isNumber
            isDisabled={isLoading || disabled}
          />

          <FormListPendidikan
            name="pendidikan_ibu"
            useFormReturn={form}
            headerLabel="Pendidikan Terakhir*"
            placeholder="Pilih Pendidikan Terakhir"
            isDisabled={isLoading || disabled}
          />

          <FormListPekerjaan
            name="pekerjaan_ibu"
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
