import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props){ super(props); this.state = { hasError:false, error:null }; }
  static getDerivedStateFromError(err) { return { hasError:true, error:err }; }
  componentDidCatch(err, info) { console.error('ErrorBoundary caught:', err, info); }
  render(){
    if(this.state.hasError){
      return <div className="card"><h3>Something went wrong</h3><pre>{this.state.error?.message}</pre></div>;
    }
    return this.props.children;
  }
}
