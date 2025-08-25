"use client";
import { FaTimes } from "react-icons/fa";
import { ChangeEvent } from "react";
import { Image } from "../types/menuItems";

type Props = {
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  clearImage: () => void;
  image: Image;
};
export default function MenuItemImage(props: Props) {
  const { image, handleFileChange, clearImage } = props;
  return (
    <div className="grid place-content-center">
      <div className="space-y-4">
        {!image.url && (
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border-2 h-11 border-blue-300 w-56 pt-3 cursor-pointer pl-4 text-sm font-medium rounded-xl shadow-md"
          />
        )}

        {image.url && (
          <div className="p-2 relative border-2 rounded-lg">
            <div className="absolute inset-0 z-30 grid place-content-center">
              <div className="h-8 w-8 border-2 text-red-500 rounded-full border-red-500 grid place-content-center">
                <FaTimes
                  className="cursor-pointer  text-xl"
                  onClick={clearImage}
                />
              </div>
            </div>
            <img
              src={image.url}
              alt="Preview"
              className="w-64 h-64 relative z-10 object-cover rounded"
            />
          </div>
        )}
      </div>
    </div>
  );
}
