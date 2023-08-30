import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'

export async function GET(request: Request) {
    
const prisma = new PrismaClient()

// select  : findMany
// delete
//insert
//update
// Query returns User or null
const getCustomers = await prisma.customers.findMany()
return NextResponse.json(getCustomers)
}


    const data= await request.json()
}