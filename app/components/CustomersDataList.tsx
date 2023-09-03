"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Divide, Minus, SearchIcon, Trash2 } from "lucide-react";
import { Plus } from "lucide-react";
import Search from "./Search";
import { PrismaClient } from "@prisma/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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

const CustomersDataList = () => {
  const [searchedCustomerID, setsearchedCustomerID] = useState("");
  const router = useRouter();
  const handleRemoveButton = () => {};
  /* const { data, isLoading, isFetching, error } = useQuery<props[]>({
    ["customer"],
    getCustomer,
    {enabled:!!{searchedCustomerID}}
  }); */

  const { data, isLoading, isFetching, isError } = useQuery<props[]>(
    ["customer", searchedCustomerID],
    () => getCustomer(),
    {
      enabled: true, // Only fetch data when inputValue is truthy (not empty)
    }
  );

  async function getCustomer() {
    const res = await fetch(
      "api/customers?q=" + searchedCustomerID + "&majid=50"
    );
    const customers = await res.json();
    return customers;
  }

  const onsubmit = async (data: any) => {
    await fetch("api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  };
  const handleDelete = async (CustomerID: string) => {
    await fetch("api/customers", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(CustomerID),
    });
    // alert(CustomerID);
  };
  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setsearchedCustomerID(e.target.value);
  };
  /* 
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
    ); */

  return (
    <div>
      <div className="flex flex-row justify-between">
        <Button
          variant="outline"
          onClick={() => router.push("/addcustomer")}
          className="flex  p-2 mb-4 h-10 "
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Record
        </Button>
        <div className=" border rounded p-2   h-10 flex flex-row justify-center items-center">
          <input
            type="text"
            placeholder="CustomerID"
            onChange={(e) => handleSearch(e)}
            id="search"
            className="focus:ring-0 focus:border-0 px-2  rounded h-8 "
          ></input>
          <SearchIcon className="px-2 mr-2 h-4 w-4" />
        </div>
        <p>{searchedCustomerID}</p>
        {/* <Search /> */}
        <Button
          variant="outline"
          onClick={() => router.push("/addcustomer")}
          className="flex  p-2 mb-4 h-10 "
        >
          <Minus className="mr-2 h-4 w-4" />
          Delete Record
        </Button>
      </div>
      {isLoading ? (
        <div className="flex items-center space-x-4">
          <p>Please Wait ... </p>
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ) : (
        <table className="table-auto w-full">
          <thead className="text-xs font-semibold h-12 uppercase text-blue-500 bg-gray-50">
            <tr className="border shadow  ">
              <th className="p-4 text-left whitespace-nowrap"> Select </th>
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
                <td>
                  <input
                    id="checkbox-2"
                    type="checkbox"
                    value=""
                    className="ml-4  w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </td>
                <td className="p-4 whitespace-nowrap">
                  {/*  <div className="flex items-center">
          <input
            id="checkbox-table-search-1"
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label htmlFor="checkbox-table-search-1" className="sr-only">
            checkbox
          </label>
        </div> */}
                  {item.CustomerID}
                </td>
                <td className="p-4 whitespace-nowrap">{item.CompanyName}</td>
                <td className="p-4 whitespace-nowrap">{item.City}</td>
                <td className="p-4 whitespace-nowrap">{item.Country}</td>
                <td className="p-4 whitespace-nowrap">{item.Phone}</td>
                <td className="p-4 whitespace-nowrap">
                  {/* <input
          id="checkbox-2"
          type="checkbox"
          value=""
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        /> */}
                </td>
                <td>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        onClick={handleRemoveButton}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Do you want to delete this customer?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={(e) => handleDelete(item.CustomerID)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CustomersDataList;
