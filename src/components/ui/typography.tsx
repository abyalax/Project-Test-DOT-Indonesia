
export function H1({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl font-semibold">{children}</h2>
}

export function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-lg font-semibold">{children}</h2>
}

export function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="text-sm font-medium">{children}</h3>
}

export function H4({ children }: { children: React.ReactNode }) {
  return <h4 className="text-xs font-medium">{children}</h4>
}

export function P({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-muted-foreground">{children}</p>
}
