
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Avatar, AvatarImage } from "./ui/avatar"
import {  Prisma } from "@/generated/prisma/client"
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"




interface BookingItemProps{
  booking: Prisma.BookingGetPayload<{
    include:{
      service:
      {
        include:{
          barbershop:true
        }
      }
    }
  }>
}



const BookingItem = ({booking}:BookingItemProps) => {

  const isConfirmed = isFuture(booking.date)



  return (
    <Card className="pl-3 min-w-[90%]">
      <CardContent className="flex p-0">
        <div className="flex w-full flex-col justify-between gap-3 py-5">
          <Badge className="w-fit" variant={isConfirmed ? "default": "secondary"}>{isConfirmed ? "Confirmado" : "Finalizado"}</Badge>
          <p className="text-base font-bold"> {booking?.service?.name}</p>
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
          <p className="text-sm">{format(booking.date, "MMMM", {locale: ptBR})}</p>
          <p className="text-2xl">{format(booking.date, "dd", {locale: ptBR})}</p>
          <p className="text-sm">{format(booking.date, "HH:mm", {locale: ptBR})}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default BookingItem
