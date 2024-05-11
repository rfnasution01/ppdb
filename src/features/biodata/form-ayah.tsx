import { FormLabelInput } from '@/components/molecules/input'
import { UseFormReturn } from 'react-hook-form'

export function FormAyah({ form }: { form: UseFormReturn }) {
  return (
    <div className="flex flex-col gap-12">
      <FormLabelInput
        form={form}
        label="Nama*"
        placeholder="Masukkan nama anda"
        name="nama_ayah"
        type="text"
      />

      <FormLabelInput
        form={form}
        label="NIK*"
        placeholder="Masukkan NIK anda"
        name="nik_ayah"
        type="text"
      />

      <FormLabelInput
        form={form}
        label="Nama Sekolah*"
        placeholder="Masukkan nama sekolah anda"
        name="nama_sekolah_ayah"
        type="text"
      />

      <FormLabelInput
        form={form}
        label="Telepon*"
        placeholder="Masukkan telepon anda"
        name="telepon_ayah"
        type="text"
      />

      <FormLabelInput
        form={form}
        label="Pendidikan Terakhir*"
        placeholder="Masukkan pendidikan terakhir anda"
        name="pendidikan_ayah"
        type="text"
      />

      <FormLabelInput
        form={form}
        label="Pekerjaan*"
        placeholder="Masukkan pekerjaan lulus anda"
        name="pekerjaan_ayah"
        type="text"
      />
    </div>
  )
}
