import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'

export async function GET(request: Request) {
const prisma = new PrismaClient()

// select  : findMany
// delete
//insert
//update
// Query returns User or null
const getTerritories = await prisma.territories.findMany({
    where: {
        RegionID : 1
    },
select :{
    TerritoryDescription : false,
    TerritoryID : true
}
  
  })
return NextResponse.json(getTerritories)
}

