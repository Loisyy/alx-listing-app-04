
import axios from "axios";
import { useEffect, useState } from "react";

const ReviewSection:React.FC<any> = ({ propertyId }) => {
   const [reviews, setReviews] = useState<any[]>([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchReviews = async () => {
         try {
            const response = await axios.get(`/api/properties/${propertyId}/reviews`);
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
   return (
      <div className="mt-8 p-6">
         <h3 className="text-2xl font-semibold">Reviews</h3>
         {reviews.map((review, index) => (
            <div key={index} className="border-b pb-4 mb-4">
               <div className="flex items-center">
                  <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full mr-4" />
                  <div>
                     <p className="font-bold">{review.name}</p>
                     <p className="text-yellow-500">{review.rating} stars</p>
                  </div>
               </div>
               <p>{review.comment}</p>
            </div>
         ))}
      </div>
   );
};

export default ReviewSection;
