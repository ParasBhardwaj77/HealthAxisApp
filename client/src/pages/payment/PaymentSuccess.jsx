import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { API_ENDPOINTS, fetchWithAuth } from "../../api/config";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("session_id");
  const appointmentId = searchParams.get("appointment_id");
  const [status, setStatus] = useState("verifying"); // verifying, success, error

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId || !appointmentId) {
        setStatus("error");
        return;
      }

      try {
        // Here we should call the backend to confirm the payment via session ID
        // For this demo, we can just call an endpoint to update appointment status
        // Create a new endpoint in PaymentController for confirmation
        const res = await fetchWithAuth(API_ENDPOINTS.PAYMENT.CONFIRM, {
          method: "POST",
          body: JSON.stringify({ appointmentId, sessionId }),
        });

        if (res.ok) {
          setStatus("success");
        } else {
          console.error("Payment confirmation failed");
          setStatus("error");
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
        setStatus("error");
      }
    };

    if (sessionId) verifyPayment();
  }, [sessionId, appointmentId]);

  if (status === "verifying") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-dark-900">
        <Loader2 className="w-12 h-12 text-primary-500 animate-spin mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Verifying your payment...
        </h2>
        <p className="text-gray-500">Please do not close this window.</p>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-dark-900 p-4">
        <div className="bg-white dark:bg-dark-800 p-8 rounded-3xl shadow-xl text-center max-w-md w-full">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Payment Successful!
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Your appointment has been confirmed. You will receive a confirmation
            email shortly.
          </p>
          <Button
            onClick={() => navigate("/patient/dashboard")}
            className="w-full"
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-dark-900 p-4">
      <div className="bg-white dark:bg-dark-800 p-8 rounded-3xl shadow-xl text-center max-w-md w-full">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 text-red-600">
          <XCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Payment Failed
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          We couldn't verify your payment. Please try again or contact support.
        </p>
        <Button
          onClick={() => navigate("/patient/dashboard")}
          variant="outline"
          className="w-full"
        >
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
}
