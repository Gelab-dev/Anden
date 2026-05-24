import { cva, type VariantProps } from 'class-variance-authority';
import { type HTMLAttributes } from 'react';
import { clsx } from 'clsx';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        // Estados de actividades (el diferenciador de Andén)
        operating:
          'bg-[var(--color-status-operating)]/10 text-[var(--color-status-operating)] border border-[var(--color-status-operating)]/20',
        
        limited:
          'bg-[var(--color-status-limited)]/10 text-[var(--color-status-limited)] border border-[var(--color-status-limited)]/20',
        
        closed:
          'bg-[var(--color-status-closed)]/10 text-[var(--color-status-closed)] border border-[var(--color-status-closed)]/20',
        
        soldOut:
          'bg-[var(--color-status-sold-out)]/10 text-[var(--color-status-sold-out)] border border-[var(--color-status-sold-out)]/20',
        
        // Badges genéricos
        info:
          'bg-blue-500/10 text-blue-400 border border-blue-500/20',
        
        neutral:
          'bg-gray-500/10 text-gray-300 border border-gray-500/20',
      },
    },
    defaultVariants: {
      variant: 'neutral',
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /** Mostrar dot indicator */
  showDot?: boolean;
}

/**
 * Badge de Andén para estados de actividades y etiquetas.
 * 
 * @example
 * <Badge variant="operating">Operando</Badge>
 * <Badge variant="closed" showDot>Cerrado hoy</Badge>
 */
export function Badge({
  className,
  variant,
  showDot = false,
  children,
  ...props
}: BadgeProps) {
  return (
    <span className={clsx(badgeVariants({ variant, className }))} {...props}>
      {showDot && (
        <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
      )}
      {children}
    </span>
  );
}