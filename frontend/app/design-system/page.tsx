'use client';

import React from 'react';
import { Button, Card, CardHeader, CardBody, CardFooter, Input, Textarea, Badge, StatusBadge } from '@/components/ui';
import { FiSearch, FiMail, FiLock, FiUser, FiArrowRight, FiCheck, FiInfo, FiAlertCircle } from 'react-icons/fi';

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-gray-900">Business of One Design System</h1>
          <p className="mt-2 text-lg text-gray-600">
            A comprehensive design system for one-person businesses seeking growth
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Colors Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Colors</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Primary Colors */}
            <Card>
              <CardHeader title="Primary" subtitle="Utlyze Blue" />
              <CardBody>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary-500 rounded-lg shadow-sm"></div>
                    <div>
                      <p className="font-medium">Primary 500</p>
                      <p className="text-sm text-gray-500">#4169E1</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary-600 rounded-lg shadow-sm"></div>
                    <div>
                      <p className="font-medium">Primary 600</p>
                      <p className="text-sm text-gray-500">#2d52d5</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg shadow-sm"></div>
                    <div>
                      <p className="font-medium">Primary 100</p>
                      <p className="text-sm text-gray-500">#dbe6fe</p>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Accent Colors */}
            <Card>
              <CardHeader title="Accent" subtitle="Teal" />
              <CardBody>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-accent-500 rounded-lg shadow-sm"></div>
                    <div>
                      <p className="font-medium">Accent 500</p>
                      <p className="text-sm text-gray-500">#16A085</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-accent-600 rounded-lg shadow-sm"></div>
                    <div>
                      <p className="font-medium">Accent 600</p>
                      <p className="text-sm text-gray-500">#0f766e</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-accent-100 rounded-lg shadow-sm"></div>
                    <div>
                      <p className="font-medium">Accent 100</p>
                      <p className="text-sm text-gray-500">#ccfbf1</p>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Neutral Colors */}
            <Card>
              <CardHeader title="Neutral" subtitle="Grays" />
              <CardBody>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-900 rounded-lg shadow-sm"></div>
                    <div>
                      <p className="font-medium">Gray 900</p>
                      <p className="text-sm text-gray-500">#111827</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-600 rounded-lg shadow-sm border"></div>
                    <div>
                      <p className="font-medium">Gray 600</p>
                      <p className="text-sm text-gray-500">#4b5563</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg shadow-sm border"></div>
                    <div>
                      <p className="font-medium">Gray 100</p>
                      <p className="text-sm text-gray-500">#f3f4f6</p>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Semantic Colors */}
            <Card>
              <CardHeader title="Semantic" subtitle="Status Colors" />
              <CardBody>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-600 rounded-lg shadow-sm"></div>
                    <div>
                      <p className="font-medium">Success</p>
                      <p className="text-sm text-gray-500">#059669</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-yellow-500 rounded-lg shadow-sm"></div>
                    <div>
                      <p className="font-medium">Warning</p>
                      <p className="text-sm text-gray-500">#f59e0b</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-red-500 rounded-lg shadow-sm"></div>
                    <div>
                      <p className="font-medium">Error</p>
                      <p className="text-sm text-gray-500">#ef4444</p>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </section>

        {/* Typography Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Typography</h2>
          
          <Card>
            <CardBody>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">7xl - 4.5rem</p>
                  <h1 className="text-7xl font-bold">Business of One</h1>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">5xl - 3rem</p>
                  <h2 className="text-5xl font-bold">Empowering Solo Entrepreneurs</h2>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">3xl - 1.875rem</p>
                  <h3 className="text-3xl font-semibold">Build Your Business</h3>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">xl - 1.25rem</p>
                  <h4 className="text-xl font-medium">Professional Design System</h4>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">base - 1rem</p>
                  <p className="text-base">This is body text. It's optimized for readability with a line height of 1.5 and uses Inter font family for clarity.</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">sm - 0.875rem</p>
                  <p className="text-sm text-gray-600">Small text for secondary information and metadata.</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </section>

        {/* Buttons Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Buttons</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Button Variants */}
            <Card>
              <CardHeader title="Variants" />
              <CardBody>
                <div className="space-y-3">
                  <Button variant="primary">Primary Button</Button>
                  <Button variant="accent">Accent Button</Button>
                  <Button variant="secondary">Secondary Button</Button>
                  <Button variant="outline">Outline Button</Button>
                  <Button variant="ghost">Ghost Button</Button>
                  <Button variant="danger">Danger Button</Button>
                </div>
              </CardBody>
            </Card>

            {/* Button Sizes */}
            <Card>
              <CardHeader title="Sizes" />
              <CardBody>
                <div className="space-y-3">
                  <Button size="sm">Small Button</Button>
                  <Button size="md">Medium Button</Button>
                  <Button size="lg">Large Button</Button>
                  <Button size="xl">Extra Large Button</Button>
                </div>
              </CardBody>
            </Card>

            {/* Button States */}
            <Card>
              <CardHeader title="States" />
              <CardBody>
                <div className="space-y-3">
                  <Button icon={<FiCheck />}>With Icon</Button>
                  <Button icon={<FiArrowRight />} iconPosition="right">Icon Right</Button>
                  <Button loading>Loading...</Button>
                  <Button disabled>Disabled</Button>
                  <Button fullWidth>Full Width Button</Button>
                </div>
              </CardBody>
            </Card>

            {/* Button Combinations */}
            <Card>
              <CardHeader title="Combinations" />
              <CardBody>
                <div className="space-y-3">
                  <Button variant="primary" size="lg" icon={<FiArrowRight />} iconPosition="right">
                    Get Started
                  </Button>
                  <Button variant="accent" size="sm" icon={<FiMail />}>
                    Contact Us
                  </Button>
                  <Button variant="outline" loading>
                    Processing...
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        </section>

        {/* Cards Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Cards</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Default Card */}
            <Card>
              <CardHeader 
                title="Default Card" 
                subtitle="Basic card component"
                action={<Badge variant="primary">New</Badge>}
              />
              <CardBody>
                <p className="text-gray-600">
                  This is a default card with a clean design and subtle border.
                </p>
              </CardBody>
              <CardFooter>
                <Button variant="primary" fullWidth>Learn More</Button>
              </CardFooter>
            </Card>

            {/* Elevated Card */}
            <Card variant="elevated" hoverable>
              <CardHeader 
                title="Elevated Card" 
                subtitle="With shadow and hover effect"
              />
              <CardBody>
                <p className="text-gray-600">
                  This card has elevation with a shadow and responds to hover.
                </p>
              </CardBody>
              <CardFooter>
                <Button variant="accent" fullWidth>Explore</Button>
              </CardFooter>
            </Card>

            {/* Outlined Card */}
            <Card variant="outlined" clickable>
              <CardHeader 
                title="Outlined Card" 
                subtitle="Clickable with outline"
              />
              <CardBody>
                <p className="text-gray-600">
                  This card has a prominent outline and is clickable.
                </p>
              </CardBody>
              <CardFooter>
                <Button variant="outline" fullWidth>View Details</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Form Elements Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Form Elements</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Variants */}
            <Card>
              <CardHeader title="Input Fields" />
              <CardBody>
                <div className="space-y-4">
                  <Input 
                    label="Email Address"
                    placeholder="you@example.com"
                    leftIcon={<FiMail />}
                    hint="We'll never share your email"
                  />
                  
                  <Input 
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    leftIcon={<FiLock />}
                  />
                  
                  <Input 
                    label="Username"
                    placeholder="johndoe"
                    leftIcon={<FiUser />}
                    error="Username already taken"
                  />
                  
                  <Input 
                    variant="filled"
                    label="Search"
                    placeholder="Search for anything..."
                    leftIcon={<FiSearch />}
                  />
                  
                  <Input 
                    variant="underline"
                    label="Website"
                    placeholder="https://example.com"
                  />
                </div>
              </CardBody>
            </Card>

            {/* Textarea */}
            <Card>
              <CardHeader title="Textarea" />
              <CardBody>
                <div className="space-y-4">
                  <Textarea 
                    label="Description"
                    placeholder="Tell us about your business..."
                    rows={4}
                    hint="Maximum 500 characters"
                  />
                  
                  <Textarea 
                    variant="filled"
                    label="Message"
                    placeholder="Type your message here..."
                    rows={3}
                  />
                  
                  <Textarea 
                    label="Feedback"
                    placeholder="We'd love to hear from you"
                    error="Please provide at least 10 characters"
                    rows={3}
                  />
                </div>
              </CardBody>
            </Card>
          </div>
        </section>

        {/* Badges Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Badges</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Badge Variants */}
            <Card>
              <CardHeader title="Badge Variants" />
              <CardBody>
                <div className="flex flex-wrap gap-2">
                  <Badge>Default</Badge>
                  <Badge variant="primary">Primary</Badge>
                  <Badge variant="accent">Accent</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="error">Error</Badge>
                  <Badge variant="info">Info</Badge>
                </div>
              </CardBody>
            </Card>

            {/* Badge Features */}
            <Card>
              <CardHeader title="Badge Features" />
              <CardBody>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Badge size="sm">Small</Badge>
                    <Badge size="md">Medium</Badge>
                    <Badge size="lg">Large</Badge>
                  </div>
                  
                  <div className="flex gap-2">
                    <Badge dot variant="success">With Dot</Badge>
                    <Badge rounded variant="primary">Rounded</Badge>
                    <Badge dot rounded variant="accent">Both</Badge>
                  </div>
                  
                  <div className="flex gap-2">
                    <StatusBadge status="active" />
                    <StatusBadge status="pending" />
                    <StatusBadge status="inactive" />
                    <StatusBadge status="error" />
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </section>

        {/* Shadows Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Shadows & Elevation</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <p className="font-medium">Shadow SM</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <p className="font-medium">Shadow Base</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="font-medium">Shadow MD</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <p className="font-medium">Shadow LG</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-xl text-center">
              <p className="font-medium">Shadow XL</p>
            </div>
          </div>
        </section>

        {/* Spacing Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Spacing System</h2>
          
          <Card>
            <CardBody>
              <div className="space-y-4">
                {[1, 2, 3, 4, 6, 8, 12, 16, 20, 24].map((space) => (
                  <div key={space} className="flex items-center gap-4">
                    <span className="text-sm font-mono text-gray-500 w-20">
                      {space} ({space * 0.25}rem)
                    </span>
                    <div className={`bg-primary-500 h-4 rounded`} style={{ width: `${space * 0.25}rem` }}></div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </section>
      </main>
    </div>
  );
}