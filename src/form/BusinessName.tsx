import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input, Button, Checkbox } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import useFormData from "@/data/useFormData";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

type BusinessNameFormData = {
  businessName: string;
  hasDBA: boolean;
  dbaName?: string;
};

export default function BusinessName() {
  const { updateFormData, formData } = useFormData();
  const navigate = useNavigate();
  const [, setHasDBA] = useState(!!formData.dbaName);

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

  const onSubmit: SubmitHandler<BusinessNameFormData> = (data) => {
    updateFormData({
      businessName: data.businessName,
      dbaName: data.hasDBA ? data.dbaName : undefined,
    });
    navigate("/address");
  };

  const handleBack = () => {
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
            onValueChange={(isSelected) => setHasDBA(isSelected)}
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
