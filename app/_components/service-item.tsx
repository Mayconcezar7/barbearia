"use client"
import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet"
import { Calendar } from "./ui/calendar"
import { timehours } from "./_constants/timehours"
import { ptBR } from "date-fns/locale"
import { useEffect, useMemo, useState } from "react"
import { authClient } from "../_lib/auth-client"
import { addDays, format, isPast, isToday, set } from "date-fns"
import { Barbershop, Booking } from "@/generated/prisma/client"
import { createBooking } from "../_actions/create-booking"
import { toast } from "sonner"
import { getBooking } from "../_actions/get-booking"

interface Service {
  id: string
  name: string
  description: string
  imageUrl: string
  price: number
  barbershopId: string
}
interface ServiceItemProps {
  service: Service
  babershop: Pick<Barbershop, "name">
}

interface GetTimeListProps {
  bookings: Booking[]
  selectedDay: Date
}

const getTimeList = ({ bookings, selectedDay }: GetTimeListProps) => {
  return timehours.filter((time) => {
    const hour = Number(time.split(":")[0])
    const minutes = Number(time.split(":")[1])

    const timeIsThePast = isPast(set(new Date(), { hours: hour, minutes }))

    if (timeIsThePast && isToday(selectedDay)) {
      return false
    }

    const hasBookingOnCurrentTime = bookings.some(
      (booking) =>
        booking.date.getHours() === hour &&
        booking.date.getMinutes() === minutes,
    )

    if (hasBookingOnCurrentTime) {
      return false
    }
    return true
  })
}

const ServiceItem = ({ service, babershop }: ServiceItemProps) => {
  const { data: session, isPending } = authClient.useSession()

  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const [selectedDTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  )

  const [dayBookings, setDayBookings] = useState<Booking[]>([])

  const [bookingSheetIsOpen, setBookingSheetIsOpen] = useState(false)

  function handlerBookingSheetIsOpen() {
    setDayBookings([])
    setSelectedDay(undefined)
    setSelectedTime(undefined)
    setBookingSheetIsOpen(false)
  }

  function handlerDateSelected(date: Date | undefined) {
    setSelectedDay(date)
  }

  function handlerTimeSeleted(time: string | undefined) {
    setSelectedTime(time)
  }

  useEffect(() => {
    const fetch = async () => {
      if (!selectedDay) return

      const bookings = await getBooking({
        date: selectedDay,
        serviceId: service.id,
      })
      setDayBookings(bookings)
    }

    fetch()
  }, [selectedDay, service.id])

  async function handlerCreateBooking() {
    try {
      if (!session || !selectedDTime || !selectedDay) {
        return
      }
      const hour = Number(selectedDTime.split(":")[0])
      const minute = Number(selectedDTime.split(":")[1])
      const newDate = set(selectedDay, {
        minutes: minute,
        hours: hour,
      })
      await createBooking({
        serviceId: service.id,
        userId: session?.user.id,
        date: newDate,
      })
    } catch (error) {
      console.log(error)
      toast.error("Algo não deu errado")
    }

    toast.success("Reserva concluida com sucesso")
  }

  const timeList = useMemo(()=>{
    if (!selectedDay) {
      return []
    }
    return getTimeList({ bookings: dayBookings, selectedDay })
  },[dayBookings, selectedDay])

  return (
    <Card className="mb-3">
      <CardContent className="flex gap-2 p-3">
        <div className="relative h-[110px] w-[150px]">
          <Image
            alt={service.name}
            src={service.imageUrl}
            fill
            className="rounded-lg object-cover"
          />
        </div>

        <div className="flex h-full flex-col gap-2">
          <p className="text-sm font-medium">{service.name}</p>
          <p className="text-sm text-gray-500">{service.description}</p>
          <div className="flex items-center justify-between">
            <p className="text-sm text-primary">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(service.price)}
            </p>

            <Sheet
              open={bookingSheetIsOpen}
              onOpenChange={handlerBookingSheetIsOpen}
            >
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setBookingSheetIsOpen(true)}
              >
                Reservar
              </Button>

              <SheetContent className="overflow-y-auto p-0 [&::-webkit-scrolbar]:hidden">
                <SheetHeader className="border-solid-1 border-b py-8 pl-5 text-start text-lg font-bold">
                  <SheetTitle>Fazer Reserva</SheetTitle>
                </SheetHeader>
                <div className="border-solid-1 flex items-center justify-center border-b py-5">
                  <Calendar
                    mode="single"
                    locale={ptBR}
                    disabled={[
                      { before: addDays(new Date(), 0) },
                      { dayOfWeek: [1] },
                    ]}
                    selected={selectedDay}
                    onSelect={handlerDateSelected}
                  />
                </div>

                {selectedDay && (
                  <div className="border-solid-1 flex gap-4 overflow-x-auto border-b px-4 py-5 [&::-webkit-scrolbar]:hidden">

                    {timeList.length > 0 ? timeList.map(
                      (time) => (
                        <Button
                          variant={
                            selectedDTime === time ? "default" : "outline"
                          }
                          key={time}
                          onClick={() => handlerTimeSeleted(time)}
                        >
                          {time}
                        </Button>
                      ),
                    ): <p className="text-xs text-center">Não há horários disponíveis nesta para este dia.</p>}
                  </div>
                )}

                {selectedDTime && selectedDay && (
                  <div className="border-solid-1 flex items-center justify-center border-b py-5">
                    <Card className="w-[90%]">
                      <CardContent className="flex flex-col gap-3 p-3">
                        <div className="flex items-center justify-between">
                          <h2 className="text-base font-bold">
                            {service.name}
                          </h2>
                          <p className="text-sm font-bold">
                            {new Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(service.price)}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <h2 className="text-sm font-normal text-gray-400">
                            Data
                          </h2>
                          <p className="text-sm font-normal">
                            {format(selectedDay, "d 'de' MMMM", {
                              locale: ptBR,
                            })}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <h2 className="text-sm font-normal text-gray-400">
                            Horário
                          </h2>
                          <p className="text-sm font-normal">{selectedDTime}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <h2 className="text-sm font-normal text-gray-400">
                            Barbearia
                          </h2>
                          <p className="text-sm font-normal">
                            {babershop.name}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {selectedDTime && selectedDay && (
                  <div className="flex w-full items-center justify-center p-5">
                    <SheetFooter className="w-full">
                      <SheetClose asChild>
                        <Button
                          className="w-full"
                          variant={!session ? "outline" : "default"}
                          disabled={!session}
                          onClick={handlerCreateBooking}
                        >
                          {isPending
                            ? "carregando..."
                            : session
                              ? "Confirmar"
                              : "Faça o login"}
                        </Button>
                      </SheetClose>
                    </SheetFooter>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ServiceItem
