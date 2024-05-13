import { convertToSlug } from '@/libs/helpers/format-text'
import { setStateBiodata } from '@/store/reducer/stateBiodata'
import clsx from 'clsx'
import { Dispatch, SetStateAction, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export function BiodataJalur({
  setName,
  setActiveIndex,
}: {
  setName: Dispatch<SetStateAction<string>>
  setActiveIndex: Dispatch<SetStateAction<number>>
}) {
  const [jalur, setJalur] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <div className="flex h-full flex-col gap-32">
      <div className="flex flex-1 flex-col gap-24">
        {['Zonasi', 'Affirmasi', 'Prestasi'].map((item, idx) => (
          <div
            className={clsx(
              'flex items-center gap-12 border p-16 hover:cursor-pointer hover:shadow',
              {
                'bg-danger-100 text-danger-tint-1':
                  convertToSlug(item) === jalur,
              },
            )}
            key={idx}
            onClick={() => setJalur(convertToSlug(item))}
          >
            <div
              className={clsx('h-[2rem] w-[2rem] border', {
                'border-transparent bg-white': convertToSlug(item) === jalur,
              })}
            />
            {item}
          </div>
        ))}
      </div>
      {/* --- button --- */}
      <div className="flex items-center justify-between bg-primary-50 p-32">
        <p className="text-[1.8rem] text-emerald-800">* Wajib Diisi</p>
        <div className="flex items-center gap-16 text-[2rem]">
          <button
            className="rounded-2xl bg-danger-100 px-24 py-12 text-danger-tint-1 hover:bg-danger-300 disabled:cursor-not-allowed disabled:bg-white disabled:text-danger-300"
            type="submit"
            onClick={() => {
              setActiveIndex(1)
              setName('informasi-pribadi')
              dispatch(setStateBiodata({ page: 'informasi-pribadi' }))
              navigate(`/main?page=${'informasi-pribadi'}`)
            }}
            disabled={jalur === ''}
          >
            Lanjut
          </button>
        </div>
      </div>
    </div>
  )
}
