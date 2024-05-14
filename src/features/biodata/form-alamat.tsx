import { FormListAgama } from '@/components/molecules/form/formListAgama'
import { FormLabelInput } from '@/components/molecules/input'
import { UseFormReturn } from 'react-hook-form'

export function FormAlamat({ form }: { form: UseFormReturn }) {
  return (
    <div className="flex flex-col gap-12">
      <FormListAgama
        name="provinsi"
        placeholder="Pilih provinsi"
        headerLabel="Provinsi*"
        form={form}
      />
      <FormListAgama
        name="kabupaten"
        placeholder="Pilih kabupaten"
        headerLabel="Kabupaten*"
        form={form}
      />

      <FormListAgama
        name="kecamatan"
        placeholder="Pilih kecamatan"
        headerLabel="Kecamatan*"
        form={form}
      />

      <FormListAgama
        name="desa"
        placeholder="Pilih desa"
        headerLabel="Desa*"
        form={form}
      />

      <FormLabelInput
        form={form}
        label="Dusun*"
        placeholder="Masukkan dusun anda"
        name="dusun"
        type="text"
      />

      <FormLabelInput
        form={form}
        label="Alamat*"
        placeholder="Masukkan alamat anda"
        name="alamat"
        type="text"
      />
    </div>
  )
}