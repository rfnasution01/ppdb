import { UseFormReturn } from 'react-hook-form'
import { FormLabelComponent } from './form-label-component'

export function FormDokumen({ form }: { form: UseFormReturn }) {
  return (
    <div className="flex flex-col gap-12">
      <FormLabelComponent
        form={form}
        label="Pas Foto*"
        placeHolder="Unggah pas foto anda"
        name="pas_foto"
        type="file"
      />

      <FormLabelComponent
        form={form}
        label="KK*"
        placeHolder="Unggah kk anda"
        name="kk"
        type="file"
      />

      <FormLabelComponent
        form={form}
        label="Dokumen Lainnya*"
        placeHolder="Unggah dokumen anda"
        name="dokumen"
        type="file"
      />
    </div>
  )
}
