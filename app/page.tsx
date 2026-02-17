import { Search } from "lucide-react"
import { Button } from "../app/_components/ui/button"
import Header from "./_components/header"
import { Input } from "./_components/ui/input"
import Image from "next/image"
import { Card, CardContent } from "./_components/ui/card"
import { db } from "./_lib/prisma"
import BarbershopItem from "./_components/babershopItem"
import Title from "./_components/title"
import { quickSearchOptions } from "./_components/_constants/searchQuick"
import BookingItem from "./_components/booking-item"
import Footer from "./_components/footer"

export default async function Home() {
  const barershops = await db.barbershop.findMany({})
  const popularBarershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })

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

        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrolbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button
              variant="secondary"
              className="gap-2 px-4"
              key={option.title}
            >
              <Image
                alt={option.title}
                src={option.imageUrl}
                width={24}
                height={24}
              />
              {option.title}
            </Button>
          ))}
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
          <Title title="AGENDAMENTOS" />

          <BookingItem />
        </div>

        <div>
          <Title title="RECOMENDADOS" />

          <div className="flex gap-4 overflow-auto [&::-webkit-scrolbar]:hidden">
            {barershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        </div>

        <div>
          <Title title="BARBEARIAS POPULARES" />

          <div className="flex gap-4 overflow-auto [&::-webkit-scrolbar]:hidden">
            {popularBarershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
