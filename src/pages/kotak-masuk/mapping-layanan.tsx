/* eslint-disable @typescript-eslint/no-explicit-any */
import { enumTicket } from '@/libs/enum/enum-ticket'
import { TiketType } from '@/libs/types/tiket-type'
import clsx from 'clsx'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import { MenubarLayanan } from './menubar-layanan'
import { Dispatch, SetStateAction } from 'react'
import { ModalLayanan } from './modal-layanan'
import { FormTiket } from './form-tiket'
import { UseFormReturn } from 'react-hook-form'

export function MappingLayanan({
  data,
  setIsShow,
  setIsShowEditTiket,
  isShowEditTiket,
  form,
  setId,
  id,
  handleSubmit,
  handleSubmitEdit,
  isLoadingEdit,
  isLoadingUpload,
  setFile,
}: {
  data: TiketType[]
  setIsShow: Dispatch<SetStateAction<boolean>>
  setIsShowEditTiket: Dispatch<SetStateAction<boolean>>
  setId: Dispatch<SetStateAction<string>>
  isShowEditTiket: boolean
  form: UseFormReturn
  id: string
  handleSubmitEdit: (values: any) => Promise<void>
  handleSubmit: (values: any) => Promise<void>
  isLoadingUpload: boolean
  isLoadingEdit: boolean
  setFile: Dispatch<SetStateAction<File | null>>
}) {
  return (
    <div className="scrollbar flex h-full flex-col gap-12 overflow-auto">
      <table className="table-fixed phones:hidden">
        <thead></thead>
        <tbody>
          {data?.map((item, idx) => (
            <tr
              key={idx}
              className="border-b-4 border-transparent hover:cursor-pointer hover:bg-yellow-50"
            >
              <td className="!w-[25%] align-middle">
                <div className="flex w-full items-start gap-24">
                  <MenubarLayanan
                    setIsShow={setIsShow}
                    isDisabled={item?.status !== enumTicket.TICKETBARU}
                    setId={setId}
                    id={item?.id}
                  />
                  <p className="limited-text w-full">{item?.judul}</p>
                </div>
              </td>
              <td className="!w-[60%] align-middle">
                <p className="limited-text w-full">{item?.keterangan}</p>
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
                        ? 'On Progress'
                        : item?.status === enumTicket.TICKETSELESAI
                          ? 'Selesai'
                          : 'On Progress'}
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
              {id === item?.id && (
                <ModalLayanan
                  isOpen={isShowEditTiket}
                  setIsOpen={setIsShowEditTiket}
                  title="Form Edit Tiket"
                  children={
                    <div className="flex w-full flex-col gap-32 text-[2rem]">
                      <FormTiket
                        isEdit
                        data={item}
                        setIsShowTiket={setIsShowEditTiket}
                        form={form}
                        setIsShowEditTiket={setIsShowEditTiket}
                        handleSubmit={handleSubmit}
                        handleSubmitEdit={handleSubmitEdit}
                        isLoadingEdit={isLoadingEdit}
                        isLoadingUpload={isLoadingUpload}
                        setFile={setFile}
                      />
                    </div>
                  }
                />
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="hidden phones:block">
        <div className="flex flex-col gap-24">
          {data?.map((item, idx) => (
            <div className="flex w-full flex-col gap-12" key={idx}>
              <div className="itemsc-center flex w-full gap-32">
                <div className="w-1/12">
                  <MenubarLayanan
                    setIsShow={setIsShow}
                    isDisabled={item?.status !== enumTicket.TICKETBARU}
                    setId={setId}
                    id={item?.id}
                  />
                </div>
                <div className="w-9/12 truncate font-bold">{item?.judul}</div>
                <div className="w-2/12 text-right">
                  {dayjs(item?.status_at).isSame(dayjs(), 'day')
                    ? dayjs(item?.status_at).locale('id').format('HH:mm')
                    : dayjs(item?.status_at).locale('id').format('DD MMM')}
                </div>
              </div>
              <div className="limited-text-2-lines">{item?.keterangan}</div>
              <hr className="border" />
            </div>
          ))}
        </div>
      </div>
      {/* {data?.map((item, idx) => (
        <div
          className="flex w-full items-center gap-32 hover:cursor-pointer hover:bg-yellow-50"
          key={idx}
        >
          <div className="flex w-10/12 items-center gap-32">
            <div className="flex w-3/12 items-start gap-24 truncate">
              <MenubarLayanan
                setIsShow={setIsShow}
                isDisabled={item?.status !== enumTicket.TICKETBARU}
                setId={setId}
                id={item?.id}
              />
              <p>{item?.judul}</p>
            </div>
            <p className="w-8/12 truncate">{item?.keterangan}</p>
          </div>

          <div className="flex w-2/12 items-center gap-32">
            <div className="flex w-full items-center gap-32 bg-blue-300">
              <div className="flex w-2/3 items-center justify-end bg-red-300">
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
                      ? 'On Progress'
                      : item?.status === enumTicket.TICKETSELESAI
                        ? 'Selesai'
                        : 'On Progress'}
                </p>
              </div>
              <p className="w=1/3 text-nowrap text-right">
                {dayjs(item?.status_at).isSame(dayjs(), 'day')
                  ? dayjs(item?.status_at).locale('id').format('HH:mm')
                  : dayjs(item?.status_at).locale('id').format('DD MMM')}
              </p>
            </div>
          </div>

          {id === item?.id && (
            <ModalLayanan
              isOpen={isShowEditTiket}
              setIsOpen={setIsShowEditTiket}
              title="Form Edit Tiket"
              children={
                <div className="flex w-full flex-col gap-32 text-[2rem]">
                  <FormTiket
                    isEdit
                    data={item}
                    setIsShowTiket={setIsShowEditTiket}
                    form={form}
                    setIsShowEditTiket={setIsShowEditTiket}
                    handleSubmit={handleSubmit}
                    handleSubmitEdit={handleSubmitEdit}
                    isLoadingEdit={isLoadingEdit}
                    isLoadingUpload={isLoadingUpload}
                    setFile={setFile}
                  />
                </div>
              }
            />
          )}
        </div>
      ))} */}
    </div>
  )
}
