import { injectGlobal } from 'styled-components'

const exitDuration = 200
const enterDuration = 200

injectGlobal`
  .fade-exit {
    opacity: 1;
    transform: translate(0, 0);
    transition: opacity ${exitDuration}ms ease, transform ${exitDuration}ms ease;
  }

  .fade-exit.fade-exit-active {
    opacity: 0;
    transform: translate(0, .5rem);
  }

  .fade-enter {
    opacity: 0;
    transform: translate(0, .5rem);
    transition: opacity ${enterDuration}ms ease, transform ${enterDuration}ms ease;
  }

  .fade-enter.fade-enter-active {
    opacity: 1;
    transform: translate(0, 0);

    transition: opacity ${enterDuration}ms ease, transform ${enterDuration}ms ease;
    transition-delay: ${exitDuration}ms;
  }

`
