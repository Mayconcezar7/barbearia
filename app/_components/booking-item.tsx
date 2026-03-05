"use client"

import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Prisma } from "@/generated/prisma/client"
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import Image from "next/image"
import BarberPhone from "./barberPhone"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { deleteBooking } from "../_actions/delete-booking"
import { toast } from "sonner"

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true
        }
      }
    }
  }>
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const isConfirmed = isFuture(booking.date)

  async function handlerCancelBooking() {
    try{
      await deleteBooking(booking.id)
      toast.success("Reserva cancelada com sucesso!")
      
    }catch(error){
      console.log(error);
      toast.error("Erro ao cancelar reserva. Tente novamente.")
        
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Card className="min-w-[90%] pl-3">
          <CardContent className="flex p-0">
            <div className="flex w-full flex-col justify-between gap-3 py-5">
              <Badge
                className="w-fit"
                variant={isConfirmed ? "default" : "secondary"}
              >
                {isConfirmed ? "Confirmado" : "Finalizado"}
              </Badge>
              <p className="text-start text-base font-bold">
                {" "}
                {booking?.service?.name}
              </p>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage
                    src={booking?.service?.barbershop?.imageUrl}
                    alt={`${booking?.service?.barbershop?.name}`}
                  />
                </Avatar>
                <p className="text-sm">{booking?.service?.barbershop?.name}</p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center border-l border-solid p-5">
              <p className="text-sm">
                {format(booking.date, "MMMM", { locale: ptBR })}
              </p>
              <p className="text-2xl">
                {format(booking.date, "dd", { locale: ptBR })}
              </p>
              <p className="text-sm">
                {format(booking.date, "HH:mm", { locale: ptBR })}
              </p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>

      <SheetContent className="w-[90%] overflow-y-auto [&::-webkit-scrolbar]:hidden">
        <SheetHeader className="p-4">
          <SheetTitle className="text-left text-lg font-bold">
            Informacões da Reserva
          </SheetTitle>
        </SheetHeader>

        <div className="relative mt-6 flex h-[180px] w-full items-end">
          <Image
            src="/map.webp"
            alt={`Mapa da Barbearia ${booking.service.barbershop.name}`}
            fill
            className="rounded-lg object-cover"
          />

          <Card className="z-50 mx-5 mb-3 w-full">
            <CardContent className="flex items-center gap-3 px-5 py-3">
              <Avatar>
                <AvatarImage src={booking.service.barbershop.imageUrl} />
              </Avatar>

              <div className="flex flex-col">
                <h3 className="text-base font-bold">
                  {booking.service.barbershop.name}
                </h3>
                <p className="text-xs font-light">
                  {booking.service.barbershop.address}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-3 mt-6">
          <Badge
            className="w-fit"
            variant={isConfirmed ? "default" : "secondary"}
          >
            {isConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>
        </div>

        <div className="mb-6">
          <Card className="w-full">
            <CardContent className="flex flex-col gap-3 p-3">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold">{booking.service.name}</h2>
                <p className="text-sm font-bold">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(booking.service.price)}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <h2 className="text-sm font-normal text-gray-400">Data</h2>
                <p className="text-sm font-normal">
                  {format(booking.date, "d 'de' MMMM", {
                    locale: ptBR,
                  })}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-normal text-gray-400">Horário</h2>
                <p className="text-sm font-normal">
                  {format(booking.date, "HH ':'mm")}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-normal text-gray-400">Barbearia</h2>
                <p className="text-sm font-normal">
                  {booking.service.barbershop.name}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-[30%] flex flex-col gap-3">
          {booking.service.barbershop.phones.map((phone, index) => (
            <BarberPhone phone={phone} key={index} />
          ))}
        </div>

        {isConfirmed ? (
          <div className="flex justify-between gap-3">
            <SheetClose asChild>
              <Button variant="secondary" className="w-full">
                Fechar
              </Button>
            </SheetClose>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive" className="w-full">
                  Cancelar Reserva
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[85%] rounded-lg">
                <DialogHeader>
                  <DialogTitle>Cancelar Reserva</DialogTitle>
                </DialogHeader>
                <DialogDescription className="text-center">
                  Tem certeza que deseja cancelar esse agendamento? Essa Ação é
                  Irreversível!
                </DialogDescription>
                <DialogFooter className="flex flex-row gap-3">
                  <DialogClose asChild>
                    <Button variant="secondary" className="w-full">
                      Voltar
                    </Button>
                  </DialogClose>

                  <DialogClose asChild>
                    <Button variant="destructive" className="w-full" onClick={handlerCancelBooking}>
                      Confirmar
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        ) : (
          <div className="flex justify-between gap-3">
            <SheetClose asChild>
              <Button variant="secondary" className="w-full">
                Fechar
              </Button>
            </SheetClose>

            <Button variant="default" className="w-full">
              Avaliar
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

export default BookingItem
