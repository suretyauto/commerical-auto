import { useState, useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Input, Button } from "@nextui-org/react";
import { useLocation, useNavigate } from "react-router-dom";
import useFormData from "@/data/useFormData";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/utils/supabase";

type EinNumberFormData = {
  ein: string;
};

const logAnalyticsEvent = async (
  userId: string,
  eventType: string,
  eventData: unknown = {}
) => {
  const { error } = await supabase
    .from("form_analytics")
    .insert({ user_id: userId, event_type: eventType, event_data: eventData });

  if (error) {
    console.error("Error logging analytics event:", error);
  }
};

export default function EINForm() {
  const location = useLocation();
  const { updateFormData, formData } = useFormData();
  const navigate = useNavigate();
  const [displayValue, setDisplayValue] = useState(formData.ein || "");
  const userId = localStorage.getItem("userId");

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm<EinNumberFormData>({
    defaultValues: {
      ein: formData.ein || "",
    },
    mode: "onSubmit",
  });

  useEffect(() => {
    if (userId) {
      logAnalyticsEvent(userId, "form_step_viewed", { step: "ein" });
    }

    return () => {
      if (userId) {
        logAnalyticsEvent(userId, "step_time", {
          step: "ein",
          timeSpentMs: Date.now() - performance.now(),
        });
      }
    };
  }, [userId]);

  const onSubmit: SubmitHandler<EinNumberFormData> = async (data) => {
    const cleanEin = data.ein.replace(/[^\d]/g, "");
    if (cleanEin.length !== 9) {
      setError("ein", {
        type: "manual",
        message: "EIN must be 9 digits long",
      });
      if (userId) {
        logAnalyticsEvent(userId, "ein_validation_failed", { ein: data.ein });
      }
      return;
    }
    if (userId) {
      updateFormData({
        ein: data.ein,
        lastCompletedAt: new Date().toISOString(),
        lastCompletedStep: location.pathname,
      });
      logAnalyticsEvent(userId, "step_completed", {
        step: "ein",
        ein: data.ein,
      });
    }
    navigate("/personal-details");
  };

  const handleBack = () => {
    if (userId) {
      logAnalyticsEvent(userId, "step_back", { from: "ein" });
    }
    navigate(-1);
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const formatEIN = (value: string) => {
    const numbers = value.replace(/[^\d]/g, "").slice(0, 9);
    if (numbers.length <= 2) return numbers;
    return `${numbers.slice(0, 2)}-${numbers.slice(2)}`;
  };

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <h2 className="text-xl font-semibold">
        {formData.businessName}'s EIN Number
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Controller
            name="ein"
            control={control}
            rules={{
              required: "EIN is required",
            }}
            render={({ field }) => (
              <Input
                {...field}
                value={displayValue}
                label="EIN Number"
                placeholder="XX-XXXXXXX"
                isInvalid={!!errors.ein}
                errorMessage={errors.ein?.message}
                onChange={(e) => {
                  const formatted = formatEIN(e.target.value);
                  setDisplayValue(formatted);
                  field.onChange(formatted);
                  clearErrors("ein"); // Clear errors as user types
                  if (userId) {
                    logAnalyticsEvent(userId, "ein_input", { ein: formatted });
                  }
                }}
                onKeyPress={(e) => {
                  const charCode = e.which ? e.which : e.keyCode;
                  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                    e.preventDefault();
                  }
                }}
              />
            )}
          />
        </motion.div>
        <p className="text-sm text-gray-500">
          Please enter your business's 9-digit Employer Identification Number
          (EIN).
        </p>
        <motion.div
          className="flex justify-between space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <Button
            variant="ghost"
            color="default"
            size="lg"
            onPress={handleBack}
            startContent={<ChevronLeft className="w-4 h-4" />}
          >
            Back
          </Button>
          <Button
            type="submit"
            color="primary"
            size="lg"
            className="flex-grow"
            endContent={<ChevronRight className="ml-2" />}
            isLoading={isSubmitting}
          >
            Continue
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
}
