import { UseFormReturn } from 'react-hook-form'
import { FormLabelComponent } from './form-label-component'

export function FormAyah({ form }: { form: UseFormReturn }) {
  return (
    <div className="flex flex-col gap-12">
      <FormLabelComponent
        form={form}
        label="Nama*"
        placeHolder="Masukkan nama yah"
        name="nama_ayah"
        type="text"
      />

      <FormLabelComponent
        form={form}
        label="NIK*"
        placeHolder="Masukkan NIK ayah"
        name="nik_ayah"
        type="text"
        isNumber
      />

      <FormLabelComponent
        form={form}
        label="Telepon*"
        placeHolder="Masukkan telepon ayah"
        name="telepon_ayah"
        type="text"
        isNumber
      />

      <FormLabelComponent
        form={form}
        label="Pendidikan Terakhir*"
        placeHolder="Masukkan pendidikan terakhir ayah"
        name="pendidikan_ayah"
        type="text"
      />

      <FormLabelComponent
        form={form}
        label="Pekerjaan*"
        placeHolder="Masukkan pekerjaan lulus ayah"
        name="pekerjaan_ayah"
        type="text"
      />
    </div>
  )
}
