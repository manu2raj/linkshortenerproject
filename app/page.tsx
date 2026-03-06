import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SignInButton, SignUpButton } from '@clerk/nextjs';
import { Link2, BarChart2, MousePointerClick, Shield, Zap, Globe } from 'lucide-react';

const features = [
  {
    icon: Link2,
    title: 'Shorten Any URL',
    description: 'Transform long, unwieldy URLs into short, clean links you can share anywhere.',
  },
  {
    icon: BarChart2,
    title: 'Track Click Analytics',
    description: 'See exactly how many times your links are clicked with real-time analytics.',
  },
  {
    icon: MousePointerClick,
    title: 'Easy Management',
    description: 'View, edit, and organize all your shortened links from one simple dashboard.',
  },
  {
    icon: Zap,
    title: 'Instant Redirects',
    description: 'Lightning-fast redirects ensure your visitors reach their destination without delay.',
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Your links are protected and always available, backed by serverless infrastructure.',
  },
  {
    icon: Globe,
    title: 'Share Everywhere',
    description: 'Use your short links in social media, emails, QR codes, and more.',
  },
];

const steps = [
  { step: '1', title: 'Sign Up', description: 'Create a free account in seconds with just your email.' },
  { step: '2', title: 'Paste Your URL', description: 'Enter any long URL you want to shorten.' },
  { step: '3', title: 'Share & Track', description: 'Copy your short link and monitor its performance.' },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center py-24 text-center gap-6">
        <div className="flex items-center justify-center rounded-full bg-primary/10 p-4 mb-2">
          <Link2 className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl max-w-3xl">
          Shorten, Share & Track Your Links
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl">
          The simplest way to create short, memorable URLs and gain insights into every click — all in one place.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-2">
          <SignUpButton mode="modal">
            <Button size="lg">Get Started Free</Button>
          </SignUpButton>
          <SignInButton mode="modal">
            <Button size="lg" variant="outline">Sign In</Button>
          </SignInButton>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Everything You Need</h2>
          <p className="text-muted-foreground mt-2">Powerful features to manage and grow your links.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <Card key={title}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-md bg-primary/10 p-2">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">{description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">How It Works</h2>
          <p className="text-muted-foreground mt-2">Three simple steps to get your first short link.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {steps.map(({ step, title, description }) => (
            <Card key={step} className="text-center">
              <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold mb-2">
                  {step}
                </div>
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Ready to get started?</CardTitle>
            <CardDescription className="text-base">
              Join today and start shortening links for free. No credit card required.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center gap-4">
            <SignUpButton mode="modal">
              <Button size="lg">Create Your Account</Button>
            </SignUpButton>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
