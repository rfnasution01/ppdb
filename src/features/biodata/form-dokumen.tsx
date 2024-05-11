import { FormLabelInput } from '@/components/molecules/input'
import { UseFormReturn } from 'react-hook-form'

export function FormDokumen({ form }: { form: UseFormReturn }) {
  return (
    <div className="flex flex-col gap-12">
      <FormLabelInput
        form={form}
        label="Pas Foto*"
        placeholder="Unggah pas foto anda"
        name="pas_photo"
        type="file"
      />

      <FormLabelInput
        form={form}
        label="KK*"
        placeholder="Unggah kk anda"
        name="kk"
        type="file"
      />

      <FormLabelInput
        form={form}
        label="Dokumen Lainnya*"
        placeholder="Unggah dokumen anda"
        name="dokumen"
        type="file"
      />
    </div>
  )
}
