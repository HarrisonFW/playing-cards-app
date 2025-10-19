import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from './store'

/**
 * Typed versions of useDispatch and useSelector hooks
 *
 * Use these throughout the app instead of plain `useDispatch` and `useSelector`
 * to get full TypeScript type inference and autocomplete
 */

// Use throughout your app instead of plain `useDispatch`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

// Use throughout your app instead of plain `useSelector`
export const useAppSelector = useSelector.withTypes<RootState>()
