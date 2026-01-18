import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import PropertyDetail from "@/components/property/PropertyDetail";

// 1️⃣ Define the Property type based on your API response
interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  images: string[];
  // add other fields your API returns
}

export default function PropertyDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  // 2️⃣ Add TypeScript types to state
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;
      try {
        // 3️⃣ Use environment variable for API URL
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/properties/${id}`
        );
        setProperty(response.data);
      } catch (error) {
        console.error("Error fetching property details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!property) return <p>Property not found</p>;

  return <PropertyDetail property={property} />;
}
