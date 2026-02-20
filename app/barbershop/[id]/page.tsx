
import Title from "@/app/_components/title"
import { Button } from "@/app/_components/ui/button"
import { db } from "@/app/_lib/prisma"
import {
  ChevronLeftIcon,
  MapPin,
  StarIcon,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import React from "react"
import ServiceItem from "@/app/_components/service-item"
import BarberPhone from "@/app/_components/barberPhone"
import SidebarButton from "@/app/_components/sidebar-button"

interface BarbershopProps {
  params: {
    id: string
  }
}




const Barbershop = async ({ params }: BarbershopProps) => {
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include:{
      services: true
    }
  })

  

  if (!barbershop) {
    return notFound()
    }



  return (
    <div>
      <div className="relative h-[250px] w-full">
        <Image
          alt={barbershop.name}
          src={barbershop.imageUrl}
          fill
          className="object-cover"
        />
      </div>

      <div className="absolute top-6 flex w-full justify-between px-5">
        <Button size="icon" variant="secondary" asChild>
          <Link href="/">
            <ChevronLeftIcon />
          </Link>
        </Button>

        <Button size="icon" variant="secondary" >
            <SidebarButton/>
        </Button>
      </div>

      <div className="mt-3 px-5 pb-6">
        <h1 className="text-xl font-bold">{barbershop.name}</h1>

        <div className="mt-3 flex flex-col gap-3">
          <p className="flex items-center">
            <MapPin
              fontSize={16}
              className="h-[16px] font-normal text-primary"
            />
            {barbershop.address}
          </p>

          <p className="flex items-center">
            <StarIcon
              fontSize={16}
              className="h-[16px] fill-primary text-primary"
            />
            5,0 (899 Avaliações)
          </p>
        </div>
      </div>

      <div className="mt-3 border-t border-solid px-5 pb-6">
        <Title title="SOBRE NÓS" />

        <p className=" text-justify text-sm text-gray-300">
          {barbershop.description}
        </p>
      </div>

      <div className="mt-3 border-t border-solid px-5 pb-6">
        <Title title="SERVIÇOS" />

        {barbershop.services.map((service) => (
          <ServiceItem service ={service} key={service.id} />
        ))}
      </div>

      <div className="mt-3 border-t border-solid pb-6 px-5">
        <Title title="CONTATOS" />

        <div className="flex flex-col gap-3">

          {barbershop.phones.map((phone) => (
            <BarberPhone phone={phone}/>
          ))}

        </div>
      </div>

    </div>
  )
}

export default Barbershop
