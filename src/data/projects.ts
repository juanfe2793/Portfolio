export type Project = {
  title: string;
  summary: string;
  description: string;
  metrics: string[];
  tags: string[];
  link: string;
  diagram: { nodes: string[]; label: string };
};

export const projects: Project[] = [
  {
    title: 'Cloud Native API Gateway',
    summary: 'Multi-tenant API traffic with no rate limiting caused cascading failures under peak load. Consolidated routing through Kong with per-customer quotas, circuit breakers, and custom plugin delivery via Terraform. Result: 3M+ RPS sustained at 99.999% availability.',
    description: 'Developed Terraform modules for standardized deployment, configuration management and internal custom plugins testing and delivery. Enabled cross-domain connectivity with TLS/gRPC support.',
    metrics: ['3M+ RPS Processed', '99.999% Availability', 'Cross-domain TLS/gRPC'],
    tags: ['Kong', 'Terraform', 'API Gateway'],
    link: '/docs/case-studies/api-gateway',
    diagram: { nodes: ['Client', 'Kong GW', 'Auth', 'Services'], label: 'API Gateway Architecture' },
  },
  {
    title: 'Twilio-wide DNS Modernization',
    summary: 'Twilio\'s fragmented DNS setup across 100+ zones created toil, outage risk, and blocked Kubernetes adoption. Architected a centralized, agnostic DNS boundary supporting multi-cluster and multi-region deployments. Result: 80% reduction in ops burden and a foundation for the unified platform.',
    description: 'This agnostic architecture supports multi-cluster/multi-region deployments and simplifies service discovery.',
    metrics: ['100+ Hosted Zones', '80% Less Ops Burnout', 'Multi-Region Support'],
    tags: ['DNS', 'Kubernetes', 'Multi-Region'],
    link: '/docs/case-studies/dns-modernization',
    diagram: { nodes: ['Cluster A', 'DNS Boundary', 'Cluster B', 'Route53'], label: 'DNS Architecture' },
  },
  {
    title: 'Automated Observability & Load Testing',
    summary: 'Kubernetes services lacked standardized metrics, making performance regressions invisible until they hit production. Implemented OpenTelemetry across all platform services and built k6-based load testing pipelines. Result: data-driven performance decisions replacing reactive firefighting.',
    description: 'Enabling data-driven performance optimizations across all Twilio Kubernetes platform services.',
    metrics: ['OpenTelemetry Standardized', 'k6 Load Testing', 'Data-driven Optimizations'],
    tags: ['OpenTelemetry', 'k6', 'Helm'],
    link: '/docs/case-studies/observability-load-testing',
    diagram: { nodes: ['Services', 'OTel Collector', 'Prometheus', 'Grafana'], label: 'Observability Stack' },
  },
];
