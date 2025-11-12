// Tool: AI Social Gradient
// Designs gradient prompts of social posts across tone, length and platform variations.

module.exports = {
  async run({ params }) {
    const baseTopic = params?.baseTopic || 'product launch';
    const platforms = Array.isArray(params?.platforms) && params.platforms.length > 0
      ? params.platforms
      : ['linkedin', 'twitter', 'instagram'];
    const gradients = ['short', 'medium', 'long'];

    const matrix = platforms.flatMap((platform) =>
      gradients.map((lengthVariant) => ({
        id: `${platform}_${lengthVariant}`,
        platform,
        lengthVariant,
        prompt: [
          `Create a ${lengthVariant} post for ${platform} about ${baseTopic}.`,
          'Include CTA and relevant hashtags (max 3) when appropriate.',
          platform === 'linkedin' ? 'Tone professional, include hook + value + CTA.' : null,
          platform === 'twitter' ? 'Limit to 240 characters.' : null,
          platform === 'instagram' ? 'Suggest reel caption + alternative text for image.' : null,
        ]
          .filter(Boolean)
          .join(' '),
      })),
    );

    return {
      summary: `Social gradient per ${baseTopic} su ${platforms.join(', ')}.`,
      baseTopic,
      platforms,
      gradients,
      matrix,
      workflow: [
        'Genera gradient e salva output in tabella (Notion, Airtable).',
        'Seleziona versioni migliori in base a engagement storico.',
        'Programma post via scheduler (Buffer, Hootsuite).',
      ],
      qaChecklist: [
        'Controlla che le lunghezze rispettino i limiti piattaforma.',
        'Verifica brand voice e compliance legale.',
        'Assicurati che CTA e link siano aggiornati.',
      ],
    };
  },
};










