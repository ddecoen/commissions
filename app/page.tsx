export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Sales Commission Tracker
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Track and manage sales team commissions with Salesforce integration,
            automated calculations, and comprehensive reporting.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            icon="📊"
            title="Employee Selection"
            description="Dropdown to select sales representative and view their commission details"
          />
          <FeatureCard
            icon="📄"
            title="PDF Upload"
            description="Import closed/won deals directly from Salesforce PDF exports"
          />
          <FeatureCard
            icon="📈"
            title="Running Totals"
            description="Month-over-month commission tracking with YTD calculations"
          />
          <FeatureCard
            icon="💰"
            title="Flexible Rates"
            description="Configure commission percentages by deal type: New Business, Expansion, Renewal"
          />
          <FeatureCard
            icon="🎯"
            title="Performance Tracking"
            description="Monitor quota attainment, credit, and achievement tiers in real-time"
          />
          <FeatureCard
            icon="📑"
            title="Commission Reports"
            description="Generate monthly statements with detailed breakdowns and payout schedules"
          />
        </div>

        {/* Status */}
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full mb-4">
              <span className="font-semibold">🚧 In Development</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Application Coming Soon
            </h2>
            <p className="text-gray-600 mb-6">
              We're building a comprehensive commission tracking platform.
              Check out our documentation to learn more about the features and template structure.
            </p>
            <div className="flex gap-4 justify-center">
              <a
                href="/upload"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                📤 Upload Data
              </a>
              <a
                href="https://github.com/ddecoen/commissions"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                View on GitHub
              </a>
              <a
                href="https://github.com/ddecoen/commissions/blob/main/README.md"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Documentation
              </a>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500 mb-4">Built with</p>
          <div className="flex gap-6 justify-center flex-wrap">
            <TechBadge name="Next.js 14" />
            <TechBadge name="TypeScript" />
            <TechBadge name="Tailwind CSS" />
            <TechBadge name="PostgreSQL" />
            <TechBadge name="Vercel" />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function TechBadge({ name }: { name: string }) {
  return (
    <span className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">
      {name}
    </span>
  );
}
