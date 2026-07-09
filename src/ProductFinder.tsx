import { useState, useEffect, useRef } from 'react';
import ProductDetail from './ProductDetail';
import CompareScreen from './CompareScreen';
import logo from './assets/Logo Reolink.svg';

type QuestionType = 'single' | 'multiple';

interface Option {
  id: string;
  label: string;
}

interface Question {
  id: string;
  type: QuestionType;
  title: string;
  options: Option[];
}

const QUESTIONS: Question[] = [
  {
    id: 'location',
    type: 'single',
    title: 'Where will you use your camera?',
    options: [
      { id: 'indoors', label: 'Indoors' },
      { id: 'outdoors', label: 'Outdoors' },
      { id: 'both', label: 'Both indoors and outdoors' },
    ],
  },
  {
    id: 'features',
    type: 'multiple',
    title: 'What features are most important to you?',
    options: [
      { id: 'color_night', label: 'Color Night Vision' },
      { id: 'two_way_audio', label: 'Two-Way Audio' },
      { id: 'pan_tilt', label: 'Pan & Tilt (360° View)' },
      { id: 'smart_detection', label: 'Smart Person/Vehicle Detection' },
      { id: 'spotlight', label: 'Built-in Spotlight' },
    ],
  },
  {
    id: 'power',
    type: 'single',
    title: 'How do you prefer to power the camera?',
    options: [
      { id: 'battery_solar', label: 'Battery / Solar Powered (100% Wire-Free)' },
      { id: 'plugin', label: 'Plug-in Power (AC Adapter)' },
      { id: 'poe', label: 'PoE (Power over Ethernet)' },
    ],
  },
  {
    id: 'monitor',
    type: 'multiple',
    title: 'What exactly do you want to monitor?',
    options: [
      { id: 'security', label: 'General Home Security' },
      { id: 'pets', label: 'Pets' },
      { id: 'baby', label: 'Baby / Children' },
      { id: 'packages', label: 'Deliveries / Packages' },
    ],
  },
  {
    id: 'storage',
    type: 'single',
    title: 'How do you want to store your recordings?',
    options: [
      { id: 'sd_card', label: 'Local (MicroSD Card)' },
      { id: 'nvr', label: 'NVR (24/7 Recording)' },
      { id: 'cloud', label: 'Reolink Cloud' },
    ],
  },
];

import imgArgus4Pro from './assets/Hero Images SKUs- Reolink/Argus 4 Pro Panoramic..jpg';
import imgGoRangerPT from './assets/Hero Images SKUs- Reolink/Go PT Plus 4G LTE.jpg';
import imgOmvi3iPoE from './assets/Hero Images SKUs- Reolink/NVS8 PoE Kit 8MB4.jpg';

const AI_RECOMMENDATIONS = [
  {
    id: 1,
    name: 'Argus 4 Pro',
    image: imgArgus4Pro,
    match: '100% Match',
    desc: '5 MP Wi-Fi camera with automatic tracking',
    features: ['Wire-Free Setup', '4K Ultra HD Video', 'Color Night Vision'],
    category: 'Outdoor'
  },
  {
    id: 2,
    name: 'Go PT Plus 4G',
    image: imgGoRangerPT,
    match: '85% Match',
    desc: '4K Pan & Tilt camera with cellular connectivity',
    features: ['360° View', 'Smart Detection', 'Solar Compatible'],
    category: 'Outdoor'
  },
  {
    id: 3,
    name: 'NVS8 PoE Kit',
    image: imgOmvi3iPoE,
    match: '70% Match',
    desc: 'Smart PoE Kit with reliable connection',
    features: ['PoE Connection', 'Vandal Proof', 'Color Night Vision'],
    category: 'Bundles'
  }
];

type Message = {
  id: string;
  sender: 'ai' | 'user';
  type: 'text';
  text: string;
};

