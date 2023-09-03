import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// select  : findMany
// delete
//insert
//update
// Query returns User or null
export async function DELETE(request: Request) {
  const prisma = new PrismaClient();
  const deletedCustomerID = await request.json();
  const deletedCustomer = await prisma.customers.delete({
    where: {
      CustomerID: deletedCustomerID,
    },
  });
  return NextResponse.json({ status: "Done" });

  // console.log(data);
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const search = url.searchParams.get("q") || undefined;
  const newItem = url.searchParams.get("majid") || undefined;
  const prisma = new PrismaClient();
  // console.log(search)
  // console.log(newItem)
  const getCustomers = await prisma.customers.findMany({
    where: {
      CustomerID: {
        contains: search,
      },
    },

    orderBy: {
      id: "desc",
    },
  });
  return NextResponse.json(getCustomers);
}

export async function POST(request: NextRequest) {
  const prisma = new PrismaClient();
  const data = await request.json();
  const newcustomer = await prisma.customers.create({ data: data });
  return NextResponse.json({ status: "Done" });
  console.log(data);
}
