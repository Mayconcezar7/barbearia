import React from "react"
import Header from "../_components/header"
import Title from "../_components/title"
import BookingItem from "../_components/booking-item"
import { db } from "../_lib/prisma"

import { auth } from "../_lib/auth"
import { headers } from "next/headers"
import { notFound } from "next/navigation"

const Bookings = async () => {
  const session = await auth.api.getSession({
    headers: headers(),
  })

  if (!session?.user) {
    return notFound()
  }

  const confirmedBooking = await db.booking.findMany({
    where: {
      userId: session.user.id,
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

  const concludedBooking = await db.booking.findMany({
    where: {
      userId: session.user.id,
      date: {
        lte: new Date(),
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

      <div className="px-5 py-6">
        <h2 className="text-xl font-bold">Agendamentos</h2>

        {confirmedBooking.length >= 0 && (
          <>
            <Title title="CONFIRMADOS" />
            <div className="flex flex-col gap-3">
              {confirmedBooking.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          </>
        )}

        <Title title="FINALIZADOS" />
        <div className="flex flex-col gap-3">
          {concludedBooking.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
        </div>
      </div>
    </>
  )
}

export default Bookings
