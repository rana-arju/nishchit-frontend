"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchHealth } from "@/features/dashboard/api/health";
import type { HealthStatus } from "@/features/dashboard/schemas/health";

type State = { phase: "loading" } | { phase: "error" } | { phase: "ready"; data: HealthStatus };

export function HealthStatusCard() {
  const [state, setState] = useState<State>({ phase: "loading" });

  useEffect(() => {
    let cancelled = false;

    fetchHealth()
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Backend status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {state.phase === "loading" && (
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-32" />
            </div>
          )}

          {state.phase === "error" && (
            <p className="text-destructive text-sm">Could not reach the API.</p>
          )}

          {state.phase === "ready" && (
            <dl className="text-sm">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-muted-foreground">API</dt>
                <dd className="font-medium capitalize">{state.data.status}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-muted-foreground">Database</dt>
                <dd className="font-medium capitalize">{state.data.database}</dd>
              </div>
            </dl>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
