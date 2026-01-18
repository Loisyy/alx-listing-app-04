import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";

// Define a type for a single review
interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
}

// Props for ReviewSection
interface ReviewSectionProps {
  propertyId: string;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ propertyId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!propertyId) return;
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/properties/${propertyId}/reviews`
        );
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [propertyId]);

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  if (reviews.length === 0) {
    return <p>No reviews yet.</p>;
  }

  return (
    <div className="mt-8 p-6">
      <h3 className="text-2xl font-semibold">Reviews</h3>
      {reviews.map((review) => (
        <div key={review.id} className="border-b pb-4 mb-4">
          <div className="flex items-center">
            <Image
              src={review.avatar}
              alt={review.name}
              width={48}
              height={48}
              className="rounded-full mr-4"
            />
            <div>
              <p className="font-bold">{review.name}</p>
              <p className="text-yellow-500">{review.rating} stars</p>
            </div>
          </div>
          <p className="mt-2">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewSection;
