import { PrismaClient } from "@prisma/client";
import React, { useState } from "react";
import { SearchIcon } from "lucide-react";

const Search = () => {
  const [searchedCustomerID, setsearchedCustomerID] = useState("");
  const [searchedCompanyName, setsearchedCompanyName] = useState("");

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setsearchedCustomerID(e.target.value);

    // setsearchedCompanyName(e.target.value);
    /* const prisma = new PrismaClient();
    const searchedCustomer = await prisma.customers.findMany({
      where: {
        CustomerID: {
          contains: searchedCustomerID,
        },

        CompanyName: {
          contains: searchedCompanyName,
        },
      },
    }); */
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        placeholder="CustomerID"
        onChange={(e) => handleSearch}
        id="search"
        className=" border rounded h-10 "
      >
        <SearchIcon className="mr-2 h-4 w-4" />
      </input>

      <input
        type="text"
        placeholder=" CompanyName"
        onChange={(e) => handleSearch}
        id="search"
        className=" border rounded h-10 "
      >
        <SearchIcon className="mr-2 h-4 w-4" />
      </input>
    </div>
  );
};

export default Search;
