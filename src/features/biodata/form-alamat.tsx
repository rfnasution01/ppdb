import { FormListAgama } from '@/components/molecules/form/formListAgama'
import { UseFormReturn } from 'react-hook-form'
import { FormLabelComponent } from './form-label-component'

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

      <FormLabelComponent
        form={form}
        name="dusun"
        label="Dusun"
        placeHolder="Masukkan nama dusun anda"
        type="text"
      />

      <FormLabelComponent
        form={form}
        name="alamat"
        label="Alamat*"
        placeHolder="Masukkan alamat anda"
        type="text"
      />
    </div>
  )
}
