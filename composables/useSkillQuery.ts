export const useSkillQuery = () => {
  const query = useState('skillQuery', () => '')
  return { query }
}
