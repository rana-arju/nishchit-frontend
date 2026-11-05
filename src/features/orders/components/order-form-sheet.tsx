"use client";

import { Loader2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { Order, PaymentMethod } from "@/features/orders/schemas/order";
import { ApiError } from "@/lib/api-client";

export type OrderFormItem = { productName: string; quantity: string; price: string };

export type OrderFormValues = {
  customerName: string;
  customerPhone: string;
  address: string;
  paymentMethod: PaymentMethod;
  courier: string;
  isHighRisk: boolean;
  items: OrderFormItem[];
};

function emptyItem(): OrderFormItem {
  return { productName: "", quantity: "1", price: "" };
}

function valuesFromOrder(order: Order | null): OrderFormValues {
  if (!order) {
    return {
      customerName: "",
      customerPhone: "",
      address: "",
      paymentMethod: "cod",
      courier: "",
      isHighRisk: false,
      items: [emptyItem()],
    };
  }
  return {
    customerName: order.customerName,
    customerPhone: order.customerPhone,
    address: order.address,
    paymentMethod: order.paymentMethod,
    courier: order.courier ?? "",
    isHighRisk: order.isHighRisk,
    items: order.items.map((item) => ({
      productName: item.productName,
      quantity: String(item.quantity),
      price: String(item.price),
    })),
  };
}

function isValid(values: OrderFormValues): boolean {
  if (!values.customerName.trim() || !values.customerPhone.trim() || !values.address.trim()) {
    return false;
  }
  return values.items.every(
    (item) =>
      item.productName.trim() &&
      Number(item.quantity) > 0 &&
      Number(item.price) >= 0 &&
      !Number.isNaN(Number(item.quantity)) &&
      !Number.isNaN(Number(item.price)),
  );
}

function OrderFormBody({
  initialOrder,
  onSubmit,
  onCancel,
}: {
  initialOrder: Order | null;
  onSubmit: (values: OrderFormValues) => Promise<void>;
  onCancel: () => void;
}) {
  const [values, setValues] = useState<OrderFormValues>(() => valuesFromOrder(initialOrder));
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSubmit() {
    if (!isValid(values) || saving) return;
    setError(null);
    setSaving(true);
    try {
      await onSubmit(values);
      onCancel();
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : initialOrder
            ? "অর্ডার আপডেট করা যায়নি।"
            : "অর্ডার তৈরি করা যায়নি।",
      );
    } finally {
      setSaving(false);
    }
  }

  function updateItem(index: number, patch: Partial<OrderFormItem>) {
    setValues((current) => ({
      ...current,
      items: current.items.map((item, i) => (i === index ? { ...item, ...patch } : item)),
    }));
  }

  function addItem() {
    setValues((current) => ({ ...current, items: [...current.items, emptyItem()] }));
  }

  function removeItem(index: number) {
    setValues((current) => ({ ...current, items: current.items.filter((_, i) => i !== index) }));
  }

  return (
    <>
      <SheetHeader className="border-b">
        <SheetTitle>{initialOrder ? "অর্ডার এডিট করুন" : "নতুন অর্ডার"}</SheetTitle>
        <SheetDescription className="font-bangla">
          কাস্টমার ও পণ্যের তথ্য দিয়ে ম্যানুয়ালি অর্ডার যোগ করুন।
        </SheetDescription>
      </SheetHeader>

      <div className="scrollbar-hidden flex flex-1 flex-col gap-5 overflow-y-auto p-4">
        <section className="flex flex-col gap-2">
          <p className="text-muted-foreground font-bangla text-xs font-medium">কাস্টমারের নাম</p>
          <Input
            value={values.customerName}
            onChange={(event) =>
              setValues((current) => ({ ...current, customerName: event.target.value }))
            }
            placeholder="যেমন: রাহিম উদ্দিন"
            className="font-bangla"
          />
        </section>

        <section className="flex flex-col gap-2">
          <p className="text-muted-foreground font-bangla text-xs font-medium">ফোন নম্বর</p>
          <Input
            value={values.customerPhone}
            onChange={(event) =>
              setValues((current) => ({ ...current, customerPhone: event.target.value }))
            }
            placeholder="01XXX-XXXXXX"
          />
        </section>

        <section className="flex flex-col gap-2">
          <p className="text-muted-foreground font-bangla text-xs font-medium">ঠিকানা</p>
          <Textarea
            value={values.address}
            onChange={(event) =>
              setValues((current) => ({ ...current, address: event.target.value }))
            }
            placeholder="এলাকা, জেলা"
            className="font-bangla min-h-16"
          />
        </section>

        <section className="flex flex-col gap-2">
          <p className="text-muted-foreground font-bangla text-xs font-medium">পেমেন্ট পদ্ধতি</p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setValues((current) => ({ ...current, paymentMethod: "cod" }))}
              className={`font-bangla flex-1 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                values.paymentMethod === "cod"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground"
              }`}
            >
              ক্যাশ অন ডেলিভারি
            </button>
            <button
              type="button"
              onClick={() => setValues((current) => ({ ...current, paymentMethod: "prepaid" }))}
              className={`font-bangla flex-1 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                values.paymentMethod === "prepaid"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground"
              }`}
            >
              অগ্রিম পরিশোধ
            </button>
          </div>
        </section>

        <section className="flex flex-col gap-2">
          <p className="text-muted-foreground font-bangla text-xs font-medium">কুরিয়ার (ঐচ্ছিক)</p>
          <Input
            value={values.courier}
            onChange={(event) =>
              setValues((current) => ({ ...current, courier: event.target.value }))
            }
            placeholder="যেমন: Pathao, Steadfast"
          />
        </section>

        <section className="flex items-center justify-between gap-2">
          <p className="font-bangla text-sm font-medium">উচ্চ ঝুঁকিপূর্ণ কাস্টমার</p>
          <Switch
            checked={values.isHighRisk}
            onCheckedChange={(checked) =>
              setValues((current) => ({ ...current, isHighRisk: checked }))
            }
          />
        </section>

        <section className="flex flex-col gap-2">
          <p className="text-muted-foreground font-bangla text-xs font-medium">পণ্যসমূহ</p>
          <div className="flex flex-col gap-2">
            {values.items.map((item, index) => (
              <div key={index} className="flex items-start gap-1.5">
                <Input
                  value={item.productName}
                  onChange={(event) => updateItem(index, { productName: event.target.value })}
                  placeholder="পণ্যের নাম"
                  className="font-bangla flex-1"
                />
                <Input
                  value={item.quantity}
                  onChange={(event) => updateItem(index, { quantity: event.target.value })}
                  placeholder="পরিমাণ"
                  inputMode="numeric"
                  className="w-16"
                />
                <Input
                  value={item.price}
                  onChange={(event) => updateItem(index, { price: event.target.value })}
                  placeholder="মূল্য"
                  inputMode="numeric"
                  className="w-20"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  aria-label="পণ্য মুছুন"
                  disabled={values.items.length === 1}
                  onClick={() => removeItem(index)}
                >
                  <Trash2 className="text-destructive size-4" />
                </Button>
              </div>
            ))}
          </div>
          <Button size="sm" variant="outline" className="font-bangla w-fit" onClick={addItem}>
            <Plus className="size-4" />
            পণ্য যোগ করুন
          </Button>
        </section>

        {error && <p className="text-destructive font-bangla text-xs">{error}</p>}
      </div>

      <SheetFooter className="flex-row border-t">
        <Button
          variant="outline"
          className="font-bangla flex-1"
          onClick={onCancel}
          disabled={saving}
        >
          বাতিল
        </Button>
        <Button
          className="font-bangla flex-1"
          disabled={!isValid(values) || saving}
          onClick={handleSubmit}
        >
          {saving ? <Loader2 className="size-4 animate-spin" /> : null}
          {initialOrder ? "আপডেট করুন" : "অর্ডার যোগ করুন"}
        </Button>
      </SheetFooter>
    </>
  );
}

export function OrderFormSheet({
  order,
  open,
  onOpenChange,
  onSubmit,
}: {
  order: Order | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: OrderFormValues) => Promise<void>;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="gap-0 overflow-y-auto">
        {open && (
          <OrderFormBody
            key={order?.id ?? "create"}
            initialOrder={order}
            onSubmit={onSubmit}
            onCancel={() => onOpenChange(false)}
          />
        )}
      </SheetContent>
    </Sheet>
  );
}
