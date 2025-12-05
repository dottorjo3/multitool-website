// 🔧 File: frontend/src/components/ErrorBoundary.js
// 🔗 Error Boundary per catturare errori React

import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary catturato:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
          <div className='max-w-md w-full bg-white rounded-lg shadow-lg p-6'>
            <div className='flex items-center mb-4'>
              <div className='flex-shrink-0'>
                <svg className='h-8 w-8 text-red-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' />
                </svg>
              </div>
              <div className='ml-3'>
                <h3 className='text-lg font-medium text-gray-900'>Qualcosa è andato storto</h3>
              </div>
            </div>
            <div className='mt-4'>
              <p className='text-sm text-gray-600 mb-4'>
                Si è verificato un errore inaspettato. Puoi provare a ricaricare la pagina o tornare alla home.
              </p>
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className='mt-4'>
                  <summary className='text-sm font-medium text-gray-700 cursor-pointer mb-2'>
                    Dettagli errore (solo in sviluppo)
                  </summary>
                  <pre className='text-xs bg-gray-100 p-3 rounded overflow-auto max-h-40'>
                    {this.state.error.toString()}
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </details>
              )}
            </div>
            <div className='mt-6 flex gap-3'>
              <button
                onClick={this.handleReset}
                className='flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition'
              >
                Riprova
              </button>
              <button
                onClick={() => (window.location.href = '/')}
                className='flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition'
              >
                Vai alla Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;


