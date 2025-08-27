"use client";

import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import ModalOverlay from "@/components/ModalOverlay";
import { useCustomerDetails } from "../store/useCustomerDetails";
import { TITLES } from "@/modules/Customers/constants/title";

export default function CreateCustomerModal() {
  const {
    isOpen,
    customer,
    errors,
    setField,
    closeModal,
    handleSubmit,
    isPending,
  } = useCustomerDetails();

  return (
    <ModalOverlay isOpen={isOpen} onClose={closeModal}>
      <div className="px-3 lg:px-0 w-full lg:w-80">
        <form
          onSubmit={handleSubmit}
          className="w-full space-y-3 p-5 bg-gray-50 shadow-xl rounded-xl border border-gray-200"
        >
          <div className="text-center pb-3 bg-gradient-to-r from-blue-50 to-blue-100 -mx-5 -mt-5 px-5 pt-4 rounded-t-xl">
            <h2 className="text-lg font-semibold text-blue-700">
              New Customer Profile
            </h2>
            <p className="text-xs text-blue-600 mt-1">
              We only collect this information to help you track and manage your
              customer relationships better
            </p>
          </div>
          {/* Title */}
          <Select
            label="Title"
            value={customer.title}
            onChange={(e) => setField("title", e.target.value)}
            error={errors.title}
            className="text-base placeholder:text-sm border-gray-300 focus:ring focus:ring-blue-200 focus:border-blue-400 rounded-md"
          >
            <option value="">Select title</option>
            {TITLES.map((title, key) => (
              <option value={title} key={key}>
                {title}
              </option>
            ))}
          </Select>
          {/* Name */}
          <Input
            label="Name"
            value={customer.name}
            onChange={(e) => setField("name", e.target.value)}
            placeholder="Enter full name"
            error={errors.name}
            inputClassName="text-base placeholder:text-sm border-gray-300 focus:ring focus:ring-blue-200 focus:border-blue-400 rounded-md"
            labelClassName="text-sm font-medium text-gray-700"
          />
          {/* Email */}
          <Input
            label="Email"
            type="email"
            value={customer.email}
            onChange={(e) => setField("email", e.target.value)}
            placeholder="Enter email"
            error={errors.email}
            inputClassName="text-base placeholder:text-sm border-gray-300 focus:ring focus:ring-blue-200 focus:border-blue-400 rounded-md"
            labelClassName="text-sm font-medium text-gray-700"
          />

          {/* Phone */}
          <Input
            label="Phone (optional)"
            type="tel"
            value={customer.phoneNumber}
            onChange={(e) => setField("phoneNumber", e.target.value)}
            placeholder="Enter phone"
            error={errors.phoneNumber}
            inputClassName="text-base placeholder:text-sm border-gray-300 focus:ring focus:ring-blue-200 focus:border-blue-400 rounded-md"
            labelClassName="text-sm font-medium text-gray-700"
          />
          {/* Actions */}
          <div className="flex gap-2 pt-3">
            <button
              type="button"
              onClick={closeModal}
              disabled={isPending}
              className="flex-1 py-2 px-3 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors text-sm font-medium border border-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 py-2 px-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm disabled:opacity-50"
            >
              {isPending ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </ModalOverlay>
  );
}
