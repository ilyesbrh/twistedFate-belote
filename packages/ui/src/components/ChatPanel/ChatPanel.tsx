import styles from './ChatPanel.module.css';

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatPanel({ isOpen, onClose }: ChatPanelProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropVisible : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={`${styles.panel} ${isOpen ? styles.panelOpen : ''}`}
        data-testid="chat-panel"
        aria-label="Chat"
        role="dialog"
      >
        <div className={styles.header}>
          <span className={styles.title}>Chat</span>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close chat">
            ✕
          </button>
        </div>

        <div className={styles.messages}>
          <p className={styles.empty}>No messages yet.</p>
        </div>

        <div className={styles.inputRow}>
          <input
            className={styles.input}
            type="text"
            placeholder="Type a message…"
            maxLength={120}
          />
          <button className={styles.sendBtn} aria-label="Send">
            ›
          </button>
        </div>
      </div>
    </>
  );
}
