import { Search } from "lucide-react"
import { Button } from "../app/_components/ui/button"
import Header from "./_components/header"
import { Input } from "./_components/ui/input"
import Image from "next/image"
import { Card, CardContent } from "./_components/ui/card"
import { Badge } from "./_components/ui/badge"
import { Avatar, AvatarImage } from "./_components/ui/avatar"
import { db } from "./_lib/prisma"
import BarbershopItem from "./_components/babershopItem"

export default async function Home() {
  const barershops = await db.barbershop.findMany({})

  return (
    <>
      <Header />

      <div className="my-6 flex flex-col gap-1 p-5">
        <h2 className="text-xl font-bold">Olá, Maycon</h2>
        <p className="font-normal">Quinta-feira , 12, Fevereiro</p>

        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Buscar" />
          <Button size="icon">
            <Search />
          </Button>
        </div>

        <div className="relative mt-6 h-[150px] w-full">
          <Image
            alt=""
            src="/banner.webp"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        <div>
          <h2 className="mb-3 mt-6 text-xs text-gray-400">AGENDAMENTOS</h2>

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
        </div>

        <div>
          <h2 className="mb-3 mt-6 text-xs text-gray-400">RECOMENDADOS</h2>

          <div className="flex gap-4 overflow-auto [&::-webkit-scrolbar]:hidden">
            {barershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop}/>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
