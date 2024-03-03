import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

export default function ImagesSection() {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<HotelFormData>();

  const existingImageUrls = watch("imageUrls");

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrls: string
  ) => {
    event.preventDefault();
    setValue(
      "imageUrls",
      existingImageUrls.filter((url) => url !== imageUrls)
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="border-2 rounded p-4 flex flex-col gap4 lg:max-w-[80%]">
        {existingImageUrls && (
          <div className="grid grid-cols-6 mb-3 gap-4">
            {existingImageUrls.map((url) => (
              <div className="relative group">
                <img src={url} alt="" className="min-h-full object-cover rounded" />
                <button
                  onClick={(event) => handleDelete(event, url)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
        <input
          type="file"
          multiple
          accept="image/*"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength =
                imageFiles.length + (existingImageUrls?.length || 0);
              if (totalLength === 0) {
                return "At least one image should be added";
              }

              if (totalLength > 6) {
                return "Total number of images cannot be more than 6";
              }
              return true;
            },
          })}
          className="w-full text-gray-700 font-medium"
        />
      </div>
      {errors.imageFiles && (
        <span className="text-red-500 text-sm font-bold">
          {errors.imageFiles.message}
        </span>
      )}
    </div>
  );
}
