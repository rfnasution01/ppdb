export type TiketType = {
  id: string
  judul: string
  keterangan: string
  lampiran: LampiranType[]
  tanggal: string
  status: number
  status_user: string
  status_at: string
}

export type LampiranType = {
  id: string
  dokumen: string
}

export type TiketParams = {
  id?: string
  judul?: string
  keterangan?: string
  berkas?: string[]
}

export type TiketChatParams = {
  id?: string
  isi: string
  berkas?: string[]
}
