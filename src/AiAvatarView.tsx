const AVATAR_URL = 'https://staging-app.clona.co/agent/avatar/69aa9159-b992-4469-ae23-e01cbb522853';

export default function AiAvatarView({ onBack, onHome }: { onBack: () => void; onHome: () => void }) {
  return (
    <div className="chat-screen">
      <header className="chat-header">
        <button className="chat-back-btn" onClick={onBack} aria-label="Back to results">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
        <h1 className="chat-header__title">Reo-Reolink</h1>
        <button className="finder-close-btn" onClick={onHome} aria-label="Home">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </button>
      </header>

      <div className="avatar-frame-wrapper">
        <iframe
          className="avatar-frame"
          src={AVATAR_URL}
          title="Reolink AI Avatar Assistant"
          allow="camera; microphone; autoplay; clipboard-write"
        />
      </div>
    </div>
  );
}
