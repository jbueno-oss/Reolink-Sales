import { useState, useEffect, useRef } from 'react';
import ProductDetail from './ProductDetail';

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

const AI_RECOMMENDATIONS = [
  {
    id: 1,
    name: 'Argus 4 Pro',
    image: '/images/argus4pro.png',
    match: '100% Match',
    desc: '5 MP Wi-Fi camera with automatic tracking',
    features: ['Wire-Free Setup', '4K Ultra HD Video', 'Color Night Vision'],
    category: 'Outdoor'
  },
  {
    id: 2,
    name: 'Go Ranger PT',
    image: '/images/go-ranger-pt.png',
    match: '85% Match',
    desc: '4K Pan & Tilt camera with solar power support',
    features: ['360° View', 'Smart Detection', 'Solar Compatible'],
    category: 'Outdoor'
  },
  {
    id: 3,
    name: 'OMVI 3i PoE',
    image: '/images/omvi3i-poe.png',
    match: '70% Match',
    desc: 'Smart PoE Dome with reliable connection',
    features: ['PoE Connection', 'Vandal Proof', 'Color Night Vision'],
    category: 'Bundles'
  }
];

type Message = { id: string; sender: 'ai' | 'user'; type: 'text' | 'products' | 'comparison'; text?: string; };

export default function ProductFinder({ onBack }: { onBack: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showAiChat, setShowAiChat] = useState(false);
  
  // View Detail State to preserve Chat
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
        setShowAiChat(true);
      }
      setIsTransitioning(false);
    }, 300); // Wait for exit animation
  };

  useEffect(() => {
    if (showAiChat && messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        setMessages([
          { id: '1', sender: 'ai', type: 'text', text: "Hi there! 👋 I'm your Reolink AI Assistant. Thanks for taking the time to answer our questions! Based on your responses, I've found the perfect gear for your setup. Here are the top 3 Reolink cameras tailored specifically for you:" },
          { id: '2', sender: 'ai', type: 'products' }
        ]);
        setIsTyping(false);
      }, 1500);
    }
  }, [showAiChat, messages.length]);

  const handleSuggestionClick = (text: string) => {
    sendUserMessage(text);
  };

  const sendUserMessage = (text: string) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'user', type: 'text', text }]);
    setChatInput("");
    setIsTyping(true);

    setTimeout(() => {
      if (text.toLowerCase().includes("compare")) {
        setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'ai', type: 'comparison' }]);
      } else if (text.toLowerCase().includes("cheapest")) {
        setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'ai', type: 'text', text: "The most budget-friendly option here is the **Reolink E1 Pro** (Indoor), starting at just $49.99." }]);
      } else {
        setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'ai', type: 'text', text: "I'm still learning about that, but I can help you find more products!" }]);
      }
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

  // --- AI Chat Render ---
  if (showAiChat) {
    return (
      <div className="chat-screen">
        <header className="chat-header">
          <h1 className="chat-header__title">Reolink Ai Assistance</h1>
          <button className="finder-close-btn" onClick={onBack} aria-label="Close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </button>
        </header>

        <div className="chat-messages">
          {messages.map((msg) => (
            <div key={msg.id}>
              {msg.type === 'text' ? (
                <div className={`chat-msg ${msg.sender === 'user' ? 'chat-msg--user' : ''}`}>
                  {msg.sender === 'ai' && <div className="chat-msg__avatar">R</div>}
                  <div className="chat-msg__bubble">{msg.text}</div>
                </div>
              ) : msg.type === 'comparison' ? (
                <div className="chat-msg">
                  <div className="chat-msg__avatar">R</div>
                  <div className="chat-msg__bubble comparison-bubble">
                    <p style={{ margin: '0 0 12px 0', fontWeight: 600 }}>Feature Comparison</p>
                    <table className="comparison-table">
                      <thead>
                        <tr>
                          <th>Features</th>
                          <th>Argus 4 Pro</th>
                          <th>Go Ranger PT</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Resolution</td>
                          <td>4K 8MP</td>
                          <td>4K 8MP</td>
                        </tr>
                        <tr>
                          <td>Pan & Tilt</td>
                          <td><span className="icon-cross">✗</span></td>
                          <td><span className="icon-check">✓</span></td>
                        </tr>
                        <tr>
                          <td>Solar Power</td>
                          <td><span className="icon-check">✓</span></td>
                          <td><span className="icon-check">✓</span></td>
                        </tr>
                        <tr>
                          <td>Color Night Vision</td>
                          <td><span className="icon-check">✓</span></td>
                          <td><span className="icon-check">✓</span></td>
                        </tr>
                        <tr>
                          <td>Dual-Lens</td>
                          <td><span className="icon-check">✓</span></td>
                          <td><span className="icon-cross">✗</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="chat-carousel">
                  {AI_RECOMMENDATIONS.map((prod) => (
                    <div key={prod.id} className="chat-product-card">
                      <div className="chat-product-card__header">
                        <h3 className="chat-product-card__title">{prod.name}</h3>
                        <span className="chat-product-card__match">{prod.match}</span>
                      </div>
                      <div className="chat-product-card__img-wrapper">
                        <img src={prod.image} alt={prod.name} />
                      </div>
                      <p className="chat-product-card__desc">{prod.desc}</p>
                      <div className="chat-product-card__features">
                        {prod.features.map((feat, idx) => (
                          <div key={idx} className="chat-feature">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                              <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                            {feat}
                          </div>
                        ))}
                      </div>
                      <button 
                        className="chat-product-card__btn"
                        onClick={() => setViewingProduct(prod)}
                      >
                        View product detail
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </button>
                    </div>
                  ))}
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
          <div className="chat-suggestions">
            <button className="chat-chip" onClick={() => handleSuggestionClick("Can you help me compare this products?")}>
              Can you help me compare this products?
            </button>
            <button className="chat-chip" onClick={() => handleSuggestionClick("I want the cheapest one")}>
              I want the cheapest one
            </button>
            <button className="chat-chip" onClick={() => handleSuggestionClick("Accessories")}>
              Accessories
            </button>
          </div>

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

  // --- Quiz Render ---
  return (
    <div className="finder-container">
      <header className="finder-header">
        <div className="finder-header__top">
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
