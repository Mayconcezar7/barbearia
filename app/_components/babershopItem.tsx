import { Barbershop } from "@/generated/prisma/client"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { StarIcon } from "lucide-react"
import Link from "next/link"

interface BabershopItemProps {
  barbershop: Barbershop
}

const BarbershopItem = ({ barbershop }: BabershopItemProps) => {
  return (
    <Card className="min-w-[167px] rounded-2xl">
      <CardContent className="flex flex-col p-2">
        <div className="relative h-[159px] w-full">
          <Image
            fill
            className="rounded-2xl object-cover"
            alt={`imagem da barbearia ${barbershop.name}`}
            src={`${barbershop.imageUrl}`}
          />
          <Badge
            className="absolute left-2 top-2 w-fit space-x-1"
            variant="secondary"
          >
            <StarIcon
              fontSize={12}
              className="h-[16px] fill-primary text-primary"
            />
            <p className="text-sm font-semibold">5,0</p>
          </Badge>
        </div>

        <div className=" ">
          <h3 className="truncate font-semibold">{barbershop.name}</h3>
          <p className="truncate text-sm text-gray-400">{barbershop.address}</p>
          <Button variant="secondary" className="mt-3 w-full" asChild>
            <Link href={`/barbershop/${barbershop.id}`}>Reservar</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default BarbershopItem
