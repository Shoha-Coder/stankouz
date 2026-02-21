"use client";

import { useMutation } from "@tanstack/react-query";
import { submitApplication, type SubmitApplicationPayload } from "../api/contact.service";

const MUTATION_KEY = ["submitApplication"] as const;

export function useSubmitApplication() {
  return useMutation({
    mutationKey: MUTATION_KEY,
    mutationFn: (payload: SubmitApplicationPayload) => submitApplication(payload),
  });
}
