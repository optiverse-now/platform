type HeadingProps = {
  children: React.ReactNode;
  className?: string;
}

export function Heading({ children, className = "" }: HeadingProps) {
  return (
    <h2 className={`text-2xl font-bold mb-4 ${className}`}>
      {children}
    </h2>
  )
} 