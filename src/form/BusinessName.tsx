import { useForm, SubmitHandler } from "react-hook-form";
import { Input, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import useFormData from "@/data/useFormData";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

type BusinessNameFormData = {
  businessName: string;
};

export default function BusinessName() {
  const { updateFormData, formData } = useFormData();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BusinessNameFormData>({
    defaultValues: {
      businessName: formData.businessName || "",
    },
  });

  const onSubmit: SubmitHandler<BusinessNameFormData> = (data) => {
    updateFormData(data);
    navigate("/next-step"); // Replace with your next step route
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
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
            label="Business Name"
            placeholder="Enter your business name"
            isInvalid={!!errors.businessName}
            errorMessage={errors.businessName?.message}
          />
        </motion.div>
        <p className="text-sm text-gray-500">
          Please enter the legal name of your business as it appears on official
          documents.
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
