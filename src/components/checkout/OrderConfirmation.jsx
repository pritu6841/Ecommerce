import { Link } from "react-router-dom";

export default function OrderConfirmation() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Thank you for your order!</h1>
      <p className="mb-6 text-lg">Your order has been placed successfully. You will receive a confirmation email soon.</p>
      <Link to="/" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300">Back to Home</Link>
    </div>
  );
} 