import { injectGlobal } from 'styled-components'

const exitDuration = 100
const enterDuration = 100
const slideDistance = '.2rem'

injectGlobal`
  .fade-exit {
    opacity: 1;
    transform: translate(0, 0);
    transition: opacity ${exitDuration}ms ease, transform ${exitDuration}ms ease;
  }

  .fade-exit.fade-exit-active {
    opacity: 0;
    transform: translate(0, ${slideDistance});
  }

  .fade-enter {
    opacity: 0;
    transform: translate(0, ${slideDistance});
    transition: opacity ${enterDuration}ms ease, transform ${enterDuration}ms ease;
  }

  .fade-enter.fade-enter-active {
    opacity: 1;
    transform: translate(0, 0);

    transition: opacity ${enterDuration}ms ease, transform ${enterDuration}ms ease;
    transition-delay: ${exitDuration}ms;
  }
`
