import { useState, useCallback } from 'react';
import emailService, {
  ConsultationBookingData,
  NewsletterSubscriptionData,
  ResourceDownloadData,
  ApiResponse,
} from '../services/email.service';

interface UseEmailReturn {
  loading: boolean;
  error: string | null;
  success: boolean;
  sendConsultationConfirmation: (data: ConsultationBookingData) => Promise<void>;
  subscribeToNewsletter: (data: NewsletterSubscriptionData) => Promise<void>;
  sendResourceDownload: (data: ResourceDownloadData) => Promise<void>;
  clearError: () => void;
  clearSuccess: () => void;
}

export function useEmail(): UseEmailReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleRequest = useCallback(async (
    request: () => Promise<ApiResponse>
  ): Promise<void> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await request();
      
      if (response.success) {
        setSuccess(true);
      } else {
        setError(response.error || 'An error occurred');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const sendConsultationConfirmation = useCallback(
    (data: ConsultationBookingData) => 
      handleRequest(() => emailService.sendConsultationConfirmation(data)),
    [handleRequest]
  );

  const subscribeToNewsletter = useCallback(
    (data: NewsletterSubscriptionData) => 
      handleRequest(() => emailService.subscribeToNewsletter(data)),
    [handleRequest]
  );

  const sendResourceDownload = useCallback(
    (data: ResourceDownloadData) => 
      handleRequest(() => emailService.sendResourceDownload(data)),
    [handleRequest]
  );

  const clearError = useCallback(() => setError(null), []);
  const clearSuccess = useCallback(() => setSuccess(false), []);

  return {
    loading,
    error,
    success,
    sendConsultationConfirmation,
    subscribeToNewsletter,
    sendResourceDownload,
    clearError,
    clearSuccess,
  };
}