#!/usr/bin/env node

/**
 * Business of One - Dynamic Agent Orchestrator
 * 
 * Template for creating orchestrators for other "Of One" sites.
 * Replace Business of One, One-person businesses seeking growth, and customize TASK_REGISTRY.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Site-specific configuration
const SITE_CONFIG = {
  name: 'Business of One',  // e.g., 'Director of One'
  domain: 'businessofone.ai',   // e.g., 'directorofone.ai'
  targetAudience: 'One-person businesses seeking growth', // e.g., 'one-person department managers'
  primaryColor: '#4169E1',  // Utlyze blue (keep consistent)
  accentColor: '#16A085',  // Customize per site type
};

// Task Registry with Dependencies
const TASK_REGISTRY = {
  // Design & Branding Tasks
  'design-system': {
    id: 'design-system',
    name: `Create ${SITE_CONFIG.name} Design System`,
    path: 'frontend/src/styles/design-system.ts',
    dependencies: [],
    estimatedHours: 3,
    priority: 'CRITICAL',
    prompt: `Create design system for ${SITE_CONFIG.name}. Use Utlyze blue (#4169E1) as primary, ${SITE_CONFIG.accentColor} as accent. Target audience: ${SITE_CONFIG.targetAudience}. Clean, professional, trustworthy design.`,
    completionCheck: () => fs.existsSync('frontend/src/styles/design-system.ts')
  },

  // Content Creation Tasks
  'content-strategy': {
    id: 'content-strategy',
    name: `Develop ${SITE_CONFIG.name} Content`,
    dependencies: [],
    estimatedHours: 4,
    priority: 'CRITICAL',
    prompt: `Create content for ${SITE_CONFIG.name}. Target: ${SITE_CONFIG.targetAudience}. Pain points: Running solo is rewarding but overwhelming, Important growth tasks get sidelined, Jack of all trades, master of none, No clear path to scale. Solution: One-stop consulting and tools to run your business like a world-class company. Focus on Business audit and optimization, Growth strategy development, Automation implementation, Ongoing advisory support.`,
    completionCheck: () => fs.existsSync('content/copy/homepage.md')
  },

  // Frontend Development Tasks
  'nextjs-setup': {
    id: 'nextjs-setup',
    name: 'Initialize Next.js Project',
    dependencies: [],
    estimatedHours: 2,
    priority: 'CRITICAL',
    prompt: 'Initialize Next.js 14 with TypeScript, Tailwind CSS, App Router. Standard Utlyze setup.',
    completionCheck: () => fs.existsSync('frontend/package.json')
  },

  'component-library': {
    id: 'component-library',
    name: 'Build Component Library',
    dependencies: ['nextjs-setup', 'design-system'],
    estimatedHours: 4,
    priority: 'HIGH',
    prompt: 'Create reusable components using design system. Standard Utlyze component set.',
    completionCheck: () => fs.existsSync('frontend/src/components/ui/Button.tsx')
  },

  'landing-page': {
    id: 'landing-page',
    name: `Build ${SITE_CONFIG.name} Landing Page`,
    dependencies: ['component-library', 'content-strategy'],
    estimatedHours: 4,
    priority: 'CRITICAL',
    prompt: `Build landing page for ${SITE_CONFIG.name}. Hero, pain points, solution, features, testimonials, CTAs. Multiple consultation CTAs.`,
    completionCheck: () => fs.existsSync('frontend/src/app/page.tsx')
  },

  // Backend Tasks
  'api-setup': {
    id: 'api-setup',
    name: 'Setup API Infrastructure',
    dependencies: [],
    estimatedHours: 3,
    priority: 'HIGH',
    prompt: 'Standard Express.js API setup with TypeScript. Vercel-ready.',
    completionCheck: () => fs.existsSync('backend/src/api/server.ts')
  },

  // Blog Infrastructure Tasks
  'blog-setup': {
    id: 'blog-setup',
    name: 'Initialize Blog Infrastructure',
    dependencies: ['nextjs-setup'],
    estimatedHours: 3,
    priority: 'HIGH',
    prompt: 'Set up blog infrastructure for Business of One. Create blog routes in Next.js app router (/blog, /blog/[slug]), implement MDX support with gray-matter and next-mdx-remote, create blog layouts and components. Follow the blog infrastructure documentation in docs/BLOG_INFRASTRUCTURE.md.',
    completionCheck: () => fs.existsSync('frontend/src/app/blog/page.tsx')
  },

  'blog-components': {
    id: 'blog-components',
    name: 'Build Blog Components',
    dependencies: ['blog-setup', 'component-library'],
    estimatedHours: 4,
    priority: 'HIGH',
    prompt: 'Create blog-specific components: BlogCard, BlogPost, AuthorBio, CategoryTag, ShareButtons, RelatedPosts, NewsletterCTA. Use the design system. Components should be reusable and follow the Business of One brand guidelines.',
    completionCheck: () => fs.existsSync('frontend/src/components/blog/BlogCard.tsx')
  },

  'blog-content-layer': {
    id: 'blog-content-layer',
    name: 'Implement Blog Content Layer',
    dependencies: ['blog-setup'],
    estimatedHours: 4,
    priority: 'HIGH',
    prompt: 'Create content management layer for blog posts. Implement MDX processing, frontmatter parsing, content validation, and utilities for fetching posts, categories, and tags. Create sample blog posts in content/blog/ directory covering Business of One topics.',
    completionCheck: () => fs.existsSync('frontend/src/lib/blog/contentLayer.ts')
  },

  'blog-api': {
    id: 'blog-api',
    name: 'Create Blog API Endpoints',
    dependencies: ['api-setup', 'blog-content-layer'],
    estimatedHours: 3,
    priority: 'MEDIUM',
    prompt: 'Implement blog API endpoints: GET /api/blog/posts (with pagination), GET /api/blog/posts/[slug], GET /api/blog/categories, GET /api/blog/search, POST /api/blog/subscribe. Include proper error handling and caching.',
    completionCheck: () => fs.existsSync('backend/src/api/routes/blog.ts')
  },

  'blog-seo': {
    id: 'blog-seo',
    name: 'Implement Blog SEO Features',
    dependencies: ['blog-setup', 'blog-components'],
    estimatedHours: 3,
    priority: 'HIGH',
    prompt: 'Add SEO features to blog: dynamic meta tags, OpenGraph/Twitter cards, schema.org markup for articles, XML sitemap generation for blog posts, RSS feed at /blog/feed.xml. Ensure all blog pages have proper SEO optimization.',
    completionCheck: () => fs.existsSync('frontend/src/app/blog/sitemap.ts')
  },

  'blog-analytics': {
    id: 'blog-analytics',
    name: 'Add Blog Analytics',
    dependencies: ['blog-setup'],
    estimatedHours: 2,
    priority: 'MEDIUM',
    prompt: 'Integrate Google Analytics 4 with blog, add custom events for: article reads, scroll depth, time on page, CTA clicks, newsletter signups from blog. Create a simple analytics dashboard component for blog performance.',
    completionCheck: () => fs.existsSync('frontend/src/lib/blog/analytics.ts')
  },

  'blog-features': {
    id: 'blog-features',
    name: 'Add Blog Engagement Features',
    dependencies: ['blog-components', 'blog-api'],
    estimatedHours: 4,
    priority: 'MEDIUM',
    prompt: 'Implement blog engagement features: comment system (use Disqus or build custom), social sharing buttons, related posts algorithm, reading progress indicator, estimated reading time, bookmark functionality.',
    completionCheck: () => fs.existsSync('frontend/src/components/blog/Comments.tsx')
  },

  'blog-admin': {
    id: 'blog-admin',
    name: 'Create Blog Admin Interface',
    dependencies: ['blog-api', 'blog-content-layer'],
    estimatedHours: 5,
    priority: 'LOW',
    prompt: 'Build simple admin interface for blog management at /admin/blog. Include: post editor with live preview, draft/publish functionality, media upload, basic analytics view. Protect with authentication.',
    completionCheck: () => fs.existsSync('frontend/src/app/admin/blog/page.tsx')
  },

  // Add more tasks as needed...
};

// Standard orchestrator functions (same as CEO of One)
function findReadyTasks() {
  const readyTasks = [];
  const completedTasks = new Set();
  
  for (const [taskId, task] of Object.entries(TASK_REGISTRY)) {
    if (task.completionCheck && task.completionCheck()) {
      completedTasks.add(taskId);
    }
  }
  
  for (const [taskId, task] of Object.entries(TASK_REGISTRY)) {
    if (completedTasks.has(taskId)) continue;
    
    const dependenciesMet = task.dependencies.every(dep => completedTasks.has(dep));
    if (dependenciesMet) {
      readyTasks.push(task);
    }
  }
  
  const priorityOrder = { 'CRITICAL': 0, 'HIGH': 1, 'MEDIUM': 2, 'LOW': 3 };
  readyTasks.sort((a, b) => {
    return (priorityOrder[a.priority] || 3) - (priorityOrder[b.priority] || 3);
  });
  
  return { readyTasks, completedTasks };
}

function generateAgentCommands(tasks) {
  const commands = [];
  
  tasks.forEach((task, index) => {
    const command = {
      terminal: index + 1,
      name: task.name,
      command: `cd "${process.cwd()}" && CURSOR_BACKGROUND_AGENT_PROMPT="${task.prompt}" npm run background`,
      estimatedHours: task.estimatedHours,
      priority: task.priority
    };
    commands.push(command);
  });
  
  return commands;
}

function main() {
  console.log(`🚀 ${SITE_CONFIG.name} - Dynamic Agent Orchestrator\n`);
  console.log('Analyzing project state...\n');
  
  const { readyTasks, completedTasks } = findReadyTasks();
  const totalTasks = Object.keys(TASK_REGISTRY).length;
  const blockedTasks = totalTasks - completedTasks.size - readyTasks.length;
  
  console.log(`📊 Task Status:`);
  console.log(`   - Total tasks: ${totalTasks}`);
  console.log(`   - Completed: ${completedTasks.size}`);
  console.log(`   - Ready to start: ${readyTasks.length}`);
  console.log(`   - Blocked: ${blockedTasks}\n`);
  
  if (completedTasks.size > 0) {
    console.log('✅ Completed Tasks:');
    for (const taskId of completedTasks) {
      console.log(`   - ${TASK_REGISTRY[taskId].name}`);
    }
    console.log('');
  }
  
  if (readyTasks.length === 0) {
    if (completedTasks.size === totalTasks) {
      console.log(`🎉 All tasks completed! ${SITE_CONFIG.name} is ready for launch.`);
    } else {
      console.log('⏸️  No tasks are currently ready. Some tasks may be blocked by dependencies.');
    }
    return;
  }
  
  console.log(`🤖 Deploy ${readyTasks.length} Agents Right Now!\n`);
  
  const commands = generateAgentCommands(readyTasks);
  const totalHours = commands.reduce((sum, cmd) => sum + cmd.estimatedHours, 0);
  const maxHours = Math.max(...commands.map(c => c.estimatedHours));
  
  console.log(`⏱️  Estimated time: ${maxHours} hours (running in parallel)`);
  console.log(`📈 Total work: ${totalHours} hours compressed into parallel execution\n`);
  
  console.log('─'.repeat(80));
  commands.forEach(cmd => {
    console.log(`\n### Agent ${cmd.terminal}: ${cmd.name}`);
    console.log(`Priority: ${cmd.priority} | Estimated: ${cmd.estimatedHours} hours`);
    console.log('```bash');
    console.log(cmd.command);
    console.log('```');
  });
  console.log('\n' + '─'.repeat(80));
  
  console.log('\n📋 Instructions:');
  console.log('1. Open ' + commands.length + ' terminal windows or Cursor background agents');
  console.log('2. Copy and run each command above');
  console.log('3. Agents will work autonomously in parallel');
  console.log('4. Run this orchestrator again to see newly available tasks');
  
  const stateFile = path.join(process.cwd(), '.agent-orchestrator-state.json');
  const state = {
    timestamp: new Date().toISOString(),
    projectName: SITE_CONFIG.name,
    completedTasks: Array.from(completedTasks),
    readyTasks: readyTasks.map(t => t.id),
    blockedTasks,
    totalTasks,
    estimatedCompletion: `${maxHours} hours`
  };
  
  fs.writeFileSync(stateFile, JSON.stringify(state, null, 2));
  console.log(`\n💾 State saved to ${stateFile}`);
}

if (require.main === module) {
  main();
}

module.exports = { findReadyTasks, generateAgentCommands, TASK_REGISTRY, SITE_CONFIG };