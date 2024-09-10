import { useForm, SubmitHandler } from "react-hook-form";
import { Input, Button } from "@nextui-org/react";
import { useLocation, useNavigate } from "react-router-dom";
import useFormData from "@/data/useFormData";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/utils/supabase";

type YearStartedFormData = {
  yearStarted: string;
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

export default function YearStarted() {
  const location = useLocation();
  const { updateFormData, formData } = useFormData();
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<YearStartedFormData>({
    defaultValues: {
      yearStarted: formData.yearStarted?.toString() || "",
    },
    mode: "onSubmit",
  });

  useEffect(() => {
    const userId = localStorage.getItem("userId") || uuidv4();
    logAnalyticsEvent(userId, "form_step_viewed", { step: "year_started" });

    return () => {
      logAnalyticsEvent(userId, "step_time", {
        step: "year_started",
        timeSpentMs: Date.now() - performance.now(),
      });
    };
  }, []);

  const onSubmit: SubmitHandler<YearStartedFormData> = async (data) => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      updateFormData({
        yearStarted: parseInt(data.yearStarted, 10),
        lastCompletedAt: new Date().toISOString(),
        lastCompletedStep: location.pathname,
      });
      logAnalyticsEvent(userId, "step_completed", {
        step: "year_started",
        yearStarted: data.yearStarted,
      });
    }
    navigate("/ein");
  };

  const handleBack = () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      logAnalyticsEvent(userId, "step_back", { from: "year_started" });
    }
    navigate(-1);
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <h2 className="text-xl font-semibold">Year Started</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Input
            {...register("yearStarted", {
              required: "Year started is required",
              pattern: {
                value: /^[0-9]{4}$/,
                message: "Please enter a valid 4-digit year",
              },
              validate: (value) => {
                if (value.length !== 4) return "Please enter a 4-digit year";
                const year = parseInt(value, 10);
                if (isNaN(year)) return "Please enter a valid year";
                if (year > currentYear)
                  return `Year cannot be later than ${currentYear}`;
                if (year < 1900) return "Year cannot be earlier than 1900";
                return true;
              },
            })}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={4}
            label="Year Started"
            placeholder="Enter the year your business started"
            isInvalid={!!errors.yearStarted}
            errorMessage={errors.yearStarted?.message}
            onKeyPress={(e) => {
              const charCode = e.which ? e.which : e.keyCode;
              if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                e.preventDefault();
              }
            }}
          />
        </motion.div>
        <p className="text-sm text-gray-500">
          Please enter the year your business was established.
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
