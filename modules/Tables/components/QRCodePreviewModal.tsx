"use client";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import Link from "next/link";
import { useTableSelectionStore } from "../store/useTableSelectionStore";
import ModalOverlay from "@/components/ModalOverlay";

export default function QRCodePreviewModal() {
  const { closeModal, activeTable, activeModal, clearActiveTable } = useTableSelectionStore();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  if (!isMounted || !activeTable) return null;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
  const value = `${baseUrl}/menu/${activeTable.url}`;

  return (
    <ModalOverlay
      isOpen={activeModal == "qrcode"}
      onClose={closeModal}
    >
      <div className="p-6 bg-white w-full mx-5 md:w-[400px] rounded-2xl shadow-2xl border text-center">
        <h2 className="text-lg font-semibold mb-4">QR Code Preview</h2>
        <div id="printable" className="bg-white p-4 rounded-lg flex flex-col items-center justify-center">
          <QRCode value={value} size={300} />
          <p className="mt-4 text-xl font-semibold hidden print:block">
            Scan to view our menu
          </p>
        </div>

        <Link href={value} className="text-sm text-gray-700 mt-4 block break-words">
          Menu Page
          <p>{value}</p>
        </Link>

        <button
          onClick={() => window.print()}
          className="mt-4 w-full py-3 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition active:scale-95"
        >
          Print QR Code
        </button>
        <button
          onClick={() => {
            closeModal()
            clearActiveTable()
          }}
          className="mt-3 w-full py-3 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition active:scale-95"
        >
          Close
        </button>
      </div>
    </ModalOverlay>
  );
}
