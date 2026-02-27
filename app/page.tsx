import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SignInButton, SignUpButton } from '@clerk/nextjs';
import { Link2 } from 'lucide-react';

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect('/dashboard');
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="flex justify-center mb-2">
            <Link2 className="h-10 w-10" />
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight">Link Shortener</CardTitle>
          <CardDescription className="text-base">Shorten, manage, and track your URLs in one place.</CardDescription>
        </CardHeader>
        <CardContent />
        <CardFooter className="flex justify-center gap-4">
          <SignInButton mode="modal">
            <Button variant="outline">Sign In</Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button>Get Started</Button>
          </SignUpButton>
        </CardFooter>
      </Card>
    </div>
  );
}
