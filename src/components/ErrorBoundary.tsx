import React, { Component, ErrorInfo, ReactNode } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

interface ErrorBoundaryProps {
  navigate: NavigateFunction;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Uncaught error:", error, errorInfo);
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps, prevState: ErrorBoundaryState): void {
    if (this.state.hasError && !prevState.hasError) {
      this.props.navigate('/error');
    }
  }

  render() {
    if (this.state.hasError) {
      return null;
    }

    return this.props.children;
  }
}

// Higher-order component to inject the navigate prop
function withNavigate(Component: React.ComponentType<ErrorBoundaryProps>) {
  return function WrappedComponent(props: Omit<ErrorBoundaryProps, 'navigate'>) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

export default withNavigate(ErrorBoundary);
