"use client";

import Link from 'next/link';
import { useState } from 'react';
import { getAllCategories, getPostsByCategory } from '@/lib/posts';
import { PostCard } from '@/components/blog/PostCard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const categories = getAllCategories();
  
  const posts = selectedCategory 
    ? getPostsByCategory(selectedCategory)
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">Categories</h1>
        <p className="max-w-2xl mx-auto text-xl text-muted-foreground">
          Browse articles by topic to find exactly what you're looking for.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
        {categories.map((category) => (
          <div
            key={category.id}
            className={cn(
              "group border rounded-lg p-6 transition-all cursor-pointer",
              selectedCategory === category.slug
                ? "border-primary bg-primary/5 shadow-sm"
                : "hover:border-primary/50 hover:shadow-sm"
            )}
            onClick={() => setSelectedCategory(
              selectedCategory === category.slug ? null : category.slug
            )}
          >
            <div className="flex flex-col items-center text-center">
              <div className={cn(
                "w-16 h-16 rounded-full flex items-center justify-center mb-4",
                category.color
              )}>
                <span className="text-2xl font-bold">
                  {category.name.charAt(0)}
                </span>
              </div>
              <h2 className="text-xl font-semibold">{category.name}</h2>
              <p className="text-sm text-muted-foreground mt-2">
                {getPostsByCategory(category.slug).length} articles
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {selectedCategory && (
        <>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight">
              {categories.find(c => c.slug === selectedCategory)?.name} Articles
            </h2>
            <Button 
              variant="ghost" 
              onClick={() => setSelectedCategory(null)}
            >
              View All Categories
            </Button>
          </div>
          
          {posts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No articles found</h3>
              <p className="text-muted-foreground mb-6">
                We couldn't find any articles in this category yet.
              </p>
              <Button asChild>
                <Link href="/blog">Browse All Articles</Link>
              </Button>
            </div>
          )}
        </>
      )}
      
      {!selectedCategory && (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-4">Select a category</h3>
          <p className="text-muted-foreground">
            Choose a category from above to view related articles.
          </p>
        </div>
      )}
    </div>
  );
}