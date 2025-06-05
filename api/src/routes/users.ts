import { Router, Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';
import crypto from 'crypto';

const router = Router();

// Mock data - replace with database queries
const users: any[] = [];

// Get all users
router.get('/', (_req: Request, res: Response) => {
  res.json({
    users,
    total: users.length
  });
});

// Get user by ID
router.get('/:id',
  [param('id').isUUID().withMessage('Invalid user ID')],
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const user = users.find(u => u.id === req.params.id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json(user);
  }
);

// Create new user
router.post('/',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('name').isString().notEmpty().withMessage('Name is required'),
    body('businessType').isString().optional()
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const newUser = {
      id: crypto.randomUUID(),
      ...req.body,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    res.status(201).json(newUser);
  }
);

// Update user
router.put('/:id',
  [
    param('id').isUUID().withMessage('Invalid user ID'),
    body('email').isEmail().optional(),
    body('name').isString().optional(),
    body('businessType').isString().optional()
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const userIndex = users.findIndex(u => u.id === req.params.id);
    if (userIndex === -1) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    users[userIndex] = {
      ...users[userIndex],
      ...req.body,
      updatedAt: new Date().toISOString()
    };

    res.json(users[userIndex]);
  }
);

// Delete user
router.delete('/:id',
  [param('id').isUUID().withMessage('Invalid user ID')],
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const userIndex = users.findIndex(u => u.id === req.params.id);
    if (userIndex === -1) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    users.splice(userIndex, 1);
    res.status(204).send();
  }
);

export default router;