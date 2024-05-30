export type DashboardType = {
  biodata: {
    nama: string
    nik: string
    pasfoto: string
    jalur: string
  }
  status_pendaftaran: {
    validasi: number
    verifikasi: number
    pengumuman: number
    lulus: number
    registrasi_ulang: number
  }
  faq: FaqType[]
  tiket: '7e6a7e9c-acb8-4ebf-acd5-173dc0c4728b'
}

export type FaqType = {
  id: string
  pertanyaan: string
  jawaban: string
  urutan: string
}
