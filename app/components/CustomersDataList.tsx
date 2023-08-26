"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
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

const customersDataList = () => {
  const { data, isLoading, isFetching, error } = useQuery<props[]>({
    queryKey: ["customer"],
    queryFn: getCustomer,
  });
  if (isLoading) return <p>Data is Loading...</p>;
  return (
    <div>
      <table className="table-auto w-full">
        <thead className="text-xs font-semibold h-12 uppercase text-blue-500 bg-gray-50">
          <tr className="border shadow  ">
            <th className="p-4 text-left whitespace-nowrap"> CustomerID </th>
            <th className="p-4 text-left whitespace-nowrap"> CompanyName </th>
            <th className="p-4 text-left whitespace-nowrap"> City </th>
            <th className="p-4 text-left whitespace-nowrap"> Country </th>
            <th className="p-4 text-left whitespace-nowrap"> Phone </th>
            <th className="p-4 text-left whitespace-nowrap"> Region </th>
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
              <td className="p-4 whitespace-nowrap">{item.Region}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default customersDataList;
