"use client";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "Zod";
import { zodResolver } from "@hookform/resolvers/zod";
import error from "next/error";

const AddCustomerForm = () => {
  const customerSchema = z.object({
    CustomerID: z.string().min(2),
    CompanyName: z.number(),
    City: z.string(),
    Country: z.string(),
    Phone: z.string(),
    Moblie: z.number(),
    Active: z.boolean(),
    Price: z.number(),
  });
  // extracting the type
  type customer = z.infer<typeof customerSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<customer>({
    resolver: zodResolver(customerSchema),
  });
  const onSubmit = (data: any) => console.log(data);
  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <input
        className="border p-2 m-2 rounded-lg "
        placeholder="CustomerID"
        {...register("CustomerID")}
      />
      {errors.CustomerID && (
        <p className="p-2 m-2 text-red-300">Enter CustomerID</p>
      )}
      <input
        className="border p-2 m-2 rounded-lg "
        placeholder="CompanyName"
        {...register("CompanyName")}
      />
      <input
        className="border p-2 m-2 rounded-lg "
        placeholder="City"
        {...register("City")}
      />
      <input
        className="border p-2 m-2 rounded-lg "
        placeholder="Country"
        {...register("Country")}
      />
      <input
        className="border p-2 m-2 rounded-lg "
        placeholder="Phone"
        {...register("Phone")}
      />
      <Button type="submit" variant={"default"}>
        Submit
      </Button>
    </form>
  );
};
export default AddCustomerForm;

/* const [CustomerID, setCustomerID] = useState("");
  const [CompanyName, setCompanyName] = useState("");
  const [City, setCity] = useState("");
  const [Country, setCountry] = useState("");
  const [Phone, setPhone] = useState(""); */

/* <div>
      <form className="w-full max-w-sm">
        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
          Enter CustomerID:
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-full-name"
            type="text"
            value={CustomerID}
            onChange={(e) => setCustomerID(e.target.value)}
          />
        </label>
        <label>
          Enter CompanyName:
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="text"
            value={CompanyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </label>
        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
          Enter City:
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="text"
            value={City}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
          Enter Country:
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="text"
            value={Country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </label>
        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
          Enter Phone:
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="text"
            value={Phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
      </form>
    </div> */
