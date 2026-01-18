import axios from "axios";
import { useCallback, useState } from "react";

// 1️⃣ Define the type for your form data
interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  billingAddress: string;
}

const BookingForm = () => {
  // 2️⃣ Add TypeScript type to state
  const [formData, setFormData] = useState<BookingFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    billingAddress: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 3️⃣ Submit handler
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setError(null);

      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/bookings`,
          formData
        );
        alert("Booking confirmed!");
      } catch (error) {
        setError("Failed to submit booking.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [formData]
  );

  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-xl font-semibold">Contact Detail</h2>
      <form onSubmit={handleSubmit}>
        {/* Contact Information */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>First Name</label>
            <input
              type="text"
              className="border p-2 w-full mt-2"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label>Last Name</label>
            <input
              type="text"
              className="border p-2 w-full mt-2"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label>Email</label>
            <input
              type="email"
              className="border p-2 w-full mt-2"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label>Phone Number</label>
            <input
              type="text"
              className="border p-2 w-full mt-2"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
              required
            />
          </div>
        </div>

        {/* Payment Information */}
        <h2 className="text-xl font-semibold mt-6">Pay with</h2>
        <div className="mt-4">
          <label>Card Number</label>
          <input
            type="text"
            className="border p-2 w-full mt-2"
            value={formData.cardNumber}
            onChange={(e) =>
              setFormData({ ...formData, cardNumber: e.target.value })
            }
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label>Expiration Date</label>
            <input
              type="text"
              className="border p-2 w-full mt-2"
              value={formData.expirationDate}
              onChange={(e) =>
                setFormData({ ...formData, expirationDate: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label>CVV</label>
            <input
              type="text"
              className="border p-2 w-full mt-2"
              value={formData.cvv}
              onChange={(e) =>
                setFormData({ ...formData, cvv: e.target.value })
              }
              required
            />
          </div>
        </div>

        {/* Billing Address */}
        <h2 className="text-xl font-semibold mt-6">Billing Address</h2>
        <div className="mt-4">
          <label>Street Address</label>
          <input
            type="text"
            className="border p-2 w-full mt-2"
            value={formData.billingAddress}
            onChange={(e) =>
              setFormData({ ...formData, billingAddress: e.target.value })
            }
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-6 bg-green-500 text-white py-2 px-4 rounded-md w-full"
          disabled={loading}
        >
          {loading ? "Processing..." : "Confirm & Pay"}
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default BookingForm;
