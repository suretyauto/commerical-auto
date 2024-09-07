import { FormData } from "@/type";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const initialFormData: FormData = {
  zipcode: "",
  businessName: "",
  dbaName: "",
  businessAddress: "",
  businessAddress2: "",
  businessCity: "",
  businessState: "",
  businessZipcode: "",
  yearStarted: undefined,
  ein: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

const useFormData = () => {
  const queryClient = useQueryClient();

  const { data: formData = initialFormData } = useQuery<FormData>({
    queryKey: ["formData"],
    queryFn: () => queryClient.getQueryData(["formData"]) ?? initialFormData,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const updateFormData = (newData: Partial<FormData>) => {
    queryClient.setQueryData(
      ["formData"],
      (oldData: FormData = initialFormData) => ({
        ...oldData,
        ...newData,
      })
    );
  };

  return { formData, updateFormData };
};

export default useFormData;
