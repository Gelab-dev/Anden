import { type HTMLAttributes, forwardRef } from 'react';
import Image from 'next/image';
import { clsx } from 'clsx';

/**
 * Card composable de Andén.
 * Diseñado para mostrar actividades, providers, y contenido estructurado.
 * 
 * @example
 * <Card>
 *   <Card.Image src="..." alt="..." />
 *   <Card.Body>
 *     <Card.Title>Avistaje de ballenas</Card.Title>
 *     <Card.Meta>Puerto Madryn · Desde $25,000</Card.Meta>
 *     <Card.Description>Salida en lancha para avistar ballenas francas...</Card.Description>
 *   </Card.Body>
 * </Card>
 */

// --- Root ---
const CardRoot = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx(
        'overflow-hidden rounded-xl border border-gray-700 bg-dark-800 transition-all hover:border-turquoise/40 hover:shadow-lg hover:shadow-turquoise/10',
        className
      )}
      {...props}
    />
  )
);
CardRoot.displayName = 'Card';

// --- Image ---
interface CardImageProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  src: string;
  alt: string;
  aspectRatio?: 'video' | 'square' | 'wide';
}

const CardImage = forwardRef<HTMLDivElement, CardImageProps>(
  ({ src, alt, aspectRatio = 'video', className, ...props }, ref) => {
    const aspectClasses = {
      video: 'aspect-video',
      square: 'aspect-square',
      wide: 'aspect-[21/9]',
    };

    return (
      <div
        ref={ref}
        className={clsx(
          'relative overflow-hidden bg-dark-700',
          aspectClasses[aspectRatio],
          className
        )}
        {...props}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    );
  }
);
CardImage.displayName = 'Card.Image';

// --- Body ---
const CardBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={clsx('p-5', className)} {...props} />
  )
);
CardBody.displayName = 'Card.Body';

// --- Title ---
const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={clsx(
        'text-lg font-bold text-white leading-tight',
        className
      )}
      {...props}
    />
  )
);
CardTitle.displayName = 'Card.Title';

// --- Meta (info secundaria: ubicación, precio, fecha) ---
const CardMeta = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={clsx('mt-1 text-sm text-gray-400', className)}
      {...props}
    />
  )
);
CardMeta.displayName = 'Card.Meta';

// --- Description ---
const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={clsx('mt-3 text-sm text-gray-300 leading-relaxed', className)}
      {...props}
    />
  )
);
CardDescription.displayName = 'Card.Description';

// --- Footer ---
const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx(
        'flex items-center justify-between border-t border-gray-700 px-5 py-3',
        className
      )}
      {...props}
    />
  )
);
CardFooter.displayName = 'Card.Footer';

// --- Export composable ---
export const Card = Object.assign(CardRoot, {
  Image: CardImage,
  Body: CardBody,
  Title: CardTitle,
  Meta: CardMeta,
  Description: CardDescription,
  Footer: CardFooter,
});