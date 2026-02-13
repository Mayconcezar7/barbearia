
import { Barbershop } from "@/generated/prisma/client"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { StarIcon } from "lucide-react"

 interface BabershopItemProps{
  barbershop: Barbershop
}

const BarbershopItem = ({ barbershop }: BabershopItemProps) => {

  return (
    <Card className="min-w-[167px] rounded-2xl">
      <CardContent className="p-2 flex flex-col ">
        <div className="relative h-[159px] w-full">
          <Image fill className="object-cover rounded-2xl" alt={`imagem da barbearia ${barbershop.name}`} src={`${barbershop.imageUrl}`} />
          <Badge className="absolute top-2 left-2 space-x-1 w-fit" variant="secondary" >
            <StarIcon fontSize={12} className="fill-primary text-primary h-[16px]"/>
            <p className="text-sm font-semibold">5,0</p>
          </Badge>
        </div>

        <div className=" ">
          <h3 className="font-semibold truncate">{barbershop.name}</h3>
          <p className="text-sm text-gray-400 truncate">{barbershop.address}</p>
          <Button variant="secondary" className="mt-3 w-full">Resevar</Button>
        </div>
        
      </CardContent>
    </Card>
  )
}

export default BarbershopItem
