
export function H1({ children, className }: { children: React.ReactNode, className?: string }) {
  return <h1 className={` ${className} text-2xl font-semibold`}>{children}</h1>
}

export function H2({ children, className }: { children: React.ReactNode, className?: string }) {
  return <h2 className={` ${className} text-xl font-semibold`}>{children}</h2>
}

export function H3({ children, className }: { children: React.ReactNode, className?: string }) {
  return <h3 className={` ${className} text-lg font-medium my-2`}>{children}</h3>
}

export function H4({ children, className }: { children: React.ReactNode, className?: string }) {
  return <h4 className={` ${className} text-sm font-medium my-2`}>{children}</h4>
}

export function P({ children, className }: { children: React.ReactNode, className?: string }) {
  return <p className={`${className} text-sm text-slate-700`}>{children}</p>
}

export function Small({ children, className }: { children: React.ReactNode, className?: string }) {
  return <p className={`${className} text-xs text-muted-foreground`}>{children}</p>
}

export function Strong({ children, className }: { children: React.ReactNode, className?: string }) {
  return <strong className={`${className} text-sm text-slate-600 font-bold`}>{children}</strong>
}

export function Em({ children, className }: { children: React.ReactNode, className?: string }) {
  return <em className={`${className} text-sm text-muted-foreground font-normal`}>{children}</em>
}

export function Li({ children, className }: { children: React.ReactNode, className?: string }) {
  return <li className={`${className} text-sm text-black font-semibold`}>{children}</li>
}

export function Code({ children, className }: { children: React.ReactNode, className?: string }) {
  return <code className={`${className} text-sm text-black font-mono bg-slate-100 p-1 rounded-sm`}>{children}</code>
}