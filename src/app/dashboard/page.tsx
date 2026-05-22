export default function DashboardRootPage() {
  return (
    <div className="py-8 max-w-xl w-full">
      <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Welcome back!</h2>
        <p className="text-sm text-slate-500 leading-relaxed">
          Select an option from the sidebar to manage your doctor appointments or adjust your profile configurations.
        </p>
      </div>
    </div>
  );
}