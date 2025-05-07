import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-16 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">About Perspectify</h1>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="lead">
            Perspectify started with a simple mission: to provide thoughtful perspectives on technology, design, and culture in a world often dominated by hot takes and shallow analysis.
          </p>

          <p>
            In an age of information overload, we believe in the value of carefully considered, well-researched content that helps readers see familiar topics from new angles. Our name reflects this mission — to help you see things from different perspectives.
          </p>

          <h2>Our Approach</h2>

          <p>
            Every article on Perspectify aims to:
          </p>

          <ul>
            <li>Cut through noise to deliver meaningful insights</li>
            <li>Provide context that helps readers understand the bigger picture</li>
            <li>Challenge conventional thinking and introduce fresh perspectives</li>
            <li>Remain accessible while never oversimplifying complex topics</li>
          </ul>

          <h2>Our Team</h2>

          <p>
            Perspectify is brought to you by a diverse team of writers, researchers, and industry experts who share a passion for thoughtful analysis and clear communication.
          </p>

          <div className="my-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 relative h-32 w-32 overflow-hidden rounded-full">
                <Image
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300"
                  alt="Alex Morgan"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">Alex Morgan</h3>
              <p className="text-sm text-muted-foreground">Founder & Editor</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 relative h-32 w-32 overflow-hidden rounded-full">
                <Image
                  src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300"
                  alt="Jamie Wu"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">Jamie Wu</h3>
              <p className="text-sm text-muted-foreground">Design Editor</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 relative h-32 w-32 overflow-hidden rounded-full">
                <Image
                  src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300"
                  alt="Sam Rivera"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">Sam Rivera</h3>
              <p className="text-sm text-muted-foreground">Business Editor</p>
            </div>
          </div>

          <h2>Join the Conversation</h2>

          <p>
            We believe that the best insights often emerge from dialogue. That's why we encourage readers to engage with our content, share their perspectives, and challenge our thinking.
          </p>

          <p>
            Whether through comments, social media, or email, we welcome your voice in the conversation.
          </p>
        </div>

        <div className="mt-12 flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/blog">
              Browse Articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="mailto:contact@perspectify.com">
              Contact Us
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}