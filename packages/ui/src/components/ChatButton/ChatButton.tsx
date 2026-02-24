import styles from './ChatButton.module.css';

interface ChatButtonProps {
  onClick: () => void;
  unreadCount?: number;
}

export function ChatButton({ onClick, unreadCount = 0 }: ChatButtonProps) {
  return (
    <button
      className={styles.btn}
      onClick={onClick}
      aria-label="Open chat"
      data-testid="chat-button"
    >
      <div className={styles.midRing}>
        <div className={styles.inner}>
          {/* Chat bubble SVG */}
          <svg
            className={styles.icon}
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
              fill="#1a1a2e"
              stroke="#1a1a2e"
              strokeWidth="1"
            />
          </svg>
        </div>
      </div>

      {unreadCount > 0 && (
        <span className={styles.badge} aria-label={`${unreadCount} unread`}>
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </button>
  );
}
