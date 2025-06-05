import SignInForm from "@/components/auth/SignInForm";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4169E1]/10 to-[#16A085]/10 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-4xl font-bold text-[#4169E1] mb-2">Business of One</h1>
          </Link>
          <p className="text-gray-600">Transform Your Solo Business</p>
        </div>
        <SignInForm />
      </div>
    </div>
  );
}