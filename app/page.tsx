import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SignInButton, SignUpButton } from '@clerk/nextjs';
import { BarChart3, Link2, Zap, Shield, Copy, Globe } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Instant Shortening',
    description: 'Paste any long URL and get a clean, shareable short link in seconds.',
  },
  {
    icon: BarChart3,
    title: 'Click Analytics',
    description: 'Track how many times each link is clicked and measure your reach.',
  },
  {
    icon: Copy,
    title: 'One-Click Copy',
    description: 'Copy your shortened links to the clipboard instantly with a single click.',
  },
  {
    icon: Globe,
    title: 'Works Everywhere',
    description: 'Share your short links on social media, emails, or anywhere on the web.',
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Your links are stored securely and are always available when you need them.',
  },
  {
    icon: Link2,
    title: 'Link Management',
    description: 'View, organize, and delete all your links from one convenient dashboard.',
  },
];

const steps = [
  { step: '1', title: 'Sign up for free', description: 'Create your account in seconds using your email or social login.' },
  { step: '2', title: 'Paste your URL', description: 'Enter any long URL into the dashboard and hit shorten.' },
  { step: '3', title: 'Share your link', description: 'Copy the short link and start sharing it with the world.' },
];

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect('/dashboard');
  }

  return (
    <div className="flex flex-col gap-24 py-12">
      {/* Hero */}
      <section className="flex flex-col items-center gap-6 text-center">
        <div className="flex items-center justify-center rounded-full border p-4">
          <Link2 className="h-10 w-10" />
        </div>
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
          Shorten URLs. <br className="hidden sm:block" />
          <span className="text-muted-foreground">Track every click.</span>
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          Link Shortener turns long, unwieldy URLs into clean, shareable links — with built-in
          analytics so you always know how your links are performing.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <SignUpButton mode="modal">
            <Button size="lg">Get Started — it&apos;s free</Button>
          </SignUpButton>
          <SignInButton mode="modal">
            <Button size="lg" variant="outline">Sign In</Button>
          </SignInButton>
        </div>
      </section>

      {/* Features */}
      <section className="flex flex-col items-center gap-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">Everything you need</h2>
          <p className="mt-2 text-muted-foreground">
            A simple but powerful toolset for managing all your links.
          </p>
        </div>
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <Card key={title}>
              <CardHeader className="gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md border">
                  <Icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="flex flex-col items-center gap-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">How it works</h2>
          <p className="mt-2 text-muted-foreground">Up and running in three simple steps.</p>
        </div>
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-3">
          {steps.map(({ step, title, description }) => (
            <Card key={step} className="text-center">
              <CardHeader className="items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border text-xl font-bold">
                  {step}
                </div>
                <CardTitle className="text-lg">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="flex flex-col items-center gap-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight">Ready to get started?</h2>
        <p className="max-w-md text-muted-foreground">
          Join today and take control of your links — no credit card required.
        </p>
        <SignUpButton mode="modal">
          <Button size="lg">Create your free account</Button>
        </SignUpButton>
      </section>
    </div>
  );
}
