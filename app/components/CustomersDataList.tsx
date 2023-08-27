"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { Plus } from "lucide-react";

interface props {
  CustomerID: string;
  CompanyName: string;
  ContactName: string;
  ContactTitle: string;
  Address: string;
  City: string;
  Region: string;
  PostalCode: string;
  Country: string;
  Phone: string;
  Fax: string;
}
async function getCustomer() {
  const res = await fetch("api/customers");
  const customers = await res.json();
  return customers;
}

const CustomersDataList = () => {
  const router = useRouter();
  const handleRemoveButton = () => {};
  const { data, isLoading, isFetching, error } = useQuery<props[]>({
    queryKey: ["customer"],
    queryFn: getCustomer,
  });
  if (isLoading)
    return (
      <div className="flex items-center space-x-4">
        <p>Please Wait ... </p>
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );

  return (
    <div>
      <Button
        variant="outline"
        onClick={() => router.push("/addcustomer")}
        className="p-2 mb-4 h-10 "
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Record
      </Button>
      <table className="table-auto w-full">
        <thead className="text-xs font-semibold h-12 uppercase text-blue-500 bg-gray-50">
          <tr className="border shadow  ">
            <th className="p-4 text-left whitespace-nowrap"> CustomerID </th>
            <th className="p-4 text-left whitespace-nowrap"> CompanyName </th>
            <th className="p-4 text-left whitespace-nowrap"> City </th>
            <th className="p-4 text-left whitespace-nowrap"> Country </th>
            <th className="p-4 text-left whitespace-nowrap"> Phone </th>
          </tr>
        </thead>
        <tbody className="text-sm divide-y divide-gray-100">
          {data?.map((item) => (
            <tr className="border hover:bg-slate-100" key={item.CustomerID}>
              <td className="p-4 whitespace-nowrap">{item.CustomerID}</td>
              <td className="p-4 whitespace-nowrap">{item.CompanyName}</td>
              <td className="p-4 whitespace-nowrap">{item.City}</td>
              <td className="p-4 whitespace-nowrap">{item.Country}</td>
              <td className="p-4 whitespace-nowrap">{item.Phone}</td>
              <td>
                <Button variant="destructive" onClick={handleRemoveButton}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomersDataList;
