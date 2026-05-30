import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { clsx } from 'clsx';

const buttonVariants = cva(
  // Base styles (siempre aplicados)
  'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        // Signal sólido (CTA principal)
        primary:
          'bg-[var(--color-signal)] text-[var(--color-board)] hover:bg-[var(--color-signal-bright)] focus-visible:ring-[var(--color-signal)]',

        // Outline signal (secundario)
        secondary:
          'border-2 border-[var(--color-signal)] text-[var(--color-signal)] hover:bg-[var(--color-signal)] hover:text-[var(--color-board)] focus-visible:ring-[var(--color-signal)]',

        // Transparente con hover
        ghost:
          'text-gray-300 hover:bg-[var(--color-board-3)] hover:text-white focus-visible:ring-[var(--color-board-2)]',

        // Oscuro sólido
        dark:
          'bg-[var(--color-board-3)] text-white hover:bg-[var(--color-board-2)] focus-visible:ring-[var(--color-board-2)]',

        // Outline gris
        outline:
          'border-2 border-[var(--color-board-2)] text-gray-300 hover:bg-[var(--color-board-3)] hover:text-white focus-visible:ring-[var(--color-board-2)]',

        // Rojo peligro (delete, cancel)
        danger:
          'bg-[var(--color-completo)] text-white hover:bg-red-600 focus-visible:ring-red-500',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-11 px-5 text-base',
        lg: 'h-13 px-7 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Mostrar estado de carga */
  isLoading?: boolean;
}

/**
 * Botón de Andén con variantes de marca.
 * 
 * @example
 * <Button variant="primary">Reservar ahora</Button>
 * <Button variant="ghost" size="sm">Ver más</Button>
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(buttonVariants({ variant, size, className }))}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';