// Sample authors
export const authors = [
    {
      id: "1",
      name: "Alex Morgan",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150",
      bio: "Alex is a tech enthusiast and writer with over 10 years of experience in the industry. He specializes in AI and emerging technologies."
    },
    {
      id: "2",
      name: "Jamie Wu",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150",
      bio: "Jamie is a UX designer and writer focused on creating accessible, beautiful digital experiences."
    },
    {
      id: "3",
      name: "Sam Rivera",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150",
      bio: "Sam writes about business strategy, entrepreneurship, and the future of work."
    }
  ];
  
  // Sample categories
  export const categories = [
    {
      id: "1",
      name: "Technology",
      slug: "technology",
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    },
    {
      id: "2",
      name: "Design",
      slug: "design",
      color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
    },
    {
      id: "3",
      name: "Culture",
      slug: "culture",
      color: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
    },
    {
      id: "4",
      name: "Business",
      slug: "business",
      color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300"
    }
  ];
  
  // Sample posts data
  export const posts = [
    {
      id: "1",
      title: "The Future of AI in Everyday Technology",
      slug: "future-of-ai-in-everyday-technology",
      excerpt: "How artificial intelligence is becoming an invisible but essential part of the tools we use daily.",
      content: `
  # The Future of AI in Everyday Technology
  
  Artificial intelligence has rapidly evolved from a sci-fi concept to an integral part of our daily lives. While many people think of AI in terms of robots or virtual assistants, its influence extends far beyond these visible applications.
  
  ## The Invisible Integration
  
  Today's AI systems are increasingly working behind the scenes, powering recommendation engines, predictive text, and even the autocorrect feature you might be using right now. These subtle implementations represent the true revolution of AI - not as standalone technology but as an enhancement to existing tools.
  
  ### Smart Homes and IoT
  
  One of the most visible areas where AI is making an impact is in smart home technology. From thermostats that learn your preferences to refrigerators that can suggest recipes based on their contents, AI is making our homes more responsive to our needs.
  
  ### Transportation and Navigation
  
  Navigation apps now do more than simply provide directions. They analyze traffic patterns, predict delays, and suggest alternate routes in real-time. Self-driving car technology continues to advance, with AI systems becoming increasingly capable of handling complex driving scenarios.
  
  ## The Challenges Ahead
  
  As AI becomes more embedded in our everyday technology, important questions arise about privacy, security, and dependency. How much data should these systems collect? Who has access to this information? What happens when these systems fail?
  
  ### Finding the Balance
  
  The key challenge for technology companies will be finding the right balance between functionality and privacy. Users want personalized experiences but are increasingly concerned about how their data is being used.
  
  ## The Path Forward
  
  The future of AI in everyday technology is not about creating sentient machines or replacing human intelligence. It's about enhancing our capabilities, automating routine tasks, and making technology more intuitive and responsive to our needs.
  
  As we move forward, the most successful AI implementations will be those that we barely notice - they'll simply make our existing tools work better for us.
      `,
      coverImage: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      date: "2023-10-15",
      readingTime: 8,
      author: authors[0],
      categories: [categories[0]],
      featured: true
    },
    {
      id: "2",
      title: "Designing for Accessibility: A Practical Guide",
      slug: "designing-for-accessibility-practical-guide",
      excerpt: "How focusing on accessibility creates better products for everyone, not just users with disabilities.",
      content: `
  # Designing for Accessibility: A Practical Guide
  
  Accessibility in design isn't just a checkbox for compliance—it's an approach that leads to better products for all users. When we design with accessibility in mind, we create experiences that are more flexible, intuitive, and usable for everyone.
  
  ## Beyond Compliance
  
  While legal requirements like the ADA or WCAG guidelines provide a baseline, true accessibility goes beyond checking boxes. It's about understanding the diverse ways people interact with technology and designing to accommodate these different needs.
  
  ### Keyboard Navigation
  
  Many users rely on keyboards rather than mice for navigation. This includes people with motor disabilities, power users who prefer keyboard shortcuts, and those using screen readers. Ensuring your interface works seamlessly with keyboard-only navigation benefits all these groups.
  
  ### Color and Contrast
  
  Designing with sufficient color contrast doesn't just help users with visual impairments—it makes your interface more usable in different lighting conditions, like bright sunlight or dark environments.
  
  ## Practical Implementation
  
  Implementing accessibility doesn't have to be complicated. Here are some starting points:
  
  ### Semantic HTML
  
  Using proper HTML elements like buttons for interactive elements, headings for structure, and lists for groups of related items provides built-in accessibility features.
  
  ### Testing with Real Users
  
  The most valuable insights come from watching people with various abilities use your product. User testing with diverse participants can reveal issues that automated checks might miss.
  
  ## The Business Case
  
  Prioritizing accessibility isn't just the right thing to do—it's good for business. Accessible products reach larger markets, reduce legal risks, and often provide better experiences for all users.
  
  ### Market Expansion
  
  About 15% of the world's population lives with some form of disability. Designing accessible products allows you to reach this substantial market segment.
  
  ## Conclusion
  
  Accessibility isn't a feature—it's a fundamental aspect of good design. By integrating accessibility considerations from the beginning of your design process, you create products that are more usable, more inclusive, and ultimately more successful.
      `,
      coverImage: "https://images.pexels.com/photos/3009876/pexels-photo-3009876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      date: "2023-09-28",
      readingTime: 6,
      author: authors[1],
      categories: [categories[1]]
    },
    {
      id: "3",
      title: "Remote Work Culture: Building Connection from Afar",
      slug: "remote-work-culture-building-connection",
      excerpt: "Strategies for maintaining strong team bonds and company culture in distributed workforces.",
      content: `
  # Remote Work Culture: Building Connection from Afar
  
  As remote and hybrid work arrangements become the norm rather than the exception, companies face new challenges in maintaining team cohesion and organizational culture. Building connection across physical distance requires intentional strategies and new approaches to collaboration.
  
  ## The Challenge of Distance
  
  When teams don't share physical space, the spontaneous interactions that naturally build relationships - coffee chats, hallway conversations, impromptu brainstorming sessions - don't happen organically. Remote teams need to create virtual versions of these connection points.
  
  ### Communication Channels
  
  Successful remote teams typically use a mix of communication tools:
  - Synchronous: Video meetings, voice calls, and instant messaging
  - Asynchronous: Email, document collaboration, and project management tools
  
  The key is establishing clear guidelines for which channels to use for different types of communication.
  
  ## Rituals and Routines
  
  Shared experiences help build team identity even when members are physically separated. Consider implementing:
  
  ### Virtual Social Events
  
  From simple coffee chats to structured team-building activities, creating space for non-work conversation helps team members connect as people.
  
  ### Celebration Rituals
  
  Recognizing achievements, work anniversaries, and personal milestones helps maintain a sense of shared journey and mutual support.
  
  ## Documentation and Transparency
  
  In remote settings, information sharing becomes even more critical. When team members can't simply turn to a colleague with a quick question, comprehensive documentation becomes essential.
  
  ### Knowledge Management
  
  Investing in knowledge bases, wikis, and process documentation ensures that team members can find information independently, reducing friction and frustration.
  
  ## Intentional Onboarding
  
  For new team members, joining a remote organization can be particularly challenging. Without the immersive experience of a physical workplace, it's harder to absorb company culture and build relationships.
  
  ### Buddy Systems
  
  Pairing new hires with experienced team members provides personal guidance and an immediate connection point.
  
  ## Conclusion
  
  Building a strong remote work culture doesn't happen by accident. It requires intentional design, consistent effort, and regular evaluation. However, the organizations that succeed in creating connection across distance gain significant advantages in talent acquisition, employee satisfaction, and organizational resilience.
      `,
      coverImage: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      date: "2023-09-10",
      readingTime: 7,
      author: authors[2],
      categories: [categories[2], categories[3]]
    }
  ];