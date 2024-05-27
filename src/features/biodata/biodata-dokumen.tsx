import { Dispatch, SetStateAction } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setStateBiodata } from '@/store/reducer/stateBiodata'
import { ProfilData } from '@/libs/types/pendaftaran-type'
import Cookies from 'js-cookie'
import Loading from '@/components/atoms/Loading'
import { enumValidasi } from '@/libs/enum/enum-validasi'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FormDokumen } from './form-dokumen'
import { BiodataPrestasi } from './biodata-prestasi'

export function BiodataDokumen({
  setName,
  setActiveIndex,
  getProfil,
  isLoading,
}: {
  setName: Dispatch<SetStateAction<string>>
  setActiveIndex: Dispatch<SetStateAction<number>>
  getProfil: ProfilData
  isLoading: boolean
}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const jenjang = Cookies.get('jenjang') ?? 'sd'
  const isWajibDiIsiSemua = getProfil?.dokumen?.data?.some(
    (item) => item.status === 'Wajib' && item.dok_siswa === null,
  )

  const isValidasi = getProfil?.validasi?.status === enumValidasi?.SUDAHVALIDASI

  const jalur = Cookies.get('jalur') ?? 'zn'

  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-1 flex-col gap-32 pb-32">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="w-full overflow-x-auto">
            {/* --- Dokumen --- */}
            <FormDokumen
              isLoading={isLoading}
              isValidasi={isValidasi}
              getProfil={getProfil}
            />
          </div>
        )}
      </div>
      {/* --- Prestasi --- */}
      {jalur.toLowerCase() === 'pr' && jenjang.toLowerCase() === 'smp' && (
        <div className="flex flex-1 flex-col gap-32 pb-32">
          <BiodataPrestasi getProfil={getProfil} isValidasi={isValidasi} />
        </div>
      )}
      {/* --- button --- */}
      <div className="flex items-center justify-between bg-primary-50 p-32 phones:flex-col">
        <p className="text-[1.8rem] text-emerald-800">
          <span className="font-bold">Informasi!</span> Pastikan semua file
          dengan status wajib sudah terisi
        </p>
        <div className="flex items-center gap-16 text-[2rem] phones:w-full phones:flex-col">
          <button
            className="rounded-2xl bg-primary-background px-24 py-12 text-white hover:bg-primary-700 phones:w-full"
            type="button"
            disabled={isLoading}
            onClick={() => {
              setActiveIndex(jenjang.toLowerCase() === 'sd' ? 3 : 4)
              setName('orang-tua')
              dispatch(setStateBiodata({ page: 'orang-tua' }))
              navigate(`/main?page=${'orang-tua'}`)
            }}
          >
            Kembali
          </button>
          <button
            disabled={isLoading || isWajibDiIsiSemua}
            className="rounded-2xl bg-emerald-700 px-24 py-12 text-white hover:bg-emerald-900 disabled:cursor-not-allowed phones:w-full"
            type="submit"
            onClick={() => {
              setActiveIndex(5)
              setName('pilih-sekolah')
              dispatch(setStateBiodata({ page: 'pilih-sekolah' }))
              navigate(`/main?page=${'pilih-sekolah'}`)
            }}
          >
            Lanjut
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}
