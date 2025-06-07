const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface ConsultationBookingData {
  name: string;
  email: string;
  consultationDate: string;
  consultationTime: string;
  timezone: string;
  consultationFormat: 'video' | 'phone';
  meetingLink?: string;
  notes?: string;
}

export interface NewsletterSubscriptionData {
  email: string;
  name: string;
  source?: string;
}

export interface ResourceDownloadData {
  email: string;
  name: string;
  resourceId: string;
  resourceName: string;
  downloadUrl: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

class EmailService {
  private async request<T>(
    endpoint: string,
    method: string,
    data?: any
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/email${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : undefined,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Request failed');
      }

      return { success: true, data: result };
    } catch (error) {
      console.error('Email service error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      };
    }
  }

  async sendConsultationConfirmation(
    data: ConsultationBookingData
  ): Promise<ApiResponse> {
    return this.request('/consultation-confirmation', 'POST', data);
  }

  async subscribeToNewsletter(
    data: NewsletterSubscriptionData
  ): Promise<ApiResponse> {
    return this.request('/newsletter/subscribe', 'POST', data);
  }

  async sendResourceDownload(
    data: ResourceDownloadData
  ): Promise<ApiResponse> {
    return this.request('/resource-download', 'POST', data);
  }

  async unsubscribe(email: string, token: string): Promise<ApiResponse> {
    return this.request('/unsubscribe', 'POST', { email, token });
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

export default new EmailService();