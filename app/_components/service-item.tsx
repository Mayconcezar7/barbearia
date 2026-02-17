import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import Link from "next/link"
import { BarbershopService } from "@prisma/client"


interface ServiceItemProps {
  service: BarbershopService
}

const ServiceItem = ({ service }:ServiceItemProps) => {

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
            <p className="text-primary text-sm">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(service.price))}
            </p>
            <Button variant="secondary" size="sm" asChild>
              <Link href="">Reservar</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ServiceItem
