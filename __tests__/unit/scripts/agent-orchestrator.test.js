const fs = require('fs');
const path = require('path');
const {
  findReadyTasks,
  generateAgentCommands,
  TASK_REGISTRY,
  SITE_CONFIG
} = require('../../../scripts/agent-orchestrator');

// Mock fs module
jest.mock('fs');

describe('Agent Orchestrator', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    
    // Default: no files exist
    fs.existsSync.mockReturnValue(false);
  });

  describe('SITE_CONFIG', () => {
    it('should have required configuration properties', () => {
      expect(SITE_CONFIG).toHaveProperty('name', 'Business of One');
      expect(SITE_CONFIG).toHaveProperty('domain', 'businessofone.ai');
      expect(SITE_CONFIG).toHaveProperty('targetAudience');
      expect(SITE_CONFIG).toHaveProperty('primaryColor', '#4169E1');
      expect(SITE_CONFIG).toHaveProperty('accentColor');
    });
  });

  describe('TASK_REGISTRY', () => {
    it('should have all required task properties', () => {
      Object.entries(TASK_REGISTRY).forEach(([taskId, task]) => {
        expect(task).toHaveProperty('id', taskId);
        expect(task).toHaveProperty('name');
        expect(task).toHaveProperty('dependencies');
        expect(task).toHaveProperty('estimatedHours');
        expect(task).toHaveProperty('priority');
        expect(task).toHaveProperty('prompt');
        expect(task).toHaveProperty('completionCheck');
        
        // Validate data types
        expect(Array.isArray(task.dependencies)).toBe(true);
        expect(typeof task.estimatedHours).toBe('number');
        expect(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']).toContain(task.priority);
      });
    });

    it('should have valid dependency references', () => {
      const taskIds = Object.keys(TASK_REGISTRY);
      
      Object.values(TASK_REGISTRY).forEach(task => {
        task.dependencies.forEach(dep => {
          expect(taskIds).toContain(dep);
        });
      });
    });
  });

  describe('findReadyTasks', () => {
    it('should return all tasks when no tasks are completed', () => {
      const { readyTasks, completedTasks } = findReadyTasks();
      
      // Tasks without dependencies should be ready
      const expectedReadyTasks = Object.values(TASK_REGISTRY)
        .filter(task => task.dependencies.length === 0);
      
      expect(readyTasks).toHaveLength(expectedReadyTasks.length);
      expect(completedTasks.size).toBe(0);
    });

    it('should mark tasks as completed when their files exist', () => {
      // Mock that design-system file exists
      fs.existsSync.mockImplementation(path => 
        path === 'frontend/src/styles/design-system.ts'
      );

      const { readyTasks, completedTasks } = findReadyTasks();
      
      expect(completedTasks.has('design-system')).toBe(true);
      expect(completedTasks.size).toBe(1);
    });

    it('should make dependent tasks ready when dependencies are completed', () => {
      // Mock that nextjs-setup and design-system are completed
      fs.existsSync.mockImplementation(path => 
        path === 'frontend/package.json' || 
        path === 'frontend/src/styles/design-system.ts'
      );

      const { readyTasks, completedTasks } = findReadyTasks();
      
      // component-library should now be ready
      const componentLibraryTask = readyTasks.find(t => t.id === 'component-library');
      expect(componentLibraryTask).toBeDefined();
      
      expect(completedTasks.has('nextjs-setup')).toBe(true);
      expect(completedTasks.has('design-system')).toBe(true);
    });

    it('should prioritize tasks correctly', () => {
      const { readyTasks } = findReadyTasks();
      
      // Verify tasks are sorted by priority
      for (let i = 1; i < readyTasks.length; i++) {
        const priorityOrder = { 'CRITICAL': 0, 'HIGH': 1, 'MEDIUM': 2, 'LOW': 3 };
        const prevPriority = priorityOrder[readyTasks[i-1].priority] || 3;
        const currPriority = priorityOrder[readyTasks[i].priority] || 3;
        
        expect(prevPriority).toBeLessThanOrEqual(currPriority);
      }
    });
  });

  describe('generateAgentCommands', () => {
    it('should generate commands for given tasks', () => {
      const tasks = [
        TASK_REGISTRY['design-system'],
        TASK_REGISTRY['content-strategy']
      ];
      
      const commands = generateAgentCommands(tasks);
      
      expect(commands).toHaveLength(2);
      expect(commands[0]).toMatchObject({
        terminal: 1,
        name: tasks[0].name,
        estimatedHours: tasks[0].estimatedHours,
        priority: tasks[0].priority
      });
      expect(commands[0].command).toContain('CURSOR_BACKGROUND_AGENT_PROMPT');
      expect(commands[0].command).toContain(tasks[0].prompt);
    });

    it('should assign sequential terminal numbers', () => {
      const tasks = Object.values(TASK_REGISTRY).slice(0, 3);
      const commands = generateAgentCommands(tasks);
      
      commands.forEach((cmd, index) => {
        expect(cmd.terminal).toBe(index + 1);
      });
    });

    it('should include current working directory in commands', () => {
      const tasks = [TASK_REGISTRY['nextjs-setup']];
      const commands = generateAgentCommands(tasks);
      
      expect(commands[0].command).toContain(process.cwd());
    });
  });

  describe('Task completion checks', () => {
    it('should check correct file paths for each task', () => {
      const pathChecks = {
        'design-system': 'frontend/src/styles/design-system.ts',
        'content-strategy': 'content/copy/homepage.md',
        'nextjs-setup': 'frontend/package.json',
        'component-library': 'frontend/src/components/ui/Button.tsx',
        'landing-page': 'frontend/src/app/page.tsx',
        'api-setup': 'backend/src/api/server.ts'
      };

      Object.entries(pathChecks).forEach(([taskId, expectedPath]) => {
        // Reset mock
        fs.existsSync.mockReturnValue(false);
        
        // Call completion check
        TASK_REGISTRY[taskId].completionCheck();
        
        // Verify it checked the right path
        expect(fs.existsSync).toHaveBeenCalledWith(expectedPath);
      });
    });
  });
});