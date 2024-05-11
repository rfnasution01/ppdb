import { FormListAgama } from '@/components/molecules/form/formListAgama'
import { UseFormReturn } from 'react-hook-form'

export function FormSekolah({ form }: { form: UseFormReturn }) {
  return (
    <div className="flex flex-col gap-12">
      <FormListAgama
        name="tujuan_pertama"
        placeholder="Pilih tujuan pertama"
        headerLabel="Sekolah Tujuan Pertama*"
        form={form}
      />

      <FormListAgama
        name="tujuan_kedua"
        placeholder="Pilih tujuan kedua"
        headerLabel="Sekolah Tujuan Kedua*"
        form={form}
      />
    </div>
  )
}
