const marketingTemplates = {
  'marketing-campaign-brief': `**Campaign overview**
- Campaign: {{campaign_name}}
- Primary KPI: {{primary_kpi}}
- Budget: {{budget}}

**Key messages**
1. Headline: {{headline}}
2. Proof: {{proof_point}}
3. CTA: {{call_to_action}}

**Channels & cadence**
- Core channel: {{channel_principale}}
- Secondary: {{canali_secondari}}
- Frequency: {{frequenza}}

**Team & timeline**
- Owner: {{owner}}
- Kick-off: {{kickoff_date}}
- Go-live: {{go_live}}`,

  'marketing-value-prop': `**Segment & pain**
- Target: {{segmento}}
- Pain: {{pain}}

**Value statement**
Per {{segmento}} che vogliono {{obiettivo}}, {{prodotto}} offre {{beneficio_chiave}} perché {{proof}}.

**Messaging pillars**
1. {{pilastro_1}}
2. {{pilastro_2}}
3. {{pilastro_3}}

**CTA by funnel**
- Awareness: {{cta_awareness}}
- Consideration: {{cta_consideration}}
- Decision: {{cta_decision}}`,

  'marketing-social-calendar': `**Concept**
- Theme: {{tema}}
- Tone of voice: {{tono}}

**Weekly cadence**
| Day | Format | Angle | CTA |
| --- | --- | --- | --- |
| Monday | {{format_monday}} | {{angle_monday}} | {{cta_monday}} |
| Wednesday | {{format_wednesday}} | {{angle_wednesday}} | {{cta_wednesday}} |
| Friday | {{format_friday}} | {{angle_friday}} | {{cta_friday}} |

**Metrics**
- Engagement target: {{engagement}}
- Conversion goal: {{conversioni}}
- Response time: {{tempo_risposta}}`,

  'marketing-email-sequence': `**Segment & offer**
- Segment: {{segmento}}
- Offer: {{offerta}}
- Core objective: {{obiettivo}}

**Sequence**
| Email | Timing | Objective | CTA |
| --- | --- | --- | --- |
| #1 | {{timing1}} | {{goal1}} | {{cta1}} |
| #2 | {{timing2}} | {{goal2}} | {{cta2}} |
| #3 | {{timing3}} | {{goal3}} | {{cta3}} |
| #4 | {{timing4}} | {{goal4}} | {{cta4}} |

**Metrics**
- Open rate: {{open_rate}}
- CTR: {{ctr}}
- Conversion: {{conversion_rate}}`,

  'marketing-competitor-scan': `**Competitor overview**
- Competitors: {{competitor}}
- Target segment: {{segmento}}
- Differentiator: {{differenziazione}}

**Comparison (excerpt)**
| Competitor | Value prop | Pro | Contro |
| --- | --- | --- | --- |
| {{competitor1}} | {{value_prop1}} | {{pro1}} | {{contro1}} |
| {{competitor2}} | {{value_prop2}} | {{pro2}} | {{contro2}} |

**Opportunities**
1. {{opportunity_1}}
2. {{opportunity_2}}
3. {{opportunity_3}}

**Next steps**
- Message: {{messaggio}}
- Tactical offer: {{offerta_tattica}}
- Priority: {{next_step}}`,
};

export default marketingTemplates;


