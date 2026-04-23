export type Project = {
  title: string;
  problem: string;
  decision: string;
  impact: string;
  metrics: string[];
  tags: string[];
  link: string;
  diagram: { nodes: string[]; }
};

export const projects: Project[] = [
  {
    title: 'Cloud Native API Gateway',
    problem: 'Multi-tenant API traffic with no rate limiting caused cascading failures during peak load across Twilio domains.',
    decision: 'Consolidated all cross-domain routing through a Kong-based Domain Gateway with Terraform paved roads, per-service quotas, and circuit breakers.',
    impact: '3M+ RPS sustained at 99.999% availability — became the organizational standard adopted across all Twilio domains.',
    metrics: ['3M+ RPS', '99.999% Availability', 'Minutes to Onboard'],
    tags: ['Kong', 'Terraform', 'AWS EKS'],
    link: '/docs/case-studies/api-gateway',
    diagram: { nodes: ['Client', 'Kong Gateway', 'Auth', 'Services'] },
  },
  {
    title: 'Twilio-wide DNS Modernization',
    problem: 'Fragmented, ticket-driven DNS management created a bottleneck blocking Kubernetes platform growth across regions.',
    decision: 'Replaced manual processes with an agnostic, code-defined DNS boundary using ExternalDNS and Terraform — zero-touch zone management.',
    impact: 'Eliminated 80% of DNS operational toil and enabled multi-region Kubernetes expansion without DNS as a constraint.',
    metrics: ['100+ Hosted Zones', '80% Toil Eliminated', 'Multi-Region'],
    tags: ['Route53', 'ExternalDNS', 'Terraform'],
    link: '/docs/case-studies/dns-modernization',
    diagram: { nodes: ['K8s Service', 'ExternalDNS', 'Route53', 'Clients'] },
  },
  {
    title: 'Automated Observability & Load Testing',
    problem: 'Platform teams were flying blind — no standardized telemetry and performance regressions were caught only in production.',
    decision: 'Standardized on OpenTelemetry sidecars for all services and integrated k6 load tests as mandatory CI/CD gates.',
    impact: 'Shifted performance engineering left — regressions now caught pre-deploy, on-call load reduced significantly.',
    metrics: ['OTel Standardized', 'k6 in CI/CD', 'Proactive Perf Eng'],
    tags: ['OpenTelemetry', 'k6', 'Grafana'],
    link: '/docs/case-studies/observability-load-testing',
    diagram: { nodes: ['Services', 'OTel Collector', 'k6 Tests', 'Grafana'] },
  },
];
