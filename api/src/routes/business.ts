import { Router, Request, Response } from 'express';
import { body, query, validationResult } from 'express-validator';

const router = Router();

// Mock data - replace with database
const businesses: any[] = [];

// Get business analytics
router.get('/analytics', (_req: Request, res: Response) => {
  res.json({
    totalBusinesses: businesses.length,
    byType: businesses.reduce((acc, b) => {
      acc[b.type] = (acc[b.type] || 0) + 1;
      return acc;
    }, {}),
    avgRevenue: businesses.reduce((sum, b) => sum + (b.revenue || 0), 0) / (businesses.length || 1)
  });
});

// Get optimization suggestions
router.post('/optimize',
  [
    body('businessType').isString().notEmpty(),
    body('currentRevenue').isNumeric().optional(),
    body('hoursPerWeek').isNumeric().optional()
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { businessType, currentRevenue, hoursPerWeek } = req.body;
    
    // Mock optimization suggestions
    const suggestions = [
      {
        category: 'Time Management',
        suggestion: 'Implement time-blocking for focused work sessions',
        impact: 'High',
        estimatedTimeSaved: '5 hours/week'
      },
      {
        category: 'Automation',
        suggestion: 'Use automated invoicing and payment collection',
        impact: 'Medium',
        estimatedTimeSaved: '3 hours/week'
      },
      {
        category: 'Client Management',
        suggestion: 'Set up a CRM system for better client tracking',
        impact: 'High',
        estimatedRevenuIncrease: '15%'
      }
    ];

    res.json({
      businessType,
      currentStatus: { revenue: currentRevenue, hoursPerWeek },
      suggestions
    });
  }
);

// Get business templates
router.get('/templates',
  [query('type').isString().optional()],
  (req: Request, res: Response) => {
    const { type } = req.query;
    
    const templates = [
      {
        id: '1',
        name: 'Solo Consultant Starter',
        type: 'consulting',
        description: 'Complete setup for solo consulting business',
        includes: ['Contract templates', 'Invoice templates', 'Project tracker']
      },
      {
        id: '2',
        name: 'Freelance Developer Kit',
        type: 'development',
        description: 'Everything needed for freelance development',
        includes: ['Code repository setup', 'Time tracking', 'Client portal']
      },
      {
        id: '3',
        name: 'Creative Professional Bundle',
        type: 'creative',
        description: 'Tools for designers, writers, and creators',
        includes: ['Portfolio templates', 'Pricing calculator', 'Contract generator']
      }
    ];

    const filtered = type 
      ? templates.filter(t => t.type === type)
      : templates;

    res.json({ templates: filtered });
  }
);

// Calculate pricing
router.post('/pricing/calculate',
  [
    body('hourlyRate').isNumeric().withMessage('Hourly rate must be a number'),
    body('hoursPerProject').isNumeric().withMessage('Hours must be a number'),
    body('overhead').isNumeric().optional(),
    body('profitMargin').isNumeric().optional()
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { 
      hourlyRate, 
      hoursPerProject, 
      overhead = 0.2, 
      profitMargin = 0.3 
    } = req.body;

    const baseCost = hourlyRate * hoursPerProject;
    const overheadCost = baseCost * overhead;
    const totalCost = baseCost + overheadCost;
    const profit = totalCost * profitMargin;
    const finalPrice = totalCost + profit;

    res.json({
      breakdown: {
        baseCost,
        overheadCost,
        totalCost,
        profit,
        finalPrice
      },
      recommendation: {
        minimumPrice: Math.round(finalPrice),
        recommendedPrice: Math.round(finalPrice * 1.1),
        premiumPrice: Math.round(finalPrice * 1.3)
      }
    });
  }
);

export default router;