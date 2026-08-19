import React, { useState, useEffect, useCallback } from 'react';
import { toast } from '@/stores/toastStore';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BarChart3, Shield, Loader2, Upload, Database, FileText, Plus } from 'lucide-react';
import { SEO } from '@/components/seo/SEO';
import { JDInput } from '../components/match/JDInput';
import { CandidateList } from '../components/match/CandidateList';
import { ResultsTable } from '../components/match/ResultsTable';
import { runMatchScoring, CandidateInput, MatchResult, getCreditCost } from '../services/scoringClient';
import { useAuthStore } from '../stores/authStore';
import { ContactSelector } from '../components/match/ContactSelector';
import { MandateSelector } from '../components/match/MandateSelector';
import { PipelineSaveModal } from '../components/match/PipelineSaveModal';
import { Section, Eyebrow, Button, Divider } from '@/components/ui/v3';

function B2BBanner() {
  return (
    <div
      style={{
        background: 'var(--v3-color-dark)',
        padding: '10px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        flexWrap: 'wrap',
        fontSize: 13,
        fontFamily: 'var(--v3-font-body)',
        flexShrink: 0,
      }}
    >
      <span style={{ color: 'var(--v3-color-paper)' }}>
        <span style={{ fontFamily: 'var(--v3-font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', marginRight: 8, color: 'var(--v3-color-teal)' }}>B2B · Client Portal</span>
        Match Analysis is built for search-firm &amp; talent clients. Individual leaders — visit the B2C experience.
      </span>
      <a
        href="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '6px 14px',
          border: `1px solid var(--v3-color-teal)`,
          color: 'var(--v3-color-teal)',
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: 12,
          minHeight: 28,
        }}
      >
        Go to B2C site <ArrowRight size={12} />
      </a>
    </div>
  );
}

interface LeadData { name: string; email: string; company: string; title: string; }

/** Track which candidates came from DB (have contact_id) vs manual entry */
interface EnrichedCandidate extends CandidateInput {
  contact_id?: string;
}

