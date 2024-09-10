import { useForm, SubmitHandler } from "react-hook-form";
import { Input, Button } from "@nextui-org/react";
import { useLocation, useNavigate } from "react-router-dom";
import useFormData from "@/data/useFormData";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import FormSubmissionHandler from "./FormSubmission";
import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";

type PersonalInfoFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
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

export default function PersonalInfoForm() {
  const location = useLocation();
  const { updateFormData, formData } = useFormData();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const userId = localStorage.getItem("userId");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfoFormData>({
    defaultValues: {
      firstName: formData.firstName || "",
      lastName: formData.lastName || "",
      email: formData.email || "",
      phone: formData.phone || "",
    },
  });

  useEffect(() => {
    if (userId) {
      logAnalyticsEvent(userId, "form_step_viewed", { step: "personal_info" });
    }

    return () => {
      if (userId) {
        logAnalyticsEvent(userId, "step_time", {
          step: "personal_info",
          timeSpentMs: Date.now() - performance.now(),
        });
      }
    };
  }, [userId]);

  const onSubmit: SubmitHandler<PersonalInfoFormData> = async (data) => {
    if (userId) {
      await updateFormData({
        ...data,
        lastCompletedAt: new Date().toISOString(),
        lastCompletedStep: location.pathname,
      });
      logAnalyticsEvent(userId, "step_completed", {
        step: "personal_info",
        ...data,
      });
    }
    setIsSubmitting(true);
  };

  const handleBack = () => {
    if (userId) {
      logAnalyticsEvent(userId, "step_back", { from: "personal_info" });
    }
    navigate(-1);
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  if (isSubmitting) {
    return <FormSubmissionHandler />;
  }

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <h2 className="text-xl font-semibold">Your Personal Information</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Input
              {...register("firstName", {
                required: "First name is required",
                minLength: {
                  value: 2,
                  message: "First name must be at least 2 characters long",
                },
              })}
              label="First Name"
              placeholder="Enter your first name"
              isInvalid={!!errors.firstName}
              errorMessage={errors.firstName?.message}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Input
              {...register("lastName", {
                required: "Last name is required",
                minLength: {
                  value: 2,
                  message: "Last name must be at least 2 characters long",
                },
              })}
              label="Last Name"
              placeholder="Enter your last name"
              isInvalid={!!errors.lastName}
              errorMessage={errors.lastName?.message}
            />
          </motion.div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              label="Email"
              placeholder="Enter your email address"
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Input
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value:
                    /^(\+1|1)?[-.\s]?\(?[2-9]\d{2}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
                  message: "Invalid phone number",
                },
              })}
              label="Phone"
              placeholder="Enter your phone number"
              isInvalid={!!errors.phone}
              errorMessage={errors.phone?.message}
            />
          </motion.div>
        </div>
        <p className="text-sm text-gray-500">
          Please provide your personal contact information. This will be used
          for communication regarding your business.
        </p>
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <span className="text-sm text-foreground">
            By clicking, "Get My Free Quote" below, I am providing my consent
            for Surety Auto Group to use automated technology, including calls,
            texts, prerecorded messages and emails, to contact me about
            insurance offers at the number and email provided even if my number
            is on a corporate, state or national do not call list. This consent
            is not required to make a purchase. Clicking the button below
            constitutes your electronic signature.{" "}
            <a className="text-blue-600 hover:underline" href="#">
              Terms & conditions
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Privacy policy
            </a>{" "}
            apply. Msg & data rates may apply. Text "stop" to unsubscribe.
          </span>
        </motion.div>
        <motion.div
          className="flex justify-between space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
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
            Get My Free Quote
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
}
