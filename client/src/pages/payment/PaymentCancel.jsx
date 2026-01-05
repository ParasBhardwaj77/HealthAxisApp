import { useNavigate } from "react-router-dom";
import { XCircle } from "lucide-react";
import { Button } from "../../components/ui/Button";

export default function PaymentCancel() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-dark-900 p-4">
      <div className="bg-white dark:bg-dark-800 p-8 rounded-3xl shadow-xl text-center max-w-md w-full">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 text-orange-600">
          <XCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Payment Cancelled
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          You cancelled the checkout process. Your appointment has not been
          confirmed.
        </p>
        <Button
          onClick={() => navigate("/patient/dashboard")}
          className="w-full"
        >
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
}
