"use client";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "Zod";
import { zodResolver } from "@hookform/resolvers/zod";
import error from "next/error";

const AddCustomerForm = () => {
  const customerSchema = z
    .object({
      CustomerID: z.string().min(2),
      CompanyName: z.string(),
      City: z.string(),
      Country: z.string(),
      Phone: z.string().min(12),
      Moblie: z.number().min(15),
      Active: z.boolean(),
      Price: z.number(),
      email: z.string().email(),
      password: z.string().min(10).max(15),
      confirmPassword: z.string().min(10).max(15),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password do no match",
      path: ["confirmPassword"],
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
  const onSubmit = (data: any) => {
    console.log(data);
    fetch("api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((response) => response.json());
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <form
            className="flex flex-col max-w-md mx-auto"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <h1 className="flex flex-col items-center m-4  text-2xl font-semibold">
                Add New customer
              </h1>
            </div>
            <input
              className="block m-2 w-full px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none "
              placeholder="CustomerID"
              {...register("CustomerID")}
            />
            {errors.CustomerID && (
              <p className="block m-2 w-full px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none">
                Enter CustomerID
              </p>
            )}
            <input
              className="block m-2 w-full px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none "
              placeholder="CompanyName"
              {...register("CompanyName")}
            />
            <input
              className="block m-2 w-full px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none "
              placeholder="City"
              {...register("City")}
            />
            <input
              className="block m-2 w-full px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none "
              placeholder="Country"
              {...register("Country")}
            />
            <input
              className="block m-2 w-full px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none "
              placeholder="Phone"
              {...register("Phone")}
            />
            <Button className=" m-2 rounded-lg bg-blue-300 text-blue-900 focus:ring focus:outline-none w-full text-l font-semibold transition-colors ">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
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
