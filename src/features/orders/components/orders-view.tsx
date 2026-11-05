"use client";

import { ClipboardList, Plus, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/features/dashboard/components/empty-state";
import {
  addOrderNote,
  createOrder,
  deleteOrder,
  fetchOrders,
  updateOrder,
  updateOrderStatus,
  updateOrderTags,
} from "@/features/orders/api/orders";
import { OrderDetailSheet } from "@/features/orders/components/order-detail-sheet";
import {
  type OrderFormValues,
  OrderFormSheet,
} from "@/features/orders/components/order-form-sheet";
import { OrderRow } from "@/features/orders/components/order-row";
import { ORDER_STATUSES, orderStatusLabel } from "@/features/orders/components/order-status-badge";
import { OrderTableHeader } from "@/features/orders/components/order-table-header";
import { OrdersSummary } from "@/features/orders/components/orders-summary";
import type { Order, OrderStatus } from "@/features/orders/schemas/order";
import { ApiError } from "@/lib/api-client";
import { cn } from "cn";

type State = { phase: "loading" } | { phase: "error" } | { phase: "ready"; data: Order[] };

export function OrdersView() {
  const [state, setState] = useState<State>({ phase: "loading" });
  const [activeStatus, setActiveStatus] = useState<"all" | OrderStatus>("all");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchOrders()
      .then((data) => {
        if (!cancelled) setState({ phase: "ready", data });
      })
      .catch(() => {
        if (!cancelled) setState({ phase: "error" });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const orders = state.phase === "ready" ? state.data : [];

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const source = state.phase === "ready" ? state.data : [];
    return source.filter((order) => {
      const matchesStatus = activeStatus === "all" || order.status === activeStatus;
      const matchesQuery =
        !normalized ||
        order.customerName.toLowerCase().includes(normalized) ||
        order.orderNumber.toLowerCase().includes(normalized);
      return matchesStatus && matchesQuery;
    });
  }, [state, activeStatus, query]);

  const selectedOrder = orders.find((order) => order.id === selectedId) ?? null;
  const editingOrder = orders.find((order) => order.id === editingOrderId) ?? null;

  function putOrder(updated: Order) {
    setState((current) =>
      current.phase === "ready"
        ? {
            ...current,
            data: current.data.map((order) => (order.id === updated.id ? updated : order)),
          }
        : current,
    );
  }

  function openCreateForm() {
    setEditingOrderId(null);
    setFormOpen(true);
  }

  function openEditForm(id: string) {
    setEditingOrderId(id);
    setFormOpen(true);
  }

  async function handleFormSubmit(values: OrderFormValues) {
    const items = values.items.map((item) => ({
      productName: item.productName.trim(),
      quantity: Number(item.quantity),
      price: Number(item.price),
    }));
    const courier = values.courier.trim() || null;

    if (editingOrderId) {
      const current = orders.find((order) => order.id === editingOrderId);
      const updated = await updateOrder(editingOrderId, {
        customerName: values.customerName.trim(),
        customerPhone: values.customerPhone.trim(),
        address: values.address.trim(),
        channel: current?.channel ?? "manual",
        paymentMethod: values.paymentMethod,
        courier,
        isHighRisk: values.isHighRisk,
        items,
      });
      putOrder(updated);
    } else {
      const created = await createOrder({
        customerName: values.customerName.trim(),
        customerPhone: values.customerPhone.trim(),
        address: values.address.trim(),
        paymentMethod: values.paymentMethod,
        courier,
        isHighRisk: values.isHighRisk,
        items,
      });
      setState((current) =>
        current.phase === "ready" ? { ...current, data: [created, ...current.data] } : current,
      );
    }
  }

  async function handleChangeStatus(status: OrderStatus) {
    if (!selectedOrder) return;
    setActionError(null);
    try {
      putOrder(await updateOrderStatus(selectedOrder.id, status));
    } catch (error) {
      setActionError(error instanceof ApiError ? error.message : "স্ট্যাটাস পরিবর্তন করা যায়নি।");
    }
  }

  async function handleAddTag(tag: string) {
    if (!selectedOrder || selectedOrder.tags.includes(tag)) return;
    setActionError(null);
    try {
      putOrder(await updateOrderTags(selectedOrder.id, [...selectedOrder.tags, tag]));
    } catch (error) {
      setActionError(error instanceof ApiError ? error.message : "ট্যাগ যোগ করা যায়নি।");
    }
  }

  async function handleRemoveTag(tag: string) {
    if (!selectedOrder) return;
    setActionError(null);
    try {
      putOrder(
        await updateOrderTags(
          selectedOrder.id,
          selectedOrder.tags.filter((existing) => existing !== tag),
        ),
      );
    } catch (error) {
      setActionError(error instanceof ApiError ? error.message : "ট্যাগ মুছে ফেলা যায়নি।");
    }
  }

  async function handleAddNote(text: string) {
    if (!selectedOrder) return;
    setActionError(null);
    try {
      putOrder(await addOrderNote(selectedOrder.id, text));
    } catch (error) {
      setActionError(error instanceof ApiError ? error.message : "নোট যোগ করা যায়নি।");
    }
  }

  async function handleDeleteOrder() {
    if (!selectedOrder) return;
    setActionError(null);
    try {
      await deleteOrder(selectedOrder.id);
      setState((current) =>
        current.phase === "ready"
          ? { ...current, data: current.data.filter((order) => order.id !== selectedOrder.id) }
          : current,
      );
      setSelectedId(null);
    } catch (error) {
      setActionError(error instanceof ApiError ? error.message : "অর্ডার মুছে ফেলা যায়নি।");
    }
  }

  if (state.phase === "loading") {
    return (
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-20 w-full rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-96 w-full rounded-xl" />
      </div>
    );
  }

  if (state.phase === "error") {
    return (
      <EmptyState
        icon={ClipboardList}
        title="Could not load orders"
        description="Something went wrong while fetching orders. Please try again shortly."
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <OrdersSummary orders={orders} />

      {actionError && <p className="text-destructive font-bangla text-xs">{actionError}</p>}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveStatus("all")}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
              activeStatus === "all"
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:text-foreground",
            )}
          >
            সব
          </button>
          {ORDER_STATUSES.map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setActiveStatus(status)}
              className={cn(
                "font-bangla rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                activeStatus === status
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {orderStatusLabel[status]}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative sm:w-64">
            <Search className="text-muted-foreground absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="কাস্টমার বা অর্ডার নম্বর খুঁজুন..."
              className="font-bangla pl-8"
            />
          </div>
          <Button className="font-bangla shrink-0" onClick={openCreateForm}>
            <Plus className="size-4" />
            নতুন অর্ডার
          </Button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={ClipboardList}
          title="No orders found"
          description="Try a different search term or status filter."
        />
      ) : (
        <Card className="divide-border flex h-[65vh] min-h-96 flex-col gap-0 divide-y overflow-hidden border-transparent p-0 shadow-sm ring-1">
          <OrderTableHeader />
          <div className="scrollbar-hidden divide-border min-h-0 flex-1 divide-y overflow-y-auto">
            {filtered.map((order) => (
              <OrderRow key={order.id} order={order} onClick={() => setSelectedId(order.id)} />
            ))}
          </div>
        </Card>
      )}

      <OrderDetailSheet
        order={selectedOrder}
        open={selectedOrder !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedId(null);
        }}
        onChangeStatus={handleChangeStatus}
        onAddTag={handleAddTag}
        onRemoveTag={handleRemoveTag}
        onAddNote={handleAddNote}
        onEdit={() => {
          if (selectedOrder) {
            setSelectedId(null);
            openEditForm(selectedOrder.id);
          }
        }}
        onDelete={handleDeleteOrder}
      />

      <OrderFormSheet
        order={editingOrder}
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setEditingOrderId(null);
        }}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}
