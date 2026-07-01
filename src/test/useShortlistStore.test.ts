import { describe, it, expect, beforeEach } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import useShortlistStore from '@/store/useShortlistStore'
import type { UserProfileSummary } from '@/types'

const mockProfile: UserProfileSummary = {
  user_id: 'test-001',
  username: 'testuser',
  fullname: 'Test User',
  url: 'https://instagram.com/testuser',
  picture: 'https://example.com/pic.jpg',
  is_verified: false,
  followers: 10_000,
}

const mockProfile2: UserProfileSummary = {
  ...mockProfile,
  user_id: 'test-002',
  username: 'testuser2',
}

beforeEach(() => {
  // Reset store state between tests
  useShortlistStore.setState({ shortlist: [] })
})

describe('useShortlistStore', () => {
  it('starts with empty shortlist', () => {
    const { result } = renderHook(() => useShortlistStore())
    expect(result.current.shortlist).toHaveLength(0)
  })

  it('adds a profile to the shortlist', () => {
    const { result } = renderHook(() => useShortlistStore())
    act(() => { result.current.addToShortlist(mockProfile) })
    expect(result.current.shortlist).toHaveLength(1)
    expect(result.current.shortlist[0].user_id).toBe('test-001')
  })

  it('prevents duplicate entries', () => {
    const { result } = renderHook(() => useShortlistStore())
    act(() => {
      result.current.addToShortlist(mockProfile)
      result.current.addToShortlist(mockProfile)
    })
    expect(result.current.shortlist).toHaveLength(1)
  })

  it('removes a profile by user_id', () => {
    const { result } = renderHook(() => useShortlistStore())
    act(() => { result.current.addToShortlist(mockProfile) })
    act(() => { result.current.removeFromShortlist('test-001') })
    expect(result.current.shortlist).toHaveLength(0)
  })

  it('isShortlisted returns true when profile is in list', () => {
    const { result } = renderHook(() => useShortlistStore())
    act(() => { result.current.addToShortlist(mockProfile) })
    expect(result.current.isShortlisted('test-001')).toBe(true)
  })

  it('isShortlisted returns false when profile is not in list', () => {
    const { result } = renderHook(() => useShortlistStore())
    expect(result.current.isShortlisted('test-001')).toBe(false)
  })

  it('clears all profiles', () => {
    const { result } = renderHook(() => useShortlistStore())
    act(() => {
      result.current.addToShortlist(mockProfile)
      result.current.addToShortlist(mockProfile2)
    })
    act(() => { result.current.clearShortlist() })
    expect(result.current.shortlist).toHaveLength(0)
  })
})
