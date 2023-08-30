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

export async function POST(request: NextRequest) {
    // const data= await request.json()
console.log(request)
}

    
