import { Component, type ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';
import { PrimaryButton } from '@/components/ui';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

/**
 * ErrorBoundary catches rendering errors and displays a fallback UI.
 * Useful for gracefully handling unexpected failures in React component trees.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log to console in development
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    // Reload the page to reset state
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-stone-50 to-stone-100 px-4 py-12">
          <div className="w-full max-w-md space-y-6 text-center">
            <div className="flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                <AlertCircle className="h-10 w-10 text-red-600" />
              </div>
            </div>

            <div>
              <h1 className="text-screen-title mb-3 text-stone-900">
                Something went wrong
              </h1>
              <p className="text-body text-stone-600">
                We encountered an unexpected error. Please try again.
              </p>
            </div>

            {import.meta.env.DEV && this.state.error && (
              <div className="rounded-lg bg-red-50 p-4 text-left">
                <p className="text-helper font-mono text-red-800">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <PrimaryButton onClick={this.handleReset} fullWidth size="lg">
              Go to Home
            </PrimaryButton>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
