import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

export default function ImagesSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="border-2 rounded p-4 flex flex-col gap4 lg:max-w-[80%]">
        <input
          type="file"
          multiple
          accept="image/*"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength = imageFiles.length;

              if (totalLength === 0) {
                return "At least one image should be added";
              }

              if (totalLength > 6) {
                return "Total number of images cannot be more than 6";
              }
              return true;
            },
          })}
          className="w-full text-gray-700 font-normal"
        />
      </div>
      {errors.imageFiles && (
        <span className="text-red-500 text-sm font-bold">{errors.imageFiles.message}</span>
      )}
    </div>
  );
}
