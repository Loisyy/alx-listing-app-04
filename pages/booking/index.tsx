import BookingForm from "@/components/booking/BookingForm";
import CancellationPolicy from "@/components/booking/CancellationPolicy";
import OrderSummary from "@/components/booking/OrderSummary";

export default function BookingPage() {
   const bookingDetails = {
      propertyName: "Villa Arrecife Beach House",
      price: 7500,
      bookingFee: 65,
      totalNights: 3,
      startDate: "24 August 2024",
      imageUrl: "https://example.com/villa-arrecife.jpg", // added
   };

   return (
      <div className="container mx-auto p-6">
         <div className="grid grid-cols-2 gap-6">
            <BookingForm />
            <CancellationPolicy />
         </div>
         <div className="mt-10">
            <OrderSummary bookingDetails={bookingDetails} />
         </div>
      </div>
   );
}
