"use client";
import ModalOverlay from "@/components/ModalOverlay";
import { FaTimes, FaTrashAlt } from "react-icons/fa";

type ConfirmDeleteModalProps = {
  isOpen: boolean;
  type?: string;
  name?: string;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
};

export default function ConfirmDeleteModal({
  isOpen,
  type = "item",
  name,
  onClose,
  onConfirm,
  isLoading = false,
}: ConfirmDeleteModalProps) {
  return (
    <ModalOverlay isOpen={isOpen} onClose={onClose}>
      <div className="w-80 relative bg-white rounded-2xl p-6 flex flex-col justify-center items-center text-center">
        {/* Close Button */}
        <FaTimes
          onClick={onClose}
          className="absolute top-4 right-4 text-xl cursor-pointer duration-300 hover:text-red-500 text-gray-600 hover:scale-110"
        />

        {/* Icon */}
        <FaTrashAlt className="text-red-500 mb-5 text-5xl" />

        {/* Title */}
        <p className="text-xl font-bold text-gray-800 mb-2">Confirm Delete</p>

        {/* Description */}
        <div className="text-[15px] text-gray-500 mb-5">
          <p>Are you sure you want to delete this {type}?</p>
          <p className="capitalize text-gray-800 font-bold text-base mt-2 ">{name ? ` ${name}` : ""}</p>
        </div>

        {/* Action Buttons */}
        <div className="grid w-full grid-cols-2 gap-3">
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="py-3.5 cursor-pointer duration-300 text-sm rounded-lg font-medium text-white shadow-md bg-red-500 w-full hover:bg-red-600 active:scale-95 disabled:bg-red-300 disabled:cursor-not-allowed"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="py-3.5 text-sm cursor-pointer duration-300 rounded-lg text-gray-900 font-medium shadow-md w-full hover:bg-gray-100 active:scale-95 disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </ModalOverlay>
  );
}
