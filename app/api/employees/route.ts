import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET(request: Request) {
const prisma = new PrismaClient
const getEmployees = await prisma.employees.findMany()


    return NextResponse.json(getEmployees)    }