import Link from "next/link";

export default function PaymentCancel() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-red-50 p-8">
      <h1 className="text-4xl font-bold text-red-700 mb-6">Payment Cancelled</h1>
      <p className="mb-8 text-lg text-red-800">
        Your payment was cancelled. No charges have been made.
      </p>
      <Link
        href="/payment"
        className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
      >
        Return to Payment
      </Link>
    </main>
  );
}
