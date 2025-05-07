import { searchPosts } from '@/lib/posts';
import { PostCard } from '@/components/blog/PostCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export default function SearchPage({ searchParams }) {
  const query = searchParams?.q?.trim() || '';
  const searchResults = query ? searchPosts(query) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-8">Search Results</h1>

        <form action="/search" className="flex gap-2 max-w-lg mx-auto">
          <Input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Search articles..."
            className="flex-1"
          />
          <Button type="submit">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </form>
      </div>

      {query && (
        <div className="mb-8">
          <p className="text-lg">
            {searchResults.length === 0
              ? `No results found for "${query}"`
              : `Found ${searchResults.length} result${searchResults.length === 1 ? '' : 's'} for "${query}"`}
          </p>
        </div>
      )}

      {searchResults.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {searchResults.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {query && searchResults.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-4">No articles found</h3>
          <p className="text-muted-foreground mb-8">
            Try searching with different keywords or browse our categories.
          </p>
          <Button asChild>
            <a href="/blog">Browse All Articles</a>
          </Button>
        </div>
      )}
    </div>
  );
}