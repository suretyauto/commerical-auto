import React, { useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Input, Button } from "@nextui-org/react";
import { useLocation, useNavigate } from "react-router-dom";
import useFormData from "@/data/useFormData";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { AddressAutofill } from "@mapbox/search-js-react";
import { AddressAutofillProps } from "@mapbox/search-js-react/dist/components/AddressAutofill";
import { supabase } from "@/utils/supabase";

type BusinessAddressFormData = {
  businessAddress: string;
  businessAddress2: string;
  businessCity: string;
  businessState: string;
  businessZipcode: string;
};

const AddressAutofillWrapper =
  AddressAutofill as React.ComponentType<AddressAutofillProps>;

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

export default function BusinessAddress() {
  const location = useLocation();
  const apiKey = import.meta.env.VITE_MAPBOX_API;
  const { updateFormData, formData } = useFormData();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BusinessAddressFormData>({
    defaultValues: {
      businessAddress: formData.businessAddress || "",
      businessAddress2: formData.businessAddress2 || "",
      businessCity: formData.businessCity || "",
      businessState: formData.businessState || "",
      businessZipcode: formData.businessZipcode || "",
    },
  });

  useEffect(() => {
    if (userId) {
      logAnalyticsEvent(userId, "form_step_viewed", {
        step: "business_address",
      });
    }

    return () => {
      if (userId) {
        logAnalyticsEvent(userId, "step_time", {
          step: "business_address",
          timeSpentMs: Date.now() - performance.now(),
        });
      }
    };
  }, [userId]);

  const onSubmit: SubmitHandler<BusinessAddressFormData> = async (data) => {
    if (userId) {
      updateFormData({
        ...data,
        lastCompletedAt: new Date().toISOString(),
        lastCompletedStep: location.pathname,
      });
      logAnalyticsEvent(userId, "step_completed", {
        step: "business_address",
        ...data,
      });
    }
    navigate("/year-started");
  };

  const handleBack = () => {
    if (userId) {
      logAnalyticsEvent(userId, "step_back", { from: "business_address" });
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
      <h2 className="text-xl font-semibold">
        {formData.businessName ? formData.businessName : "Your Business"} Full
        Address
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Controller
              name="businessAddress"
              control={control}
              rules={{ required: "Business Address is required" }}
              render={({ field }) => (
                <AddressAutofillWrapper
                  accessToken={apiKey}
                  onRetrieve={(result) => {
                    if (userId) {
                      logAnalyticsEvent(userId, "address_autofill_used", {
                        result: result.features[0].properties,
                      });
                    }
                  }}
                >
                  <Input
                    {...field}
                    autoComplete="address-line1"
                    label="Business Address"
                    placeholder="Enter your business Address"
                    isInvalid={!!errors.businessAddress}
                    errorMessage={errors.businessAddress?.message}
                    onChange={(e) => {
                      field.onChange(e);
                      if (userId) {
                        logAnalyticsEvent(userId, "business_address_input", {
                          businessAddress: e.target.value,
                        });
                      }
                    }}
                  />
                </AddressAutofillWrapper>
              )}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Input
              {...register("businessAddress2")}
              autoComplete="address-line2"
              label="Address Line 2"
              placeholder="Apartment, suite, unit, etc. (optional)"
              onChange={(e) => {
                if (userId) {
                  logAnalyticsEvent(userId, "business_address2_input", {
                    businessAddress2: e.target.value,
                  });
                }
              }}
            />
          </motion.div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Input
              {...register("businessCity", {
                required: "City is required",
              })}
              autoComplete="address-level2"
              label="City"
              placeholder="Enter city"
              isInvalid={!!errors.businessCity}
              errorMessage={errors.businessCity?.message}
              onChange={(e) => {
                if (userId) {
                  logAnalyticsEvent(userId, "business_city_input", {
                    businessCity: e.target.value,
                  });
                }
              }}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Input
              {...register("businessState", {
                required: "State is required",
              })}
              autoComplete="address-level1"
              label="State"
              placeholder="Enter state"
              isInvalid={!!errors.businessState}
              errorMessage={errors.businessState?.message}
              onChange={(e) => {
                if (userId) {
                  logAnalyticsEvent(userId, "business_state_input", {
                    businessState: e.target.value,
                  });
                }
              }}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Input
              {...register("businessZipcode", {
                required: "Zipcode is required",
                pattern: {
                  value: /^\d{5}(-\d{4})?$/,
                  message: "Invalid zipcode format",
                },
              })}
              autoComplete="postal-code"
              label="Zipcode"
              placeholder="Enter zipcode"
              isInvalid={!!errors.businessZipcode}
              errorMessage={errors.businessZipcode?.message}
              onChange={(e) => {
                if (userId) {
                  logAnalyticsEvent(userId, "business_zipcode_input", {
                    businessZipcode: e.target.value,
                  });
                }
              }}
            />
          </motion.div>
        </div>
        <p className="text-sm text-gray-500">
          Please enter the address of your business or your personal address if
          you do not have a business address.
        </p>
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
            Continue
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
}
