import { UseFormReturn } from 'react-hook-form'
import { FormLabelComponent } from './form-label-component'

export function FormIbu({ form }: { form: UseFormReturn }) {
  return (
    <div className="flex flex-col gap-12">
      <FormLabelComponent
        form={form}
        label="Nama*"
        placeHolder="Masukkan nama ibu"
        name="nama_ibu"
        type="text"
      />

      <FormLabelComponent
        form={form}
        label="NIK*"
        placeHolder="Masukkan NIK ibu"
        name="nik_ibu"
        type="text"
        isNumber
      />

      <FormLabelComponent
        form={form}
        label="Telepon*"
        placeHolder="Masukkan telepon ibu"
        name="telepon_ibu"
        type="text"
        isNumber
      />

      <FormLabelComponent
        form={form}
        label="Pendidikan Terakhir*"
        placeHolder="Masukkan pendidikan terakhir ibu"
        name="pendidikan_ibu"
        type="text"
      />

      <FormLabelComponent
        form={form}
        label="Pekerjaan*"
        placeHolder="Masukkan pekerjaan lulus ibu "
        name="pekerjaan_ibu"
        type="text"
      />
    </div>
  )
}
