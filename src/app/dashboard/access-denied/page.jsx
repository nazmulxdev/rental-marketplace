export default function AccessDeniedPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-4">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Access Denied</h1>
      <p className="text-gray-700 mb-6">You do not have permission to view this page.</p>
      <a href="/dashboard" className="btn btn-primary">
        Go Back to Dashboard
      </a>
    </div>
  );
}
