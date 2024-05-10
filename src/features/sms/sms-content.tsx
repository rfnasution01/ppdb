export function SMSContent() {
  return (
    <div className="flex flex-col gap-24 rounded-lg border bg-white p-32 shadow-md">
      <div className="text-[2..4 rem] flex items-center justify-between gap-32 rounded-lg bg-background p-24">
        <p>Info SMS Mengenai Petunjuk Penggunaan SMS Untuk Akses Info PPDB</p>
      </div>
      <div className="grid grid-cols-12 gap-32">
        <div className="col-span-6 phones:col-span-12">
          <div className="flex flex-col gap-y-24">
            <p style={{ lineHeight: '130%' }}>
              Anda dapat mengakses layanan SMS PPDB untuk mengetahui
              InformasiPenerimaan Peserta Didik Baru SMP di Kab. Deli Serdang
              dengan cara mengirimkan pesan singkat (SMS) dengan format
            </p>
            <div className="text-[2..4 rem] flex flex-col gap-64 rounded-lg bg-background p-24">
              <p className="font-bold">Format Pengiriman</p>
              <p className="text-orange-700">PPDB{'<spasi>'}NomorPendaftaran</p>
            </div>
            <div className="text-[2..4 rem] flex flex-col gap-64 rounded-lg bg-background p-24">
              <p className="font-bold">Contoh Pengiriman</p>
              <p className="text-emerald-700">PPDB 30010900001</p>
            </div>
            <p style={{ lineHeight: '130%' }}>
              Nomor Pendaftaran adalah nomor yang diperoleh setelah proses
              pendaftaran dan tercetak pada tanda bukti pendaftaran siswa.
            </p>
            <div className="text-[2..4 rem] flex flex-col gap-32 rounded-lg bg-background p-24">
              <p className="font-bold">
                Berlaku Operator Telkomsel, Indosat, XL, Axis
              </p>
              <p>
                Kirimkan SMS Anda ke :{' '}
                <span className="text-[3rem] font-bold text-orange-700">
                  98108
                </span>
              </p>
              <p>Tarif Rp.1000/reply</p>
              <p className="text-[1.8rem]">
                Keterangan: Semua tarif belum termasuk PPN
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-6 phones:col-span-12">
          <img src="/img/sms.jpg" alt="sms" className="" />
        </div>
      </div>
    </div>
  )
}
