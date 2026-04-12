export type Project = {
  title: string;
  summary: string;
  description: string;
  metrics: string[];
  tags: string[];
  link: string;
};

export const projects: Project[] = [
  {
    title: 'Cloud Native API Gateway',
    summary: 'Architected and implemented a Domain Gateway Infrastructure using Kong.',
    description: 'Developed Terraform modules for standardized deployment, configuration management and internal custom plugins testing and delivery. Enabled cross-domain connectivity with TLS/gRPC support.',
    metrics: ['3M+ RPS Processed', '99.999% Availability', 'Cross-domain TLS/gRPC'],
    tags: ['Kong', 'Terraform', 'API Gateway'],
    link: '/docs/case-studies/api-gateway',
  },
  {
    title: 'Twilio-wide DNS Modernization',
    summary: 'Architected and implemented a centralized DNS boundary for the One Twilio Kubernetes platform.',
    description: 'This agnostic architecture supports multi-cluster/multi-region deployments and simplifies service discovery.',
    metrics: ['100+ Hosted Zones', '80% Less Ops Burnout', 'Multi-Region Support'],
    tags: ['DNS', 'Kubernetes', 'Multi-Region'],
    link: '/docs/case-studies/dns-modernization',
  },
  {
    title: 'Automated Observability & Load Testing',
    summary: 'Standardized platform observability with OpenTelemetry and k6.',
    description: 'Enabling data-driven performance optimizations across all Twilio Kubernetes platform services.',
    metrics: ['OpenTelemetry Standardized', 'k6 Load Testing', 'Data-driven Optimizations'],
    tags: ['OpenTelemetry', 'k6', 'Helm'],
    link: '/docs/case-studies/observability-load-testing',
  },
];
