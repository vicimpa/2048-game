import { useEffect } from "react"

function useEvent<
  K extends keyof DocumentEventMap
>(event: K, handler: (e: DocumentEventMap[K]) => any) {
  useEffect(() => {
    document.addEventListener(event, handler)
    return () => document.removeEventListener(event, handler)
  })
}

export { useEvent }