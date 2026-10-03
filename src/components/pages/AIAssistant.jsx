import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  User, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Trash2, 
  Sparkles, 
  Globe,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { isSpeechRecognitionSupported, createSpeechRecognizer, speakText } from '../../utils/speechUtils';
import DisclaimerBanner from '../common/DisclaimerBanner';

export default function AIAssistant() {
  const { schemes, setSelectedSchemeDetail } = useApp();
  const { lang, setLang, t } = useLanguage();

  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('gns_chat_history');
    return saved ? JSON.parse(saved) : [
      {
        id: 'msg-0',
        sender: 'assistant',
        text: 'Hello! I am GNS AI Assistant. How can I help you discover or apply for government welfare schemes today? You can ask me in English, Tamil, or Hindi.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
  });

  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const recognizerRef = useRef(null);
  const chatEndRef = useRef(null);

  const suggestedQuestions = [
    "Which schemes are available for students?",
    "I am a farmer. What benefits can I receive?",
    "What documents are required for PM Kisan?",
    "How can I apply for an education scholarship?",
    "Show schemes available in Puducherry.",
    "Am I eligible for any housing scheme?"
  ];

  useEffect(() => {
    localStorage.setItem('gns_chat_history', JSON.stringify(messages));
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Handle Speech Recognition
  const toggleListening = () => {
    if (!isSpeechRecognitionSupported()) {
      alert("Speech recognition is not supported in your browser. Please type your query.");
      return;
    }

    if (isListening) {
      recognizerRef.current?.stop();
      setIsListening(false);
    } else {
      const recognizer = createSpeechRecognizer(
        (transcript) => setInputQuery(transcript),
        (err) => { console.error(err); setIsListening(false); },
        () => setIsListening(false),
        lang
      );

      if (recognizer) {
        recognizerRef.current = recognizer;
        recognizer.start();
        setIsListening(true);
      }
    }
  };

  // AI NLP & Scheme Knowledge Engine
  const generateResponse = (query) => {
    const q = query.toLowerCase();
    let replyText = "";
    let matchedSchemes = [];

    if (q.includes("student") || q.includes("scholarship") || q.includes("education") || q.includes("மாணவர்")) {
      matchedSchemes = schemes.filter(s => s.category === "Education" || s.beneficiaryTypes.includes("Students"));
      replyText = `Found ${matchedSchemes.length} education & scholarship schemes for students:\n\n` +
        matchedSchemes.map(s => `• **${s.name}**: ${s.shortDescription} (Benefit: ${s.benefits[0]})`).join('\n\n');
    } else if (q.includes("farmer") || q.includes("kisan") || q.includes("agriculture") || q.includes("விவசாயி")) {
      matchedSchemes = schemes.filter(s => s.category === "Agriculture" || s.beneficiaryTypes.includes("Farmers"));
      replyText = `Here are agriculture & farmer financial assistance schemes:\n\n` +
        matchedSchemes.map(s => `• **${s.name}**: ${s.shortDescription} (${s.benefits[0]})`).join('\n\n');
    } else if (q.includes("housing") || q.includes("pmay") || q.includes("house") || q.includes("வீடு")) {
      matchedSchemes = schemes.filter(s => s.category === "Housing" || s.name.includes("PMAY"));
      replyText = `Under Pradhan Mantri Awas Yojana (PMAY), financial assistance up to ₹2.67 Lakh is provided for house construction/purchase. Required documents include Aadhaar, Income Certificate, and Residence proof.`;
    } else if (q.includes("document") || q.includes("pm kisan") || q.includes("ஆவணம்")) {
      const pmKisan = schemes.find(s => s.id === "scheme-1");
      matchedSchemes = pmKisan ? [pmKisan] : [];
      replyText = `Required documents for PM Kisan Samman Nidhi (PM-KISAN):\n\n1. **Aadhaar Card** (Identity verification)\n2. **Land Ownership Record / Khatauni** (Proof of land holding)\n3. **Active Bank Passbook** (For ₹2,000 DBT installment credit).`;
    } else if (q.includes("puducherry") || q.includes("புதுச்சேரி")) {
      matchedSchemes = schemes.filter(s => s.eligibilityCriteria.states.includes("Puducherry"));
      replyText = `Found schemes for Puducherry UT residents:\n\n` +
        matchedSchemes.map(s => `• **${s.name}**: ${s.shortDescription}`).join('\n\n');
    } else if (q.includes("business") || q.includes("loan") || q.includes("mudra") || q.includes("entrepreneur")) {
      matchedSchemes = schemes.filter(s => s.category === "Entrepreneurship");
      replyText = `Government collateral-free business loan schemes:\n\n` +
        matchedSchemes.map(s => `• **${s.name}**: Loans up to ₹20 Lakh / ₹1 Crore with zero collateral security.`).join('\n\n');
    } else {
      matchedSchemes = schemes.slice(0, 2);
      replyText = `Based on government scheme repository:\n\nYou can explore **${schemes[0].name}** for agriculture or **${schemes[1].name}** for housing benefits. Use the Eligibility Checker tool for personalized assessment.`;
    }

    return { text: replyText, matchedSchemes };
  };

  const handleSend = (e) => {
    if (e) e.preventDefault();
    if (!inputQuery.trim()) return;

    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: inputQuery,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    const currentQuery = inputQuery;
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      const { text, matchedSchemes } = generateResponse(currentQuery);

      const aiMsg = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text,
        matchedSchemes,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);

      if (ttsEnabled) {
        speakText(text.replace(/[*•]/g, ''), lang);
      }
    }, 800);
  };

  const handleClearChat = () => {
    if (confirm("Are you sure you want to clear conversation history?")) {
      setMessages([
        {
          id: 'msg-0',
          sender: 'assistant',
          text: 'Conversation history cleared. How else can I assist you?',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  };

  return (
    <div className="ai-page">
      <DisclaimerBanner />

      <div className="ai-container card">
        {/* Header */}
        <div className="ai-header">
          <div className="ai-brand-info">
            <div className="ai-avatar-ring">
              <Bot size={24} className="text-primary" />
            </div>
            <div>
              <h2 className="ai-title">{t('ai.title')}</h2>
              <p className="ai-subtitle">{t('ai.subtitle')}</p>
            </div>
          </div>

          <div className="ai-header-controls">
            {/* Audio TTS toggle */}
            <button 
              className={`btn btn-outline btn-sm ${ttsEnabled ? 'active-tts' : ''}`}
              onClick={() => setTtsEnabled(!ttsEnabled)}
              title={ttsEnabled ? "Mute Voice Output" : "Enable Voice Output"}
            >
              {ttsEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
              <span className="desktop-only">{ttsEnabled ? 'Voice On' : 'Voice Off'}</span>
            </button>

            {/* Language Switch */}
            <select 
              className="form-select filter-select"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
            >
              <option value="en">English</option>
              <option value="ta">தமிழ் (Tamil)</option>
              <option value="hi">हिन्दी (Hindi)</option>
            </select>

            <button className="btn-ghost btn-sm text-error" onClick={handleClearChat} title={t('ai.clearChat')}>
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* Chat Feed */}
        <div className="chat-messages-area">
          {messages.map((msg) => (
            <div key={msg.id} className={`chat-message-row ${msg.sender === 'user' ? 'user-row' : 'assistant-row'}`}>
              <div className="msg-avatar">
                {msg.sender === 'user' ? <User size={18} /> : <Bot size={18} />}
              </div>

              <div className="msg-bubble-wrapper">
                <div className={`msg-bubble ${msg.sender === 'user' ? 'user-bubble' : 'assistant-bubble'}`}>
                  <div className="msg-text">{msg.text}</div>

                  {msg.matchedSchemes && msg.matchedSchemes.length > 0 && (
                    <div className="ai-scheme-attachments">
                      {msg.matchedSchemes.map((s) => (
                        <div key={s.id} className="ai-scheme-pill" onClick={() => setSelectedSchemeDetail(s)}>
                          <ShieldCheck size={14} className="text-primary" />
                          <span>{s.name}</span>
                          <ExternalLink size={12} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="msg-timestamp">{msg.timestamp}</div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="chat-message-row assistant-row">
              <div className="msg-avatar"><Bot size={18} /></div>
              <div className="msg-bubble assistant-bubble typing-bubble">
                <Sparkles size={16} className="typing-spin" /> GNS AI is searching government repositories...
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Suggested Question Pills */}
        <div className="suggested-prompts-bar">
          <span className="suggested-label">{t('ai.suggestedHeader')}</span>
          <div className="prompts-scroll">
            {suggestedQuestions.map((q, idx) => (
              <button 
                key={idx} 
                className="prompt-pill"
                onClick={() => { setInputQuery(q); }}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <form className="ai-input-bar" onSubmit={handleSend}>
          <button 
            type="button"
            className={`mic-btn ${isListening ? 'listening' : ''}`}
            onClick={toggleListening}
            title={t('ai.micTooltip')}
          >
            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
          </button>

          <input 
            type="text"
            className="form-input ai-text-input"
            placeholder={isListening ? t('ai.listening') : t('ai.placeholder')}
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
          />

          <button type="submit" className="btn btn-primary send-btn">
            <Send size={18} />
          </button>
        </form>
      </div>

      <style>{`
        .ai-page {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .ai-container {
          display: flex;
          flex-direction: column;
          height: calc(100vh - 180px);
          min-height: 550px;
          padding: 0;
          overflow: hidden;
        }

        .ai-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid var(--border);
          background-color: #ffffff;
        }

        .ai-brand-info {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .ai-avatar-ring {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background-color: var(--primary-light);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ai-title {
          font-size: 1.2rem;
          margin: 0;
        }

        .ai-subtitle {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .ai-header-controls {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .active-tts {
          background-color: var(--primary-light);
          color: var(--primary);
          border-color: var(--primary);
        }

        .chat-messages-area {
          flex: 1;
          padding: 1.5rem;
          overflow-y: auto;
          background-color: var(--bg-main);
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .chat-message-row {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          max-width: 80%;
        }

        .user-row {
          margin-left: auto;
          flex-direction: row-reverse;
        }

        .msg-avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background-color: #ffffff;
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          flex-shrink: 0;
        }

        .user-row .msg-avatar {
          background-color: var(--primary);
          color: #ffffff;
        }

        .msg-bubble-wrapper {
          display: flex;
          flex-direction: column;
        }

        .msg-bubble {
          padding: 0.9rem 1.1rem;
          border-radius: var(--radius-lg);
          font-size: 0.925rem;
          line-height: 1.55;
          white-space: pre-wrap;
        }

        .user-bubble {
          background-color: var(--primary);
          color: #ffffff;
          border-bottom-right-radius: 4px;
        }

        .assistant-bubble {
          background-color: #ffffff;
          color: var(--text-main);
          border: 1px solid var(--border);
          border-bottom-left-radius: 4px;
          box-shadow: var(--shadow-sm);
        }

        .msg-timestamp {
          font-size: 0.7rem;
          color: var(--text-muted);
          margin-top: 4px;
          padding: 0 4px;
        }

        .user-row .msg-timestamp { text-align: right; }

        .ai-scheme-attachments {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 0.85rem;
          padding-top: 0.75rem;
          border-top: 1px solid var(--border);
        }

        .ai-scheme-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.35rem 0.65rem;
          border-radius: var(--radius-md);
          background-color: var(--primary-light);
          color: var(--primary);
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
        }

        .suggested-prompts-bar {
          padding: 0.75rem 1.5rem;
          border-top: 1px solid var(--border);
          background-color: #ffffff;
        }

        .suggested-label {
          font-size: 0.775rem;
          font-weight: 600;
          color: var(--text-secondary);
          display: block;
          margin-bottom: 0.4rem;
        }

        .prompts-scroll {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          overflow-x: auto;
        }

        .prompt-pill {
          padding: 0.35rem 0.8rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--border);
          background-color: var(--bg-main);
          font-size: 0.8rem;
          color: var(--text-main);
          white-space: nowrap;
          transition: var(--transition);
        }

        .prompt-pill:hover {
          border-color: var(--primary);
          color: var(--primary);
        }

        .ai-input-bar {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 1.5rem;
          border-top: 1px solid var(--border);
          background-color: #ffffff;
        }

        .mic-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid var(--border);
          background-color: var(--bg-main);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition);
        }

        .mic-btn.listening {
          background-color: var(--error-bg);
          color: var(--error);
          border-color: var(--error);
          animation: pulse 1.2s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.08); }
          100% { transform: scale(1); }
        }

        .ai-text-input {
          flex: 1;
          height: 44px;
        }

        .send-btn {
          height: 44px;
          padding: 0 1.25rem;
        }
      `}</style>
    </div>
  );
}
