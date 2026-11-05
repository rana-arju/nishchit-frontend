import { useState } from "react";
import type { z } from "zod";

type FieldErrors<T> = Partial<Record<keyof T, string>>;

/**
 * Keeps a form's values and errors in sync with a zod schema in real time: as soon as a
 * field becomes valid again, its error clears immediately (instead of only on next submit).
 * A field's error is only shown once that field has been edited or already has an error —
 * other untouched fields stay quiet until the user gets to them or submits.
 */
export function useValidatedForm<T extends Record<string, string>>(
  createSchema: () => z.ZodType<T>,
  initialValues: T,
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FieldErrors<T>>({});

  function revalidate(nextValues: T, prevErrors: FieldErrors<T>, changedField?: keyof T) {
    const result = createSchema().safeParse(nextValues);
    const relevantFields = new Set<keyof T>(Object.keys(prevErrors) as (keyof T)[]);
    if (changedField) relevantFields.add(changedField);

    const nextErrors: FieldErrors<T> = {};
    if (!result.success) {
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof T;
        if (relevantFields.has(key) && !(key in nextErrors)) {
          nextErrors[key] = issue.message;
        }
      }
    }
    return nextErrors;
  }

  function setFieldValue(field: keyof T, value: string) {
    const nextValues = { ...values, [field]: value };
    setValues(nextValues);
    setErrors((prev) => revalidate(nextValues, prev, field));
  }

  function handleChange(field: keyof T) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setFieldValue(field, event.target.value);
    };
  }

  function validateAll(): T | null {
    const result = createSchema().safeParse(values);
    if (!result.success) {
      const fieldErrors: FieldErrors<T> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof T;
        if (!(key in fieldErrors)) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return null;
    }
    setErrors({});
    return result.data;
  }

  function reset(next: T = initialValues) {
    setValues(next);
    setErrors({});
  }

  return { values, setValues, errors, setErrors, handleChange, setFieldValue, validateAll, reset };
}
