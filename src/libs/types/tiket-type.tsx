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

export type TikeetNotificationType = {
  status: string
  message: string
  data: number
  id: string
}

export type TiketDetailType = {
  ticket: TiketType
  chat: TiketChatType[]
}

export type TiketChatType = {
  id: string
  jenis_chat: string
  isi: string
  baca: string
  lampiran: LampiranType[]
  user: string
  tanggal: string
  photo: string
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
