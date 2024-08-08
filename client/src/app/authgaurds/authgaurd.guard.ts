import { CanActivateFn } from '@angular/router';

export const authgaurdGuard: CanActivateFn = (route, state) => {
  let res = localStorage.getItem('user')
  if (res) {
    return true;

  }
  return false;
};
