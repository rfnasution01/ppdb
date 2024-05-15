import { UseFormReturn } from 'react-hook-form'
import { FormLabelComponent } from './form-label-component'

export function FormAPendidkan({ form }: { form: UseFormReturn }) {
  return (
    <div className="flex flex-col gap-12">
      <FormLabelComponent
        form={form}
        name="nisn"
        label="NISN*"
        placeHolder="Masukkan NISN anda"
        type="text"
        isNumber
      />

      <FormLabelComponent
        form={form}
        name="npsn"
        label="NPSN*"
        placeHolder="Masukkan NPSN anda"
        type="text"
        isNumber
      />

      <FormLabelComponent
        form={form}
        name="nama_sekolah"
        label="Nama Sekolah*"
        placeHolder="Masukkan nama sekolah anda"
        type="text"
      />

      <FormLabelComponent
        form={form}
        name="tahun_lulus"
        label="Tahun Lulus*"
        placeHolder="Masukkan Tahun Lulus anda"
        type="text"
        isNumber
      />
    </div>
  )
}
