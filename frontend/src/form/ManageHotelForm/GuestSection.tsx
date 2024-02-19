import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

export default function GuestSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Guests</h2>
      <div className="grid grid-cols-2 p-6 gap-5 bg-gray-300">
        <label htmlFor="" className="text-gray-700 text-sm font-semibold">
          Adults
          <input
            type="number"
            className="border-2 w-full py-2 px-3 font-normal"
            min={1}
            {...register("adultCount", {
              required: "This files is required",
            })}
          />
          {errors.adultCount?.message && (
            <span className="text-red-500 text-sm font-bold">
              {errors.adultCount?.message}
            </span>
          )}
        </label>
        <label htmlFor="" className="text-gray-700 text-sm font-semibold">
          Children
          <input
            type="number"
            className="border-2 w-full py-2 px-3 font-normal"
            min={0}
            {...register("childCount", {
              required: "This files is required",
            })}
          />
          {errors.childCount?.message && (
            <span className="text-red-500 text-sm font-bold">
              {errors.childCount?.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
}