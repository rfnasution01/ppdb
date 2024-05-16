import { UseFormReturn } from 'react-hook-form'
import { FormLabelComponent } from './form-label-component'
import { FormListProvinsi } from '@/components/molecules/form/formListProvinsi'
import { FormListKabupaten } from '@/components/molecules/form/formListKabupaten'
import { FormListKecamatan } from '@/components/molecules/form/formListKecamatan'
import { FormListDesa } from '@/components/molecules/form/formListDesa'
import { FormListDusun } from '@/components/molecules/form/formListDusun'
import { useEffect, useState } from 'react'

export function FormAlamat({ form }: { form: UseFormReturn }) {
  const provinsi = form.getValues('provinsi')
  const kabupaten = form.getValues('kabupaten')
  const kecamatan = form.getValues('kecamatan')
  const desa = form.getValues('desa')
  const [inputKeyKabupaten, setInputKeyKabupaten] = useState<number>(0)
  const [inputKeyKecamatan, setInputKeyKecamatan] = useState<number>(0)
  const [inputKeyDesa, setInputKeyDesa] = useState<number>(0)

  useEffect(() => {
    setInputKeyKabupaten(Math.random())
  }, [provinsi])

  useEffect(() => {
    setInputKeyKecamatan(Math.random())
  }, [kabupaten])

  useEffect(() => {
    setInputKeyDesa(Math.random())
  }, [kecamatan])

  console.log(inputKeyKecamatan)
  console.log(inputKeyKabupaten)

  return (
    <div className="flex flex-col gap-12">
      <FormListProvinsi
        name="provinsi"
        useFormReturn={form}
        headerLabel="Provinsi"
        placeholder="Pilih Provinsi"
      />

      <FormListKabupaten
        name="kabupaten"
        key={provinsi}
        useFormReturn={form}
        headerLabel="Kabupaten"
        placeholder="Pilih Kabupaten"
        isDisabled={!provinsi}
      />

      <FormListKecamatan
        name="kecamatan"
        key={kabupaten}
        useFormReturn={form}
        headerLabel="Kecamatan"
        placeholder="Pilih Kecamatan"
        isDisabled={!kabupaten}
      />

      <FormListDesa
        name="desa"
        key={kecamatan}
        useFormReturn={form}
        headerLabel="Desa"
        placeholder="Pilih Desa"
        isDisabled={!kecamatan}
      />

      <FormListDusun
        name="dusun"
        key={inputKeyDesa}
        useFormReturn={form}
        headerLabel="Dusun"
        placeholder="Pilih Dusun"
        isDisabled={!desa}
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
