import React from "react"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Avatar, AvatarImage } from "./ui/avatar"


// TODO: PRECISO RECEBER DADOS POR PROPS 
const BookingItem = () => {
  return (
    <Card className="pl-3">
      <CardContent className="flex p-0">
        <div className="flex w-full flex-col justify-between gap-3 py-5">
          <Badge className="w-fit">Confirmado</Badge>
          <p className="text-2xl font-bold"> Corte de Cabelo</p>
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage
                src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png"
                alt="perfil da barbearia"
              />
            </Avatar>
            <p className="text-sm">Vintage Barber</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center border-l border-solid p-5">
          <p className="text-sm">Fevereiro</p>
          <p className="text-2xl">12</p>
          <p className="text-sm">10:30</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default BookingItem
