import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input, Button, Checkbox } from "@nextui-org/react";
import { useLocation, useNavigate } from "react-router-dom";
import useFormData from "@/data/useFormData";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/utils/supabase";

type BusinessNameFormData = {
  businessName: string;
  hasDBA: boolean;
  dbaName?: string;
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

export default function BusinessName() {
  const location = useLocation();
  const { updateFormData, formData } = useFormData();
  const navigate = useNavigate();
  const [, setHasDBA] = useState(!!formData.dbaName);
  const userId = localStorage.getItem("userId");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<BusinessNameFormData>({
    defaultValues: {
      businessName: formData.businessName || "",
      hasDBA: !!formData.dbaName,
      dbaName: formData.dbaName || "",
    },
  });

  const watchHasDBA = watch("hasDBA");

  useEffect(() => {
    if (userId) {
      logAnalyticsEvent(userId, "form_step_viewed", { step: "business_name" });
    }

    return () => {
      if (userId) {
        logAnalyticsEvent(userId, "step_time", {
          step: "business_name",
          timeSpentMs: Date.now() - performance.now(),
        });
      }
    };
  }, [userId]);

  const onSubmit: SubmitHandler<BusinessNameFormData> = async (data) => {
    if (userId) {
      updateFormData({
        businessName: data.businessName,
        dbaName: data.hasDBA ? data.dbaName : undefined,
        lastCompletedAt: new Date().toISOString(),
        lastCompletedStep: location.pathname,
      });
      logAnalyticsEvent(userId, "step_completed", {
        step: "business_name",
        businessName: data.businessName,
        hasDBA: data.hasDBA,
        dbaName: data.dbaName,
      });
    }
    navigate("/address");
  };

  const handleBack = () => {
    if (userId) {
      logAnalyticsEvent(userId, "step_back", { from: "business_name" });
    }
    navigate("/");
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
      <h2 className="text-xl font-semibold">Your Business Name</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Input
            {...register("businessName", {
              required: "Business name is required",
              minLength: {
                value: 2,
                message: "Business name must be at least 2 characters long",
              },
            })}
            label="Legal Business Name"
            placeholder="Enter your legal business name"
            isInvalid={!!errors.businessName}
            errorMessage={errors.businessName?.message}
            onChange={(e) => {
              if (userId) {
                logAnalyticsEvent(userId, "business_name_input", {
                  businessName: e.target.value,
                });
              }
            }}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Checkbox
            {...register("hasDBA")}
            isSelected={watchHasDBA}
            onValueChange={(isSelected) => {
              setHasDBA(isSelected);
              if (userId) {
                logAnalyticsEvent(userId, "dba_checkbox_changed", {
                  hasDBA: isSelected,
                });
              }
            }}
          >
            Do you have a DBA (Doing Business As) name?
          </Checkbox>
        </motion.div>
        {watchHasDBA && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Input
              {...register("dbaName", {
                required: watchHasDBA
                  ? "DBA name is required when checked"
                  : false,
                minLength: {
                  value: 2,
                  message: "DBA name must be at least 2 characters long",
                },
              })}
              label="DBA Name"
              placeholder="Enter your DBA name"
              isInvalid={!!errors.dbaName}
              errorMessage={errors.dbaName?.message}
              onChange={(e) => {
                if (userId) {
                  logAnalyticsEvent(userId, "dba_name_input", {
                    dbaName: e.target.value,
                  });
                }
              }}
            />
          </motion.div>
        )}
        <p className="text-sm text-gray-500">
          Please enter the legal name of your business as it appears on official
          documents. If you have a DBA, please provide that as well.
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
