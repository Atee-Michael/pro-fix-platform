"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components";

export function DeleteVehicleDialog({
  onCancel,
  onConfirm,
  open,
  vehicleName
}: {
  onCancel: () => void;
  onConfirm: () => void;
  open: boolean;
  vehicleName: string;
}) {
  const t = useTranslations("dashboard.pages.vehicles.delete");
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-lg border border-zinc-200 bg-white p-0 text-zinc-950 shadow-2xl backdrop:bg-black/60 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
      onCancel={onCancel}
      ref={dialogRef}
    >
      <div className="p-6">
        <h2 className="text-xl font-bold">{t("title")}</h2>
        <p className="mt-3 leading-6 text-zinc-600 dark:text-zinc-300">
          {t("description", { vehicle: vehicleName })}
        </p>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button onClick={onCancel} variant="secondary">
            {t("cancel")}
          </Button>
          <Button
            className="bg-red-700 hover:bg-red-600 focus-visible:outline-red-700"
            onClick={onConfirm}
          >
            {t("confirm")}
          </Button>
        </div>
      </div>
    </dialog>
  );
}
