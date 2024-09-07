import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { FormData } from "@/type";

interface LocationData {
  postal: string;
  city: string;
  state: string;
}

const useLocationData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const fetchLocationForZipcode = async (
    zipcode: string
  ): Promise<LocationData | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.zippopotam.us/us/${zipcode}`);
      if (!response.ok) {
        throw new Error("Failed to fetch location data");
      }
      const data = await response.json();
      const locationData: LocationData = {
        postal: data.post_code,
        city: data.places[0]["place name"],
        state: data.places[0].state,
      };
      queryClient.setQueryData(["formData"], (oldData: FormData) => ({
        ...oldData,
        zipcode: locationData.postal,
      }));
      return locationData;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, fetchLocationForZipcode };
};

export default useLocationData;
