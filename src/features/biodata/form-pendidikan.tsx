import { FormLabelInput } from '@/components/molecules/input'
import { UseFormReturn } from 'react-hook-form'

export function FormAPendidkan({ form }: { form: UseFormReturn }) {
  return (
    <div className="flex flex-col gap-12">
      <FormLabelInput
        form={form}
        label="Nisn*"
        placeholder="Masukkan NISN anda"
        name="nisn"
        type="text"
      />

      <FormLabelInput
        form={form}
        label="NPSN*"
        placeholder="Masukkan NPSN anda"
        name="npsn"
        type="text"
      />

      <FormLabelInput
        form={form}
        label="Nama Sekolah*"
        placeholder="Masukkan nama sekolah anda"
        name="nama_sekolah"
        type="text"
      />

      <FormLabelInput
        form={form}
        label="Tahun Lulus*"
        placeholder="Masukkan tahun lulus anda"
        name="tahun_lulus"
        type="text"
      />
    </div>
  )
}
