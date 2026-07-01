import { describe, it, expect } from 'vitest'
import { filterProfiles, getPlatformLabel, extractProfiles } from '@/utils/dataHelpers'
import type { UserProfileSummary } from '@/types'

const mockProfiles: UserProfileSummary[] = [
  {
    user_id: '1',
    username: 'cristiano',
    fullname: 'Cristiano Ronaldo',
    url: '',
    picture: '',
    is_verified: true,
    followers: 641_000_000,
    engagement_rate: 0.0121,
  },
  {
    user_id: '2',
    username: 'leomessi',
    fullname: 'Leo Messi',
    url: '',
    picture: '',
    is_verified: true,
    followers: 504_000_000,
    engagement_rate: 0.0069,
  },
]

describe('filterProfiles', () => {
  it('returns all profiles when query is empty', () => {
    expect(filterProfiles(mockProfiles, '')).toHaveLength(2)
  })

  it('matches by username case-insensitively', () => {
    expect(filterProfiles(mockProfiles, 'CRISTIANO')).toHaveLength(1)
    expect(filterProfiles(mockProfiles, 'cristiano')).toHaveLength(1)
  })

  it('matches by fullname case-insensitively', () => {
    expect(filterProfiles(mockProfiles, 'Leo')).toHaveLength(1)
    expect(filterProfiles(mockProfiles, 'leo messi')).toHaveLength(1)
  })

  it('returns empty array when no match', () => {
    expect(filterProfiles(mockProfiles, 'neymar')).toHaveLength(0)
  })

  it('handles undefined username gracefully without crashing', () => {
    const profileWithNoUsername = { ...mockProfiles[0], username: undefined as unknown as string }
    expect(() => filterProfiles([profileWithNoUsername], 'test')).not.toThrow()
  })
})

describe('getPlatformLabel', () => {
  it('returns correct labels', () => {
    expect(getPlatformLabel('instagram')).toBe('Instagram')
    expect(getPlatformLabel('youtube')).toBe('YouTube')
    expect(getPlatformLabel('tiktok')).toBe('TikTok')
  })
})

describe('extractProfiles', () => {
  it('returns an array of profiles for instagram', () => {
    const profiles = extractProfiles('instagram')
    expect(Array.isArray(profiles)).toBe(true)
    expect(profiles.length).toBeGreaterThan(0)
  })

  it('every profile has a username after normalisation', () => {
    const profiles = extractProfiles('youtube')
    profiles.forEach(p => {
      expect(p.username).toBeTruthy()
    })
  })
})
