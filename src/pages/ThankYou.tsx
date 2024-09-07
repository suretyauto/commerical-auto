import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { CheckCircle } from "lucide-react";
import CTA from "@/components/main-components/CTA";

const ThankYouPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-content1 to-content1/10">
      <Card className="w-full max-w-lg shadow-xl backdrop-blur-md">
        <CardHeader className="flex flex-col items-center pt-6 pb-0">
          <CheckCircle className="w-20 h-20 mb-4 text-success" />
          <h1 className="text-3xl font-bold text-center text-primary">
            Thank You!
          </h1>
        </CardHeader>
        <CardBody className="px-8 py-6 text-center">
          <p className="mb-4 text-xl">
            Your information has been successfully submitted.
          </p>
          <p className="mb-6 text-lg text-gray-600">
            An agent will be in touch with you very soon to discuss your
            insurance needs.
          </p>
          <div className="w-32 h-1 mx-auto mb-6 bg-primary"></div>
          <p className="text-sm italic text-gray-500">
            We appreciate your trust in our services.
          </p>
        </CardBody>
      </Card>

      <div className="w-full max-w-4xl mt-12">
        <CTA />
      </div>
    </div>
  );
};

export default ThankYouPage;
