import { describe, it, expect } from 'vitest'
import {
  formatFollowers,
  formatEngagementRate,
  FOLLOWERS_MILLION,
  FOLLOWERS_THOUSAND,
} from '@/utils/formatters'

describe('formatFollowers', () => {
  it('formats millions correctly', () => {
    expect(formatFollowers(1_500_000)).toBe('1.5M')
    expect(formatFollowers(FOLLOWERS_MILLION)).toBe('1.0M')
  })

  it('formats thousands correctly', () => {
    expect(formatFollowers(25_000)).toBe('25.0K')
    expect(formatFollowers(FOLLOWERS_THOUSAND)).toBe('1.0K')
  })

  it('formats small numbers as-is', () => {
    expect(formatFollowers(999)).toBe('999')
    expect(formatFollowers(0)).toBe('0')
  })
})

describe('formatEngagementRate', () => {
  it('converts decimal rate to percentage string', () => {
    expect(formatEngagementRate(0.0121)).toBe('1.21%')
    expect(formatEngagementRate(0)).toBe('0.00%')
  })

  it('returns N/A for undefined', () => {
    expect(formatEngagementRate(undefined)).toBe('N/A')
  })
})
