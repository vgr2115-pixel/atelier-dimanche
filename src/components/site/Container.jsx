export default function Container({ className = '', children }) {
  return <div className={`mx-auto w-full max-w-[1400px] px-6 sm:px-10 lg:px-16 ${className}`}>{children}</div>;
}