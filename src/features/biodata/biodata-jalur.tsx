import Loading from '@/components/atoms/Loading'
import {
  capitalizeFirstLetterFromLowercase,
  convertToSlug,
} from '@/libs/helpers/format-text'
import { JalurMasukType } from '@/libs/types'
import { setStateBiodata } from '@/store/reducer/stateBiodata'
import { useGetJalurMasukQuery } from '@/store/slices/jalurAPI'
import { useCreateJalurMutation } from '@/store/slices/pendaftaranAPI'
import clsx from 'clsx'
import Cookies from 'js-cookie'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function BiodataJalur({
  setName,
  setActiveIndex,
}: {
  setName: Dispatch<SetStateAction<string>>
  setActiveIndex: Dispatch<SetStateAction<number>>
}) {
  const jalurParams = Cookies.get('jalur')
  const jenjangParams = Cookies.get('jenjang')
  const [jalur, setJalur] = useState(jalurParams.toLowerCase())
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [jalurMasuk, setJalurMasuk] = useState<JalurMasukType[]>([])
  const {
    data: getJalurMasuk,
    isLoading: isLoadingJalurMasuk,
    isFetching: isFetchingJalurmasuk,
  } = useGetJalurMasukQuery({ jenjang: jenjangParams })

  useEffect(() => {
    if (getJalurMasuk?.data) {
      setJalurMasuk(getJalurMasuk?.data)
    }
  }, [getJalurMasuk?.data])

  // --- Create Jalur ---
  const [
    createJalur,
    {
      isError: isErrorJalur,
      error: errorJalur,
      isLoading: isLoadingJalur,
      isSuccess: isSuccessJalur,
    },
  ] = useCreateJalurMutation()

  const handleSubmit = () => {
    try {
      const res = createJalur({ data: { jalur: jalur } })
      if ('data' in res) {
        Cookies.set('jalur', jalur)
      } else {
        console.error('Error occurred')
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (isSuccessJalur) {
      toast.success(`Jalur berhasil disimpan!`, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })
      setTimeout(() => {
        setActiveIndex(1)
        setName('informasi-pribadi')
        dispatch(setStateBiodata({ page: 'informasi-pribadi' }))
        navigate(`/main?page=${'informasi-pribadi'}`)
      }, 2000)
    }
  }, [isSuccessJalur])

  useEffect(() => {
    if (isErrorJalur) {
      const errorMsg = errorJalur as {
        data?: {
          message?: string
        }
      }

      toast.error(`${errorMsg?.data?.message ?? 'Terjadi Kesalahan'}`, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      })
    }
  }, [isErrorJalur, errorJalur])

  const isLoading =
    isFetchingJalurmasuk || isLoadingJalurMasuk || isLoadingJalur

  return (
    <div className="flex h-full flex-col gap-32">
      <div className="flex flex-1 flex-col gap-24">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {jalurMasuk.map((item, idx) => (
              <div
                className={clsx(
                  'flex items-center gap-12 border p-16 hover:cursor-pointer hover:shadow',
                  {
                    'bg-danger-100 text-danger-tint-1':
                      convertToSlug(item?.kode?.toLowerCase()) === jalur,
                  },
                )}
                key={idx}
                onClick={() => setJalur(convertToSlug(item?.kode))}
              >
                <div
                  className={clsx('h-[2rem] w-[2rem] border', {
                    'border-transparent bg-white':
                      convertToSlug(item?.kode?.toLowerCase()) === jalur,
                  })}
                />
                {capitalizeFirstLetterFromLowercase(item?.nama?.toLowerCase())}
              </div>
            ))}
            <div className="flex flex-col gap-4">
              <p className="text-[1.8rem] phones:text-[2.2rem]">
                <span className="font-bold text-danger-100">Informasi!</span>{' '}
                Mohon Pastikan Kembali Jalur Pendaftaran Anda. Jika belum
                Sesuai, silahkan diperbaharui !
              </p>
            </div>
          </>
        )}
      </div>
      {/* --- button --- */}
      <div className="flex items-center justify-between bg-primary-50 p-32">
        <p className="text-[1.8rem] text-emerald-800">* Wajib Diisi</p>
        <div className="flex items-center gap-16 text-[2rem]">
          <button
            className="rounded-2xl bg-danger-100 px-24 py-12 text-danger-tint-1 hover:bg-danger-300 disabled:cursor-not-allowed disabled:bg-white disabled:text-danger-300"
            type="submit"
            onClick={() => {
              handleSubmit()
            }}
            disabled={isLoading}
          >
            Lanjut
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}
