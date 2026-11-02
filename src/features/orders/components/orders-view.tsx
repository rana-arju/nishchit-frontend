"use client";

import { ClipboardList, Plus, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/features/dashboard/components/empty-state";
import { fetchOrders } from "@/features/orders/api/orders";
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
import { cn } from "cn";

type State = { phase: "loading" } | { phase: "error" } | { phase: "ready"; data: Order[] };

function nextOrderNumber(orders: Order[]): string {
  const max = orders.reduce((highest, order) => {
    const numeric = Number(order.orderNumber.replace(/\D/g, ""));
    return Number.isFinite(numeric) ? Math.max(highest, numeric) : highest;
  }, 1000);
  return `#${max + 1}`;
}

export function OrdersView() {
  const [state, setState] = useState<State>({ phase: "loading" });
  const [activeStatus, setActiveStatus] = useState<"all" | OrderStatus>("all");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);

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

  function updateOrder(id: string, updater: (order: Order) => Order) {
    setState((current) =>
      current.phase === "ready"
        ? {
            ...current,
            data: current.data.map((order) => (order.id === id ? updater(order) : order)),
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

  function submitForm(values: OrderFormValues) {
    const items = values.items.map((item, index) => ({
      id: `item-${index}`,
      productName: item.productName.trim(),
      quantity: Number(item.quantity),
      price: Number(item.price),
    }));

    if (editingOrderId) {
      updateOrder(editingOrderId, (order) => ({
        ...order,
        customerName: values.customerName.trim(),
        customerPhone: values.customerPhone.trim(),
        address: values.address.trim(),
        paymentMethod: values.paymentMethod,
        courier: values.courier.trim() || undefined,
        isHighRisk: values.isHighRisk,
        items,
      }));
    } else {
      const newOrder: Order = {
        id: `order-${Date.now()}`,
        orderNumber: nextOrderNumber(orders),
        customerName: values.customerName.trim(),
        customerPhone: values.customerPhone.trim(),
        address: values.address.trim(),
        channel: "messenger",
        status: "pending",
        paymentMethod: values.paymentMethod,
        courier: values.courier.trim() || undefined,
        isHighRisk: values.isHighRisk,
        items,
        tags: [],
        notes: [],
        createdAt: new Date().toISOString(),
      };
      setState((current) =>
        current.phase === "ready" ? { ...current, data: [newOrder, ...current.data] } : current,
      );
    }

    setFormOpen(false);
    setEditingOrderId(null);
  }

  function deleteOrder(id: string) {
    setState((current) =>
      current.phase === "ready"
        ? { ...current, data: current.data.filter((order) => order.id !== id) }
        : current,
    );
    setSelectedId(null);
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
        onChangeStatus={(status) => {
          if (selectedOrder) updateOrder(selectedOrder.id, (order) => ({ ...order, status }));
        }}
        onAddTag={(tag) => {
          if (selectedOrder && !selectedOrder.tags.includes(tag)) {
            updateOrder(selectedOrder.id, (order) => ({ ...order, tags: [...order.tags, tag] }));
          }
        }}
        onRemoveTag={(tag) => {
          if (selectedOrder) {
            updateOrder(selectedOrder.id, (order) => ({
              ...order,
              tags: order.tags.filter((existing) => existing !== tag),
            }));
          }
        }}
        onAddNote={(text) => {
          if (selectedOrder) {
            updateOrder(selectedOrder.id, (order) => ({
              ...order,
              notes: [
                ...order.notes,
                { id: `note-${Date.now()}`, text, createdAt: new Date().toISOString() },
              ],
            }));
          }
        }}
        onEdit={() => {
          if (selectedOrder) {
            setSelectedId(null);
            openEditForm(selectedOrder.id);
          }
        }}
        onDelete={() => {
          if (selectedOrder) deleteOrder(selectedOrder.id);
        }}
      />

      <OrderFormSheet
        order={editingOrder}
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setEditingOrderId(null);
        }}
        onSubmit={submitForm}
      />
    </div>
  );
}
