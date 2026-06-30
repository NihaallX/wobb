import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserProfileSummary } from '@/types'

interface ShortlistStore {
  shortlist: UserProfileSummary[]
  addToShortlist: (profile: UserProfileSummary) => void
  removeFromShortlist: (userId: string) => void
  isShortlisted: (userId: string) => boolean
  clearShortlist: () => void
}

const useShortlistStore = create<ShortlistStore>()(
  persist(
    (set, get) => ({
      shortlist: [],
      addToShortlist: (profile) => {
        if (!get().isShortlisted(profile.user_id)) {
          set(state => ({ shortlist: [...state.shortlist, profile] }))
        }
      },
      removeFromShortlist: (userId) =>
        set(state => ({ shortlist: state.shortlist.filter(p => p.user_id !== userId) })),
      isShortlisted: (userId) => get().shortlist.some(p => p.user_id === userId),
      clearShortlist: () => set({ shortlist: [] }),
    }),
    { name: 'wobb-shortlist' }
  )
)

export default useShortlistStore
