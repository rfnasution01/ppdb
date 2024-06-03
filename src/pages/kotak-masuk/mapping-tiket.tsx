/* eslint-disable @typescript-eslint/no-explicit-any */
import { enumTicket } from '@/libs/enum/enum-ticket'
import { TikeetNotificationType, TiketType } from '@/libs/types/tiket-type'
import clsx from 'clsx'
import 'dayjs/locale/id'
import { MenubarLayanan } from './menubar-layanan'
import { useNavigate } from 'react-router-dom'
import TimeSinceUploaded from '@/libs/helpers/format-time'
import { useGetTiketNotifikasiQuery } from '@/store/slices/tiketAPI'
import { useEffect, useState } from 'react'

export function MappingTiket({ data }: { data: TiketType[] }) {
  const navigate = useNavigate()

  const { data: notifData } = useGetTiketNotifikasiQuery()
  const [notif, setNotif] = useState<TikeetNotificationType>()
  const [isShow, setIsShow] = useState<boolean>(true)
  const [id, setId] = useState<string>('')

  useEffect(() => {
    if (notifData) {
      setNotif(notifData)
    }
  }, [notifData])

  return (
    <div className="scrollbar flex h-full flex-col gap-32 overflow-y-auto">
      {data?.map((item, idx) => (
        <div
          onClick={() => {
            setId(item?.id)
            if (id === item?.id) {
              setIsShow(false)
            }
            navigate(`/main/pertanyaan/detail?id=${item?.id}`)
          }}
          className={clsx(
            'flex flex-col gap-12 rounded-2xl border p-32 hover:cursor-pointer',
            {
              'border-blue-700 bg-blue-100 text-blue-700 hover:bg-blue-200':
                item?.status === 0,
              'border-orange-700 bg-orange-100 text-orange-700 hover:bg-orange-200':
                item?.status === 1,
              'border-green-700 bg-green-100 text-green-700 hover:bg-green-200':
                item?.status === 2,
            },
          )}
          key={idx}
        >
          <div className="flex items-center justify-between">
            <p
              className={clsx(
                'text-nowrap border-l-2 px-12 py-4 text-[1.8rem]',
                {
                  'border-blue-700 bg-blue-700 bg-opacity-10 text-blue-700':
                    item?.status === enumTicket.TICKETBARU,
                  'border-orange-700 bg-orange-700 bg-opacity-10 text-orange-700':
                    item?.status === enumTicket.TICKETSUDAHDIRESPONS,
                  'border-green-700 bg-green-700 bg-opacity-10 text-green-700':
                    item?.status === enumTicket.TICKETSELESAI,
                },
              )}
            >
              {item?.status === enumTicket.TICKETBARU
                ? 'Menunggu'
                : item?.status === enumTicket.TICKETSUDAHDIRESPONS
                  ? 'Berlangsung'
                  : item?.status === enumTicket.TICKETSELESAI
                    ? 'Selesai'
                    : 'Berlangsung'}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              <MenubarLayanan
                isDisabled={item?.status !== enumTicket.TICKETBARU}
                id={item?.id}
              />
            </button>
          </div>
          <p className="text-[3rem] font-bold">{item?.judul}</p>

          <div className="flex items-center gap-32">
            <div
              dangerouslySetInnerHTML={{ __html: item?.keterangan }}
              className="limited-text-2-lines flex-1"
            />
            {notif?.data > 0 && isShow && item?.status === 1 && (
              <p className="flex h-[3rem] w-[3rem] items-center justify-center rounded-full bg-rose-500 p-8 text-[1.6rem] text-white">
                {notif?.data}
              </p>
            )}
          </div>

          <div className="flex justify-end text-[2rem] italic">
            <TimeSinceUploaded uploadTime={item?.tanggal} />
          </div>
        </div>
      ))}
    </div>
  )
}
