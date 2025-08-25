import { useEffect, useState } from "react";
import {
  UpdateMenuItem,
  Image,
  UpdateMenuItemErrors,
  MenuItemUpdateFormField,
  MenuItemUpdateFormSubmission,
} from "../types/menuItems";
import { useUpdateMenuItem } from "./useMenuItemsServices";
import { toast } from "react-toastify";
import { useMenuItemSelectionStore } from "../store/useMenuItemSelectionStore";
import { useMenuItemDataStore } from "../store/useMenuItemsDataStore";
import { MenuItemService } from "../services/menuItemServices";
import {
  menuItemUpdateInitialValues,
  menuItemUpdateInitialErrors,
} from "../constants/menuItemsForm";
import { useCategoryDataStore } from "@/modules/Category/store/useCategoriesDataStore";
import { PromiseVoid } from "@/types/shared";

export function useMenuItemsUpdate() {
  const { setModal, activeModal, closeModal, selectedMenuItem } =
    useMenuItemSelectionStore();
  const { updateMenuItem: updateStoreMenuItem } = useMenuItemDataStore();
  const { mutate: updateMenuItem, isPending } = useUpdateMenuItem();
  const [form, setForm] = useState<UpdateMenuItem>(menuItemUpdateInitialValues);
  const [errors, setErrors] = useState<UpdateMenuItemErrors>(
    menuItemUpdateInitialErrors
  );
  const [image, setImage] = useState<Image>({ file: null, url: "" });
  const setField = (field: MenuItemUpdateFormField, value: string): void => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof UpdateMenuItemErrors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };
   const { categories } = useCategoryDataStore();
    const options = categories.map((el) => {
      return {
        label: el.name,
        value: el.id,
      };
    });
    options.unshift({ label: "", value: "" });
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

  useEffect(() => {
    if (selectedMenuItem) {
      setForm({
        categoryId: selectedMenuItem.categoryId,
        description: selectedMenuItem.description,
        id: selectedMenuItem.id,
        isAvailable: selectedMenuItem.isAvailable,
        name: selectedMenuItem.name,
        price: `${selectedMenuItem.price}`,
        imageUrl: selectedMenuItem.imageUrl || "",
      });
    }
  }, [selectedMenuItem]);

  const clearImage = () => {
    setImage({ file: null, url: "" });
  };
  const resetForm = (): void => {
    setForm(menuItemUpdateInitialValues);
    setErrors(menuItemUpdateInitialErrors);
    clearImage();
  };

  const handleSubmit = async (e: MenuItemUpdateFormSubmission): PromiseVoid => {
    e.preventDefault();
    const validate = MenuItemService.validateUpdateForm(form);
    if (!validate.isValid) {
      return;
    }
    try {
      const imageUrl = await MenuItemService.uploadImage(image);
      const menuItemData = {
        ...form,
        imageUrl,
      };

      if (!selectedMenuItem || !selectedMenuItem.id) {
        toast.error("Please Select an Item ");
        return;
      }
      updateMenuItem(
        { id: selectedMenuItem.id, updates: menuItemData },
        {
          onSuccess: (data) => {
            toast.success("Menu item Updated successfully");
            updateStoreMenuItem(data.id, data);
            resetForm();
            closeModal();
          },
          onError: () => {
            toast.error("Failed to update menu item");
          },
        }
      );
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  useEffect(() => {
    if (activeModal == null) resetForm();
  }, [activeModal]);

  return {
    form,
    isOpen: activeModal == "update",
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
    options
  } as const;
}