export function MatchPage() {
  const navigate = useNavigate();
  const { user, profile } = useAuthStore();
  
  const [step, setStep] = useState<'gate' | 'engine' | 'results'>('gate');
  const [lead, setLead] = useState<LeadData>({ name: '', email: '', company: '', title: '' });
  const [jd, setJd] = useState('');
  const [candidates, setCandidates] = useState<EnrichedCandidate[]>([{ name: '', cv: '' }]);
  const [results, setResults] = useState<MatchResult[]>([]);
  const [scoring, setScoring] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showCreditModal, setShowCreditModal] = useState(false);
  const [isFirstBatch, setIsFirstBatch] = useState(true);
  const [userCredits, setUserCredits] = useState(0);

  // DB selection mode toggles
  const [jdFromDb, setJdFromDb] = useState(false);
  const [candidatesFromDb, setCandidatesFromDb] = useState(false);
  const [selectedMandateId, setSelectedMandateId] = useState<string | null>(null);

  // Selector modals
  const [showContactSelector, setShowContactSelector] = useState(false);
  const [showMandateSelector, setShowMandateSelector] = useState(false);

  // Pipeline save modal
  const [showPipelineModal, setShowPipelineModal] = useState(false);
  const [pipelineResult, setPipelineResult] = useState<MatchResult | null>(null);
  const [pipelineContactId, setPipelineContactId] = useState<string | null>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const profileAny = profile as any;
    if (profileAny?.credits?.balance !== undefined) {
      setUserCredits(profileAny.credits.balance);
    }
  }, [profile]);

  const handleGate = async () => {
    if (!lead.name || !lead.email) return;
    try {
      await fetch('/api/lead-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: lead.name, email: lead.email, company: lead.company, title: lead.title, source: 'score-match' })
      });
    } catch (e) { console.warn('Failed to save lead:', e); }
    setStep('engine');
  };

  const addCandidate = () => setCandidates([...candidates, { name: '', cv: '' }]);
  const removeCandidate = (i: number) => setCandidates(candidates.filter((_, idx) => idx !== i));
  const updateCandidate = (i: number, field: keyof CandidateInput, val: string) => {
    const updated = [...candidates];
    updated[i] = { ...updated[i], [field]: val };
    setCandidates(updated);
  };

  const handleFileUpload = useCallback(async (type: 'jd' | 'cv', index?: number) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.docx,.txt';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      if (file.size > 10 * 1024 * 1024) { toast.warning('File size exceeds 10MB limit'); return; }
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', type);
        const response = await fetch('/api/upload', { method: 'POST', body: formData });
        const data = await response.json();
        if (data.text) {
          if (type === 'jd') setJd(data.text);
          else if (index !== undefined) updateCandidate(index, 'cv', data.text);
        }
      } catch (err) {
        console.error('File upload error:', err);
        toast.error('Failed to process file. Please try again.');
      }
    };
    input.click();
  }, [updateCandidate]);

  // ── DB Selection Handlers ──
  const handleMandateSelect = (mandate: { mandate_id: string; title: string; jd: string }) => {
    setJd(mandate.jd);
    setSelectedMandateId(mandate.mandate_id);
  };

  const handleContactsSelect = (contacts: Array<{ contact_id: string; name: string; cv: string }>) => {
    // Replace current candidates with selected DB contacts
    const enriched: EnrichedCandidate[] = contacts.map(c => ({
      name: c.name,
      cv: c.cv,
      contact_id: c.contact_id,
    }));
    // If there are existing manual candidates, merge them
    const manualOnes = candidates.filter(c => !c.contact_id && (c.name || c.cv));
    setCandidates([...manualOnes, ...enriched]);
  };

  const validCandidates = candidates.filter(c => c.name && c.cv);
  const creditCost = getCreditCost(validCandidates.length, isFirstBatch);

  const handleRunScoring = async () => {
    if (validCandidates.length === 0 || !jd) return;
    if (!isFirstBatch && creditCost.credits > userCredits) { setShowCreditModal(true); return; }

    setScoring(true);
    setProgress(0);
    const startTime = Date.now();

    try {
      const response = await runMatchScoring(jd, validCandidates, user?.id);
      setResults(response.results);
      setStep('results');
      setIsFirstBatch(false);

      // Persist scoring run
      try {
        await fetch('/api/data/scoring-run', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            mandate_id: selectedMandateId || null,
            run_type: 'trident',
            input_params: { jd_length: jd.length, candidate_count: validCandidates.length },
            output_scores: response.results.map(r => ({
              name: r.candidate_name,
              composite: r.composite_score,
              dimensions: r.dimension_scores,
            })),
            composite_score: response.results.reduce((sum, r) => sum + r.composite_score, 0) / response.results.length,
            model: response.model || 'deepseek-chat',
            tokens_used: response.total_tokens || null,
            duration_ms: Date.now() - startTime,
            user_id: user?.id || null,
          }),
        });
      } catch (e) { console.warn('[MatchPage] scoring persist failed:', e); }

      if (creditCost.credits > 0 && user) {
        await fetch('/api/credits/spend', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id, amount: creditCost.credits, action: 'score_match' }),
        });
      }
    } catch (e) {
      console.error('[MatchPage] Scoring error:', e);
    } finally {
      setScoring(false);
      setProgress(100);
    }
  };

  // ── Real Action Handlers (replacing alert stubs) ──
  const handleDownloadPDF = (result: MatchResult) => {
    // Generate a printable HTML page and trigger print
    const printWindow = window.open('', '_blank');
    if (!printWindow) { toast.warning('Please allow popups to download PDF'); return; }
    
    const html = `<!DOCTYPE html><html><head><title>${result.candidate_name} — Match Report</title> <style> body { font-family: var(--v3-font-body), system-ui, sans-serif; max-width: 700px; margin: 40px auto; padding: 20px; color: #000; } h1 { font-family: var(--v3-font-display), 'Georgia', 'Times New Roman', Times, serif; font-size: 24px; border-bottom: 2px solid var(--v3-color-teal); padding-bottom: 8px; } .score { font-size: 48px; font-weight: 800; color: ${result.composite_score >= 75 ? '#22C55E' : result.composite_score >= 50 ? '#EAB308' : '#EF4444'}; } .section { margin: 20px 0; } .section h3 { color: var(--v3-color-teal); margin-bottom: 8px; } .dims { display: flex; gap: 20px; margin: 16px 0; } .dim { flex: 1; text-align: center; padding: 12px; background: #F5F5F5;} .dim-val { font-size: 24px; font-weight: 700; } ul { padding-left: 20px; } li { margin: 4px 0; } .footer { margin-top: 40px; font-size: 11px; color: #999; border-top: 1px solid #eee; padding-top: 12px; } </style></head><body> <h1>${result.candidate_name}</h1> <div style="text-align:center; margin: 20px 0;"> <div class="score">${result.composite_score}</div> <div style="font-size:14px; color:#666;">Composite Score</div> </div> <div class="dims"> <div class="dim"><div class="dim-val">${Math.round(result.dimension_scores.experience * 100)}</div><div>Experience</div></div> <div class="dim"><div class="dim-val">${Math.round(result.dimension_scores.skills * 100)}</div><div>Skills</div></div> <div class="dim"><div class="dim-val">${Math.round(result.dimension_scores.fit * 100)}</div><div>Fit</div></div> </div> <div class="section"><h3>Match Reasons</h3><ul>${(result.match_reasons || []).map(r =>`<li>${r}</li>`).join('')}</ul></div> ${result.risk_factors?.length ?`<div class="section"><h3>Risk Factors</h3><ul>${result.risk_factors.map(r => `<li>${r}</li>`).join('')}</ul></div>`: ''} ${result.approach_strategy ?`<div class="section"><h3>Approach Strategy</h3><p>${result.approach_strategy}</p></div>`: ''} <div class="footer">Generated by LYC Intelligence — ${new Date().toLocaleDateString()} — Confidential</div> </body></html>`;
    
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => printWindow.print(), 500);
  };

  const handleShareCard = async (result: MatchResult) => {
    try {
      const res = await fetch('/api/data/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          results: [result],
          jd_summary: jd.slice(0, 200),
          created_by: user?.id || null,
        }),
      });
      const data = await res.json();
      const shareUrl = `${window.location.origin}/share/${data.data?.id || ''}`;
      await navigator.clipboard.writeText(shareUrl);
      toast.success('Share link copied to clipboard!');
    } catch (e) {
      console.error('[MatchPage] share error:', e);
      // Fallback: generate a local share URL
      const shareId = Math.random().toString(36).substring(7);
      const shareUrl = `${window.location.origin}/score-card/${shareId}`;
      navigator.clipboard.writeText(shareUrl);
      toast.success('Shareable link copied to clipboard!');
    }
  };

  const handleSaveCandidate = (result: MatchResult) => {
    // Find if this candidate has a contact_id from DB selection
    const idx = results.indexOf(result);
    const candidate = candidates[idx];
    const contactId = candidate?.contact_id || null;
    
    setPipelineResult(result);
    setPipelineContactId(contactId);
    setShowPipelineModal(true);
  };

  // ── Input mode toggle button ──
  const ModeToggle = ({ fromDb, onToggle, label }: { fromDb: boolean; onToggle: () => void; label: string }) => (
    <button
      onClick={onToggle}
      style={{
        padding: '8px 14px',
        background: fromDb ? 'var(--v3-color-teal-soft)' : 'var(--v3-color-white)',
        border: `1px solid ${fromDb ? 'var(--v3-color-teal)' : 'var(--v3-color-divider)'}`,
        color: fromDb ? 'var(--v3-color-teal)' : 'var(--v3-color-ink-secondary)',
        fontSize: '12px',
        fontWeight: fromDb ? 600 : 400,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        whiteSpace: 'nowrap',
        minHeight: '36px'
      }}
    >
      {fromDb ? <Database style={{ width: 14, height: 14 }} /> : <FileText style={{ width: 14, height: 14 }} />}
      {fromDb ? `From DB` : label}
    </button>
  );

  // ─── GATE STEP ───
  if (step === 'gate') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', padding: 0 }}>
        <B2BBanner />
        <Section bg="dark" paddingY="xl" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <SEO page="match" />
          <div style={{ maxWidth: '520px', width: '100%', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <Eyebrow accent="teal" style={{ justifyContent: 'center', display: 'flex' }}>Match Analysis</Eyebrow>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '20px', marginTop: '16px' }}>
                <BarChart3 style={{ color: 'var(--v3-color-teal)', width: 32, height: 32 }} />
                <span style={{ fontFamily: 'var(--v3-font-display)', fontSize: '26px', fontWeight: 700, color: 'var(--v3-color-paper)' }}>Score Match</span>
              </div>
              <h1 style={{ fontFamily: 'var(--v3-font-display)', fontSize: '40px', fontWeight: 700, color: 'var(--v3-color-paper)', margin: '0 0 16px', lineHeight: 1.1 }}>
                AI-Powered Executive Matching
              </h1>
              <Divider variant="light" width="content" scheme="dark" style={{ margin: '20px auto' }} />
              <p style={{ fontSize: '16px', color: 'var(--v3-color-paper-secondary)', lineHeight: 1.6, marginTop: '20px' }}>
                Score candidates against job descriptions across 3 dimensions. 
                Get instant insights on experience, skills, and organisational fit.
              </p>
            </div>

            <div style={{ background: 'var(--v3-color-white)', border: '1px solid var(--v3-color-divider)', padding: '32px' }}>
              <p style={{ fontSize: '13px', color: 'var(--v3-color-ink-muted)', marginBottom: '20px', textAlign: 'center', fontFamily: 'var(--v3-font-body)' }}>
                Enter your details to access the Match Engine
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input placeholder="Full name" value={lead.name} onChange={e => setLead({ ...lead, name: e.target.value })}
                  style={{ padding: '12px 16px', background: 'var(--v3-color-white)', border: '1px solid var(--v3-color-divider)', color: 'var(--v3-color-ink)', fontSize: '14px', outline: 'none', fontFamily: 'var(--v3-font-body)' }} />
                <input placeholder="Work email" type="email" value={lead.email} onChange={e => setLead({ ...lead, email: e.target.value })}
                  style={{ padding: '12px 16px', background: 'var(--v3-color-white)', border: '1px solid var(--v3-color-divider)', color: 'var(--v3-color-ink)', fontSize: '14px', outline: 'none', fontFamily: 'var(--v3-font-body)' }} />
                <input placeholder="Company" value={lead.company} onChange={e => setLead({ ...lead, company: e.target.value })}
                  style={{ padding: '12px 16px', background: 'var(--v3-color-white)', border: '1px solid var(--v3-color-divider)', color: 'var(--v3-color-ink)', fontSize: '14px', outline: 'none', fontFamily: 'var(--v3-font-body)' }} />
                <input placeholder="Job title" value={lead.title} onChange={e => setLead({ ...lead, title: e.target.value })}
                  style={{ padding: '12px 16px', background: 'var(--v3-color-white)', border: '1px solid var(--v3-color-divider)', color: 'var(--v3-color-ink)', fontSize: '14px', outline: 'none', fontFamily: 'var(--v3-font-body)' }} />
                <Button
                  variant="primary"
                  accent="teal"
                  onClick={handleGate}
                  disabled={!lead.name || !lead.email}
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    opacity: (lead.name && lead.email) ? 1 : 0.5,
                    pointerEvents: (lead.name && lead.email) ? 'auto' : 'none',
                  }}
                >
                  Access Match Engine →
                </Button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '16px', justifyContent: 'center' }}>
                <Shield style={{ width: 12, height: 12, color: 'var(--v3-color-ink-muted)' }} />
                <span style={{ fontSize: '11px', color: 'var(--v3-color-ink-muted)', fontFamily: 'var(--v3-font-body)' }}>Your data is confidential. We never share your JDs or candidate info.</span>
              </div>
            </div>
          </div>
        </Section>
      </div>
    );
  }

  // ─── ENGINE STEP ───
  if (step === 'engine') {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--v3-color-cream)', padding: 0 }}>
        <B2BBanner />
        <div className="match-engine-content" style={{ padding: '24px', maxWidth: '960px', margin: '0 auto' }}>
          {/* Header */}
          <div className="match-engine-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <BarChart3 style={{ color: 'var(--v3-color-teal)', width: 28, height: 28 }} />
              <div>
                <span style={{ fontFamily: 'var(--v3-font-display)', fontSize: '20px', fontWeight: 700, color: 'var(--v3-color-ink)' }}>Score Match Engine</span>
                <p style={{ fontSize: '12px', color: 'var(--v3-color-ink-muted)', margin: '4px 0 0', fontFamily: 'var(--v3-font-body)' }}>Welcome, {lead.name}</p>
              </div>
            </div>
            {isFirstBatch && (
              <div style={{ padding: '8px 16px', background: 'var(--v3-color-teal-soft)', border: '1px solid var(--v3-color-teal)', fontSize: '13px', color: 'var(--v3-color-teal)', fontWeight: 600, fontFamily: 'var(--v3-font-body)' }}>
                First 3 matches complimentary!
              </div>
            )}
          </div>

          {/* JD Section */}
          <div style={{ marginBottom: '20px' }}>
            <div className="match-engine-jd-bar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--v3-color-ink)', fontFamily: 'var(--v3-font-body)' }}>Job Description</span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <ModeToggle
                  fromDb={jdFromDb}
                  onToggle={() => { setJdFromDb(!jdFromDb); if (!jdFromDb) setShowMandateSelector(true); }}
                  label="Paste / Upload"
                />
                {!jdFromDb && (
                  <button onClick={() => handleFileUpload('jd')}
                    style={{ padding: '8px 14px', background: 'var(--v3-color-white)', border: '1px solid var(--v3-color-divider)', color: 'var(--v3-color-ink-secondary)', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', minHeight: '36px', fontFamily: 'var(--v3-font-body)' }}>
                    <Upload style={{ width: 14, height: 14 }} /> Upload
                  </button>
                )}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', flexWrap: 'wrap' }}>
              <JDInput value={jd} onChange={setJd} />
            </div>
            {selectedMandateId && (
              <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--v3-color-teal)', fontWeight: 500, fontFamily: 'var(--v3-font-body)' }}>
                ✓ Using JD from selected mandate
              </div>
            )}
          </div>

          {/* Candidates Section */}
          <div style={{ marginBottom: '20px' }}>
            <div className="match-engine-candidates-bar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--v3-color-ink)', fontFamily: 'var(--v3-font-body)' }}>Candidates</span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <ModeToggle
                  fromDb={candidatesFromDb}
                  onToggle={() => {
                    setCandidatesFromDb(!candidatesFromDb);
                    if (!candidatesFromDb) setShowContactSelector(true);
                  }}
                  label="Manual Entry"
                />
                {!candidatesFromDb && (
                  <button onClick={addCandidate}
                    style={{ padding: '8px 14px', background: 'var(--v3-color-white)', border: '1px solid var(--v3-color-divider)', color: 'var(--v3-color-ink-secondary)', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', minHeight: '36px', fontFamily: 'var(--v3-font-body)' }}>
                    <Plus style={{ width: 14, height: 14 }} /> Add
                  </button>
                )}
              </div>
            </div>
            
            {candidatesFromDb ? (
              <div style={{ background: 'var(--v3-color-white)', border: '1px solid var(--v3-color-divider)', padding: '20px' }}>
                <p style={{ fontSize: '13px', color: 'var(--v3-color-ink-muted)', marginBottom: '12px', fontFamily: 'var(--v3-font-body)' }}>
                  {candidates.filter(c => c.contact_id).length} candidates selected from database
                </p>
                <button onClick={() => setShowContactSelector(true)}
                  style={{ padding: '10px 20px', background: 'var(--v3-color-teal-soft)', border: '1px solid var(--v3-color-teal)', color: 'var(--v3-color-teal)', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--v3-font-body)' }}>
                  <Database style={{ width: 16, height: 16 }} />
                  Select from Database
                </button>
                {candidates.filter(c => c.contact_id).length > 0 && (
                  <div style={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {candidates.filter(c => c.contact_id).map((c, i) => (
                      <span key={i} style={{ padding: '4px 10px', background: 'var(--v3-color-teal-soft)', fontSize: '12px', color: 'var(--v3-color-teal)', fontFamily: 'var(--v3-font-body)' }}>
                        {c.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <CandidateList
                candidates={candidates}
                onAdd={addCandidate}
                onRemove={removeCandidate}
                onUpdate={updateCandidate}
                onUploadCV={handleFileUpload}
              />
            )}
          </div>

          {/* Run scoring bar */}
          <div style={{ background: 'var(--v3-color-white)', border: '1px solid var(--v3-color-divider)', padding: '20px' }}>
            <div className="match-engine-scoring-bar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '12px', flexWrap: 'wrap' }}>
              <div>
                <p style={{ fontSize: '14px', color: 'var(--v3-color-ink)', margin: '0 0 4px', fontFamily: 'var(--v3-font-body)' }}>
                  {validCandidates.length > 0 ? (
                    <>Ready to score <strong>{validCandidates.length}</strong> candidate{validCandidates.length !== 1 ? 's' : ''}</>
                  ) : 'Add candidates to start scoring'}
                </p>
                {validCandidates.length > 0 && (
                  <p style={{ fontSize: '12px', color: 'var(--v3-color-ink-muted)', margin: 0, fontFamily: 'var(--v3-font-body)' }}>
                    {isFirstBatch ? (
                      <span style={{ color: 'var(--v3-color-success)' }}>Complimentary (first 3 matches)</span>
                    ) : (
                      <>Cost: <strong>{creditCost.credits} mi</strong>
                        {userCredits < creditCost.credits && <span style={{ color: 'var(--v3-color-warning)', marginLeft: '8px' }}>(You have {userCredits})</span>}
                      </>
                    )}
                  </p>
                )}
              </div>
              <button onClick={handleRunScoring} disabled={scoring || validCandidates.length === 0 || !jd}
                style={{ padding: '12px 24px', background: 'var(--v3-color-teal)', color: 'var(--v3-color-cream)', border: 'none', fontSize: '14px', fontWeight: 600, cursor: (scoring || validCandidates.length === 0 || !jd) ? 'not-allowed' : 'pointer', opacity: (scoring || validCandidates.length === 0 || !jd) ? 0.5 : 1, display: 'flex', alignItems: 'center', gap: '8px', minHeight: '44px', fontFamily: 'var(--v3-font-body)' }}>
                {scoring ? (<><Loader2 style={{ width: 16, height: 16, animation: 'spin 1s linear infinite' }} /> Scoring... {progress}%</>) : 'Run Match'}
              </button>
            </div>
            {scoring && (
              <div style={{ height: '6px', background: 'var(--v3-color-cream)', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${progress}%`, background: 'var(--v3-color-teal)', transition: 'width 0.3s' }} />
              </div>
            )}
          </div>
        </div>

        {/* Credit modal */}
        {showCreditModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: 1000 }}>
            <div style={{ background: 'var(--v3-color-white)', border: '1px solid var(--v3-color-divider)', padding: '32px', maxWidth: '400px', textAlign: 'center' }}>
              <h3 style={{ fontFamily: 'var(--v3-font-display)', fontSize: '20px', color: 'var(--v3-color-ink)', marginBottom: '12px' }}>Insufficient Miles</h3>
              <p style={{ fontSize: '14px', color: 'var(--v3-color-ink-muted)', marginBottom: '20px', fontFamily: 'var(--v3-font-body)' }}>You need {creditCost.credits} miles but only have {userCredits}.</p>
              <button onClick={() => setShowCreditModal(false)} style={{ padding: '10px 20px', background: 'var(--v3-color-teal)', border: 'none', color: 'var(--v3-color-cream)', cursor: 'pointer', fontWeight: 600, minHeight: '44px', fontFamily: 'var(--v3-font-body)' }}>
                Understood
              </button>
            </div>
          </div>
        )}

        {/* Selectors */}
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <ContactSelector {...({ open: showContactSelector, onClose: () => setShowContactSelector(false), onSelect: handleContactsSelect, userId: profile?.id } as any)} />
        <MandateSelector open={showMandateSelector} onClose={() => setShowMandateSelector(false)} onSelect={handleMandateSelect} />

        <style>{`
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          @media (max-width: 900px) {
            .match-engine-header,
            .match-engine-jd-bar,
            .match-engine-candidates-bar,
            .match-engine-scoring-bar {
              flex-direction: column !important;
              align-items: flex-start !important;
              width: 100% !important;
            }
            .match-engine-header > div,
            .match-engine-jd-bar > div,
            .match-engine-candidates-bar > div,
            .match-engine-scoring-bar > div,
            .match-engine-header > span,
            .match-engine-jd-bar > span,
            .match-engine-candidates-bar > span {
              width: 100% !important;
            }
            .match-engine-header button,
            .match-engine-jd-bar button,
            .match-engine-candidates-bar button,
            .match-engine-scoring-bar button {
              width: 100% !important;
              justify-content: center !important;
            }
          }
        `}</style>
      </div>
    );
  }

  // ─── RESULTS STEP ───
  return (
    <div style={{ minHeight: '100vh', background: 'var(--v3-color-cream)', padding: 0 }}>
      <B2BBanner />
      <div style={{ padding: '24px', maxWidth: '960px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <BarChart3 style={{ color: 'var(--v3-color-teal)', width: 24, height: 24 }} />
              <span style={{ fontFamily: 'var(--v3-font-display)', fontSize: '20px', fontWeight: 700, color: 'var(--v3-color-ink)' }}>Match Results</span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--v3-color-ink-muted)', margin: 0, fontFamily: 'var(--v3-font-body)' }}>{results.length} candidate{results.length !== 1 ? 's' : ''} scored</p>
          </div>
          <button onClick={() => { setStep('engine'); setResults([]); }}
            style={{ padding: '10px 20px', background: 'var(--v3-color-white)', border: '1px solid var(--v3-color-divider)', color: 'var(--v3-color-ink-secondary)', fontSize: '13px', cursor: 'pointer', minHeight: '44px', fontFamily: 'var(--v3-font-body)' }}>
            Score More
          </button>
        </div>

        <ResultsTable
          results={results}
          onDownloadPDF={handleDownloadPDF}
          onShareCard={handleShareCard}
          onSaveCandidate={handleSaveCandidate}
        />
      </div>

      {/* Pipeline Save Modal */}
      <PipelineSaveModal
        open={showPipelineModal}
        onClose={() => { setShowPipelineModal(false); setPipelineResult(null); setPipelineContactId(null); }}
        result={pipelineResult}
        contactId={pipelineContactId}
        candidateName={pipelineResult?.candidate_name}
        onSuccess={() => { /* Could refresh state here */ }}
      />
    </div>
  );
}
