'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getFeaturedPosts, getRecentPosts } from '@/lib/posts';
import { FeaturedPost } from '@/components/blog/FeaturedPost';
import { PostCard } from '@/components/blog/PostCard';
import { Button } from '@/components/ui/button';
import { NewsletterForm } from '@/components/blog/NewsletterForm';

export default function Home() {
  const featuredPosts = getFeaturedPosts();
  const recentPosts = getRecentPosts(4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
          <span className="block">Explore insights on</span>
          <span className="block mt-2">technology, design, and culture</span>
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-muted-foreground mb-8">
          Thoughtful perspectives that inspire, inform, and challenge conventional thinking.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/blog">
              Browse All Articles
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/categories">
              Explore Categories
            </Link>
          </Button>
        </div>
      </section>

      {/* Featured post section */}
      {featuredPosts.length > 0 && (
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight">Featured</h2>
          </div>
          <FeaturedPost post={featuredPosts[0]} />
        </section>
      )}

      {/* Recent posts section */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Recent Articles</h2>
          <Button variant="ghost" asChild>
            <Link href="/blog" className="group">
              View All 
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recentPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      {/* Newsletter section */}
      <section className="bg-muted rounded-lg p-8 md:p-12 mb-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Stay informed with our newsletter
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Get the latest articles, resources, and updates right in your inbox.
          </p>
          <div className="max-w-md mx-auto">
            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  );
}