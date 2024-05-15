import { FormListAgama } from '@/components/molecules/form/formListAgama'
import { FormListJenisKelamin } from '@/components/molecules/form/formListJenisKelamin'
import { UseFormReturn } from 'react-hook-form'
import { FormLabelComponent } from './form-label-component'

export function FormBiodata({ form }: { form: UseFormReturn }) {
  return (
    <div className="flex flex-col gap-16 phones:gap-32">
      <FormLabelComponent
        form={form}
        name="nama_lengkap"
        label="Nama Lengkap*"
        placeHolder="Masukkan nama lengkap anda"
        type="text"
      />

      <FormLabelComponent
        form={form}
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
