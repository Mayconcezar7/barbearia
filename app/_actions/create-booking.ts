"use server"

import { revalidatePath } from "next/cache"
import { db } from "../_lib/prisma"
import { auth } from "../_lib/auth"
import { headers } from "next/headers"


interface CreateBookingParams{
    userId: string,
    serviceId: string,
    date: Date
}




export const createBooking = async (params:CreateBookingParams)=>{
    const session = await auth.api.getSession({
        headers :headers()
    })
    if (!session?.user) {
        return Error("usuario nao autenticado")
    }
    await db.booking.create({
        data: {...params,
            userId: session?.user.id
        }
    })

    revalidatePath("/bookings")
    revalidatePath("/")

}