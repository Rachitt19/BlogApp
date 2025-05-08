import Link from 'next/link';
import { BookOpen, Mail, Twitter, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
          <div className="flex flex-col">
            <Link href="/" className="flex items-center gap-2">
              <BookOpen className="h-6 w-6" />
              <span className="text-lg font-bold">Perspectify</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Exploring insights, stories, and perspectives on technology, design, and culture.
            </p>
            <div className="mt-4 flex space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="mailto:hello@perspectify.com">
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </Link>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium">Navigation</h3>
            <nav className="mt-4 flex flex-col space-y-2">
              <Link href="/" className="text-sm text-muted-foreground hover:text-primary">Home</Link>
              <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary">Blog</Link>
              <Link href="/categories" className="text-sm text-muted-foreground hover:text-primary">Categories</Link>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">About</Link>
            </nav>
          </div>

          <div>
            <h3 className="text-lg font-medium">Categories</h3>
            <nav className="mt-4 flex flex-col space-y-2">
              <Link href="/categories/technology" className="text-sm text-muted-foreground hover:text-primary">Technology</Link>
              <Link href="/categories/design" className="text-sm text-muted-foreground hover:text-primary">Design</Link>
              <Link href="/categories/culture" className="text-sm text-muted-foreground hover:text-primary">Culture</Link>
              <Link href="/categories/business" className="text-sm text-muted-foreground hover:text-primary">Business</Link>
            </nav>
          </div>

          <div className="md:col-span-3 lg:col-span-1">
            <h3 className="text-lg font-medium">Subscribe to our newsletter</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Get the latest articles, resources and updates right in your inbox.
            </p>
            <form className="mt-4 flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
              <Input
                type="email"
                placeholder="Enter your email"
                className="sm:flex-1"
                required
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t pt-6">
          <p className="text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Perspectify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}