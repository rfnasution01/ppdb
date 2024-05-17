import { UseFormReturn } from 'react-hook-form'
import { FormLabelComponent } from './form-label-component'
import { FormListProvinsi } from '@/components/molecules/form/formListProvinsi'
import { FormListKabupaten } from '@/components/molecules/form/formListKabupaten'
import { FormListKecamatan } from '@/components/molecules/form/formListKecamatan'
import { FormListDesa } from '@/components/molecules/form/formListDesa'
import { FormListDusun } from '@/components/molecules/form/formListDusun'
import { useEffect } from 'react'
import { ProfilData } from '@/libs/types/pendaftaran-type'

export function FormAlamat({
  form,
  getProfil,
}: {
  form: UseFormReturn
  getProfil: ProfilData
}) {
  const provinsi = form.watch('provinsi')
  const kabupaten = form.watch('kabupaten')
  const kecamatan = form.watch('kecamatan')
  const desa = form.watch('desa')

  useEffect(() => {
    if (getProfil?.biodata?.status === true) {
      form.setValue('provinsi', getProfil?.biodata?.id_provinsi)
      form.setValue('kabupaten', getProfil?.biodata?.id_kabupaten)
      form.setValue('kecamatan', getProfil?.biodata?.id_kecamatan)
      form.setValue('desa', getProfil?.biodata?.id_desa)
      form.setValue('alamat', getProfil?.biodata?.alamat_lengkap)
    }
  }, [getProfil])

  return (
    <div className="flex flex-col gap-12">
      <FormListProvinsi
        key={`provinsi-${provinsi}`}
        name="provinsi"
        useFormReturn={form}
        headerLabel="Provinsi"
        placeholder="Pilih Provinsi"
      />

      <FormListKabupaten
        key={`kabupaten-${provinsi}-${kabupaten}`}
        name="kabupaten"
        useFormReturn={form}
        headerLabel="Kabupaten"
        placeholder="Pilih Kabupaten"
        isDisabled={!provinsi}
      />

      <FormListKecamatan
        key={`kecamatan-${provinsi}-${kabupaten}-${kecamatan}`}
        name="kecamatan"
        useFormReturn={form}
        headerLabel="Kecamatan"
        placeholder="Pilih Kecamatan"
        isDisabled={!provinsi || !kabupaten}
      />

      <FormListDesa
        key={`desa-${provinsi}-${kabupaten}-${kecamatan}-${desa}`}
        name="desa"
        useFormReturn={form}
        headerLabel="Desa"
        placeholder="Pilih Desa"
        isDisabled={!provinsi || !kabupaten || !kecamatan}
      />

      <FormListDusun
        name="dusun"
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
