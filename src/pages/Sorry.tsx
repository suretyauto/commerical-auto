import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardBody, CardFooter, Button } from "@nextui-org/react";
import { AlertCircle, ArrowLeft } from "lucide-react";

const SorryPage: React.FC = () => {
  const navigate = useNavigate();

  const handleRetry = () => {
    // Navigate back to the final step of the form
    // Replace '/final-step' with the actual route of your final form step
    navigate("/personal-details");
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-background">
      <Card className="w-full max-w-md">
        <CardBody className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-danger" />
          <h2 className="mb-2 text-2xl font-bold">We're Sorry</h2>
          <p className="mb-4 text-gray-500">
            There was an error submitting your information. Please try again.
          </p>
        </CardBody>
        <CardFooter className="justify-center">
          <Button
            color="primary"
            variant="shadow"
            onPress={handleRetry}
            startContent={<ArrowLeft className="w-4 h-4" />}
          >
            Return to Form
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SorryPage;
