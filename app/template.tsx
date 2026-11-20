/** Short page-entrance animation on every navigation (disabled under reduced motion) */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
