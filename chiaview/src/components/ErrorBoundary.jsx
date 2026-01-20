'use client';

import { Component } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

/**
 * Error Boundary component to catch and handle errors in React components
 * Provides graceful error handling and recovery options
 * 
 * Usage:
 * <ErrorBoundary>
 *   <YourComponent />
 * </ErrorBoundary>
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorCount: 0,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error('Error Boundary caught an error:', error, errorInfo);

    // Update state with error details
    this.setState((prevState) => ({
      error,
      errorInfo,
      errorCount: prevState.errorCount + 1,
    }));

    // You can also log the error to an error reporting service here
    // logErrorToService(error, errorInfo);
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8">
            {/* Error Icon */}
            <div className="flex justify-center mb-4">
              <div className="bg-red-100 rounded-full p-4">
                <FiAlertTriangle className="w-8 h-8 text-red-600" />
              </div>
            </div>

            {/* Error Message */}
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
              Oops! Something went wrong
            </h1>

            <p className="text-gray-600 text-center mb-6">
              We're sorry for the inconvenience. An error occurred while processing your request.
            </p>

            {/* Error Details (development only) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mb-6 p-4 bg-gray-100 rounded text-sm">
                <summary className="cursor-pointer font-semibold text-gray-700 mb-2">
                  Error Details
                </summary>
                <p className="text-red-600 font-mono text-xs mb-2">
                  {this.state.error.toString()}
                </p>
                {this.state.errorInfo && (
                  <p className="text-gray-600 font-mono text-xs whitespace-pre-wrap overflow-auto max-h-48">
                    {this.state.errorInfo.componentStack}
                  </p>
                )}
              </details>
            )}

            {/* Error Count */}
            {this.state.errorCount > 3 && (
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
                <strong>Multiple errors detected:</strong> Please refresh the page or contact support if the problem persists.
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={this.resetError}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={() => (window.location.href = '/')}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded transition-colors"
              >
                Go Home
              </button>
            </div>

            {/* Support Link */}
            <p className="text-center text-sm text-gray-500 mt-6">
              Need help?{' '}
              <a
                href="/contact"
                className="text-blue-600 hover:underline font-semibold"
              >
                Contact Support
              </a>
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
