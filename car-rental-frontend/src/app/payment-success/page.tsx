import Link from "next/link";

export default function PaymentSuccess() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-8">
      <h1 className="text-4xl font-bold text-green-700 mb-6">Payment Successful!</h1>
      <p className="mb-8 text-lg text-green-800">
        Thank you for your payment. Your transaction was completed successfully.
      </p>
      <Link
        href="/payment"
        className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
      >
        Go back Payment
      </Link>
    </main>
  );
}
