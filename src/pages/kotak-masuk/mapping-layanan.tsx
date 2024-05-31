/* eslint-disable @typescript-eslint/no-explicit-any */
import { enumTicket } from '@/libs/enum/enum-ticket'
import { TiketType } from '@/libs/types/tiket-type'
import clsx from 'clsx'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import { MenubarLayanan } from './menubar-layanan'
import { useNavigate } from 'react-router-dom'

export function MappingLayanan({ data }: { data: TiketType[] }) {
  const navigate = useNavigate()

  return (
    <div className="scrollbar flex h-full flex-col gap-12 overflow-auto">
      <table className="table-fixed phones:hidden">
        <thead></thead>
        <tbody>
          {data?.map((item, idx) => (
            <tr
              key={idx}
              onClick={() => {
                navigate(`/main/pertanyaan/detail?id=${item?.id}`)
              }}
              className="border-b-4 border-transparent hover:cursor-pointer hover:bg-yellow-50"
            >
              <td className="!w-[25%] align-middle">
                <div className="flex w-full items-start gap-24">
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
                  <p className="limited-text w-full">{item?.judul}</p>
                </div>
              </td>
              <td className="!w-[60%] align-middle">
                <div
                  dangerouslySetInnerHTML={{ __html: item?.keterangan }}
                  className="limited-text w-full"
                />
              </td>
              <td className="!w-[8%] align-middle">
                <div className="flex items-center justify-center">
                  <p
                    className={clsx(
                      'text-nowrap rounded-full p-12 text-[1.8rem]',
                      {
                        'bg-sky-300 text-sky-700':
                          item?.status === enumTicket.TICKETBARU,
                        'bg-orange-300 text-orange-700':
                          item?.status === enumTicket.TICKETSUDAHDIRESPONS,
                        'bg-lime-300 text-lime-700':
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
                </div>
              </td>
              <td className="!w-[7%] align-middle">
                <p className="text-nowrap text-right">
                  {dayjs(item?.status_at).isSame(dayjs(), 'day')
                    ? dayjs(item?.status_at).locale('id').format('HH:mm')
                    : dayjs(item?.status_at).locale('id').format('DD MMM')}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="hidden phones:block">
        <div className="flex flex-col gap-24">
          {data?.map((item, idx) => (
            <div
              className="flex w-full flex-col gap-12"
              key={idx}
              onClick={() => {
                navigate(`/main/pertanyaan/detail?id=${item?.id}`)
              }}
            >
              <div className="itemsc-center flex w-full gap-32">
                <div className="w-1/12">
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
                <div className="w-8/12 truncate font-bold">{item?.judul}</div>
                <div className="w-3/12 text-right">
                  {dayjs(item?.status_at).isSame(dayjs(), 'day')
                    ? dayjs(item?.status_at).locale('id').format('HH:mm')
                    : dayjs(item?.status_at).locale('id').format('DD MMM')}
                </div>
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: item?.keterangan }}
                className="limited-text-2-lines"
              />
              <hr className="border" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
