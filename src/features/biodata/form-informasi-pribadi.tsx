import { FormListAgama } from '@/components/molecules/form/formListAgama'
import { FormListJenisKelamin } from '@/components/molecules/form/formListJenisKelamin'
import { UseFormReturn } from 'react-hook-form'
import { FormLabelComponent } from './form-label-component'
import { ProfilData } from '@/libs/types/pendaftaran-type'
import { useEffect } from 'react'

export function FormBiodata({
  form,
  getProfil,
}: {
  form: UseFormReturn
  getProfil: ProfilData
}) {
  useEffect(() => {
    if (getProfil) {
      form?.setValue('nama_lengkap', getProfil?.biodata?.nama)
      form?.setValue('tgl_lahir', getProfil?.biodata?.tanggal_lahir)
      form?.setValue('tempat_lahir', getProfil?.biodata?.tempat_lahir)
      form?.setValue('nik', getProfil?.biodata?.nik)
      form?.setValue('kk', getProfil?.biodata?.nomor_kk)
      form?.setValue('no_hp', getProfil?.biodata?.telepon)
      form?.setValue('jenis_kelamin', getProfil?.biodata?.jenis_kelamin)
      form?.setValue('agama', getProfil?.biodata?.agama)
    }
  }, [getProfil])

  return (
    <div className="flex flex-col gap-16 phones:gap-32">
      <FormLabelComponent
        form={form}
        name="nama_lengkap"
        label="Nama Lengkap*"
        placeHolder="Masukkan nama lengkap anda"
        type="text"
        isDisabled
      />

      <FormLabelComponent
        form={form}
        isDisabled
        name="tgl_lahir"
        label="Tanggal Lahir*"
        placeHolder="Masukkan tanggal lahir anda"
        type="date"
      />

      <FormLabelComponent
        form={form}
        name="tempat_lahir"
        label="Tempat Lahir*"
        placeHolder="Masukkan tempat lahir anda"
        type="text"
      />

      <FormLabelComponent
        isDisabled
        form={form}
        name="nik"
        label="NIK*"
        placeHolder="Masukkan NIK anda"
        type="text"
        isNumber
      />

      <FormLabelComponent
        form={form}
        name="kk"
        label="KK*"
        placeHolder="Masukkan KK anda"
        type="text"
        isNumber
      />

      <FormLabelComponent
        form={form}
        name="no_hp"
        label="No. Hp*"
        placeHolder="Masukkan No. Hp anda"
        type="text"
        isNumber
      />

      <FormListJenisKelamin
        name="jenis_kelamin"
        placeholder="Pilih jenis kelamin"
        headerLabel="Jenis Kelamin*"
        form={form}
      />

      <FormListAgama
        name="agama"
        placeholder="Pilih agama"
        headerLabel="Agama*"
        form={form}
      />
    </div>
  )
}
