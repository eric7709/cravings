"use client"
import React, { ReactNode, MouseEvent, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useTableSelectionStore } from "@/modules/Tables/store/useTableSelectionStore";
import { useCategorySelectionStore } from "@/modules/Category/store/useCategoriesSelectionStore";

type ModalOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function ModalOverlay({
  isOpen,
  onClose,
  children,
}: ModalOverlayProps) {
  const [isMounted, setIsMounted] = useState(false);
  const { clearActiveTable } = useTableSelectionStore();
  const { clearCategory } = useCategorySelectionStore();

  // Ensure component only renders on client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
      clearActiveTable();
      clearCategory();
    }
  };

  // Don't render portal on server side
  if (!isMounted) {
    return null;
  }

  return ReactDOM.createPortal(
    <div
      onClick={handleBackdropClick}
      className={`fixed inset-0 h-full z-[99999] duration-300 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      } bg-black/50 backdrop-blur-md flex items-center justify-center`}
    >
      {children}
    </div>,
    document.body
  );
}
