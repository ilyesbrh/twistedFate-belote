import { Badge, Tooltip } from '@radix-ui/themes';
import type { PlayerData } from '../../data/mockGame.js';
import { TimerRing } from '../TimerRing/TimerRing.js';
import styles from './PlayerAvatar.module.css';

type AvatarSize = 'lg' | 'md' | 'sm';

interface PlayerAvatarProps {
  player: PlayerData;
  size?: AvatarSize;
  isActive?: boolean;
}

export function PlayerAvatar({ player, size = 'md', isActive = false }: PlayerAvatarProps) {
  return (
    <div className={`${styles.wrapper} ${styles[size]}`} data-testid={`player-avatar-${player.position}`}>
      {/* Circular photo frame */}
      <div className={styles.frame}>
        {/* Timer countdown ring */}
        <TimerRing isActive={isActive} />

        {player.isVip && (
          <span className={styles.vipBadge}>
            <Badge color="yellow" variant="solid" size="1" radius="small">VIP</Badge>
          </span>
        )}

        <img
          className={styles.photo}
          src={player.avatarUrl}
          alt={player.name}
          draggable={false}
        />

        <div className={styles.levelBadge}>
          <Badge color="blue" variant="solid" size="1" radius="full">{player.level}</Badge>
        </div>

        {player.isDealer && (
          <div className={styles.dealerBadge}>
            <Badge color="orange" variant="solid" size="1" radius="full">D</Badge>
          </div>
        )}
      </div>

      {/* Name pill label */}
      <Tooltip content={player.name} side="bottom">
        <div className={`${styles.nameLabel} ${isActive ? styles.nameLabelActive : ''}`}>
          <span className={styles.globeIcon}>🌐</span>
          <span className={styles.name}>{player.name}</span>
          {isActive && <span className={styles.timerDot} aria-hidden="true" />}
        </div>
      </Tooltip>
    </div>
  );
}
