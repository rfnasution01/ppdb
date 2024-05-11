import { FormLabelInput } from '@/components/molecules/input'
import { UseFormReturn } from 'react-hook-form'

export function FormIbu({ form }: { form: UseFormReturn }) {
  return (
    <div className="flex flex-col gap-12">
      <FormLabelInput
        form={form}
        label="Nama*"
        placeholder="Masukkan nama anda"
        name="nama_ibu"
        type="text"
      />

      <FormLabelInput
        form={form}
        label="NIK*"
        placeholder="Masukkan NIK anda"
        name="nik_ibu"
        type="text"
      />

      <FormLabelInput
        form={form}
        label="Nama Sekolah*"
        placeholder="Masukkan nama sekolah anda"
        name="nama_sekolah_ibu"
        type="text"
      />

      <FormLabelInput
        form={form}
        label="Telepon*"
        placeholder="Masukkan telepon anda"
        name="telepon_ibu"
        type="text"
      />

      <FormLabelInput
        form={form}
        label="Pendidikan Terakhir*"
        placeholder="Masukkan pendidikan terakhir anda"
        name="pendidikan_ibu"
        type="text"
      />

      <FormLabelInput
        form={form}
        label="Pekerjaan*"
        placeholder="Masukkan pekerjaan lulus anda"
        name="pekerjaan_ibu"
        type="text"
      />
    </div>
  )
}