export default function ProductFinder({ onBack }: { onBack: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showAiChat, setShowAiChat] = useState(false);
  const [showCompare, setShowCompare] = useState(false);
  
  // View Detail State to preserve Chat/Results
  const [viewingProduct, setViewingProduct] = useState<any | null>(null);
  
  // Chat State
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const question = QUESTIONS[currentStep];
  const isMultiple = question?.type === 'multiple';
  const currentAnswers = answers[question?.id] || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (showAiChat) {
      scrollToBottom();
    }
  }, [messages, isTyping, showAiChat]);

  const handleOptionClick = (optionId: string) => {
    if (isMultiple) {
      setAnswers((prev) => {
        const selected = prev[question.id] || [];
        if (selected.includes(optionId)) {
          return { ...prev, [question.id]: selected.filter((id) => id !== optionId) };
        } else {
          return { ...prev, [question.id]: [...selected, optionId] };
        }
      });
    } else {
      setAnswers((prev) => ({ ...prev, [question.id]: [optionId] }));
      // Auto-advance for single choice after a small delay
      setTimeout(() => goNext(), 300);
    }
  };

  const goNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      if (currentStep < QUESTIONS.length - 1) {
        setCurrentStep((s) => s + 1);
      } else {
        // Show results screen instead of chat
        setShowResults(true);
      }
      setIsTransitioning(false);
    }, 300);
  };

  // Initialize chat messages when AI chat opens
  useEffect(() => {
    if (showAiChat && messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        setMessages([
          { id: '1', sender: 'ai', type: 'text', text: "Hi there! 👋 I'm your Reolink AI Assistant. How can I help you today?" }
        ]);
        setIsTyping(false);
      }, 1500);
    }
  }, [showAiChat, messages.length]);

  const sendUserMessage = (text: string) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'user', type: 'text', text }]);
    setChatInput("");
    setIsTyping(true);

    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'ai', type: 'text', text: "I'm still learning, but I can help you answer any questions!" }]);
      setIsTyping(false);
    }, 1500);
  };

  // --- View Detailed Product ---
  if (viewingProduct) {
    return (
      <ProductDetail 
        product={viewingProduct} 
        onBack={() => setViewingProduct(null)} 
        onHome={onBack} 
      />
    );
  }

  // --- Compare Products Render ---
  if (showCompare) {
    return (
      <CompareScreen 
        products={AI_RECOMMENDATIONS as any} 
        onBack={() => setShowCompare(false)} 
        onHome={onBack} 
      />
    );
  }

  // --- AI Chat Render ---
  if (showAiChat) {
    return (
      <div className="chat-screen">
        <header className="chat-header">
          <button className="chat-back-btn" onClick={() => setShowAiChat(false)} aria-label="Back to results">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          <h1 className="chat-header__title">AI Assistance</h1>
          <button className="finder-close-btn" onClick={onBack} aria-label="Home">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </button>
        </header>

        <div className="chat-messages">
          {messages.map((msg) => (
            <div key={msg.id}>
              {msg.type === 'text' && (
                <div className={`chat-msg ${msg.sender === 'user' ? 'chat-msg--user' : ''}`}>
                  {msg.sender === 'ai' && <div className="chat-msg__avatar">R</div>}
                  <div className="chat-msg__bubble">{msg.text}</div>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="chat-msg">
              <div className="chat-msg__avatar">R</div>
              <div className="chat-msg__bubble typing-indicator">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-bottom">

          <div className="chat-input-box">
            <input 
              type="text" 
              placeholder="Ask me anything..." 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') sendUserMessage(chatInput); }}
              disabled={isTyping}
            />
            <button 
              className="chat-send-btn" 
              onClick={() => sendUserMessage(chatInput)}
              disabled={isTyping || !chatInput.trim()}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- Results Screen Render ---
  if (showResults) {
    return (
      <div className="results-screen">
        <header className="results-header">
          <img src={logo} alt="Reolink" className="header__logo" />
          <button className="results-header__home-btn" onClick={onBack} aria-label="Go to home">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </button>
        </header>

        <div className="results-intro">
          <h1 className="results-intro__title">We think you would like</h1>
          <p className="results-intro__subtitle">
            Based on your answers we recommend you these 3 products
          </p>
        </div>

        <div className="results-body">
          {AI_RECOMMENDATIONS.map((prod, idx) => (
            <div 
              key={prod.id} 
              className="result-card result-card--clickable"
              style={{ animationDelay: `${idx * 0.12}s` }}
              onClick={() => setViewingProduct(prod)}
            >
              <div className="result-card__top">
                <h3 className="result-card__name">{prod.name}</h3>
                <span className="result-card__match">{prod.match}</span>
              </div>
              <div className="result-card__img-wrapper">
                <img src={prod.image} alt={prod.name} />
              </div>
              <p className="result-card__desc">{prod.desc}</p>
              <div className="result-card__features">
                {prod.features.map((feat, i) => (
                  <div key={i} className="result-card__feature">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    {feat}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="results-footer">
          <div className="results-footer__actions">
            <button 
              className="compare-btn"
              onClick={() => setShowCompare(true)}
            >
              Compare Products
            </button>
            <button 
              className="ai-circle-btn"
              onClick={() => setShowAiChat(true)}
              aria-label="AI Assistance"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="ai-sparkle-icon">
                <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
                <path d="M20 3v4" />
                <path d="M22 5h-4" />
                <path d="M4 17v2" />
                <path d="M5 18H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- Quiz Render ---
  return (
    <div className="finder-container">
      <header className="finder-header">
        <div className="finder-header__top">
          {currentStep > 0 ? (
            <button className="finder-close-btn" onClick={() => setCurrentStep((s) => s - 1)} aria-label="Go back">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </button>
          ) : (
            <div style={{ width: 44 }} />
          )}
          <h1 className="finder-title">Product Finder</h1>
          <button className="finder-close-btn" onClick={onBack} aria-label="Close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className="progress-segments">
          {QUESTIONS.map((_, i) => (
            <div
              key={i}
              className={`progress-segment ${i <= currentStep ? 'progress-segment--active' : ''}`}
            />
          ))}
        </div>
        <p className="progress-text">
          Step {currentStep + 1} of {QUESTIONS.length}
        </p>
      </header>

      <div className="finder-body">
        <div className={`question-wrapper ${isTransitioning ? 'exit-left' : ''}`} key={currentStep}>
          <div className="question-type-pill">
            {isMultiple ? 'Multiple Choice' : 'Single Choice'}
          </div>
          <h2 className="question-title">{question.title}</h2>

          <div className="options-stack">
            {question.options.map((opt) => {
              const isSelected = currentAnswers.includes(opt.id);
              return (
                <div
                  key={opt.id}
                  className={`option-card ${isSelected ? 'option-card--selected' : ''}`}
                  onClick={() => handleOptionClick(opt.id)}
                >
                  <p className="option-card__text">{opt.label}</p>

                  {isMultiple ? (
                    <div className="option-checkbox">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                  ) : (
                    <div className="option-card__icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {isMultiple && (
        <div className="finder-footer">
          <button
            className="continue-btn"
            disabled={currentAnswers.length === 0 || isTransitioning}
            onClick={goNext}
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
}
