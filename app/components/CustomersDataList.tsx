"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Minus, Trash2 } from "lucide-react";
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
      <div className="flex flex-row justify-between">
      <Button
        variant="outline"
        onClick={() => router.push("/addcustomer")}
        className="flex  p-2 mb-4 h-10 "
      >
        <Minus className="mr-2 h-4 w-4" />
        Add Record
      </Button>
      <Button
        variant="outline"
        onClick={() => router.push("/addcustomer")}
        className="flex  p-2 mb-4 h-10 "
      >
        <Plus className="mr-2 h-4 w-4" />
        Delete Record
      </Button>
      </div>
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
              <td className="p-4 whitespace-nowrap"> 
              <div className="flex items-center">
                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                    </div>
                    {item.CustomerID}</td>
              <td className="p-4 whitespace-nowrap">{item.CompanyName}</td>
              <td className="p-4 whitespace-nowrap">{item.City}</td>
              <td className="p-4 whitespace-nowrap">{item.Country}</td>
              <td className="p-4 whitespace-nowrap">{item.Phone}</td>
              <td className="p-4 whitespace-nowrap">
              <input id="checkbox-2" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
              <label htmlfor="checkbox-2" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I want to get promotional offers</label>
              </td>
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
