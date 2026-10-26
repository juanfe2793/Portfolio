export type Project = {
  title: string;
  problem: string;
  decision: string;
  impact: string;
  metrics: string[];
  tags: string[];
  link: string;
  duration: string;
  scope: string;
  diagram: { nodes: string[]; label: string };
};

export const projects: Project[] = [
  {
    title: 'Cloud Native API Gateway',
    problem: 'Multi-tenant API traffic with no rate limiting caused cascading failures during peak load across service domains.',
    decision: 'Consolidated all cross-domain routing through a Kong-based Domain Gateway with Terraform paved roads, per-service quotas, and circuit breakers.',
    impact: 'Multi-million RPS validated against a five-nines availability target — became the organizational standard adopted across service domains.',
    metrics: ['Multi-million RPS', 'Five-nines Target', 'Minutes to Onboard'],
    tags: ['Kong', 'Terraform', 'AWS EKS'],
    link: '/docs/case-studies/api-gateway',
    duration: '2025 – Present',
    scope: 'Org-wide standard across service domains',
    diagram: { nodes: ['Client', 'Kong GW', 'Auth', 'Services'], label: 'API Gateway Architecture' },
  },
  {
    title: 'Organization-wide DNS Modernization',
    problem: 'Fragmented, ticket-driven DNS management created a bottleneck blocking Kubernetes platform growth across regions.',
    decision: 'Replaced manual processes with an agnostic, code-defined DNS boundary using ExternalDNS and Terraform — zero-touch zone management.',
    impact: 'Eliminated roughly 80% of DNS operational toil and enabled multi-region Kubernetes expansion without DNS as a constraint.',
    metrics: ['DNS as Code', '~80% Toil Eliminated', 'Multi-Region'],
    tags: ['Route53', 'ExternalDNS', 'Terraform'],
    link: '/docs/case-studies/dns-modernization',
    duration: '2024 – 2025',
    scope: 'Org-wide · DNS as code · Multi-region',
    diagram: { nodes: ['Cluster A', 'DNS Boundary', 'Cluster B', 'Route53'], label: 'DNS Architecture' },
  },
  {
    title: 'Automated Observability & Load Testing',
    problem: 'Platform teams were flying blind — no standardized telemetry and performance regressions were caught only in production.',
    decision: 'Standardized on OpenTelemetry sidecars for all services and integrated k6 load tests as mandatory CI/CD gates.',
    impact: 'Shifted performance engineering left — regressions now caught pre-deploy, on-call load reduced significantly.',
    metrics: ['OTel Standardized', 'k6 in CI/CD', 'Proactive Perf Eng'],
    tags: ['OpenTelemetry', 'k6', 'Grafana'],
    link: '/docs/case-studies/observability-load-testing',
    duration: '2024 – 2025',
    scope: 'Platform-wide · Full coverage of critical services',
    diagram: { nodes: ['Services', 'OTel Collector', 'Prometheus', 'Grafana'], label: 'Observability Stack' },
  },
];
