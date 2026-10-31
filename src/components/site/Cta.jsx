import { Link } from 'react-router-dom';

const base =
  'inline-flex items-center justify-center gap-3 px-8 py-4 text-[11px] uppercase tracking-[0.24em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-cream';

const variants = {
  solid: 'bg-ink text-cream hover:bg-forest',
  outline: 'border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-cream',
  sand: 'bg-sand text-ink hover:bg-forest hover:text-cream',
  forest: 'bg-forest text-cream hover:bg-ink',
  quiet: 'text-ink/60 hover:text-ink',
};

export default function Cta({ to, href, onClick, type = 'button', variant = 'solid', className = '', children }) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}