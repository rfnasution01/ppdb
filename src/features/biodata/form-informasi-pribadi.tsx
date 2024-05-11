import { FormListAgama } from '@/components/molecules/form/formListAgama'
import { FormListJenisKelamin } from '@/components/molecules/form/formListJenisKelamin'
import { FormLabelInput } from '@/components/molecules/input'
import { UseFormReturn } from 'react-hook-form'

export function FormBiodata({ form }: { form: UseFormReturn }) {
  return (
    <div className="flex flex-col gap-12">
      <FormLabelInput
        form={form}
        label="Nama Lengkap*"
        placeholder="Masukkan nama lengkap anda"
        name="nama_lengkap"
        type="text"
      />
      <FormLabelInput
        form={form}
        label="Tanggal Lahir*"
        placeholder="Masukkan tanggal lahir anda"
        name="tgl_lahir"
        type="date"
      />
      <FormLabelInput
        form={form}
        label="Tempat Lahir*"
        placeholder="Masukkan tempat lahir lengkap anda"
        name="tempat_lahir"
        type="text"
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

      <FormLabelInput
        form={form}
        label="NIK*"
        placeholder="Masukkan NIK anda"
        name="nik"
        type="number"
      />

      <FormLabelInput
        form={form}
        label="No. KK*"
        placeholder="Masukkan No. KK anda"
        name="kk"
        type="number"
      />

      <FormLabelInput
        form={form}
        label="No. Hp*"
        placeholder="Masukkan No. Hp anda"
        name="no_hp"
        type="number"
      />
    </div>
  )
}
