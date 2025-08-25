import { useEffect, useState } from "react";

import { useCategoryDataStore } from "@/modules/Category/store/useCategoriesDataStore";
import { toast } from "react-toastify";
import { PromiseVoid } from "@/types/shared";
import { useMenuItemSelectionStore } from "../store/useMenuItemSelectionStore";
import { useMenuItemDataStore } from "../store/useMenuItemsDataStore";
import { useCreateMenuItem } from "./useMenuItemsServices";
import { CreateMenuItem, CreateMenuItemErrors, Image, MenuItemCreationFormField, MenuItemCreationFormSubmission } from "../types/menuItems";
import { menuItemCreationInitialErrors, menuItemCreationInitialValues } from "../constants/menuItemsForm";
import { MenuItemService } from "../services/menuItemServices";

export function useMenuItemCreation() {
  const { setModal, activeModal, closeModal } = useMenuItemSelectionStore();
  const { addMenuItem: addStoreMenuItem } = useMenuItemDataStore();
  const { mutate: createMenuItem, isPending } = useCreateMenuItem();
  const [form, setForm] = useState<CreateMenuItem>(
    menuItemCreationInitialValues
  );
  const { categories } = useCategoryDataStore();
  const options = categories.map((el) => {
    return {
      label: el.name,
      value: el.id,
    };
  });
  options.unshift({ label: "", value: "" });
  const [errors, setErrors] = useState<CreateMenuItemErrors>(
    menuItemCreationInitialErrors
  );
  const [image, setImage] = useState<Image>({ file: null, url: "" });
  const setField = (field: MenuItemCreationFormField, value: string): void => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof CreateMenuItemErrors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };
  const toggleAvailability = () => {
    setForm((prev) => ({ ...prev, isAvailable: !prev.isAvailable }));
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const url = URL.createObjectURL(file);
      setImage({ file, url });
    } else {
      clearImage();
    }
  };

  const clearImage = () => {
    setImage({ file: null, url: "" });
  };
  const resetForm = (): void => {
    setForm(menuItemCreationInitialValues);
    setErrors(menuItemCreationInitialErrors);
    clearImage();
  };

  const handleSubmit = async (
    e: MenuItemCreationFormSubmission
  ): PromiseVoid => {
    e.preventDefault();
    const validate = MenuItemService.validateCreationForm(form);
    if (!validate.isValid) {
      setErrors(validate.errors as CreateMenuItemErrors);
      return;
    }
    try {
      const imageUrl = await MenuItemService.uploadImage(image);
      const menuItemData = {
        ...form,
        imageUrl,
      };
      createMenuItem(menuItemData, {
        onSuccess: (data) => {
          toast.success("Menu item Created successfully");
          addStoreMenuItem(data);
          resetForm();
          closeModal();
        },
        onError: () => {
          toast.error("Failed to create menu item");
        },
      });
    } catch (error) {
      toast.error("An error occurred");
    }
  };
  useEffect(() => {
    if (activeModal == null) resetForm();
  }, [activeModal]);
  return {
    form,
    isOpen: activeModal == "create",
    errors,
    isPending,
    image,
    setField,
    toggleAvailability,
    handleSubmit,
    handleFileChange,
    clearImage,
    resetForm,
    setModal,
    closeModal,
    options,
  } as const;
}
