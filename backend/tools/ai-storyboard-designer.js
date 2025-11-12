// Tool: AI Storyboard Designer
// Generates a storyboard plan from prompts with scenes, visuals and narration cues.

module.exports = {
  async run({ params }) {
    const format = params?.format || 'video';
    const sceneCount = Number(params?.sceneCount) || 8;
    const aspectRatio = params?.aspectRatio || '16:9';
    const voiceTone = params?.voiceTone || 'friendly';

    const scenes = Array.from({ length: sceneCount }).map((_, index) => ({
      id: `scene_${index + 1}`,
      prompt: `Create scene ${index + 1} for a ${format} storyboard. Aspect ratio ${aspectRatio}. Tone ${voiceTone}. Include visual description, narration, CTA if needed.`,
      outputs: ['visual', 'narration', 'callout', 'promptForImage'],
    }));

    return {
      summary: `Storyboard designer ${format} con ${sceneCount} scene (ratio ${aspectRatio}).`,
      format,
      sceneCount,
      aspectRatio,
      voiceTone,
      scenes,
      guidelines: [
        'Mantieni coerenza cromatica e di personaggi.',
        'Inserisci transizioni chiare tra scene.',
        'Definisci eventuali overlay di testo.',
      ],
      automation: [
        'Invia prompt generati a tool di image generation (DALL·E, Midjourney).',
        'Compila slide o doc storyboard con script (PPTX/Google Slides API).',
        'Versiona storyboard in Notion o Figma per review iterativa.',
      ],
    };
  },
};










