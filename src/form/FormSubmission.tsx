import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import loadingAnimation from "@/assets/form-page.json";
import useFormData from "@/data/useFormData";
import { supabase } from "@/utils/supabase";

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

const FormSubmissionHandler: React.FC = () => {
  const [, setIsLoading] = useState(true);
  const { formData, updateFormData } = useFormData();
  const navigate = useNavigate();

  useEffect(() => {
    const submitForm = async () => {
      const params = new URLSearchParams({
        CampaignId: "3163C1951FBEBBC79A008F76EFADDC11",
        IsTest: "False",
        BusinessName: formData.businessName || "",
        BusinessDBA: formData.dbaName || "",
        Address1: formData.businessAddress || "",
        Address2: formData.businessAddress2 || "",
        City: formData.businessCity || "",
        State: formData.businessState || "",
        Zip: formData.businessZipcode || "",
        BusinessYearStarted: formData.yearStarted?.toString() || "",
        BusinessTaxID: formData.ein || "",
        ContactFirstName: formData.firstName || "",
        ContactLastName: formData.lastName || "",
        Phone: formData.phone || "",
        ThankYouRedirect: `${window.location.origin}/thank-you`,
        FailureRedirect: `${window.location.origin}/sorry`,
        AppendResponseCodeToRedirect: "True",
      });

      try {
        const response = await fetch(
          `https://sag.leadcapsule.com/Leads/LeadPost.aspx?${params.toString()}`,
          {
            method: "POST",
            mode: "no-cors",
          }
        );

        console.log(response);

        // Log analytics event for form submission
        if (formData.uuid) {
          await logAnalyticsEvent(formData.uuid, "form_submitted", {
            submission_time: new Date().toISOString(),
          });
        }

        // Update last completed step
        await updateFormData({
          lastCompletedStep: "/thank-you",
        });

        navigate("/thank-you");
      } catch (error) {
        console.error("Error submitting form:", error);

        // Log analytics event for form submission failure
        if (formData.uuid) {
          await logAnalyticsEvent(formData.uuid, "form_submission_failed", {
            error: error instanceof Error ? error.message : String(error),
            submission_time: new Date().toISOString(),
          });
        }

        navigate("/sorry");
      } finally {
        setIsLoading(false);
      }
    };

    submitForm();
  }, [formData, navigate, updateFormData]);

  return (
    <div className="fixed inset-0 flex items-center justify-center h-screen bg-background/80 backdrop-blur-lg">
      <div className="text-center">
        <Lottie
          animationData={loadingAnimation}
          loop={true}
          style={{ width: 200, height: 200 }}
        />
        <p className="mt-4 text-lg font-semibold">
          Submitting your information...
        </p>
      </div>
    </div>
  );
};

export default FormSubmissionHandler;
