export const useSearchPalette = () => {
  const isOpen = useState('searchPalette', () => false)
  return { isOpen }
}
