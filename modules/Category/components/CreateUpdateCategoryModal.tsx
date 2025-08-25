"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Input } from "@/components/Input";
import ModalOverlay from "@/components/ModalOverlay";
import { useCategorySelectionStore } from "../store/useCategoriesSelectionStore";
import { useCategoryDataStore } from "../store/useCategoriesDataStore";
import {
  useCreateCategory,
  useUpdateCategory,
} from "../hooks/useCategoryServices";
import { useMenuItemDataStore } from "@/modules/MenuItems/store/useMenuItemsDataStore";
import { useGetAllMenuItems } from "@/modules/MenuItems/hooks/useMenuItemsServices";

export default function CreateUpdateCategoryModal() {
  const { activeModal, closeModal, selectedCategory } =
    useCategorySelectionStore();

  const { addCategory, updateCategory: updateCategoryRedux } =
    useCategoryDataStore();

  const { setMenuItems } = useMenuItemDataStore();
  const { data: menuItems, refetch } = useGetAllMenuItems();

  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const { mutate: createCategory, isPending: isPendingCreate } =
    useCreateCategory();
  const { mutate: updateCategory, isPending: isPendingUpdate } =
    useUpdateCategory();

  const loading = isPendingCreate || isPendingUpdate;
  const isCreateMode = activeModal === "create";
  const isUpdateMode = activeModal === "update";

  useEffect(() => {
    if (menuItems) {
      setMenuItems(menuItems);
    }
  }, [menuItems, setMenuItems]);

  useEffect(() => {
    if (isUpdateMode && selectedCategory) {
      setValue(selectedCategory.name);
    } else if (isCreateMode) {
      setValue("");
    }
  }, [isCreateMode, isUpdateMode, selectedCategory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!value.trim()) {
      setError("Please fill in the field");
      return;
    }

    if (isCreateMode) {
      createCategory(value, {
        onSuccess: async (data) => {
          addCategory(data);
          toast.success("Category created successfully");
          await refetch();
          handleClose();
        },
        onError: (err) => toast.error(err.message),
      });
    }

    if (isUpdateMode && selectedCategory) {
      updateCategory(
        { id: selectedCategory.id, name: value },
        {
          onSuccess: async (data) => {
            updateCategoryRedux(selectedCategory.id, data);
            toast.success("Category updated successfully");
            await refetch(); // refresh menuItems after updating
            handleClose();
          },
          onError: (err) => toast.error(err.message),
        }
      );
    }
  };

  const handleClose = () => {
    closeModal();
    setValue("");
    setError("");
  };

  useEffect(() => {
    setError("");
  }, [value]);

  const titleText =
    activeModal == null
      ? ""
      : isCreateMode
      ? "Add Menu Item Category"
      : "Update Menu Item Category";

  const buttonText =
    activeModal == null
      ? ""
      : loading
      ? isCreateMode
        ? "Creating..."
        : "Updating..."
      : isCreateMode
      ? "Create"
      : "Update";

  return (
    <ModalOverlay isOpen={isCreateMode || isUpdateMode} onClose={handleClose}>
      <form
        onSubmit={handleSubmit}
        className="w-[370px] space-y-4 p-6 bg-white shadow rounded-md"
      >
        <h2 className="text-lg font-semibold">{titleText}</h2>

        <Input
          label="Category Name"
          placeholder="Enter category name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          error={error}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {buttonText}
        </button>
      </form>
    </ModalOverlay>
  );
}
