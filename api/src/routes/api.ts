import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

// Import sub-routers
import usersRouter from './users';
import businessRouter from './business';

const router = Router();

// Mount sub-routers
router.use('/users', usersRouter);
router.use('/business', businessRouter);

// API info endpoint
router.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Business of One API v1',
    endpoints: {
      users: '/api/users',
      business: '/api/business'
    }
  });
});

// Example protected endpoint with validation
router.post('/example',
  [
    body('name').isString().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required')
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { name, email } = req.body;
    res.json({
      message: 'Example endpoint',
      data: { name, email }
    });
  }
);

export default router;