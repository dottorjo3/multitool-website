// Tool: Dev Schema Migrator
// Generates a plan for managing database schema migrations across environments.

module.exports = {
  async run({ params }) {
    const toolchain = params?.toolchain || 'prisma';
    const environments = Array.isArray(params?.environments) && params.environments.length > 0
      ? params.environments
      : ['dev', 'staging', 'prod'];
    const rollbackStrategy = params?.rollbackStrategy || 'down-migrations';

    const steps = [
      'Crea naming convention e cartelle per le migration.',
      `Usa ${toolchain} per generare script versionati.`,
      'Automatizza CI per applicare migration su staging prima di prod.',
      `Implementa strategia rollback: ${rollbackStrategy}.`,
      'Monitora metriche (tempo migrazione, impatto downtime).',
    ];

    const qaChecklist = [
      'Review codice delle migration da parte di DBA/lead dev.',
      'Esegui migrazione in ambiente staging con snapshot dati.',
      'Documenta effetti su performance e storage.',
    ];

    return {
      summary: `Schema migrator (${toolchain}, env ${environments.join(', ')}, rollback ${rollbackStrategy}).`,
      toolchain,
      environments,
      rollbackStrategy,
      steps,
      qaChecklist,
      tooling: [
        'Prisma Migrate / Knex / Flyway / Liquibase',
        'GitHub Actions / GitLab CI per pipeline',
        'PgBouncer / ProxySQL per ridurre downtime',
      ],
    };
  },
};










