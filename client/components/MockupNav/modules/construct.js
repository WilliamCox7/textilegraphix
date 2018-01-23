import { changeView } from './change-view';

export function construct(MockupNav) {
  MockupNav.changeView = changeView.bind(MockupNav);
}
