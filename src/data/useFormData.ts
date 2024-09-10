import { FormData } from "@/type";
import { supabase } from "@/utils/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";

const getOrCreateUserId = () => {
  let userId = localStorage.getItem("userId");
  if (!userId) {
    userId = uuidv4();
    localStorage.setItem("userId", userId);
    document.cookie = `userId=${userId}; max-age=${
      60 * 60 * 24 * 365
    }; path=/; SameSite=Strict`;
  }
  return userId;
};

const fetchFormData = async (userId: string): Promise<FormData> => {
  const { data, error } = await supabase
    .from("form_submissions")
    .select("*")
    .eq("userId", userId)
    .single();

  if (error) {
    console.error("Error fetching form data:", error);
    return {};
  }

  if (data) {
    const { ...formDataFields } = data;
    return formDataFields as FormData;
  }

  return {};
};

const useFormData = () => {
  const userId = getOrCreateUserId();
  const queryClient = useQueryClient();

  const { data: formData = {}, refetch } = useQuery<FormData>({
    queryKey: ["formData", userId],
    queryFn: () => fetchFormData(userId),
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const mutation = useMutation({
    mutationFn: async (
      newData: Partial<FormData> & { lastCompletedStep?: string }
    ) => {
      const updatedData = {
        ...formData,
        ...newData,
        userId,
        lastCompletedAt: new Date().toISOString(),
        lastCompletedStep:
          newData.lastCompletedStep || formData.lastCompletedStep,
      };

      const { data, error } = await supabase
        .from("form_submissions")
        .upsert(updatedData, { onConflict: "userId" });

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.setQueryData(
        ["formData", userId],
        (oldData: FormData | undefined) => ({
          ...oldData,
          ...variables,
          lastCompletedAt: new Date().toISOString(),
          lastCompletedStep:
            variables.lastCompletedStep || oldData?.lastCompletedStep,
        })
      );
    },
  });

  const updateFormData = (
    newData: Partial<FormData> & { lastCompletedStep?: string }
  ) => {
    mutation.mutate(newData);
  };

  return { formData, updateFormData, isLoading: mutation.isPending, refetch };
};

export default useFormData;
