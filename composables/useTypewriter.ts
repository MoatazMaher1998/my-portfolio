export function useTypewriter(
  texts: string[],
  typeSpeed = 75,
  deleteSpeed = 38,
  pauseTime = 2200
) {
  const displayed = ref('')
  let idx = 0
  let deleting = false
  let timer: ReturnType<typeof setTimeout>

  function tick() {
    const target = texts[idx]
    if (!deleting) {
      displayed.value = target.slice(0, displayed.value.length + 1)
      if (displayed.value === target) {
        deleting = true
        timer = setTimeout(tick, pauseTime)
        return
      }
    } else {
      displayed.value = target.slice(0, displayed.value.length - 1)
      if (displayed.value === '') {
        deleting = false
        idx = (idx + 1) % texts.length
      }
    }
    timer = setTimeout(tick, deleting ? deleteSpeed : typeSpeed)
  }

  onMounted(tick)
  onUnmounted(() => clearTimeout(timer))

  return { displayed }
}
