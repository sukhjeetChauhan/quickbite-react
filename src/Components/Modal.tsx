export default function Modal({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full bg-gray-400/50 z-999 absolute left-0 top-0 flex items-center justify-center">
      {children}
    </div>
  )
}
