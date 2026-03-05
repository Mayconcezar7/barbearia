import { Button } from "../app/_components/ui/button"
import Header from "./_components/header"
import Image from "next/image"
import { db } from "./_lib/prisma"
import BarbershopItem from "./_components/barbershopItem"
import Title from "./_components/title"
import { quickSearchOptions } from "./_components/_constants/searchQuick"
import BookingItem from "./_components/booking-item"
import Search from "./_components/search"
import Link from "next/link"
import UserWelcomeCard from "./_components/userWelcomeCard"
import { auth } from "./_lib/auth"
import { headers } from "next/headers"


export default async function Home() {
  const session = await auth.api.getSession({
    headers: headers(),
  })

  const barbershops = await db.barbershop.findMany({})
  const popularBarershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })

  const confirmedBookings = await db.booking.findMany({
    where: {
      userId: session?.user.id,
      date: {
        gte: new Date(),
      },
    },
    orderBy: {
      date: "asc",
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
  })

  return (
    <>
      <Header />

      <div className="my-6 flex flex-col gap-1 p-5">
        <UserWelcomeCard />

        <div className="mt-6">
          <Search />
        </div>

        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrolbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button
              className="flex items-center text-sm font-normal "
              variant="secondary"
              key={option.title}
              asChild
            >
              <Link href={`/barbershop?service=${option.title}`} >
                <Image
                  alt={option.title}
                  src={option.imageUrl}
                  width={18}
                  height={18}
                />
                {option.title}
              </Link>
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

        {session?.user && (
          <div>
            {confirmedBookings.length > 0 && <Title title="AGENDAMENTOS" />}
            <div className="flex  gap-4 overflow-x-auto [&::-webkit-scrolbar]:hidden">
              {confirmedBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          </div>
        )}

        <div>
          <Title title="RECOMENDADOS" />

          <div className="flex gap-4 overflow-auto [&::-webkit-scrolbar]:hidden">
            {barbershops.map((barbershop) => (
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
    </>
  )
}
