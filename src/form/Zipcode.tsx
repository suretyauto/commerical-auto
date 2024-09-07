import React, { useState, useCallback, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input, Button } from "@nextui-org/react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useFormData from "@/data/useFormData";
import useLocationData from "@/data/useLocationData";
import { toast } from "react-toastify";

type ZipcodeFormData = {
  zipcode: string;
};

const Zipcode: React.FC = () => {
  const navigate = useNavigate();
  const { updateFormData, formData } = useFormData();
  const { isLoading, error, fetchLocationForZipcode } = useLocationData();
  const [cityState, setCityState] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    trigger,
  } = useForm<ZipcodeFormData>({
    mode: "onBlur",
    defaultValues: {
      zipcode: formData.zipcode,
    },
  });

  const validateAndUpdateCity = useCallback(
    async (value: string) => {
      if (value.length === 5 && /^\d{5}$/.test(value)) {
        try {
          const locationData = await fetchLocationForZipcode(value);
          if (locationData && locationData.city && locationData.state) {
            setCityState(`${locationData.city}, ${locationData.state}`);
          } else {
            setCityState(null);
            toast.error("Unable to find location for this zipcode");
          }
        } catch (error) {
          console.error("Error fetching location data:", error);
          setCityState(null);
          toast.error("Error fetching location data");
        }
      } else {
        setCityState(null);
      }
    },
    [fetchLocationForZipcode]
  );

  useEffect(() => {
    if (formData.zipcode) {
      setValue("zipcode", formData.zipcode);
      validateAndUpdateCity(formData.zipcode);
    }
  }, [formData.zipcode, setValue, validateAndUpdateCity]);

  const onSubmit: SubmitHandler<ZipcodeFormData> = (data) => {
    updateFormData(data);
    navigate("/business-name");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 sm:flex">
        <Input
          {...register("zipcode", {
            required: "Zipcode is required",
            pattern: {
              value: /^\d{5}$/,
              message: "Zipcode must be 5 digits",
            },
            validate: async (value) => {
              if (value.trim() === "") {
                return "Zipcode cannot be empty";
              }
              await validateAndUpdateCity(value);
              return true;
            },
          })}
          type="text"
          placeholder="Enter your zipcode"
          className="w-full sm:max-w-xs"
          size="lg"
          isInvalid={!!errors.zipcode}
          errorMessage={errors.zipcode?.message}
          onChange={(e) => {
            const value = e.target.value;
            if (value.length <= 5 && /^\d*$/.test(value)) {
              setValue("zipcode", value, {
                shouldValidate: value.length === 5,
              });
            }
          }}
          onBlur={() => trigger("zipcode")}
        />
        <Button
          type="submit"
          color="primary"
          size="lg"
          className="mt-3 font-semibold sm:mt-0 sm:ml-3"
          endContent={<ArrowRight className="ml-2" />}
          isLoading={isSubmitting || isLoading}
        >
          Get Your Quote
        </Button>
      </form>
      {cityState && (
        <div className="mt-2 text-sm text-green-500">
          Savings Available in {cityState}
        </div>
      )}
      {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
    </div>
  );
};

export default Zipcode;
