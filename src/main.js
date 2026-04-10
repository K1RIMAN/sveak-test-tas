import './styles/main.scss'

// ─── Burger / mobile menu ──────────────────────────────────────────────────────

const burger = document.querySelector('.header__burger')
const mobileMenu = document.querySelector('.mobile-menu')
const backdrop = document.querySelector('.mobile-menu-backdrop')

function openMenu() {
  burger.setAttribute('aria-expanded', 'true')
  mobileMenu.setAttribute('aria-hidden', 'false')
  mobileMenu.classList.add('is-open')
  backdrop.classList.add('is-open')
  document.body.classList.add('menu-open')
}

function closeMenu() {
  burger.setAttribute('aria-expanded', 'false')
  mobileMenu.setAttribute('aria-hidden', 'true')
  mobileMenu.classList.remove('is-open')
  backdrop.classList.remove('is-open')
  document.body.classList.remove('menu-open')
}

if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    burger.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu()
  })

  backdrop?.addEventListener('click', closeMenu)

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
      closeMenu()
      burger.focus()
    }
  })
}

// ─── Hide incomplete last row ──────────────────────────────────────────────────

const grid = document.querySelector('.cards')

function updateGridHeight() {
  if (!grid) return

  const cards = [...grid.querySelectorAll('.card')]
  if (!cards.length) return

  // Снимаем высоту чтобы получить натуральный размер
  grid.style.height = ''

  const cols = getComputedStyle(grid)
    .getPropertyValue('grid-template-columns')
    .trim().split(/\s+/).length

  const fullRows = Math.floor(cards.length / cols)
  if (fullRows === 0) {
    grid.style.height = '0px'
    return
  }

  const gap = parseFloat(getComputedStyle(grid).gap) || 20
  const cardH = cards[0].getBoundingClientRect().height

  grid.style.height = `${fullRows * cardH + (fullRows - 1) * gap}px`
}

updateGridHeight()
window.addEventListener('resize', updateGridHeight)
window.addEventListener('load', updateGridHeight)
