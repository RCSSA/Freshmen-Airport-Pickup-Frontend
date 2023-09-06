import React from 'react';
import { Navigate } from 'react-router-dom';

export default function RequireAuth({user, children}) {
  return (
    user? children : <Navigate to="/" replace/>
  )
}